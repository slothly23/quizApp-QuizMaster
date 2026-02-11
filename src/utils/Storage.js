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