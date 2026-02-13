import React from "react";
import { useNavigate } from "react-router-dom";
import {
  clearQuizDetail,
  clearQuizSession,
  clearResult,
  clearUser,
  loadQuizDetail,
  loadResult,
  loadUser,
} from "../utils/Storage";
import {
  Trophy,
  CheckCircle,
  XCircle,
  MinusCircle,
  RotateCcw,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

const Result = () => {
  const navigate = useNavigate();

  const user = loadUser();
  const result = loadResult();
  const detail = loadQuizDetail();

  const playAgain = () => {
    clearResult();
    clearQuizDetail();
    clearQuizSession(); // hapus sesi quiz sebelumnya
    navigate("/quiz");
  };

  const logout = () => {
    clearUser();
    clearQuizDetail();
    clearQuizSession();
    navigate("/login");
  };

  if (!result || !detail) return <p>Tidak ada hasil</p>;

  // ========================
  // Statistik
  // ========================
  const correctCount = detail.filter((d) => d.user === d.correct).length;
  const wrongCount = detail.filter((d) => d.user !== d.correct).length;
  const unansweredCount = result.total - detail.length;

  const percent = result.total
    ? (result.score / result.total) * 100
    : 0;

  const finalPercent = percent.toFixed(1);

  const circumference = 2 * Math.PI * 56;
  const dash = circumference - (circumference * percent) / 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-8 space-y-8"
      >

        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow">
            <Trophy className="text-white" />
          </div>

          <h1 className="text-3xl font-bold">Hasil Kuis</h1>
          <p className="text-gray-500">Selamat, {user}! 🎉</p>
        </div>

        {/* SCORE CIRCLE */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="rotate-[-90deg] w-full h-full">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />

              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="#6366f1"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: dash }}
                transition={{ duration: 1 }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">{finalPercent}%</p>
              <p className="text-sm text-gray-500">Skor</p>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 p-4 rounded-xl space-y-1">
            <CheckCircle className="mx-auto text-green-600" />
            <p className="text-xl font-bold">{correctCount}</p>
            <p className="text-sm text-gray-500">Benar</p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl space-y-1">
            <XCircle className="mx-auto text-red-600" />
            <p className="text-xl font-bold">{wrongCount}</p>
            <p className="text-sm text-gray-500">Salah</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl space-y-1">
            <MinusCircle className="mx-auto text-yellow-600" />
            <p className="text-xl font-bold">{unansweredCount}</p>
            <p className="text-sm text-gray-500">Tidak Dijawab</p>
          </div>
        </div>

        {/* DETAIL */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          <h3 className="text-lg font-semibold">Review Jawaban</h3>

          {detail.map((item, i) => {
            const isCorrect = item.user === item.correct;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border ${
                  isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <p
                  className="font-semibold mb-2"
                  dangerouslySetInnerHTML={{
                    __html: `${i + 1}. ${item.question}`,
                  }}
                />

                <p className="text-sm">
                  Jawaban kamu:{" "}
                  <span
                    className={
                      isCorrect ? "text-green-600" : "text-red-600"
                    }
                    dangerouslySetInnerHTML={{ __html: item.user }}
                  />
                </p>

                {!isCorrect && (
                  <p
                    className="text-sm text-green-600"
                    dangerouslySetInnerHTML={{
                      __html: `Jawaban benar: ${item.correct}`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4">
          <button
            onClick={playAgain}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            <RotateCcw size={16} /> Main Lagi
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

      </motion.div>
    </div>
  );
};

export default Result;
