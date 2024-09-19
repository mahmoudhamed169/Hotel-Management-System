import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import Styles from "./AddNewRoom.module.scss";
import { InputLabel, MenuItem } from "@mui/material";
import axios from "axios";
// ! in api file create propety BASE_HEADER
import { ADMIN_ROOM } from "../../../../Api/END_POINTS";
// import { IAddRoom } from "../../../../interface/RoomInterface";
// ! import dreab and drap
// import DragDropFileUpload from "../../../../shared/DragDropFileUpload/DragDropFileUpload";
// import useFacilities from "../../../Hook/useFacilities";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudUpload from "@mui/icons-material/CloudUpload";
const RoomsData = () => {
  const navigate = useNavigate();

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

  // Format Data
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

    // Append multiple images
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
    //! ask mohamed aill  monter UPskilling
    // Check if discount is outside the range 0 to 100
    // if (
    //   data.discount !== undefined &&
    //   (data.discount < 0 || data.discount > 100)
    // ) {
    //   toast.error("Discount must be between 0 and 100.");
    //   return;
    // }
    const addFormData = appendToFormData(data);
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

  // const handleFileUpload = (file :any) => {
  //   setSelectedImage(URL.createObjectURL(files[0]));
  // };

  // const handleFileUpload = useCallback(
  //   (files) => {
  //     const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
  //     console.log(imageUrls);
  //     setSelectedImage(imageUrls);
  //   },
  //   []
  // );

  // const handleFileUpload = useCallback(
  //   (files) => {
  //     const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
  //     console.log(imageUrls);
  //     setSelectedImage(imageUrls);
  //   },
  //   []
  // );

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

  const waitDatainFacility = async() =>{
    await  getAllFacilities();
 }
  useEffect( () => {
  

    waitDatainFacility()
    console.log(1);
  }, []);

  // const handleChangePage = (event, newPage) => {
  //     setCurrentPage(newPage + 1);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setCurrentPage(1); // Reset to the first page when changing rows per page
  // };
  return (
    <>
      <Container
        component="main"
        // className={``}
        sx={{ width: "100%", padding: 0 }}
      >
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
                // encType="multipart/form-data"
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
                  <span style={{color:"red ", fontWeight:"600",textTransform:"capitalize"}}>This field is required</span>
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
                      <span  style={{color:"red ", fontWeight:"600",textTransform:"capitalize"}}  >This field is required</span>
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      {...register("capacity", { required: true })}
                      required
                      id="filled-required"
                      label="Capacity"
                      // variant="filled"
                      fullWidth
                      sx={{
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                    />
                    {errors.capacity && errors.capacity.type === "required" && (
                      <span style={{color:"red ", fontWeight:"600",textTransform:"capitalize"}}>This field is required</span>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      {...register("discount", {
                        valueAsNumber: true,
                        required: true,
                        // pattern: /^(?!0$|100$)\d+$/,
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
                      <span style={{color:"red ", fontWeight:"600",textTransform:"capitalize"}}>This field is required</span>
                    )}
                    {errors.discount && errors.discount.type === "pattern" && (
                      <span style={{color:"red ", fontWeight:"600",textTransform:"capitalize"}}>Invalid discount value</span>
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
                        sx={{ width: "100%" }}
                        renderValue={(selected) => (
                          <div>
                            {selected?.map((value) => (
                              <span key={value} style={{ marginRight: "8px" }}>
                                {facilitiesList.find(
                                  (facility) => facility._id === value
                                )?.name || ""}
                              </span>
                            ))}
                          </div>
                        )}
                      >
                        {facilitiesList?.map((facility) => (
                          <MenuItem key={facility?._id} value={facility?._id}>
                            <Checkbox
                              checked={watch("facilities")?.includes(
                                facility?._id
                              )}
                            />
                            <ListItemText primary={facility?.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.facilities &&
                      errors.facilities.type === "required" && (
                        <span style={{color:"red ", fontWeight:"600",textTransform:"capitalize"}}>
                          Facilities are required
                        </span>
                      )}
                  </Grid>
                </Grid>
                <div style={{ padding: 50 }}>
                  {/* <DragDropFileUpload  /> */}
                  <Paper
                    variant="outlined"
                    // onDragOver={handleDragOver}
                    // onDragLeave={handleDragLeave}
                    // onDrop={handleDrop}
                    // style={{
                    //   border: dragOver ? "2px dashed #000" : "2px dashed #aaa",
                    //   padding: 20,
                    //   textAlign: "center",
                    //   cursor: "pointer",
                    //   background: dragOver ? "#eee" : "#fafafa",
                    // }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      onChange={(e) =>{
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
                    <div style={{ marginTop: '20px' }}>
                      {selectedImage.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`Selected ${index + 1}`} style={{ maxWidth: '80%', maxHeight: '100px' }} />
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
                    {images.length > 5 &&
                       <Stack sx={{ width: '100%', margin:"10px" }} spacing={2}>
                       <Alert severity="error">please enter 5 images or enter   afew form five imges  .</Alert>
                     </Stack>
                       } 
                  {images.length > 0 && (
                    <div style={{ marginTop: "20px"   , display:"flex" , justifyContent:"center" ,  gap:"10px",flexWrap:"Wrap", alignItems:"center"}}>
                  
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
