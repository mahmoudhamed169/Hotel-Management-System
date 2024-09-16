import { Box, FormControl, Stack, Typography, useTheme } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AlternateEmail } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS.tsx";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm.tsx";
import { FormTextField } from "../../../Components/SharedComponents/FormTextField/FormTextField.tsx";

interface IFormData {
  email: string;
}
interface IResponse {
  message: string;
}

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await axios.post<IResponse>(
        AUTHENTICATION_URLS.forgetPassword,
        data
      );
      // console.log(response);
      toast.success("Reset email sent. Check your Email", { id: toastId });
      navigate("/auth/reset-password");
    } catch (error) {
      const axiosError = error as AxiosError<IResponse>;
      toast.error(axiosError.response?.data?.message, { id: toastId });
    }
  };
  return (
    <Box>
      <Typography
        variant="h5"
        component={"h2"}
        sx={{ fontFamily: "500", fontSize: "2rem", lineHeight: "3rem" }}
      >
        Forgot password
      </Typography>
      <Typography
        component={"p"}
        sx={{ mt: "22px", fontWeight: "450", lineHeight: "24px" }}
      >
        If you already have an account register <br />
        You can{" "}
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
              ></FormTextField>
            </Box>
            <ButtonForm name="Send Email" isSubmitting={isSubmitting} />
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
}
