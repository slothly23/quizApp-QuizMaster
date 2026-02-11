import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUser, loadUser, saveResult } from "../utils/Storage";
import QuestionCard from "../components/QuestionCard";

const Quiz = () => {
  // ================================
  // STATE
  // ================================

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = loadUser();

  const logout = () => {
    clearUser();
    navigate("/login");
  };

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

      // format jawaban + shuffle
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
  // HANDLE JAWABAN
  // ================================

  const handleAnswer = (answer) => {
    const current = questions[index];

    let newScore = score;
    // cek benar atau salah
    if (answer === current.correct_answer) {
      newScore = score + 1;
      setScore(newScore);
    }

    const nextIndex = index + 1;

    // kalau masih ada soal -> lanjut
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
    } else {
      // kalau habis -> selesai
      saveResult({
        score: newScore,
        total: questions.length,
      });

      navigate("/result");
    }
  };

  return (
    <div>
      <h1>Quiz Page</h1>

      <p>
        Soal {index + 1} / {questions.length}
      </p>

      <p>Score: {score}</p>

      <QuestionCard question={questions[index]} onAnswer={handleAnswer} />

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Quiz;
