import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/Storage";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) return alert("Isi nama dulu");

    saveUser(name);

    console.log("Login sukses:", name);

    navigate("/quiz"); // redirect
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome 👋
        </h1>

        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Nama kamu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Mulai Quiz
        </button>
      </div>
    </div>
  );
};

export default Login;
