import { Box, FormControl, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FormTextField } from "../../../Components/SharedComponents/FormTextField/FormTextField";
import ButtonForm from "./../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { PasswordTextField } from "../../../Components/SharedComponents/PasswordTextField/PasswordTextField";
import { AlternateEmail, PinTwoTone } from "@mui/icons-material";
import toast from "react-hot-toast";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS";
import axios, { AxiosError } from "axios";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}
interface IResponse {
  message: string;
}

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    watch,
  } = useForm();
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await axios.post<IResponse>(
        AUTHENTICATION_URLS.resetPassword,
        data
      );
      toast.success(response.data.message, { id: toastId });
      navigate("/auth/login");
    } catch (error) {
      const axiosError = error as AxiosError<IResponse>;
      toast.error(axiosError.response?.data.message, { id: toastId });
    }

    console.log(data);
  };
  return (
    <>
      <Box className="form-head " sx={{ marginTop: "-2rem" }}>
        <Stack>
          <Typography variant="h3" sx={{ fontSize: "30px", fontWeight: "500" }}>
            Reset Password
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
              to={"/auth/login"}
              style={{
                marginLeft: "0.5rem",
                color: "#eb5148",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              Login here !
            </Link>
          </Typography>
        </Stack>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          sx={{
            mt: "2.5rem",
            color: "#152C5B",
            fontWeight: "normal",
            fontSize: "base",
            width: {
              xs: "100%",
              md: "90%",
            },
          }}
        >
          <Stack spacing={1.7}>
            <Box>
              <Typography variant="body1" component="label" htmlFor="email ">
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
              <Typography variant="body1" component="label" htmlFor="otp ">
                OTP
              </Typography>

              <FormTextField
                placeholder="Please type here ..."
                errors={errors.seed}
                type="text"
                register={register}
                name="seed"
                icon={<PinTwoTone />}
                rules={{
                  required: "seed is required",
                }}
              />
            </Box>

            <Box>
              <Typography variant="body1" component="label" htmlFor="password">
                Password
              </Typography>
              <PasswordTextField
                placeholder="Please write password"
                errors={errors.password}
                name="password"
                register={register}
                rules={{
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="body1"
                component="label"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </Typography>
              <PasswordTextField
                placeholder="Please write password"
                errors={errors.confirmPassword}
                name="confirmPassword"
                register={register}
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords does not match",
                }}
              />
            </Box>

            <ButtonForm name="Reset" isSubmitting={isSubmitting} />
          </Stack>
        </FormControl>
      </form>
    </>
  );
}
