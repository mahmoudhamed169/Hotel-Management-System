import Calendar from "../../../Components/UserSharedComponents/Calendar/CalenderBooking";
import Hotels from "../../../Components/UserSharedComponents/Hotels/Hotels";
import Houses from "../../../Components/UserSharedComponents/Houses/Houses";
import UserAds from "../../../Components/UserSharedComponents/UserAds/UserAds";
import MostPopularAds from "../../../Components/UserSharedComponents/MostPopularAds/MostPopularAds";
import { Box } from "@mui/material";
import HappyFamily from "../../../Components/UserSharedComponents/HappyFamily/HappyFamily";

export default function Landing() {
  return (
    <div>
      <Calendar/>
      <Houses />
      <Hotels />
      <UserAds />
      <HappyFamily />
      <Footer />
    </Box>
  );
}
