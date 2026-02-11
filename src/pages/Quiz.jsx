import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUser, loadUser } from "../utils/Storage";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = loadUser();

  const logout = () => {
    clearUser();
    navigate("/login");
  };

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
      <p>Halo {user}</p>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {questions.map((q, i) => (
          <li key={i}>{q.question}</li>
        ))}
      </ul>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Quiz;