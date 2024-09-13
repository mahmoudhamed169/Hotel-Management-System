import {
  TextField,
  Box,
  Typography,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { AUTHENTICATION_URLS } from "./../../../Api/END_POINTS";
import toast from "react-hot-toast";
import { AlternateEmail } from "@mui/icons-material";

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
        className="mt-14 text-[#152C5B] font-normal text-base md:w-4/5 w-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email " className=" sr-only">
          Email
        </label>
        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmail />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            marginTop: "4rem",
            backgroundColor: "#3252DF",
            textTransform: "none",
            boxShadow: "0px 8px 15px 0px #3252DF4D",
            "&:hover": {
              backgroundColor: "#0039CB",
            },
            "&:disabled": {
              backgroundColor: "#0039CB",
              color: "#ffff",
            },
          }}
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {isSubmitting ? "Sending..." : "Send mail"}
        </Button>
      </form>
    </Box>
  );
}
