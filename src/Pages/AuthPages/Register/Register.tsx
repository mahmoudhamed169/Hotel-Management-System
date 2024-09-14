import {
  Box,
  Button,
  FormControl,
  Link,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FileUploader } from "react-drag-drop-files";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS.TS";
import { useFetch } from "../../../Context/FetchContext";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { fetchData, loading } = useFetch();

  const onSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage ? data.profileImage : "");
    formData.append("role", "user");

    console.log(formData);

    try {
      console.log("fetched");
      const response = await fetchData({
        method: "POST",
        url: AUTHENTICATION_URLS.regitser,
        showToastify: true,
        ToastifyMsg: "Registration successful",
        data: formData,
      });
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  const handleChange = (file) => {
    setValue("profileImage", file);
  };

  return (
    <>
      <Box className="form-head">
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
            You Can{" "}
            <Link href="#" color="red" underline="none">
              Login Here !
            </Link>
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ paddingRight: { md: "85px" } }}>
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                User Name
              </Typography>
              <FormTextField
                placeholder="Please write user name"
                errors={errors.userName}
                name="userName"
                register={register}
                rules={{ required: "Username is required" }}
              />

              <Stack
                justifyContent="space-between"
                direction={{ md: "row" }}
                useFlexGap
                spacing={0}>
                <Box>
                  <Typography variant="body1" sx={{ marginTop: "15px" }}>
                    Phone Number
                  </Typography>
                  <Box sx={{ width: { xs: "100%", md: "90%" } }}>
                    <FormTextField
                      placeholder="Please write phone number"
                      errors={errors.phoneNumber}
                      name="phoneNumber"
                      register={register}
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          value: /^01\d{9}$/,
                          message: "Must start with 01 and be 11 digits",
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ marginTop: "15px" }}>
                    Country
                  </Typography>
                  <Box sx={{ width: "100%" }}>
                    <FormTextField
                      placeholder="Please write your country"
                      errors={errors.country}
                      name="country"
                      register={register}
                      rules={{ required: "Country is required" }}
                    />
                  </Box>
                </Box>
              </Stack>
              <Typography variant="body1" sx={{ marginTop: "15px" }}>
                Email Address
              </Typography>
              <FormTextField
                placeholder="Please write email address"
                errors={errors.email}
                name="email"
                register={register}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
              />

              <Typography variant="body1" sx={{ marginTop: "15px" }}>
                Password
              </Typography>
              <FormTextField
                placeholder="Please write password"
                errors={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                type={showPassword ? "text" : "password"}
                icon={
                  showPassword ? (
                    <IoEyeOff style={{ fontSize: "17px" }} />
                  ) : (
                    <IoEye style={{ fontSize: "17px" }} />
                  )
                }
                name="password"
                register={register}
                rules={{ required: "Password is required" }}
              />

              <Typography variant="body1" sx={{ marginTop: "15px" }}>
                Confirm Password
              </Typography>
              <FormTextField
                placeholder="Please write password"
                errors={errors.confirmPassword}
                type={showPassword ? "text" : "password"}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                icon={
                  showPassword ? (
                    <IoEyeOff style={{ fontSize: "17px" }} />
                  ) : (
                    <IoEye style={{ fontSize: "17px" }} />
                  )
                }
                name="confirmPassword"
                register={register}
                rules={{ required: "Confirm password is required" }}
              />
              <Box sx={{ marginTop: "15px" }}>
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "10px" }}
                disabled={loading}>
                Submit
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </>
  );
}
interface FormTextFieldType {
  placeholder: string;
  errors: any;
  name: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  icon?: ReactNode;
  type?: string;
  setShowPassword?: (show: boolean) => void;
  showPassword?: boolean;
}
export const FormTextField = ({
  placeholder,
  errors,
  name,
  register,
  rules,
  icon = null,
  type = "text",
  setShowPassword,
  showPassword,
}: FormTextFieldType) => {
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      error={!!errors}
      helperText={errors ? errors.message : ""}
      InputProps={{
        sx: {
          backgroundColor: "rgba(245, 246, 248, 1)",
          "& input": {
            padding: "12px 16px",
          },
        },
        endAdornment: icon ? (
          <InputAdornment
            sx={{ cursor: "pointer" }}
            onClick={() => setShowPassword && setShowPassword(!showPassword)}
            onMouseUp={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            position="end">
            {icon}
          </InputAdornment>
        ) : null,
      }}
      sx={{
        marginTop: "3px",
        width: "100%",
      }}
      {...register(name, rules)}
    />
  );
};
