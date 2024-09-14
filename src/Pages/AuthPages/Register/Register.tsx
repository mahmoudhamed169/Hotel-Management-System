import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS.tsx";
import { useFetch } from "../../../Context/FetchContext";
import { FormTextField } from "../../../Components/SharedComponents/FormTextField/FormTextField";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const fileTypes = ["JPG", "PNG", "GIF"];
  const {
    register,
    handleSubmit,
    setValue,

    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { fetchData, loading } = useFetch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (data.profileImage === undefined) {
      setError("profileImage", {
        type: "manual",
      });

      return;
    }
    clearErrors("profileImage");
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage ? data.profileImage : "");
    formData.append("role", "user");

    fetchData({
      method: "POST",
      url: AUTHENTICATION_URLS.regitser,
      showToastify: true,
      data: formData,
    });
  };

  const handleChange = (file: {
    lastModified: number;
    lastModifiedDate: string;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  }) => {
    setValue("profileImage", file);
  };

  return (
    <>
      <Box className="form-head">
        <Stack>
          <Typography variant="h3" sx={{ fontSize: "30px", fontWeight: "500" }}>
            Sign Up
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "22px" }}>
            If you already have an account register
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "8px" }}>
            You Can{" "}
            <Link href="#" color="red" underline="none">
              Login Here !
            </Link>
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ paddingRight: { md: "85px" } }}>
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                User Name
              </Typography>
              <FormTextField
                placeholder="Please write user name"
                errors={errors.userName}
                name="userName"
                register={register}
                rules={{ required: "Username is required" }}
              />

              <Stack
                justifyContent="space-between"
                direction={{ md: "row" }}
                useFlexGap
                spacing={0}>
                <Box>
                  <Typography variant="body1" sx={{ marginTop: "15px" }}>
                    Phone Number
                  </Typography>
                  <Box sx={{ width: { xs: "100%", md: "90%" } }}>
                    <FormTextField
                      placeholder="Please write phone number"
                      errors={errors.phoneNumber}
                      type="number"
                      name="phoneNumber"
                      register={register}
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: /^01\d{9}$/,
                          message: "Must start with 01 and be 11 digits",
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ marginTop: "15px" }}>
                    Country
                  </Typography>
                  <Box sx={{ width: "100%" }}>
                    <FormTextField
                      placeholder="Please write your country"
                      errors={errors.country}
                      name="country"
                      register={register}
                      rules={{ required: "Country is required" }}
                    />
                  </Box>
                </Box>
              </Stack>
              <Typography variant="body1" sx={{ marginTop: "15px" }}>
                Email Address
              </Typography>
              <FormTextField
                placeholder="Please write email address"
                errors={errors.email}
                name="email"
                register={register}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
              />

              <Typography variant="body1" sx={{ marginTop: "15px" }}>
                Password
              </Typography>
              <FormTextField
                placeholder="Please write password"
                errors={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                type={showPassword ? "text" : "password"}
                icon={
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    sx={{
                      minWidth: "auto",
                      padding: 0,
                      background: "none",

                      cursor: "pointer",
                    }}>
                    {showPassword ? (
                      <VisibilityIcon style={{ fontSize: "17px" }} />
                    ) : (
                      <VisibilityOffIcon style={{ fontSize: "17px" }} />
                    )}
                  </Button>
                }
                name="password"
                register={register}
                rules={{ required: "Password is required" }}
              />

              <Typography variant="body1" sx={{ marginTop: "15px" }}>
                Confirm Password
              </Typography>
              <FormTextField
                placeholder="Please write password"
                errors={errors.confirmPassword}
                type={showPassword ? "text" : "password"}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                icon={
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    sx={{
                      minWidth: "auto",
                      padding: 0,
                      background: "none",

                      cursor: "pointer",
                    }}>
                    {showPassword ? (
                      <VisibilityIcon style={{ fontSize: "17px" }} />
                    ) : (
                      <VisibilityOffIcon style={{ fontSize: "17px" }} />
                    )}
                  </Button>
                }
                name="confirmPassword"
                register={register}
                rules={{ required: "Confirm password is required" }}
              />
              <Box sx={{ marginTop: "15px" }}>
                <FileUploader
                  handleChange={handleChange}
                  onSelect={() => clearErrors("profileImage")}
                  name="Photo"
                  hoverTitle="Drop Here"
                  types={fileTypes}
                />
                {errors.profileImage && (
                  <Typography
                    sx={{
                      marginLeft: "14px",
                      marginTop: "3px",
                      fontSize: "0.75rem",
                      color: "#d32f2f",
                    }}
                    variant="body1">
                    Photo is required
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#3252DF",
                  textTransform: "none",
                  marginTop: "12px",
                  boxShadow: "0px 8px 15px 0px #3252DF4D",
                  "&:hover": {
                    backgroundColor: "#0039CB",
                  },
                  "&:disabled": {
                    backgroundColor: "#0039CB",
                    color: "#ffff",
                  },
                }}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }>
                {loading ? "Loading..." : "Register"}
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </>
  );
}
