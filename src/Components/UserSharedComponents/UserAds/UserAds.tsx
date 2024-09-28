import { Box, Typography, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { apiClient } from "../../../Api/END_POINTS";
import CardItem from "../CardItem/CardItem";

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images: string[];
}

interface IAds {
  _id: string;
  isActive: boolean;
  room: Room;
}

export default function UserAds() {
  const [ads, setAds] = React.useState<IAds[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const getAllAds = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/portal/ads", {});
      setAds(response.data.data.ads);
    } catch (err) {
      setError("Failed to load ads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAds();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "85%", margin: "auto", padding: "20px 0" }}>
      {loading ? (
        <Skeleton
          variant="text"
          width="200px"
          height="40px"
          sx={{ marginLeft: "0.5rem" }}
        />
      ) : (
        <Typography
          variant="body1"
          component="h2"
          sx={{
            fontWeight: "500",
            fontSize: "1.5rem",
            marginBottom: "20px",
            color: "#152C5B",
          }}
        >
          Ads
        </Typography>
      )}

      <Box className="slider-container">
        {loading ? (
          <Slider {...settings}>
            {Array.from(new Array(4)).map((_, index) => (
              <Box key={index} sx={{ padding: "0 10px" }}>
                <Skeleton
                  variant="rectangular"
                  width="263px"
                  height="180px"
                  animation="wave"
                />
                <Skeleton variant="text" width="50px" animation="wave" />
                <Skeleton variant="text" width="70px" animation="wave" />
              </Box>
            ))}
          </Slider>
        ) : (
          <Slider {...settings}>
            {ads.map((ad, index) => (
              <CardItem
                key={index}
                img={ad.room.images[0]}
                title={ad.room.roomNumber}
                location={`${ad.room.price}$ per day`}
                label={ad.isActive ? "Active" : "Inactive"}
              />
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
}
