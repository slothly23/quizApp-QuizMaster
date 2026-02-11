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
    <div>
      <h1>Login Page</h1>

      <input
        placeholder="Nama kamu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  )
};

export default Login;
