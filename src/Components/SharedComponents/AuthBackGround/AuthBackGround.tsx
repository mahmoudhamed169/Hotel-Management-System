import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import background1 from "../../../assets/images/bg1.png";
import background2 from "../../../assets/images/bg2.png";
import background3 from "../../../assets/images/bg3.png";
import IMAGES from "../../../assets/images/images";

export default function AuthBackground() {
  const { pathname } = useLocation();

  let backgroundImage;
  let sectionTitle;
  const sectionDesc = "Homes as unique as you.";

  switch (pathname) {
    case "/auth/login":
    case "/auth":
      backgroundImage = background1;
      sectionTitle = "Sign in to Roamhome";
      break;
    case "/auth/register":
      backgroundImage = IMAGES.registerBackground;
      sectionTitle = "Sign up to Roamhome";
      break;
    case "/auth/forget-password":
      backgroundImage = IMAGES.forgetResetBackground;
      sectionTitle = "Forgot password";
      break;
    case "/auth/reset-password":
      backgroundImage = IMAGES.forgetResetBackground;
      sectionTitle = "Reset password";
      break;
    default:
      backgroundImage = IMAGES.loginBackground;
      sectionTitle = "Sign in to Roamhome";
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "start",
        height: "calc(100% - 42px)",
        width: "calc(100% - 42px)",
        margin: "21px",
        position: "relative",
        overflow: "hidden",
        color: "white",
        borderRadius: "1rem",
      }}>
      <img
        src={backgroundImage}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: -1,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 0,
        }}></Box>
      <Box
        sx={{
          p: { xs: 2, sm: 4, lg: 9 },
          ml: { xs: 1, sm: 3, lg: 4 },
          zIndex: 2,
        }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {sectionTitle}
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.9 }}>{sectionDesc}</Typography>
      </Box>
    </Box>
  );
}
