import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import background1 from "../../../assets/images/bg1.png";
import background2 from "../../../assets/images/bg2.png";
import background3 from "../../../assets/images/bg3.png";

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
      backgroundImage = background2;
      sectionTitle = "Sign up to Roamhome";
      break;
    case "/auth/forget-password":
      backgroundImage = background3;
      sectionTitle = "Forgot password";
      break;
    case "/auth/reset-password":
      backgroundImage = background3;
      sectionTitle = "Reset password";
      break;
    default:
      backgroundImage = background1;
      sectionTitle = "Sign in to Roamhome";
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "start",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        color: "white",
        borderRadius: "1rem",
      }}
    >
      <img
        className="py-2 px-3 "
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
          p: { xs: 2, sm: 4, lg: 9 },
          ml: { xs: 1, sm: 3, lg: 4 },
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {sectionTitle}
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.9 }}>{sectionDesc}</Typography>
      </Box>
    </Box>
  );
}
