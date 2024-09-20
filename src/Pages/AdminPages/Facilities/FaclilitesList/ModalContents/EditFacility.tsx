import { Box, TextField, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ADMIN_URLS, apiClient } from "../../../../../Api/END_POINTS";
import ButtonForm from "../../../../../Components/SharedComponents/ButtonForm/ButtonForm";

export default function EditFacility({
  selectedFac,
  handleClose,
  getAllFacilities,
}: {
  selectedFac: { _id: string; name: string };
  handleClose: (value: string) => void;
  getAllFacilities: () => void;
}) {
  console.log(selectedFac);
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data: {
    name: string;
  }) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.put(
        `${ADMIN_URLS.facilities}/${selectedFac._id}`,
        data
      );
      console.log(response);
      toast.success("Editiong Successfully", {
        id: toastId,
      });
      handleClose("EditModal");
      getAllFacilities();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          sx={{ fontSize: "25px", paddingBottom: "50px", fontWeight: "700" }}
          id="modal-modal-title"
          variant="h6"
          component="h2">
          Edit Facility
        </Typography>
        <TextField
          defaultValue={selectedFac.name}
          error={errors.facilityName}
          helperText={errors.facilityName?.message}
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
