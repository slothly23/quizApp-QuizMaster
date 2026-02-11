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