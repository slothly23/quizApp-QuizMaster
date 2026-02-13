import { Navigate } from "react-router-dom";
import { loadUser } from "../utils/Storage";

const RedirectIfAuth = ({ children }) => {
  const user = loadUser();

  if (user) {
    return <Navigate to="/quiz" replace />;
  }

  return children;
};

export default RedirectIfAuth;