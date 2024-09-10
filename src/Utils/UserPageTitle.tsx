import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function UserPageTitle() {
  const loaction = useLocation();
  useEffect(() => {
    switch (loaction.pathname) {
      case "/":
        document.title = "Staycation - Home Page";
        break;
      case "/home":
        document.title = "Staycation - Home Page";
        break;
      case "/explore":
        document.title = "Staycation - explore Page";
        break;
      case "/favorite-rooms":
        document.title = "Staycation - Favorite Rooms Page";
        break;
      case "/room-details":
        document.title = "Staycation - Room Details Page";
        break;
      case "/stripePayment":
        document.title = "Staycation - Room Details Page";
        break;
      default:
        document.title = "Staycation - Home Page ";
    }
  }, [loaction.pathname]);
  return <div>UserPageTitle</div>;
}
