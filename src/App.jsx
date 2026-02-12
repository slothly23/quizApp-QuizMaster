import { Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import { hasResult, loadUser } from "./utils/Storage";

function App() {
  return (
    <Routes>
      {/* halaman awal → cek login */}
      <Route path="/" element={<Index />} />

      {/* bebas diakses */}
      <Route path="/login" element={<Login />} />

      {/* 
        QUIZ hanya boleh diakses kalau:
        user sudah login
      */}
      <Route
        path="/quiz"
        element={
          <ProtectedRoute isAllowed={!!loadUser()}>
            <Quiz />
          </ProtectedRoute>
        }
      />

      {/* 
        RESULT hanya boleh diakses kalau:
        sudah ada hasil quiz
      */}
      <Route
        path="/result"
        element={
          <ProtectedRoute isAllowed={hasResult()} redirect="/quiz">
            <Result />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
