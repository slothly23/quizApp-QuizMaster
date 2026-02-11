import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9&type=multiple",
      );

      const data = await response.json();
      console.log("HASIL API:", data);

      setQuestions(data.results);
    } catch (error) {
      console.error(error);
      setError("Gagal fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>Quiz Page (Test Fetch)</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {questions.map((q, i) => (
          <li key={i}>{q.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;