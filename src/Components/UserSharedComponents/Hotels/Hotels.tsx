import { Box, Typography, Skeleton } from "@mui/material";
import Slider from "react-slick";
import img1 from "../../../assets/images/pic.png";
import img2 from "../../../assets/images/pic1.png";
import img3 from "../../../assets/images/pic2.png";
import img4 from "../../../assets/images/pic4.jpg";
import img5 from "../../../assets/images/pic5.jpg";
import img6 from "../../../assets/images/pic6.jpg";
import CardItem from "../CardItem/CardItem";
import React from "react";

const imageData = [
  {
    img: img1,
    title: "Green Park",
    location: "Tangerang, Indonesia",
    label: "Popular Choice",
  },
  {
    img: img2,
    title: "Sunset Resort",
    location: "Bali, Indonesia",
  },
  {
    img: img3,
    title: "Mountain View",
    location: "Bandung, Indonesia",
    label: "Popular Choice",
  },
  {
    img: img4,
    title: "Mountain View",
    location: "Bandung, Indonesia",
    label: "Popular Choice",
  },
  {
    img: img5,
    title: "Sunset Resort",
    location: "Bali, Indonesia",
  },
  {
    img: img6,
    title: "Sunset Resort",
    location: "Bali, Indonesia",
  },
];

export default function Hotels() {
  const [loading, setLoading] = React.useState<boolean>(true);

  // Simulate data fetching
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1700); // Simulate a loading delay of 2 seconds

    return () => clearTimeout(timer);
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
          Hotels with large living rooms
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
            {imageData.map((item, index) => (
              <CardItem
                key={index}
                img={item.img}
                title={item.title}
                location={item.location}
                label={item.label}
              />
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
}
