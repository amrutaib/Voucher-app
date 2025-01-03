import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../common/utils";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const getEmail = getCookie("emailData");
  const getPassword = getCookie("passwordData");

  useEffect(() => {
    if (!getEmail && !getPassword) {
      navigate("/login");
    }
  }, [getEmail, getPassword, navigate]);

  return children;
}
