import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MasterPageTitle() {
  const loaction = useLocation();
  useEffect(() => {
    switch (loaction.pathname) {
      case "/dashboard":
        document.title = "Staycation - Dashoard";
        break;
      case "/dashboard/home":
        document.title = "Staycation - Dashoard";
        break;

      case "/dashboard/users":
        document.title = "Staycation - Users Page";
        break;
      case "/dashboard/booking":
        document.title = "Staycation - Booking Page";
        break;
      case "/dashboard/rooms":
        document.title = "Staycation - Rooms Page";
        break;
      case "/dashboard/rooms/add-new":
        document.title = "Staycation - Add Room Page";
        break;
      case "/dashboard/rooms/update/:id":
        document.title = "Staycation - Update Room Page";
        break;
      case "/dashboard/room-facilities":
        document.title = "Staycation - facilities Page";
        break;
      case "/dashboard/room-facilities/add-new-facility":
        document.title = "Staycation - Add Facilities Page";
        break;
      case "/dashboard/room-facilities/update-facility/:id":
        document.title = "Staycation - Update Facilities Page";
        break;
      case "/dashboard/ads":
        document.title = "Staycation - Ads Page";
        break;
      case "/dashboard/ads/add-new-ads":
        document.title = "Staycation - Add Ads Page";
        break;
      case "/dashboard/ads/update-ads/:id":
        document.title = "Staycation - Update Ads Page";
        break;
      default:
        document.title = "Staycation - dashboard ";
    }
  }, [loaction.pathname]);
  return <div>MasterPageTitle</div>;
}
