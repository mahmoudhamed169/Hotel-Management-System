import { AlternateEmail } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { PasswordTextField } from "../../../Components/SharedComponents/PasswordTextField/PasswordTextField";
import { FormTextField } from "./../../../Components/SharedComponents/FormTextField/FormTextField";
import { apiClient } from "../../../Api/END_POINTS";
import { AuthContext } from "../../../Context/AuthContext";

// interface IFormInput {
//   email: string;
//   password: string;
// }
interface responseType {
  data: {
    token: string;
  };
  message: string;
}
export default function Login() {
  const theme = useTheme();
  // let {saveLoginData}=useContext(AuthContext)

  const { setUserId } = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  const [accountType, setAccountType] = useState({
    admin: {
      selected: false,
      email: "mahmoudshenawy640@gmail.com",
      password: "@123Mahmoud",
    },
    user: {
      selected: false,
      email: "gewofe4571@pokeline.com",
      password: "Pass@123",
    },
  });
  console.log(accountType);
  const handleNavigate = (role: string) => {
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  };
  const accountTypeSumbit = (e: FormDataEvent) => {
    e.preventDefault();
    if (accountType.admin.selected) {
      setValue("email", accountType.admin.email);
      setValue("password", accountType.admin.password);
    } else {
      setValue("email", accountType.user.email);
      setValue("password", accountType.user.password);
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post<responseType>(
        AUTHENTICATION_URLS.login,
        data
      );
      // console.log(response.data);
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      setUserId(user._id);
      toast.success("Login Successfully", {
        id: toastId,
      });
      handleNavigate(user.role);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <Box className="form-head " sx={{ marginTop: "-2.5rem" }}>
        <Stack>
          <Typography variant="h3" sx={{ fontSize: "30px", fontWeight: "500" }}>
            Sign in
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "22px" }}>
            If you don’t have an account register
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "8px" }}>
            You Can
            <Link
              to={"/auth/register"}
              style={{
                marginLeft: "0.5rem",
                color: "#eb5148",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1rem",
              }}>
              Register here !
            </Link>
          </Typography>
        </Stack>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          sx={{
            mt: "3.5rem",
            color: theme.palette.primary.main,
            fontWeight: "normal",
            fontSize: "base",
            width: {
              xs: "100%",
              md: "90%",
            },
          }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body1" component="label" htmlFor="email">
                Email
              </Typography>
              <FormTextField
                placeholder="Please type here ..."
                errors={errors.email}
                type="email"
                register={register}
                name="email"
                icon={<AlternateEmail />}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography variant="body1" component="label" htmlFor="password">
                Password
              </Typography>
              <PasswordTextField
                placeholder="Enter your password"
                errors={errors.password}
                name="password"
                register={register}
                rules={{
                  required: "Password is required",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}>
              <Link
                to={"/auth/forget-password"}
                style={{ color: "#4D4D4D", textDecoration: "none" }}>
                Forgot Password ?
              </Link>
            </Box>
            <ButtonForm name="Login" isSubmitting={isSubmitting} />
          </Stack>
        </FormControl>
      </form>
      <form onSubmit={accountTypeSumbit}>
        <Stack
          sx={{
            width: {
              xs: "100%",
              md: "90%",
            },
          }}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          marginTop={"20px"}>
          <Typography marginRight={"10px"}>Account type:</Typography>
          <RadioGroup
            sx={{ flexDirection: "row" }}
            aria-labelledby="demo-radio-buttons-group-label"
            onChange={(e) => {
              const selectedValue = e.target.value;
              setAccountType((prev) => ({
                admin: {
                  ...prev.admin,
                  selected: selectedValue === "Admin",
                },
                user: {
                  ...prev.user,
                  selected: selectedValue === "User",
                },
              }));
            }}
            name="radio-buttons-group">
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="User" control={<Radio />} label="User" />
          </RadioGroup>
          <Stack width={"fit-content"} marginLeft={"30px"}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#3252DF",
                color: "#ffff",
                textTransform: "none",
                boxShadow: "0px 8px 15px 0px #3252DF4D",
                height: "50px",
                "&:hover": {
                  backgroundColor: "#0039CB",
                },
                "&:disabled": {
                  backgroundColor: "#0039CB",
                  color: "#ffff",
                },
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
}
