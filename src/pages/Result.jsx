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
    <div>
      <h1>Hasil Quiz 🎉</h1>

      {/* Score */}
      <h2>
        Score: {result.score} / {result.total}
      </h2>

      <h3>🎯 Nilai Akhir: {finalPercent}%</h3>

      {/* STATISTIK */}

      <h3>📊 Ringkasan</h3>

      <p>✅ Benar: {correctCount}</p>
      <p>❌ Salah: {wrongCount}</p>
      <p>⏳ Tidak dijawab: {unansweredCount}</p>

      <hr />

      {/* REVIEW DETAIL */}
      <h3>Review Jawaban</h3>

      {detail.map((item, i) => {
        const correct = item.user === item.correct;

        return (
          <div key={i}>
            <p>
              <b>
                {i + 1}. {item.question}
              </b>
            </p>

            <p>Jawaban kamu: {item.user}</p>
            <p>Jawaban benar: {item.correct}</p>

            <p>{correct ? "✅ Benar" : "❌ Salah"}</p>

            <hr />
          </div>
        );
      })}

      <button onClick={() => navigate("/quiz")}>Main Lagi</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Result;
