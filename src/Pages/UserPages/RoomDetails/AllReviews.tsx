import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiClient, PORTAL_URLS } from "../../../Api/END_POINTS";
import { Box, Grid2 as Grid, Rating, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function AllReviews({ reviews }) {
  console.log(reviews);
  console.log(reviews?.user);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {reviews.map((review, index) => (
        <Grid key={index} size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              background: "#f9fafb",
              padding: "17px",
              borderRadius: "20px",
              display: "flex",
            }}
          >
            {" "}
            <Box
              sx={{
                width: "90px",
                height: "90px",
                border: "1px solid #3252DF",
                borderRadius: "9999px",
                overflow: "hidden",
              }}
            >
              <img style={{ width: "100%" }} src={review?.user?.profileImage} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "500", color: "black" }}>
                {review?.review}
              </Typography>
              <Box>
                <Rating
                  name="half-rating-read"
                  defaultValue={review?.rating}
                  precision={0.5}
                  emptyIcon={
                    <StarBorderIcon
                      sx={{ opacity: 0.9, color: "#9f9f9f !important" }}
                    />
                  }
                  readOnly
                />
              </Box>
              <Typography sx={{ fontWeight: "700", color: "red" }}>
                {review?.user.userName}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
