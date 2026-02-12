import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearQuizDetail,
  clearUser,
  loadUser,
  saveQuizDetail,
  saveResult,
} from "../utils/Storage";
import QuestionCard from "../components/QuestionCard";

const Quiz = () => {
  // ================================
  // STATE
  // ================================

  const [questions, setQuestions] = useState([]); // semua soal dari API
  const [index, setIndex] = useState(0); // index soal aktif
  const [score, setScore] = useState(0); // skor benar
  const [answers, setAnswers] = useState([]); // simpan detail jawaban user

  // timer state
  const [timeLeft, setTimeLeft] = useState(60); // 60 detik

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = loadUser();

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple",
      );

      // cek status HTTP
      if (!res.ok) {
        throw new Error("Network response error");
      }

      const data = await res.json();
      console.log("HASIL API:", data);

      // gabungkan jawaban benar + salah lalu acak
      const formatted = data.results.map((q) => ({
        ...q,
        all_answers: [q.correct_answer, ...q.incorrect_answers].sort(
          () => Math.random() - 0.5,
        ),
      }));

      setQuestions(formatted);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil soal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // ================================
  // TIMER LOGIC
  // ================================
  useEffect(() => {
    // kalau belum ada soal → jangan start timer
    if (!questions.length) return;

    /*
      setInterval:
      jalan tiap 1 detik
      kurangi timeLeft
    */
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    // cleanup biar tidak memory leak
    return () => clearInterval(timer);
  }, [questions]);

  // ================================
  // AUTO FINISH KALAU WAKTU HABIS
  // ================================
  useEffect(() => {
    if (timeLeft <= 0) {
      finishQuiz(answers, score);
    }
  }, [timeLeft, answers, score]); // dependensi biar selalu update

  // ================================
  // FINISH FUNCTION (dipakai 2x)
  // ================================
  const finishQuiz = (finalAnswers, finalScore) => {
    saveResult({
      score: finalScore,
      total: questions.length,
    });

    saveQuizDetail(finalAnswers);

    navigate("/result");
  };

  // ================================
  // SAAT USER PILIH JAWABAN
  // ================================
  const handleAnswer = (answer) => {
    const current = questions[index];

    const isCorrect = answer === current.correct_answer;

    // ✅ hitung skor baru manual
    const newScore = isCorrect ? score + 1 : score;

    // update state
    setScore(newScore);

    // simpan detail jawaban
    const newAnswers = [
      ...answers,
      {
        question: current.question,
        correct: current.correct_answer,
        user: answer,
      },
    ];
    setAnswers(newAnswers);

    const next = index + 1;

    // kalau masih ada soal -> lanjut
    if (next < questions.length) {
      setIndex(next);
    } else {
      // pakai data terbaru, bukan state lama
      finishQuiz(newAnswers, newScore);
    }
  };

  // ================================
  // LOGOUT
  // ================================
  const logout = () => {
    clearUser();
    clearQuizDetail();
    navigate("/login");
  };

  if (!questions.length) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Quiz Time 🚀</h1>

          <button
            onClick={logout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* TIMER */}
        <div className="flex justify-between items-center">
          <div className="bg-gray-100 px-4 py-2 rounded-lg font-semibold">
            ⏳ {timeLeft}s
          </div>

          <p className="text-gray-600">
            Soal {index + 1} / {questions.length}
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((index + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* QUESTION */}
        <QuestionCard question={questions[index]} onAnswer={handleAnswer} />
      </div>
    </div>
  );
};

export default Quiz;
