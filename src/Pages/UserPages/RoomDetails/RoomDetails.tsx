import { useLocation } from "react-router-dom";
import BasicBreadcrumbs from "../../../Components/UserSharedComponents/BasicBreadcrumbs/BasicBreadcrumbs";
import { Box, Typography, Grid } from "@mui/material";
import pic1 from "../../../assets/images/pic.png";
import pic2 from "../../../assets/images/pic1.png";
import pic3 from "../../../assets/images/pic2.png";
import pic4 from "../../../assets/images/pic3.png";
import UserRoomFacilities from "../../../Components/UserSharedComponents/UserRoomFacilities/UserRoomFacilities";
import RoomDescription from "../../../Components/UserSharedComponents/RoomDescription/RoomDescription";
import BookingForm from "../../../Components/UserSharedComponents/BookingForm/BookingForm";
import RatingComponent from "./Rating";
import Comment from "./Comment";
import { useState } from "react";

export default function RoomDetails() {
  const location = useLocation();
  const room = location.state || {};
  console.log(room);
  const { roomNumber, images = [] } = room;
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const staticImages = [pic1, pic2, pic3, pic4];

  const displayedImages = images.length > 0 ? images : staticImages;

  return (
    <Box sx={{ width: "80%", margin: "auto", paddingTop: "2rem" }}>
      <Box>
        {/* tiltes  */}
        <Box>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={3}>
              <BasicBreadcrumbs current="Room Details" />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
              <Typography
                variant="h5"
                component={"h2"}
                sx={{
                  fontWeight: "600",
                  fontSize: "2.1rem",
                  lineHeight: "0.5rem",
                  color: "#152C5B",
                  marginBlock: { xs: "0.5rem", sm: "1rem" },
                }}>
                {roomNumber}
              </Typography>
              <Typography
                variant="body1"
                component={"p"}
                sx={{
                  color: "#B0B0B0",
                  fontWeight: "300",
                  fontSize: "18px",
                  lineHeight: "2.1rem",
                }}>
                Bogor, Indonesia
              </Typography>
            </Grid>

            <Grid item xs={false} sm={3}></Grid>
          </Grid>
        </Box>

        {/* imgs */}
        <Box sx={{ marginTop: "2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                <img
                  src={displayedImages[0]}
                  alt="First Room Image"
                  style={{
                    width: "100%",
                    minHeight: "500px",
                    objectFit: "cover",
                    borderRadius: "15px 15px",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {displayedImages.slice(1).map((image, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "245px",
                      }}>
                      <img
                        src={image}
                        alt={`Room image ${index + 2}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "15px 15px",
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* desc & booking */}
        <Box sx={{ marginTop: "1.5rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <Box sx={{ marginTop: { xs: "0rem", sm: "1.5rem" } }}>
                <RoomDescription />
                <UserRoomFacilities />
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box sx={{ marginLeft: { xs: "0.5rem", sm: "3rem" } }}>
                <BookingForm room={room} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* start review and comment box */}
      {token && (
        <Grid container spacing={15}>
          <RatingComponent roomId={room._id} />

          <Comment roomId={room._id} />
        </Grid>
      )}

      {/* end review and comment box */}
    </Box>
  );
}
