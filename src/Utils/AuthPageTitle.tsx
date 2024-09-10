import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AuthPageTitle() {
  const loaction = useLocation();
  useEffect(() => {
    switch (loaction.pathname) {
      case "/auth":
        document.title = "Staycation - Login Page";
        break;
      case "/auth/login":
        document.title = "Staycation - Login Page";
        break;
      case "/auth/register":
        document.title = "Staycation - Register Page";
        break;
      case "/auth/forget-password":
        document.title = "Staycation - Forget Password Page";
        break;
      case "/auth/reset-password":
        document.title = "Staycation - Reset Password Page";
        break;
      default:
        document.title = "Staycation ";
    }
  }, [loaction.pathname]);
  return <div>AuthPageTitle</div>;
}
