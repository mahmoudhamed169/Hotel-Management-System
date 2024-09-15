import { AlternateEmail } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { PasswordTextField } from "../../../Components/SharedComponents/PasswordTextField/PasswordTextField";
import { FormTextField } from "./../../../Components/SharedComponents/FormTextField/FormTextField";

interface IFormInput {
  email: string;
  password: string;
}
export default function Login() {
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await axios.post(AUTHENTICATION_URLS.login, data);
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      toast.success("Login Successfully", { id: toastId });
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.data?.message, { id: toastId });
    }
  };

  return (
    <>
      <Box className="form-head " sx={{ marginTop: "-2.5rem" }}>
        <Stack>
          <Typography variant="h3" sx={{ fontSize: "30px", fontWeight: "500" }}>
            Sign Up
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
              className="ms-2 text-[#eb5148] font-semibold"
            >
              Register here !
            </Link>
          </Typography>
        </Stack>
      </Box>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-14 text-[#152C5B] font-normal text-base md:w-[90%] w-full"
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
          <Box>
            <Link
              to={"/auth/forget-password"}
              className="flex justify-end text-[#4D4D4D]"
            >
              Forgot Password ?
            </Link>
          </Box>
          <ButtonForm name="Login" isSubmitting={isSubmitting} />
        </Stack>
      </form>
    </>
  );
}
