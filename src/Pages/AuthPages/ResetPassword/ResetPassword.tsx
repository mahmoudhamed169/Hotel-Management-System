import { Link } from "react-router-dom";
// import axios from 'axios';
import { Button, capitalize, Grid, Paper, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import styles from "./ResetPass.module.css"
import img from "../../../assets/resetPassword.png";
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

const ResetPass: React.FC = () => {


 
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  

  return (

    <Grid container component="main" className={styles.main}>
      <Grid item xs={12} sm={12} md={6} className={styles.formContainer}>
        <Paper elevation={0} className={styles.paper}>
          <Paper elevation={0}
          
          sx={{ mx: 4, pt: 1, mb: 2 }}>
          <Typography variant="h1"


fontSize={40}
          fontWeight={600}
          color=" rgba(50, 82, 223, 1);
"
          >Stay
            <Typography variant="p"
fontSize={40}

color="black"
            >
              Cation.
              </Typography>
            </Typography>
          </Paper>
          {/* *******container of left side******* */}
          <Box
            sx={{
              // my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              // mt: 3, maxWidth: '400px', margin: 'auto'
            }}
          >
            <Typography component="h2" variant="h5">
              Reset Password
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
              If you already have an account register
              <br />
              You can
              <Link to="/login" className={`${styles.reset}`}>
                {" "}
                Login here !
              </Link>
            </Typography>
            {/* **********form inputs*********** */}
            <Box
              component="form"
              noValidate
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
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
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="seed"
                label="OPT"
                type="text"
                id="seed"
              // autoComplete="seed"
              />

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

  )
}

export default ResetPass