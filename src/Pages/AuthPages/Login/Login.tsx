import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useState } from "react";
import { FormTextField } from "../Shared/FormTextField";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const colorLoginPage = indigo[900];
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  interface IFormInput {
    email: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    // console.log(data);
    
    try {
      const response = await axios.post(AUTHENTICATION_URLS.login, data);
      console.log(response.data.data.token);
      const { token } = response.data.data;
      localStorage.setItem("token", token);
      navigate("/dashboard")
    } catch (error) {
    console.log(error);
    
    }
  };








  return (
    <>
      <Box className="form-head">
        <Stack>
          <Typography variant="h3" sx={{ fontSize: "30px", fontWeight: "500" }}>
            Sign In
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: "16px", fontWeight: "400", marginTop: "22px" }}
          >
            If you don’t have an account register
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              marginTop: "8px",
              display: "flex",
            }}
            
          >
            You can{" "}
            <Stack color={colorLoginPage} ml={1} onClick={()=>{navigate("/auth/register")}} >
              Register here !
            </Stack>
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ paddingRight: { md: "85px" } }}>
        
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <Typography
              color={colorLoginPage}
              variant="body1"
              sx={{ marginTop: "15px" }}
              mb={1}
            >
              Email Address
            </Typography>
            <TextField
            
              label="Please type here ..."
              variant="filled"
              sx={{ width: `${429}px` }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />

          <Typography
              color={colorLoginPage}
              variant="body1"
              sx={{ marginTop: "15px" }}
              mb={1}
            >
             Password
            </Typography>

          <FormControl sx={{ width:"429px" }} variant="filled">
            
          <InputLabel htmlFor="filled-adornment-password">Please type here ...</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...register("password", {
              required: "Password is required",
              // pattern: {
              //   value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
              //   message: "Invalid password",
              // },
              
            })}
            error={!!errors.password}
            helperText={errors.password? errors.password.message : ""}
        
          />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: "10px" }}
  
                >
                Login
                
              </Button>
           
        </FormControl>
              
          </form>
        
      </Box>
    </>
  );
}
