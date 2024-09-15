import {
  AlternateEmail,
  LanguageOutlined,
  Person2Outlined,
  PhoneInTalk,
} from "@mui/icons-material";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS.tsx";
import ButtonForm from "../../../Components/SharedComponents/ButtonForm/ButtonForm.tsx";
import { FormTextField } from "../../../Components/SharedComponents/FormTextField/FormTextField";
import { PasswordTextField } from "../../../Components/SharedComponents/PasswordTextField/PasswordTextField.tsx";
import { useFetch } from "../../../Context/FetchContext";

export default function Register() {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    setFocus,
  } = useForm();
  useEffect(() => {
    setFocus("userName");
  }, [setFocus]);
  const { fetchData, loading } = useFetch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    if (data.profileImage === undefined) {
      setError("profileImage", {
        type: "manual",
      });

      return;
    }
    clearErrors("profileImage");
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage ? data.profileImage : "");
    formData.append("role", "user");

    fetchData({
      method: "POST",
      url: AUTHENTICATION_URLS.regitser,
      showToastify: true,
      data: formData,
      navigateTo: "/auth/login",
    });
  };

  const handleChange = (file: {
    lastModified: number;
    lastModifiedDate: string;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  }) => {
    setValue("profileImage", file);
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
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "22px" }}>
            If you already have an account register
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "8px" }}>
            You Can
            <Link
              to={"/auth/login"}
              className="ms-2 text-[#eb5148] font-semibold">
              Login here !
            </Link>
          </Typography>
        </Stack>
      </Box>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 text-[#152C5B] font-normal text-base md:w-[90%] w-full">
        <Stack spacing={2}>
          <Box>
            <Typography variant="body1" component="label" htmlFor="userName">
              User Name
            </Typography>
            <FormTextField
              placeholder="Please write user name"
              errors={errors.userName}
              name="userName"
              icon={<Person2Outlined />}
              register={register}
              rules={{ required: "Username is required" }}
            />
          </Box>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2} useFlexGap>
            <Box flex={1}>
              <Typography
                variant="body1"
                component="label"
                htmlFor="phoneNumber">
                Phone Number
              </Typography>
              <FormTextField
                placeholder="Please write phone number"
                errors={errors.phoneNumber}
                type="number"
                name="phoneNumber"
                register={register}
                icon={<PhoneInTalk />}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^01\d{9}$/,
                    message: "Must start with 01 and be 11 digits",
                  },
                }}
              />
            </Box>

            <Box flex={1}>
              <Typography variant="body1" component="label" htmlFor="country">
                Country
              </Typography>
              <FormTextField
                placeholder="Please write your country"
                errors={errors.country}
                name="country"
                icon={<LanguageOutlined />}
                register={register}
                rules={{ required: "Country is required" }}
              />
            </Box>
          </Stack>

          <Box>
            <Typography variant="body1" component="label" htmlFor="email">
              Email Address
            </Typography>
            <FormTextField
              placeholder="Please write email address"
              errors={errors.email}
              name="email"
              register={register}
              icon={<AlternateEmail />}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
            />
          </Box>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2} useFlexGap>
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
                htmlFor="confirmPassword">
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
          </Stack>

          <Stack>
            <Box>
              <Typography variant="body1" component="label">
                Profile Image
              </Typography>
              <FileUploader
                handleChange={handleChange}
                onSelect={() => clearErrors("profileImage")}
                name="profileImage"
                hoverTitle="Drop Here"
                types={fileTypes}
              />
              {errors.profileImage && (
                <Typography
                  sx={{
                    marginTop: "3px",
                    fontSize: "0.75rem",
                    color: "#d32f2f",
                  }}
                  variant="body2">
                  Photo is required
                </Typography>
              )}
            </Box>
          </Stack>

          <ButtonForm name="Register" isSubmitting={loading} />
        </Stack>
      </form>
    </>
  );
}
