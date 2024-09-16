import { Box, Grid2, IconButton } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthBackGround from "../../Components/SharedComponents/AuthBackGround/AuthBackGround";
import MainTitle from "../../Components/SharedComponents/MainTitle/MainTitle";
import AuthPageTitle from "../../Utils/AuthPageTitle";

import MainLoading from "../../Components/SharedComponents/MainLoading/MainLoading";
import { useLoading } from "../../Context/LoadingContext/LoadingContext";
import { useAppTheme } from "../../Context/ThemeContext/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function AuthLayout() {
  const { loading, setLoading } = useLoading();
  const { mode, toggleTheme } = useAppTheme();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setLoading(true);
    };
  }, [setLoading]);
  AuthPageTitle();

  if (loading) {
    return <MainLoading />;
  }
  return (
    <>
      <Grid2 container spacing={3} sx={{ height: { xs: "auto", md: "100vh" } }}>
        <Grid2 item size={{ md: 6, sm: 10, xs: 12 }}>
          <Box
            className="mt-5 ms-8"
            sx={{
              marginTop: "1.25rem",
              marginLeft: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <MainTitle />
            <IconButton onClick={toggleTheme} sx={{ color: "#0d80d8" }}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>
          <Box
            className="mt-20 w-4/5 mx-auto md:ps-6"
            sx={{
              mt: "5rem",
              width: "80%",
              mx: "auto",
              px: { md: 6 },
            }}
          >
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
