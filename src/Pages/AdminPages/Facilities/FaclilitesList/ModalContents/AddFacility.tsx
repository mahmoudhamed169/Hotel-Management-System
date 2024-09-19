import { useTheme } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form } from "react-router-dom";
import { ADMIN_URLS, apiClient } from "../../../../../Api/END_POINTS";
import ButtonForm from "../../../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { AxiosError } from "axios";

export default function AddFacility({ handleClose }) {
  const theme = useTheme();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post(ADMIN_URLS.facilities, data);
      console.log(response);
      toast.success("Added Successfully", {
        id: toastId,
      });
      handleClose("AddModal");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  console.log(errors);
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{ fontSize: "25px", paddingBottom: "50px", fontWeight: "700" }}
          id="modal-modal-title"
          variant="h6"
          component="h2">
          Add Facility
        </Typography>
        <TextField
          error={errors.name}
          helperText={errors.name?.message}
          {...register("name", {
            required: "Facility name is required",
          })}
          placeholder={"Please type here"}
          InputProps={{
            sx: {
              "& input": {
                padding: "12px 16px",
              },
            },
          }}
          sx={{
            marginTop: "3px",
            width: "100%",
          }}
        />
        {/* <Button
          type="submit"
          variant="contained"
          sx={{
            background: theme.palette.secondary.main,
            padding: "14px 57px",
            borderRadius: "8px",
            fontWeight: "600",
          }}>
          Save
        </Button> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <Box sx={{ width: "7rem", paddingTop: "50px" }}>
            <ButtonForm name="Save" isSubmitting={isSubmitting} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
