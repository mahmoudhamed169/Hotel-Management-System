import Calendar from "../../../Components/UserSharedComponents/Calendar/CalenderBooking";

import Footer from "../navbar&&footer/Footer";
import NavBarFooter from "../navbar&&footer/NavBarFooter";

import Hotels from "../../../Components/UserSharedComponents/Hotels/Hotels";
import Houses from "../../../Components/UserSharedComponents/Houses/Houses";
import UserAds from "../../../Components/UserSharedComponents/UserAds/UserAds";
import MostPopularAds from "../../../Components/UserSharedComponents/MostPopularAds/MostPopularAds";
import { Box } from "@mui/material";

export default function Landing() {
  return (
    <Box>
      <NavBarFooter />
      <Calendar />
      <MostPopularAds />
      <Houses />
      <Hotels />
      <UserAds />
      <Footer />
    </Box>
  );
}
