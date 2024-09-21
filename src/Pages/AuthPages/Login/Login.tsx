import { AlternateEmail } from "@mui/icons-material";
import { Box, FormControl, Stack, Typography, useTheme } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const handleNavigate = (role: string) => {
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/home");
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
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "22px" }}
          >
            If you don’t have an account register
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "8px" }}
          >
            You Can
            <Link
              to={"/auth/register"}
              style={{
                marginLeft: "0.5rem",
                color: "#eb5148",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
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
          }}
        >
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
              }}
            >
              <Link
                to={"/auth/forget-password"}
                style={{ color: "#4D4D4D", textDecoration: "none" }}
              >
                Forgot Password ?
              </Link>
            </Box>
            <ButtonForm name="Login" isSubmitting={isSubmitting} />
          </Stack>
        </FormControl>
      </form>
    </>
  );
}
