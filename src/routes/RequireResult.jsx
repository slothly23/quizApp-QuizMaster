import { Navigate } from "react-router-dom";
import { hasResult } from "../utils/Storage";

const RequireResult = ({ children }) => {
  if (!hasResult()) {
    return <Navigate to="/quiz" replace />;
  }

  return children;
};

export default RequireResult;