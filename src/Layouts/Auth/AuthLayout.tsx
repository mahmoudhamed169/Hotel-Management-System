import { Outlet } from "react-router-dom";
import AuthPageTitle from "../../Utils/AuthPageTitle";
import MainTitle from "../../Components/SharedComponents/MainTitle/MainTitle";
import { Box, Grid } from "@mui/material";
import AuthBackGround from "../../Components/SharedComponents/AuthBackGround/AuthBackGround";

export default function AuthLayout() {
  AuthPageTitle();
  return (
    <>
      <Grid container spacing={2} className=" h-screen">
        <Grid item md={6} sm={12}>
          <Box className="mt-5 ms-8">
            <MainTitle />
          </Box>
          <Box className="mt-20 ms-28">
            <Outlet />
          </Box>
        </Grid>
        <Grid item md={6} sm={12}>
          <AuthBackGround />
        </Grid>
      </Grid>
    </>
  );
}
