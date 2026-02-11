import { Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

function App() {

  return (
    <Routes>
      <Route path="/" element = {<Index />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/quiz" element = {<Quiz />} />
      <Route path="/result" element = {<Result />} />
    </Routes>
  );
}

export default App;