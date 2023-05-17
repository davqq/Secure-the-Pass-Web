import { useNavigate } from "react-router-dom";

const logout = () => {
  const navigate = useNavigate();
  document.cookie = "";
  navigate("/login");
  return null;
};

export default logout;
