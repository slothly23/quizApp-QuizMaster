/*
  Semua urusan localStorage dikumpulkan di sini
  supaya tidak berantakan di banyak file
*/

// ================================
// SIMPAN DATA USER
// ================================

const USER_KEY = "quiz_user";

export function saveUser(name) {
  localStorage.setItem(USER_KEY, name);
}

export function loadUser() {
  return localStorage.getItem(USER_KEY);
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}

// ================================
// SIMPAN HASIL QUIZ
// ================================

const RESULT_KEY = "quiz_result";

export function saveResult(result) {
  localStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export function loadResult() {
  const data = localStorage.getItem(RESULT_KEY);
  return data ? JSON.parse(data) : null;
}


// ================================
// DETAIL JAWABAN
// ================================
const QUIZ_KEY = "quiz_detail";

export function saveQuizDetail(data) {
  localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
}

export function loadQuizDetail() {
  const d = localStorage.getItem(QUIZ_KEY);
  return d ? JSON.parse(d) : null;
}

export function clearQuizDetail() {
  localStorage.removeItem(QUIZ_KEY);
}


// helper boolean
export function hasResult() {
  return !!localStorage.getItem(RESULT_KEY);
}