import { Navigate } from "react-router-dom";
import { loadUser } from "../utils/Storage";

const RequireAuth = ({ children }) => {
  const user = loadUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;