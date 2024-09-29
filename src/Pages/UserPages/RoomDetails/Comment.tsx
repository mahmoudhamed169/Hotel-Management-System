import { Grid, Box, Typography, TextField, Rating } from "@mui/material";
import React, { useState } from "react";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { useForm, SubmitHandler } from "react-hook-form";
import StarIcon from "@mui/icons-material/Star";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  apiClient,
  AUTHENTICATION_URLS,
  PORTAL_URLS,
} from "../../../Api/END_POINTS";

export default function Comment({ roomId }) {
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler = async (data: {
    rating: number;
    review: string;
  }) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post(PORTAL_URLS.addComment, {
        ...data,
        roomId,
      });
      reset();
      toast.success(response.data.message, {
        id: toastId,
      });
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
          Add Your Comment
        </Typography>

        <TextField
          id="outlined-multiline-flexible"
          multiline
          error={errors.comment}
          helperText={errors.comment ? errors.comment.message : ""}
          maxRows={10}
          sx={{
            "& .MuiOutlinedInput-root": {
              minHeight: "100px",
            },
            "& .MuiInputBase-inputMultiline": {
              minHeight: "100px",
            },
            marginTop: "100px",
          }}
          {...register("comment", {
            required: "comment is not allowed to be empty",
          })}
        />
        <Box sx={{ width: "210px", marginTop: "23px" }}>
          <ButtonForm name="Send" isSubmitting={isSubmitting} />
        </Box>
      </Box>
    </Grid>
  );
}
