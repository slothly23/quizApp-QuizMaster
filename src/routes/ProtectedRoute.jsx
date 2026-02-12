/*
  children  -> halaman yang mau dilindungi
  isAllowed -> syarat boleh masuk (true/false)
  redirect  -> kalau gagal -> lempar kemana
*/
const ProtectedRoute = ({ children, isAllowed, redirect = "/login" }) => {
  // kalau syarat gagal -> redirect
  if (!isAllowed) {
    return <Navigate to={redirect} replace />;
  }

  // kalau lolos -> render halaman
  return children;
};

export default ProtectedRoute;