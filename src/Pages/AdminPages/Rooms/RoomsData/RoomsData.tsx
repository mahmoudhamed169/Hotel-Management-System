import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../../Api/END_POINTS";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import "./fileUploader.css";
import {
  TextField,
  Autocomplete,
  Box,
  Button,
  Grid2 as Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FormTextField } from "../../../../Components/SharedComponents/FormTextField/FormTextField";
import { FileUploader } from "react-drag-drop-files";
import ButtonForm from "../../../../Components/SharedComponents/ButtonForm/ButtonForm";
import toast from "react-hot-toast";

const RoomsData = () => {
  const navigate = useNavigate();
  const [facilitiesList, setfacilitiesList] = useState<[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  interface facilities {
    _id: string;
    name: string;
  }
  interface FacilityResponse {
    data: facilities[];
  }
  const getAllFacilities = async () => {
    try {
      const response = await apiClient.get<FacilityResponse>(
        "/admin/room-facilities",
        {
          params: {
            page: 1,
            size: 999,
          },
        }
      );
      setfacilitiesList(response.data.data.facilities);
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    getAllFacilities();
  }, []);

  function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1e3);
      setLoading(false);

      setOptions([...facilitiesList]);
    })();
  };
  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };
  interface RoomFormValues {
    roomNumber: string;
    price: string;
    capacity: string;
    discount: string;
    facilities: string[];
    imgs: FileList;
  }
  const onSubmit: SubmitHandler<FieldValues> = async (data: RoomFormValues) => {
    const formData = new FormData();
    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("capacity", data.capacity);
    formData.append("discount", data.discount);

    if (!data.facilities) {
      setError("facilities", {
        type: "manual",
        message: "At least one facility must be selected",
      });
      return;
    }
    clearErrors("facilities");
    if (!data.imgs) {
      setError("imgs", {
        type: "manual",
        message: "Room Photos is reqiured",
      });

      return;
    }

    if (images.length > 5) {
      setError("imgs", {
        type: "manual",
        message: "You can only upload up to 5 images.",
      });

      return;
    }
    clearErrors("imgs");

    // data.facilities.forEach((fac: string) =>
    //   formData.append("facilities", fac)
    // );
    data.facilities.forEach((facility) => {
      formData.append("facilities[]", facility);
    });
    images.forEach((img) => formData.append("imgs", img));

    try {
      const response = await apiClient.post("/admin/rooms", formData);

      toast.success(response.data.message);
      reset();
      setImages([]);
    } catch (err: any) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };
  /* functions for uploader */
  const handleChange = (file: File) => {
    const fileArray = Array.from(file);

    setImages((prevImages: File[]) => [...prevImages, ...fileArray]);
    setValue("imgs", [...images, ...fileArray]);
    clearErrors("imgs");
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    if (images.length <= 6) {
      clearErrors("imgs");
    }

    setImages(newImages);
    setValue("imgs", newImages);
  };
  return (
    <>
      <Grid
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: { xs: 2, md: "92px 100px" } }}
        container
        spacing={2}>
        <Grid size={12}>
          <FormTextField
            placeholder="Room Number"
            errors={errors.roomNumber}
            type="text"
            register={register}
            name="roomNumber"
            rules={{
              required: "Room Number is required",
            }}
          />
        </Grid>
        <Grid size={6}>
          <FormTextField
            placeholder="Price"
            errors={errors.price}
            type="number"
            register={register}
            name="price"
            rules={{
              required: "Price is required",
            }}
          />
        </Grid>
        <Grid size={6}>
          <FormTextField
            placeholder="Capacity"
            errors={errors.capacity}
            type="number"
            register={register}
            name="capacity"
            rules={{
              required: "Capacity is required",
            }}
          />
        </Grid>
        <Grid size={6}>
          <FormTextField
            placeholder="Discount"
            errors={errors.discount}
            type="number"
            register={register}
            name="discount"
            rules={{
              required: "Discount is required",
            }}
          />
        </Grid>
        <Grid size={6}>
          <Grid size={6}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={facilitiesList}
              getOptionLabel={(option) => option.name}
              open={open}
              onOpen={handleOpen}
              onClose={handleClose}
              onChange={(event, value) => {
                const facilitiesIds = value.map((facility) => facility._id);
                setValue("facilities", facilitiesIds);
                clearErrors("facilities");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ padding: "0px !important" }}
                  error={!!errors.facilities}
                  helperText={errors ? errors.facilities?.message : ""}
                  label="Select Facilities"
                  placeholder="Facilities"
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      padding: "0px !important",
                      marginTop: "2px",
                      "& .MuiAutocomplete-input": {
                        padding: "12px 16px !important",
                      },
                    },
                    endAdornment: (
                      <>
                        {loading && facilitiesList.length === 0 ? (
                          <CircularProgress
                            sx={{ marginRight: "30px" }}
                            color="inherit"
                            size={20}
                          />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid size={12}>
          <Box className="uploader" sx={{ width: "100%" }}>
            <FileUploader
              handleChange={handleChange}
              onSelect={() => clearErrors("imgs")}
              name="imgs"
              multiple
              hoverTitle="Drop Here"
              label="Upload or drop a room image right here / "
              types={["JPG", "PNG", "GIF"]}
            />
            {errors.imgs && (
              <Typography
                sx={{
                  marginTop: "3px",
                  fontSize: "0.75rem",
                  color: "#d32f2f",
                }}
                variant="body2">
                {errors.imgs.message}
              </Typography>
            )}
          </Box>
        </Grid>
        <Box sx={{ width: "100%" }}>
          <Typography component="span">Uploaded images:</Typography>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#e3d8d8",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
            }}>
            {images.length === 0 ? (
              <Typography sx={{ textAlign: "center", width: "100%" }}>
                No images uploaded yet
              </Typography>
            ) : (
              images.map((img, index) => (
                <Box
                  sx={{
                    background: "grey",
                    marginRight: "10px",
                    height: "70px",
                    width: "70px",
                    position: "relative",
                  }}>
                  <CancelOutlinedIcon
                    sx={{
                      color: "red",
                      cursor: "pointer",
                      width: "18px",
                      right: "-7px",
                      top: "-10px",
                      position: "absolute",
                    }}
                    onClick={() => handleImageRemove(index)}
                  />
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={`${URL.createObjectURL(img)}`}
                    alt={`Uploaded image ${index + 1}`}
                  />
                </Box>
              ))
            )}
          </Box>
        </Box>
        <Box
          sx={{ width: "100%", justifyContent: "flex-end", display: "flex" }}>
          <Button
            variant="outlined"
            type="button"
            sx={{
              padding: "10px 14px",
              width: "170px",
              marginRight: "55px",
              borderColor: "rgb(0, 57, 203)",
              borderRadius: "5px",
            }}>
            Cancel
          </Button>
          <Box sx={{ width: "100px" }}>
            <ButtonForm name="Save" isSubmitting={isSubmitting} />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default RoomsData;
