import {
  TextField,
  Box,
  Typography,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS.tsx";
import toast from "react-hot-toast";
import { AlternateEmail } from "@mui/icons-material";
import { FormTextField } from "../../../Components/SharedComponents/FormTextField/FormTextField.tsx";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm.tsx";

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

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await axios.post(
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
        <Link to={"/auth/login"} className="ms-2 text-[#eb5148] font-semibold">
          Login here !
        </Link>
      </Typography>

      <form
        className="mt-14 text-[#152C5B] font-normal text-base md:w-[90%] w-full "
        onSubmit={handleSubmit(onSubmit)}
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
      </form>
    </Box>
  );
}
