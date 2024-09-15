import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from 'react-toastify';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./ResetPass.module.css";
import img from "../../../assets/resetPassword.png";
import { InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { AUTHENTICATION_URLS } from "../../../Api/END_POINTS";
const ResetPass: React.FC = () => {
 const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
    seed: string;
  }

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    axios.get(AUTHENTICATION_URLS.resetPassword)
     .then((response) =>{
      toast.success(response.data.message || "Reset Pasword is successfully")
      navigate("/auth/login")
     
     }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message || "Reset Password failed,")
     })
  };

  return (
    <Grid container component="main" className={styles.main}>
      <Grid item xs={12} sm={12} md={6} className={styles.formContainer}>
        <Paper elevation={0} className={styles.paper}>
          <Toolbar className={styles.title}>
            <Typography
              variant="h1"
              fontSize={40}
              fontWeight={600}
              color=" rgba(50, 82, 223, 1);
"
            >
              Stay
            </Typography>
            <Typography variant="subtitle1" fontSize={40} color="black">
              Cation.
            </Typography>
          </Toolbar>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              fontSize={30}
              fontWeight={700}
              marginY={2}
            >
              Reset Password
            </Typography>
            <Typography
              sx={{ my: 2 }}
              fontSize={22}
              fontWeight={500}
              component="body"
              variant="body1"
            >
              If you already have an account register
              <br />
              You can
              <Link to="/login" className={`${styles.reset}`}>
                {" "}
                Login here !
              </Link>
            </Typography>
            {/* **********form inputs*********** */}
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <TextField
                {...register("email", {
                  required: true,
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {errors.email && errors.email.type === "required" && (
                <span className={styles.errorMsg}>Email is required</span>
              )}

              {errors.email && errors.email.type === "pattern" && (
                <span className={styles.errorMsg}>Email is invalid</span>
              )}

              <TextField
                margin="normal"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && errors.password.type === "required" && (
                <span className={styles.errorMsg}>Password is required</span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className={styles.errorMsg}>password is invalid</span>
              )}
              <TextField
                {...register("confirmPassword", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  // validate: (value) =>
                  //   getValues("password") === value || "Password don't match",
                })}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span className={styles.errorMsg}>Password is required</span>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "pattern" && (
                  <span className={styles.errorMsg}>password is invalid</span>
                )}
              <TextField
                {...register("seed", {
                  required: true,
                })}
                margin="normal"
                required
                fullWidth
                name="seed"
                label="OPT"
                type="text"
                id="seed"
                // autoComplete="seed"
              />
          {errors.seed &&
                errors.seed.type === "required" && (
                  <span className={styles.errorMsg}>OPT  is required</span>
                )}
           
              <Button
                className={`${styles.loginBtn}`}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2, py: 1 }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className={styles.imageContainer}>
        <img src={img} alt="Reset Image" className={styles.image} />
      </Grid>
    </Grid>
  );
};

export default ResetPass;
