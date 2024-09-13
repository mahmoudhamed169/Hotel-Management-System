import { Outlet } from "react-router-dom";
import AuthPageTitle from "../../Utils/AuthPageTitle";
import MainTitle from "../../Components/SharedComponents/MainTitle/MainTitle";
import { Box, Grid, Grid2 } from "@mui/material";
import AuthBackGround from "../../Components/SharedComponents/AuthBackGround/AuthBackGround";

export default function AuthLayout() {
  AuthPageTitle();
  return (
    <>
      <Grid2 container spacing={3} sx={{ height: { xs: "auto", md: "100vh" } }}>
        <Grid2 item size={{ md: 6, sm: 10, xs: 12 }}>
          <Box className="mt-5 ms-8">
            <MainTitle />
          </Box>
          <Box className="mt-20 w-4/5 mx-auto md:ps-6">
            <Outlet />
          </Box>
        </Grid2>
        <Grid2 item size={{ md: 6, sm: 10, xs: 12 }}>
          <AuthBackGround />
        </Grid2>
      </Grid2>
    </>
  );
}
