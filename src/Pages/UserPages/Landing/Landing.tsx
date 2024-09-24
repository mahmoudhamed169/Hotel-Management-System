import Calendar from "../../../Components/UserSharedComponents/Calendar/CalenderBooking";

  import Footer from "../navbar&&footer/Footer";
import NavBarFooter from "../navbar&&footer/NavBarFooter";

import Hotels from "../../../Components/UserSharedComponents/Hotels/Hotels";
import Houses from "../../../Components/UserSharedComponents/Houses/Houses";
import UserAds from "../../../Components/UserSharedComponents/UserAds/UserAds";

export default function Landing() {
  return (
    <div>
  <NavBarFooter/>
      <Calendar/>
      <Houses />
      <Hotels />
      <UserAds />
   <Footer/> 
      
    </div>
  );

}
