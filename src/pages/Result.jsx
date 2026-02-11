import React from "react";
import { useNavigate } from "react-router-dom";
import { loadResult } from "../utils/Storage";

const Result = ({ score, total }) => {
  const navigate = useNavigate();

  const result = loadResult();

  if (!result) {
    return <p>Tidak ada hasil</p>;
  }

  return (
    <div>
      <h1>Hasil Quiz 🎉</h1>

      <p>
        Score kamu: {result.score} / {result.total}
      </p>

      <button onClick={() => navigate("/quiz")}>Main Lagi</button>
    </div>
  );
};

export default Result;