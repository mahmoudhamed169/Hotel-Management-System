import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import img from "../../../assets/images/picture.png";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <Box
      sx={{
        position: "absolute",
        top: "70%",
        left: "52%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <ArrowForwardRoundedIcon
        sx={{
          color: "#203FC7",
          width: "45px",
          height: "45px",
          padding: "0.3rem",
          border: "3px solid #203FC7",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <Box
      sx={{
        position: "absolute",
        top: "70%",
        left: "45%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <ArrowBackRoundedIcon
        sx={{
          color: "#203FC7",
          width: "45px",
          height: "45px",
          padding: "0.3rem",
          border: "3px solid #203FC7",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
}

export default function HappyFamily() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
      img: img,
      title: "Wonderful Experience",
      rating: 4.5,
      description:
        "This was an unforgettable experience with my family, truly a lifetime memory...",
      author: "Sarah, Marketing Manager",
    },
    {
      img: img,
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
      }}
    >
      <Slider {...settings}>
        {slidesData.map((slide, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                paddingBlock: { xs: "1rem", sm: "2rem", md: "3rem" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "45%" },
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                  marginBottom: { xs: "1rem", md: 0 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "80%", sm: "360px" },
                    height: { xs: "auto", sm: "490px" },
                    border: "2px solid #E5E5E5",
                    borderRadius: "15px",
                    position: "relative",
                  }}
                >
                  <img
                    src={slide.img}
                    alt={slide.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      position: "absolute",
                      top: "40px",
                      left: "40px",
                      borderRadius: "20px 20px 105px 20px",
                    }}
                  />
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
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      marginBlock: "1rem",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Rating
                    name="half-rating"
                    defaultValue={slide.rating}
                    precision={0.5}
                    readOnly
                    sx={{ textAlign: { xs: "center", md: "left" } }}
                  />
                  <Typography
                    variant="h3"
                    component={"h3"}
                    sx={{
                      color: "#152C5B",
                      fontWeight: "400",
                      fontSize: { xs: "1.5rem", sm: "2rem" },
                      lineHeight: "48px",
                      marginBlock: "1rem",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    {slide.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    component={"p"}
                    sx={{
                      color: "#B0B0B0",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
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
