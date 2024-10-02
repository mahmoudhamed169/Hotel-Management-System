import { Grid, Box, Typography, TextField, Rating } from "@mui/material";
import React, { useState } from "react";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { useForm, SubmitHandler } from "react-hook-form";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  apiClient,
  AUTHENTICATION_URLS,
  PORTAL_URLS,
} from "../../../Api/END_POINTS";

export default function RatingComponent({ roomId, getAllReviews }) {
  const [rating, setRating] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);

  const labels: { [index: string]: string } = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  function getLabelText(rating: number) {
    return `${rating} Star${rating !== 1 ? "s" : ""}, ${labels[rating]}`;
  }
  const onSubmit: SubmitHandler = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post(PORTAL_URLS.addReview, {
        ...data,
        roomId,
      });
      reset();
      toast.success(response.data.message, {
        id: toastId,
      });
      getAllReviews();
    } catch (error) {
      reset();
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
    console.log(data);
  };
  return (
    <Grid
      item
      xs={12}
      md={6}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body1" component="span">
          Rate
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Rating
            name="hover-feedback"
            value={rating}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setRating(newValue);
              setValue("rating", newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarBorderIcon
                sx={{ opacity: 0.9, color: "#9f9f9f !important" }}
                fontSize="inherit"
              />
            }
          />

          {rating !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
          )}
        </Box>
        <Typography sx={{ margin: "23px 0" }}>Review</Typography>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          error={errors.review}
          helperText={errors.review ? errors.review.message : ""}
          maxRows={10}
          sx={{
            "& .MuiOutlinedInput-root": {
              minHeight: "100px",
            },
            "& .MuiInputBase-inputMultiline": {
              minHeight: "100px",
            },
            marginTop: "5px",
          }}
          {...register("review", {
            required: "review is not allowed to be empty",
          })}
        />
        <Box sx={{ width: "210px", marginTop: "23px" }}>
          <ButtonForm name="Rate" isSubmitting={isSubmitting} />
        </Box>
      </Box>
    </Grid>
  );
}
