import {
  Box,
  Stack,
  MenuItem,
  Chip,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ReduceCapacityOutlinedIcon from "@mui/icons-material/ReduceCapacityOutlined";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { FormTextField } from "../../../../Components/SharedComponents/FormTextField/FormTextField";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { apiClient } from "../../../../Api/END_POINTS";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ButtonForm from "../../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { AxiosError } from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface IFacilities {
  _id: string;
  name: string;
}

export default function RoomsData() {
  const [facilities, setFacilities] = useState<IFacilities[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const location = useLocation();
  const roomData = location.state?.roomData;

  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({});

  const getAllFacilities = async () => {
    try {
      const response = await apiClient.get("/admin/room-facilities", {
        params: { page: 1, size: 10000 },
      });
      setFacilities(response.data.data.facilities);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllFacilities();
    if (isEditing && roomData) {
      const facilityIds = roomData.facilities.map((facility) => facility._id);
      reset({
        roomNumber: roomData.roomNumber,
        price: roomData.price,
        capacity: roomData.capacity,
        discount: roomData.discount,
        facilities: facilityIds,
      });
      setSelectedFacilities(facilityIds);
      setExistingImages(roomData.images);
    }
  }, [roomData, isEditing, reset]);

  const handleFacilitiesChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string[];
    setSelectedFacilities(value);
  };

  const handleChipDelete = (facility: string) => {
    setSelectedFacilities((prevSelected) =>
      prevSelected.filter((f) => f !== facility)
    );
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      setValue("imgs", acceptedFiles, { shouldValidate: true });
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };
  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const formData = new FormData();
      formData.append("roomNumber", data.roomNumber);
      formData.append("price", data.price);
      formData.append("capacity", data.capacity);
      formData.append("discount", data.discount);

      selectedFacilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });

      uploadedFiles.forEach((file) => {
        formData.append("imgs", file);
      });

      let response;

      if (isEditing) {
        response = await apiClient.put(`/admin/rooms/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Room Updated Successfully", { id: toastId });
      } else {
        response = await apiClient.post("/admin/rooms", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Room Added Successfully", { id: toastId });
      }

      reset();
      setUploadedFiles([]);
      navigate("/dashboard/rooms");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "80%", margin: "auto", marginTop: "2.5rem" }}
    >
      <Stack spacing={3}>
        <Box>
          <FormTextField
            label="Room Number"
            errors={errors.roomNumber}
            type="text"
            register={register}
            name="roomNumber"
            icon={<HomeOutlinedIcon />}
            rules={{ required: "Room Number is required" }}
          />
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box flex={1}>
            <FormTextField
              label="Price"
              errors={errors.price}
              type="number"
              name="price"
              register={register}
              icon={<AttachMoneyOutlinedIcon />}
              rules={{ required: "Price is required" }}
            />
          </Box>

          <Box flex={1}>
            <FormTextField
              label="Capacity"
              errors={errors.capacity}
              name="capacity"
              register={register}
              icon={<ReduceCapacityOutlinedIcon />}
              rules={{ required: "Capacity is required" }}
            />
          </Box>
        </Stack>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box flex={1}>
            <FormTextField
              label="Discount"
              errors={errors.discount}
              type="number"
              name="discount"
              register={register}
              icon={<DiscountOutlinedIcon />}
              rules={{ required: "Discount is required" }}
            />
          </Box>

          <Box flex={1}>
            <TextField
              label="Select Facilities"
              color="secondary"
              fullWidth
              select
              SelectProps={{
                multiple: true,
                renderValue: (selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={facilities.find((f) => f._id === value)?.name}
                        onDelete={() => handleChipDelete(value)}
                        clickable={false}
                      />
                    ))}
                  </Box>
                ),
              }}
              {...register("facilities", {
                required: "Facilities are required",
              })}
              value={selectedFacilities}
              onChange={handleFacilitiesChange}
              error={!!errors.facilities}
              helperText={errors.facilities ? errors.facilities.message : null}
            >
              {facilities.map(({ _id, name }: IFacilities) => (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>

        <Box>
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #203fc7",
              padding: "16px",
              textAlign: "center",
              borderRadius: "8px",
              transition: "background-color 0.3s",
              backgroundColor: "#e3f2fd",
              "&:hover": {
                backgroundColor: "#82b1ff",
              },
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Box>
                <CloudUploadIcon
                  sx={{
                    fontSize: "48px",
                    color: "#203fc7",
                    marginBottom: "8px",
                  }}
                />
                <Typography variant="body1">Drop the files here...</Typography>
              </Box>
            ) : (
              <Box>
                <CloudUploadIcon
                  sx={{
                    fontSize: "48px",
                    color: "#203fc7",
                    marginBottom: "8px",
                  }}
                />
                <Typography variant="h6" fontWeight="bold">
                  Drag & Drop or{" "}
                  <Button
                    component="span"
                    sx={{ color: "#203fc7", fontWeight: "bold" }}
                  >
                    Choose Room Images
                  </Button>{" "}
                  to Upload
                </Typography>
              </Box>
            )}
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{ marginTop: 2, flexWrap: "wrap" }}
          >
            {uploadedFiles.map((file) => (
              <Box key={file.name} sx={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <IconButton
                  onClick={() => handleRemoveFile(file.name)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}

            {existingImages.map((img, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={img}
                  alt={`Existing ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <IconButton
                  onClick={() => handleRemoveExistingImage(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "170px",
              color: "#203FC7",
              border: "1px solid #203FC7",
              textTransform: "none",
              fontWeight: "700",
            }}
            onClick={() => {
              navigate("/dashboard/rooms");
            }}
          >
            Cancel
          </Button>
          <Box sx={{ width: "103px", height: "50px" }}>
            <ButtonForm
              isSubmitting={isSubmitting}
              name={isEditing ? "Edit Room" : "Add Room"}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
