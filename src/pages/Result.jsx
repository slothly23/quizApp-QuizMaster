import React from "react";
import { useNavigate } from "react-router-dom";
import {
  clearQuizDetail,
  clearUser,
  loadQuizDetail,
  loadResult,
} from "../utils/Storage";

const Result = () => {
  const navigate = useNavigate();

  // ambil hasil + detail dari local storage
  const result = loadResult();
  const detail = loadQuizDetail();

  const logout = () => {
    clearUser();
    clearQuizDetail();
    navigate("/login");
  };

  // ================================
  // HITUNG STATISTIK
  // ================================

  // jumlah benar
  const correctCount = detail.filter((d) => d.user === d.correct).length;

  // jumlah salah
  const wrongCount = detail.filter((d) => d.user !== d.correct).length;

  // tidak dijawab (timer habis / belum sampai)
  const unansweredCount = result.total - detail.length;

  // ================================
  // Nilai akhir dalam persen
  // ================================
  const finalPercent = result.total
    ? ((result.score / result.total) * 100).toFixed(1)
    : 0;

  if (!result || !detail) return <p>Tidak ada hasil</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-8 space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Hasil Quiz 🎉</h1>

          <p className="text-lg font-semibold">
            {result.score} / {result.total}
          </p>

          <p className="text-indigo-600 font-medium">
            Nilai Akhir: {finalPercent}%
          </p>
        </div>

        {/* RINGKASAN */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-100 p-4 rounded-xl">
            <p className="text-2xl font-bold text-green-600">{correctCount}</p>
            <p className="text-sm text-gray-600">Benar</p>
          </div>

          <div className="bg-red-100 p-4 rounded-xl">
            <p className="text-2xl font-bold text-red-600">{wrongCount}</p>
            <p className="text-sm text-gray-600">Salah</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl">
            <p className="text-2xl font-bold text-yellow-600">
              {unansweredCount}
            </p>
            <p className="text-sm text-gray-600">Tidak Dijawab</p>
          </div>
        </div>

        {/* DETAIL SECTION */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          <h3 className="text-xl font-semibold text-gray-800">
            Review Jawaban
          </h3>

          {detail.map((item, i) => {
            const isCorrect = item.user === item.correct;

            return (
              <div
                key={i}
                className={`p-5 rounded-xl border ${
                  isCorrect
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                {/* Question */}
                <p
                  className="font-semibold text-gray-800 mb-3"
                  dangerouslySetInnerHTML={{
                    __html: `${i + 1}. ${item.question}`,
                  }}
                />

                {/* User Answer */}
                <p className="text-sm">
                  <span className="font-medium">Jawaban kamu:</span>{" "}
                  <span
                    className={
                      isCorrect
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                    dangerouslySetInnerHTML={{ __html: item.user }}
                  />
                </p>

                {/* Correct Answer */}
                {!isCorrect && (
                  <p className="text-sm mt-1">
                    <span className="font-medium">Jawaban benar:</span>{" "}
                    <span
                      className="text-green-600 font-semibold"
                      dangerouslySetInnerHTML={{ __html: item.correct }}
                    />
                  </p>
                )}

                {/* Status */}
                <p className="mt-3 text-sm font-bold">
                  {isCorrect ? "✅ Benar" : "❌ Salah"}
                </p>
              </div>
            );
          })}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Main Lagi
          </button>

          <button
            onClick={logout}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
