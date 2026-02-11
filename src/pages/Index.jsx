import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../utils/Storage";

const Index = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const user = loadUser();

    if (user) {
      console.log("User ditemukan:", user);
      navigate("/quiz");
    } else {
      console.log("Belum login");
      navigate("/login");
    }
  }, []);
  
  return (
    <p>Checking login...</p>
  )
}

export default Index