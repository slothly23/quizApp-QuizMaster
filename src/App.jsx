import { Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import RequireAuth from "./routes/RequireAuth";
import RequireResult from "./routes/RequireResult";
import RedirectIfAuth from "./routes/RedirectIfAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />

      {/* LOGIN → kalau sudah login, redirect ke quiz */}
      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />

      {/* QUIZ → harus login */}
      <Route
        path="/quiz"
        element={
          <RequireAuth>
            <Quiz />
          </RequireAuth>
        }
      />

      {/* RESULT → harus login + punya result */}
      <Route
        path="/result"
        element={
          <RequireAuth>
            <RequireResult>
              <Result />
            </RequireResult>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
