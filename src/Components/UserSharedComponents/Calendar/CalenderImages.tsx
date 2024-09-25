import { Box } from "@mui/material";
import img1 from "../../../assets/images/home.png";
import img2 from "../../../assets/images/home1.png";
import img3 from "../../../assets/images/home2.png";
import img4 from "../../../assets/images/bg3.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination } from "swiper/modules";

export default function CalendarImages() {
  const imagesData = [img1, img2, img3,img4];
  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-55%, -55%)",
          width: "100%",
          height: "100%",
        }}
      >
        <Swiper
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 1,
          }}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectCube, Pagination]}
          className="mySwiper"
          style={{ height: "100%" }}
        >
          {imagesData.map((img) => (
            <SwiperSlide>
              <img
                src={img}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: "7rem",
                }}
                alt="Slide 1"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
