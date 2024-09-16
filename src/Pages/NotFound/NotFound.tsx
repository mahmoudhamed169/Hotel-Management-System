import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";
import { ArrowBack, Home } from "@mui/icons-material";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Grid container spacing={3} sx={{ height: { xs: "auto", md: "100vh" } }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ mt: 5, ml: { xs: 2, md: 8 } }}>
          <Typography variant="h6" color="primary">
            404 Error
          </Typography>
          <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
            Page not found
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Sorry, the page you are looking for doesn't exist. Here are some
            helpful links:
          </Typography>

          <Box
            sx={{
              mt: 5,
            }}
          >
            <Button
              onClick={handleGoBack}
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{
                textTransform: "none",
                borderColor: "divider",
                color: "text.primary",
                mr: 2,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              Go back
            </Button>
            <Button
              onClick={handleGoHome}
              variant="contained"
              color="primary"
              startIcon={<Home />}
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Take me home
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{ position: "relative", height: "100%", overflow: "hidden" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "start",
            height: "calc(100% - 42px)",
            width: "calc(100% - 42px)",
            margin: "24px",
            position: "relative",
            overflow: "hidden",
            color: "white",
            borderRadius: "1rem",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
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
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 0,
            }}
          ></Box>
          <Box
            sx={{
              p: { xs: 2, sm: 4, lg: 9 },
              ml: { xs: 1, sm: 3, lg: 4 },
              zIndex: 1,
              position: "relative",
              color: "white",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Page not found
            </Typography>
            <Typography sx={{ mt: 1, opacity: 0.9 }}>
              Sorry, the page you are looking for doesn't exist.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
