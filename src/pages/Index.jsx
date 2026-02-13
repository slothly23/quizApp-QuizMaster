import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadUser, hasResult } from "../utils/Storage";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = loadUser();

    if (!user) {
      navigate("/login");
      return;
    }

    // kalau sudah punya hasil → ke result
    if (hasResult()) {
      navigate("/result");
    } else {
      navigate("/quiz");
    }
  }, []);

  return null;
};

export default Index;