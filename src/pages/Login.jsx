import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/Storage";
import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-10"
      >
        {/* LOGO */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-2xl"
        >
          <Brain size={36} />
        </motion.div>

        <div>
          <h1 className="text-5xl font-bold text-white">QuizMaster</h1>
          <p className="text-gray-300 mt-2">✨ Uji pengetahuanmu sekarang</p>
        </div>

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-96 space-y-5"
        >
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700">
              Nama Kamu
            </label>

            <input
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Masukkan nama..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Mulai Kuis
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
