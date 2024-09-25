import Calendar from "../../../Components/UserSharedComponents/Calendar/CalenderBooking";
import Hotels from "../../../Components/UserSharedComponents/Hotels/Hotels";
import Houses from "../../../Components/UserSharedComponents/Houses/Houses";
import UserAds from "../../../Components/UserSharedComponents/UserAds/UserAds";

export default function Landing() {
  return (
    <div>
      <Calendar/>
      <Houses />
      <Hotels />
      <UserAds />
    </div>
  );
}
