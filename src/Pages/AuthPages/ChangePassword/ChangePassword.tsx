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

export default function ChangePassword() {
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
      <ListItem disablePadding>
        <ListItemButton onClick={handleOpen}>
          <ListItemIcon sx={{ color: "#ffff" }}>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText primary="Change password" />
        </ListItemButton>
      </ListItem>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
          <Box
            onClick={() => handleClose()}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              color: "red",
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              sx={{
                mt: "2.5rem",
                color: theme.palette.primary.main,
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
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="oldPassword"
                  >
                    Old Password
                  </Typography>
                  <PasswordTextField
                    placeholder="Please write oldPassword"
                    errors={errors.oldPassword}
                    name="oldPassword"
                    register={register}
                    rules={{
                      required: "oldPassword is required",
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="body1"
                    component="label"
                    htmlFor="newPassword"
                  >
                    New Password
                  </Typography>
                  <PasswordTextField
                    placeholder="Please write newPassword"
                    errors={errors.newPassword}
                    name="newPassword"
                    register={register}
                    rules={{
                      required: "newPassword is required",
                      pattern: {
                        value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
                    Confirm New Password
                  </Typography>
                  <PasswordTextField
                    placeholder="Please write confirmPassword"
                    errors={errors.confirmPassword}
                    name="confirmPassword"
                    register={register}
                    rules={{
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords does not match",
                    }}
                  />
                </Box>

                <ButtonForm
                  name="Change password"
                  isSubmitting={isSubmitting}
                />
              </Stack>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
}
