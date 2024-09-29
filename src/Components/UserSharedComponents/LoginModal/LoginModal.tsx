import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import CloseIcon from "@mui/icons-material/Close"; // Close icon for the modal
import ButtonForm from "../../SharedComponents/ButtonForm/ButtonForm";
import { FormTextField } from "../../SharedComponents/FormTextField/FormTextField";
import { PasswordTextField } from "../../SharedComponents/PasswordTextField/PasswordTextField";

import { AlternateEmail } from "@mui/icons-material";
import { apiClient, AUTHENTICATION_URLS } from "../../../Api/END_POINTS";
import { AuthContext } from "./../../../Context/AuthContext";

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function LoginModal({ show, handleClose }: LoginModalProps) {
  const theme = useTheme();
  const { setUserId } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post(AUTHENTICATION_URLS.login, data);
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      setUserId(user._id);
      toast.success("Login Successful", {
        id: toastId,
      });
      handleClose();
      window.location.reload();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={show} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Sign in</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ mt: 1 }}>
            If you don’t have an account, register
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            You can{" "}
            <Link
              to="/auth/register"
              style={{
                color: "#eb5148",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register here!
            </Link>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "normal",
                fontSize: "base",
                width: "100%",
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
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="password"
                  >
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
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link
                    to="/auth/forget-password"
                    style={{ color: "#4D4D4D", textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
                <ButtonForm name="Login" isSubmitting={isSubmitting} />
              </Stack>
            </FormControl>
          </form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
