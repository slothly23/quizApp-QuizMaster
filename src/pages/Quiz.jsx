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
      finishQuiz();
    }
  }, [timeLeft]);

  // ================================
  // FINISH FUNCTION (dipakai 2x)
  // ================================
  const finishQuiz = () => {
    saveResult({
      score,
      total: questions.length,
    });

    saveQuizDetail(answers);

    navigate("/result");
  };

  // ================================
  // SAAT USER PILIH JAWABAN
  // ================================
  const handleAnswer = (answer) => {
    const current = questions[index];

    const isCorrect = answer === current.correct_answer;

    // tambah skor kalau benar
    if (isCorrect) {
      setScore((s) => s + 1);
    }

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
      finishQuiz(); // selesai normal
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
    <div>
      <h1>Quiz</h1>
      {/* ========================= */}
      {/* TIMER UI */}
      {/* ========================= */}
      <h3>⏳ Time Left: {timeLeft}s</h3>

      {/* info progress */}
      <p>
        Soal {index + 1} / {questions.length}
      </p>

      {/* tampilkan 1 soal */}
      <QuestionCard question={questions[index]} onAnswer={handleAnswer} />

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Quiz;
