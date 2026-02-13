import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearQuizDetail,
  clearQuizSession,
  clearUser,
  loadQuizSession,
  loadUser,
  saveQuizDetail,
  saveQuizSession,
  saveResult,
} from "../utils/Storage";
import QuestionCard from "../components/QuestionCard";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

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

  // ================================
  // FETCH QUESTIONS DARI API
  // ================================
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

  // ================================
  // LOAD SESSION JIKA ADA
  // ================================

  useEffect(() => {
    const savedSession = loadQuizSession();

    // kalau ada session yang disimpan, load itu
    if (savedSession) {
      setQuestions(savedSession.questions);
      setIndex(savedSession.answers.length); // index berdasarkan jumlah jawaban yang sudah ada
      setScore(savedSession.score);
      setAnswers(savedSession.answers);
      setTimeLeft(savedSession.timeLeft);
      setLoading(false);
    } else {
      // kalau tidak ada, fetch soal baru
      fetchQuestions();
    }
  }, []);

  // ================================
  // SIMPAN SESSION SETIAP ADA PERUBAHAN
  // ================================

  useEffect(() => {
    if (!questions.length) return;

    saveQuizSession({
      questions,
      index,
      score,
      answers,
      timeLeft,
    });
  }, [questions, index, score, answers, timeLeft]);

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
    clearQuizSession(); // hapus session yang tersimpan

    // simpan result akhir
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
    clearQuizSession();
    navigate("/login");
  };

  // if (!questions.length) return <p>Loading...</p>;
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-4"
        >
          {/* spinner */}
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

          <p className="text-gray-600 font-medium">Mengambil soal...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-6"
    >
      {/* CARD */}
      <div className="bg-white/95 backdrop-blur-md w-full max-w-2xl rounded-3xl shadow-2xl p-8 space-y-6 overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Quiz Time</h1>

          {/* 👇 TAMBAHAN */}
          <p className="text-sm text-gray-500">Hi {user || "Guest"} 👋</p>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

        {/* ================= TIMER + PROGRESS INFO ================= */}
        <div className="flex items-center justify-between">
          {/* Timer Chip */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl font-semibold shadow-sm">
            <Clock size={18} />
            {timeLeft}s
          </div>

          <p className="text-gray-600 font-medium">
            Soal {index + 1} / {questions.length}
          </p>
        </div>

       {/* ================= PROGRESS BAR ================= */}
<div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
  <motion.div
    className="h-full bg-indigo-500"
    animate={{
      width: `${((index + 1) / questions.length) * 100}%`,
    }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  />
</div>

        {/* ================= QUESTION ================= */}
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
        >
          <QuestionCard question={questions[index]} onAnswer={handleAnswer} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Quiz;
