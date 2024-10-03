import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import img from "../../../assets/images/person1.jpg";
import img1 from "../../../assets/images/person2.jpg";
import img2 from "../../../assets/images/person3.jpg";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function HappyFamily() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const slidesData = [
    {
      img: img,
      title: "Happy Family",
      rating: 3,
      description:
        "What a great trip with my family and I should try again next time soon ...",
      author: "Angga, Product Designer",
    },
    {
      img: img1,
      title: "Wonderful Experience",
      rating: 4.5,
      description:
        "This was an unforgettable experience with my family, truly a lifetime memory...",
      author: "Sarah, Marketing Manager",
    },
    {
      img: img2,
      title: "Amazing Journey",
      rating: 5,
      description:
        "An amazing journey that brought our family closer. We will definitely do this again...",
      author: "Michael, Software Engineer",
    },
  ];

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "90%", md: "80%" },
        margin: "auto",
        paddingBottom: "4rem",
      }}>
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                paddingBlock: { xs: "1rem", sm: "2rem", md: "3rem" },
                alignItems: "center",
                gap: { xs: "1.5rem", md: "2rem" },
              }}>
              <Box
                sx={{
                  width: { xs: "100%", md: "45%" },
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                  marginBottom: { xs: "1rem", md: 0 },
                  height: "600px",
                }}>
                <Box
                  sx={{
                    width: { xs: "80%", sm: "360px" },
                    maxWidth: "100%",

                    border: "2px solid #E5E5E5",
                    borderRadius: "15px",

                    position: "relative",
                    height: "500px",
                  }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                      position: "absolute",
                      right: "-40px",
                      top: "40px",
                      maxHeight: "600px",
                      minHeight: "100%",
                    }}>
                    <img
                      src={slide.img}
                      alt={slide.title}
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "20px 20px 105px 20px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ marginTop: { xs: "1rem", md: "4rem" } }}>
                <Box sx={{ width: { xs: "100%", md: "79%" }, margin: "auto" }}>
                  <Typography
                    variant="h5"
                    component={"h3"}
                    sx={{
                      color: "#152C5B",
                      fontWeight: "600",
                      fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                      marginBlock: "1rem",
                      textAlign: { xs: "center", md: "left" },
                    }}>
                    {slide.title}
                  </Typography>
                  <Rating
                    name="half-rating"
                    defaultValue={slide.rating}
                    precision={0.5}
                    readOnly
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      justifyContent: { xs: "center", md: "start" },
                    }}
                  />
                  <Typography
                    variant="h6"
                    component={"p"}
                    sx={{
                      color: "#152C5B",
                      fontWeight: "400",
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                      lineHeight: "1.5",
                      marginBlock: "1rem",
                      textAlign: { xs: "center", md: "left" },
                    }}>
                    {slide.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    component={"p"}
                    sx={{
                      color: "#B0B0B0",
                      textAlign: { xs: "center", md: "left" },
                    }}>
                    {slide.author}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
