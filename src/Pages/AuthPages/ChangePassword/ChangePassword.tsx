import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiClient, AUTHENTICATION_URLS } from "../../../Api/END_POINTS";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm";
import { PasswordTextField } from "../../../Components/SharedComponents/PasswordTextField/PasswordTextField";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
interface IResponse {
  message: string;
}

export default function ChangePassword({ navBar }) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
    watch,
    reset,
  } = useForm();
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const response = await apiClient.post<IResponse>(
        AUTHENTICATION_URLS.changePassword,
        data
      );
      toast.success(response.data.message, { id: toastId });
      handleClose();
      reset();
    } catch (error) {
      const axiosError = error as AxiosError<IResponse>;
      toast.error(axiosError.response?.data.message, { id: toastId });
    }

    // console.log(data);
  };

  return (
    <>
      {!navBar ? (
        <ListItem disablePadding>
          <ListItemButton onClick={handleOpen}>
            <ListItemIcon sx={{ color: "#ffff" }}>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary="Change password" />
          </ListItemButton>
        </ListItem>
      ) : (
        <MenuItem onClick={handleOpen}>Change Password</MenuItem>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: {
              xs: "90%",
              sm: "30%",
              md: "30%",
            },
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Change Password
            </Typography>
            <Box
              onClick={handleClose}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "red",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <CloseIcon />
            </Box>
          </Box>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              sx={{
                mt: 4,
                color: theme.palette.primary.main,
                width: "100%",
              }}
            >
              <Stack spacing={3}>
                {/* Old Password */}
                <Box>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="oldPassword"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Old Password
                  </Typography>
                  <PasswordTextField
                    placeholder="Enter your old password"
                    errors={errors.oldPassword}
                    name="oldPassword"
                    register={register}
                    rules={{ required: "Old password is required" }}
                    sx={{ mt: 1 }}
                  />
                </Box>

                {/* New Password */}
                <Box>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="newPassword"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    New Password
                  </Typography>
                  <PasswordTextField
                    placeholder="Enter your new password"
                    errors={errors.newPassword}
                    name="newPassword"
                    register={register}
                    rules={{
                      required: "New password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                    }}
                    sx={{ mt: 1 }}
                  />
                </Box>

                {/* Confirm Password */}
                <Box>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="confirmPassword"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Confirm New Password
                  </Typography>
                  <PasswordTextField
                    placeholder="Re-enter your new password"
                    errors={errors.confirmPassword}
                    name="confirmPassword"
                    register={register}
                    rules={{
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    }}
                    sx={{ mt: 1 }}
                  />
                </Box>

                {/* Submit Button */}
                <ButtonForm
                  name="Change password"
                  isSubmitting={isSubmitting}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    mt: 3,
                  }}
                />
              </Stack>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
}
