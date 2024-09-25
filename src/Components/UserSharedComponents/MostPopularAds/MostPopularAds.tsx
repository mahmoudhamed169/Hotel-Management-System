import { Box, Grid2 as Grid, Paper, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import "./imageBox.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MostPopularAds() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "black",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",

    color: "white",
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  interface AdsType {
    room: { _id: string; roomNumber: string; images: string[] };
  }

  interface ResponseType {
    data: {
      ads: AdsType[];
    };
  }
  const [ads, setAds] = useState<AdsType[]>([]);
  const getAds = async () => {
    try {
      const response = await apiClient.get<ResponseType>(PORTAL_URLS.ads, {
        params: { page: 1, size: 5 },
      });
      console.log(response.data.data.ads);
      setAds(response.data.data.ads);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAds();
  }, []);
  return (
    <Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
      <Typography
        variant="body1"
        component="h2"
        sx={{
          fontWeight: "500",
          fontSize: "1.5rem",
          marginBottom: "20px",
          color: "#152C5B",
        }}>
        Most popular ads
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, lg: 4 }}>
            {/* <Item sx={{ height: "100% !important" }}>size=8/24</Item> */}
            <Box
              className="image-box"
              sx={{
                maxHeight: "100%",
                height: "100%",
              }}>
              <img className="image" src={ads[0]?.room.images[0]} />
              <Box className="overlay">
                <VisibilityIcon />
                <FavoriteIcon />
              </Box>
            </Box>
          </Grid>
          <Grid container size={{ xs: 12, lg: 8 }}>
            {ads?.slice(1).map((ad) => (
              <Grid size={{ xs: 12, lg: 6 }}>
                <Box className="image-box">
                  <img className="image" src={ad.room.images[0]} />
                  <Box className="overlay">
                    <VisibilityIcon />
                    <FavoriteIcon />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
