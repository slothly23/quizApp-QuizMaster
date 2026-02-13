/*
  =========================================
  STORAGE UTILS
  Semua urusan localStorage dikumpulkan di sini
  supaya:
  - tidak duplikasi kode
  - lebih rapi
  - mudah maintain
  - aman dari error JSON.parse(undefined)
  =========================================
*/


// =========================================
// HELPER: SAFE PARSE
// =========================================
/*
  Fungsi ini mencegah error:
  JSON.parse(undefined) 

  Cara kerja:
  1. Ambil data dari localStorage
  2. Kalau kosong / "undefined" → return fallback
  3. Kalau JSON rusak → catch → fallback

  Jadi aplikasi TIDAK akan crash
*/
function safeParse(key, fallback) {
  const d = localStorage.getItem(key);

  // kalau belum ada data
  if (!d || d === "undefined") return fallback;

  try {
    return JSON.parse(d);
  } catch {
    return fallback;
  }
}



// =========================================
// USER
// =========================================

const USER_KEY = "quiz_user";

/*
  Simpan nama user
  String biasa → tidak perlu JSON.stringify
*/
export function saveUser(name) {
  localStorage.setItem(USER_KEY, name);
}

/*
  Ambil user
*/
export function loadUser() {
  return localStorage.getItem(USER_KEY);
}

/*
  Hapus user (logout)
*/
export function clearUser() {
  localStorage.removeItem(USER_KEY);
}



// =========================================
// RESULT (score akhir)
// =========================================

const RESULT_KEY = "quiz_result";

/*
  Simpan object result
  contoh:
  { score: 4, total: 5 }
*/
export function saveResult(result) {
  localStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

/*
  Ambil result dengan SAFE parse
  return:
  - object → kalau ada
  - null → kalau belum ada
*/
export function loadResult() {
  return safeParse(RESULT_KEY, null);
}



/*
  Cek apakah user sudah punya result
  Pakai loadResult biar aman
*/
export function hasResult() {
  return loadResult() !== null;
}

/*
  Hapus result sebelum mulai quiz baru
*/
export function clearResult() {
  localStorage.removeItem(RESULT_KEY);
}



// =========================================
// DETAIL JAWABAN (review soal)
// =========================================

const QUIZ_KEY = "quiz_detail";

/*
  Simpan array detail jawaban
  contoh:
  [
    { question, correct, user }
  ]
*/
export function saveQuizDetail(data) {
  localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
}

/*
  Ambil detail jawaban
  return:
  - [] kalau kosong
  - array kalau ada
*/
export function loadQuizDetail() {
  return safeParse(QUIZ_KEY, []);
}

/*
  Hapus detail jawaban
*/
export function clearQuizDetail() {
  localStorage.removeItem(QUIZ_KEY);
}