import { Box, Grid, Typography } from "@mui/material";
import facilityIcon1 from "../../../assets/images/facility1.png";
import facilityIcon2 from "../../../assets/images/facility2.png";
import facilityIcon3 from "../../../assets/images/facility3.png";
import facilityIcon4 from "../../../assets/images/facility4.png";
import facilityIcon5 from "../../../assets/images/facility5.png";
import facilityIcon6 from "../../../assets/images/facility6.png";
import facilityIcon7 from "../../../assets/images/facility7.png";
import facilityIcon8 from "../../../assets/images/facility8.png";

export default function UserRoomFacilities() {
  const facilities = [
    { icon: facilityIcon1, number: "5", name: "Bedrooms" },
    { icon: facilityIcon2, number: "1", name: "Living Room" },
    { icon: facilityIcon3, number: "3", name: "Bathrooms" },
    { icon: facilityIcon4, number: "1", name: "Dining Room" },
    { icon: facilityIcon5, number: "10", name: "Mbps WiFi" },
    { icon: facilityIcon6, number: "7", name: "Units Ready" },
    { icon: facilityIcon7, number: "2", name: "Refrigerators" },
    { icon: facilityIcon8, number: "4", name: "Televisions" },
  ];

  return (
    <Box sx={{ marginTop: "2rem" }}>
      <Grid container spacing={2}>
        {facilities.map((facility, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                borderRadius: "8px",
                width: "100%",
              }}
            >
              <img
                src={facility.icon}
                alt={facility.name}
                style={{ width: "40px", height: "40px" }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  marginTop: "0.5rem",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginRight: "0.5rem" }}
                >
                  {facility.number}
                </Typography>
                <Typography variant="body1" sx={{ color: "#757575" }}>
                  {facility.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
