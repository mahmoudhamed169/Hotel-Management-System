import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  ListItemText,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState, useEffect, useCallback } from "react";
import { set, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputLabel, MenuItem } from "@mui/material";
import axios from "axios";
import { ADMIN_ROOM } from "../../../../Api/END_POINTS";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudUpload from "@mui/icons-material/CloudUpload";
import { i } from "framer-motion/client";
const RoomsData = () => {
  const navigate = useNavigate();
  let [disablefacilites, setdisablefacilites] = useState(0);
  let [facilitesCheck, setfacilitesCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [facilitiesList, setfacilitiesList] = useState([]);

  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IAddRoom>();

  const appendToFormData = (data: IAddRoom) => {
    const formData = new FormData();
    formData.append("roomNumber", data?.roomNumber);
    formData.append("price", data?.price);
    formData.append("capacity", data?.capacity);
    formData.append("discount", data?.discount);

    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("imgs", images[i]);
    }
    return formData;
  };

  interface IAddRoom {
    roomNumber: String;
    price: String;
    capacity: String;
    discount: String;
    facilities: String;
    imgs: String[];
  }

  const onSubmit: SubmitHandler<IAddRoom> = async (data: IAddRoom) => {
    setIsLoading(true);
    addFormData = appendToFormData(data);
    setIsLoading(true);
    axios
      .post(ADMIN_ROOM.createRoom, addFormData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        navigate(-1);
        toast.success("Room Add Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const getAllFacilities = () => {
    setIsLoading(true);

    axios
      .get(ADMIN_ROOM.allFacility, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setfacilitiesList(response?.data?.data?.facilities);

        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("An error occurred.  ");
      });
  };

  const waitDatainFacility = async () => {
    await getAllFacilities();
  };
  useEffect(() => {
    waitDatainFacility();
    console.log(1);
  }, []);

  return (
    <>
      <Container component="main" sx={{ width: "100%", padding: 0 }}>
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            component={Paper}
            elevation={6}
            mb={8}
            mt={4}
            sx={{ padding: "1rem" }}
          >
            <Box
              sx={{
                my: 4,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  width: "100%",
                  maxWidth: "none",
                  mx: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <TextField
                  {...register("roomNumber", { required: true })}
                  required
                  id="filled-required"
                  label="Room Number"
                  fullWidth
                  sx={{
                    width: "100%",
                    marginBottom: "1rem",
                  }}
                />
                {errors.roomNumber && errors.roomNumber.type === "required" && (
                  <span
                    style={{
                      color: "red ",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    This field is required
                  </span>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register("price", {
                        required: true,
                        valueAsNumber: true,
                      })}
                      required
                      id="filled-required"
                      label="Price"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    {errors.price && errors.price.type === "required" && (
                      <span
                        style={{
                          color: "red ",
                          fontWeight: "600",
                          textTransform: "capitalize",
                        }}
                      >
                        This field is required
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      {...register("capacity", { required: true })}
                      required
                      id="filled-required"
                      label="Capacity"
                      variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    {errors.capacity && errors.capacity.type === "required" && (
                      <span
                        style={{
                          color: "red ",
                          fontWeight: "600",
                          textTransform: "capitalize",
                        }}
                      >
                        This field is required
                      </span>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register("discount", {
                        valueAsNumber: true,
                        required: true,
                      })}
                      required
                      id="discount"
                      label="Discount"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        paddingTop: "5px",
                      }}
                    />
                    {errors.discount && errors.discount.type === "required" && (
                      <span
                        style={{
                          color: "red ",
                          fontWeight: "600",
                          textTransform: "capitalize",
                        }}
                      >
                        This field is required
                      </span>
                    )}
                    {errors.discount && errors.discount.type === "pattern" && (
                      <span
                        style={{
                          color: "red ",
                          fontWeight: "600",
                          textTransform: "capitalize",
                        }}
                      >
                        Invalid discount value
                      </span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl
                      sx={{ padding: "5px", minWidth: 120, width: "98%" }}
                    >
                      <InputLabel id="facilities-label">Facilities</InputLabel>

                      <Select
                        labelId="facilities-label"
                        id="facilities"
                        label="facilities"
                        multiple
                        value={watch("facilities") || []}
                        onChange={(e) =>
                          setValue("facilities", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                        onClick={() => {}}
                        sx={{ width: "100%" }}
                        renderValue={(selected) => (
                          <div>
                            {selected.map((value) => (
                              <span key={value} style={{ marginRight: "8px" }}>
                                {facilitiesList.find(
                                  (facility) => facility._id === value
                                )?.name || ""}
                              </span>
                            ))}
                          </div>
                        )}
                      >
                        {facilitiesList.map((facility) => (
                          <MenuItem
                            key={facility._id}
                            disabled={facilitesCheck}
                            value={facility._id}
                          >
                            <Checkbox
                              onClick={(e) => {
                                if (e.target.checked) {
                                  setdisablefacilites((disablefacilites += 1));
                                  if (disablefacilites > 4) {
                                    setfacilitesCheck(true);
                                  }
                                } else {
                                  setdisablefacilites((disablefacilites -= 1));
                                }
                              }}
                              checked={watch("facilities")?.includes(
                                facility._id
                              )}
                            />
                            <ListItemText primary={facility.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.facilities &&
                      errors.facilities.type === "required" && (
                        <span
                          style={{
                            color: "red ",
                            fontWeight: "600",
                            textTransform: "capitalize",
                          }}
                        >
                          Facilities are required
                        </span>
                      )}
                    {disablefacilites > 4 && (
                      <Button
                      
                        variant="contained"
                        onClick={async () => {
                          const deletItemFacilites: Number =
                            watch("facilities").length;
                          watch("facilities").splice(0, deletItemFacilites);
                          setdisablefacilites(0);
                          setfacilitesCheck(false);
                        }}
                      >
                        Clear All Select 
                      </Button>
                    )}
                  </Grid>
                </Grid>
                <div style={{ padding: 50 }}>
                  <Paper variant="outlined">
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={(e) => {
                        // convert file
                        console.log(e.target);
                        const files = Array.from(e.target.files);
                        setImages(files);
                      }}
                    />
                    <img src="" id="ooo" alt="" />
                    <label htmlFor="raised-button-file">
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <CloudUploadIcon style={{ fontSize: 60 }} />
                        </IconButton>
                        <Typography>
                          Drag and drop files here or click to select files
                        </Typography>
                      </Box>
                    </label>
                  </Paper>
                  {selectedImage && (
                    <div style={{ marginTop: "20px" }}>
                      {selectedImage.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`Selected ${index + 1}`}
                          style={{ maxWidth: "80%", maxHeight: "100px" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <Box>
                  <label htmlFor="upload-input">
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      component="span"
                    >
                      Upload Images
                    </Button>
                  </label>
                  <input
                    id="upload-input"
                    onChange={handleImageChange}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                  />
                  {images.length > 5 && (
                    <Stack sx={{ width: "100%", margin: "10px" }} spacing={2}>
                      <Alert severity="error">
                        please enter 5 images or enter afew form five imges .
                      </Alert>
                    </Stack>
                  )}
                  {images.length > 0 && (
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        flexWrap: "Wrap",
                        alignItems: "center",
                      }}
                    >
                      {images.map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${index + 1}`}
                          style={{
                            maxWidth: "80%",
                            maxHeight: "100px",
                            margin: "5px",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </Box>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "flex-end",
                    marginTop: "1rem", // Adjust the top margin as needed
                  }}
                >
                  <Grid item>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" type="submit">
                      save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default RoomsData;
