import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Skeleton,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import MainTitle from "../../SharedComponents/MainTitle/MainTitle";
import Tab from "@mui/material/Tab";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion";
import ThemeToggleButton from "../../SharedComponents/ThemeToggleButton/ThemeToggleButton";
import theme from "../../../Context/ThemeContext/theme";
import { AuthContext } from "../../../Context/AuthContext";

export default function Navabr() {
  const getTabValueFromPathname = (path: string) => {
    switch (path) {
      case "/home":
        return "one";
      case "/":
        return "one";
      case "/explore":
        return "two";
      case "/reviews":
        return "three";
      case "/favorite-rooms":
        return "four";
    }
  };
  const { pathname } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(getTabValueFromPathname(pathname));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [DropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);
  const { loginData } = useContext(AuthContext);
  console.log(loginData);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const open = Boolean(anchorEl);
  const openDropdown = Boolean(DropdownEl);
  // const loginData = JSON.parse(localStorage.getItem("loginData") || "{}");
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handelClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelCloseDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setDropdownEl(null);
  };

  const handleDropdownClick = (path: string) => {
    setAnchorEl(null);
    window.location.href = `/#${path}`;
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginData");
    navigate("/auth/login");
  };
  useEffect(() => {
    setValue(getTabValueFromPathname(pathname));
  }, [pathname]);

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#F8F9FB", color: "#2F313F" }}>
      <Box
        sx={{
          flexGrow: 1,
          width: "85%",
          margin: "auto",
          padding: "13px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box sx={{ flex: "1" }}>
          <OpacityAnimate delay={1}>
            <MainTitle />
          </OpacityAnimate>
        </Box>
        <Box>
          {!isLg ? (
            <OpacityAnimate delay={1.5}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                sx={{
                  marginRight: "49px",
                  display: "flex",
                  alignItems: "baseline !important",
                  "& .MuiTab-root": {
                    color: "black",
                  },
                  "& .Mui-selected": {
                    color: "#3252DF !important",
                  },
                  "& .MuiTabs-indicator": {
                    background: "#3252DF",
                  },
                }}
                aria-label="secondary tabs example">
                <Tab component={Link} to="/home" value="one" label="Home" />
                <Tab
                  component={Link}
                  to="/explore"
                  value="two"
                  label="Explore"
                />

                <Tab
                  component={Link}
                  to="/favorite-rooms"
                  value="four"
                  label="Favorites"
                  sx={{
                    display: loginData ? "flex" : "none",
                  }}
                />
              </Tabs>
            </OpacityAnimate>
          ) : (
            ""
          )}
        </Box>
        {loginData ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="Travis Howard" src={loginData?.profileImage} />
            <Typography variant="h6" sx={{ ml: 1 }}>
              {loginData?.userName}
            </Typography>
            <IconButton
              size="large"
              aria-label="Arrow Drop Down"
              onClick={handelClickDropdown}
              color="inherit">
              <Badge color="error">
                <ArrowDropDownIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={DropdownEl}
              open={openDropdown}
              onClose={handelCloseDropdown}>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : !isLg ? (
          <>
            {" "}
            <Button
              variant="contained"
              href="/#/auth/register"
              sx={{ background: "#3252DF", marginRight: "25px" }}>
              Register
            </Button>
            <Button
              variant="contained"
              href="/#/auth/login"
              sx={{ background: "#3252DF", marginRight: "25px" }}>
              Login
            </Button>
          </>
        ) : (
          ""
        )}
        {isLg ? (
          <>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}>
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem
                sx={
                  pathname === "/" || pathname === "/home"
                    ? { background: "rgba(0, 0, 0, 0.04) !important" }
                    : { background: "inherit" }
                }
                onClick={() => handleDropdownClick("/home")}>
                Home
              </MenuItem>
              <MenuItem
                onClick={() => handleDropdownClick("/explore")}
                sx={
                  pathname === "/explore"
                    ? { background: "rgba(0, 0, 0, 0.04) !important" }
                    : { background: "inherit" }
                }>
                Explore
              </MenuItem>
              {loginData ? (
                <>
                  <MenuItem
                    onClick={() => handleDropdownClick("/reviews")}
                    sx={
                      pathname === "/reviews"
                        ? { background: "rgba(0, 0, 0, 0.04) !important" }
                        : { background: "inherit" }
                    }>
                    Reviews
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDropdownClick("/favorite-rooms")}
                    sx={
                      pathname === "/favorite-rooms"
                        ? { background: "rgba(0, 0, 0, 0.04) !important" }
                        : { background: "inherit" }
                    }>
                    Favorites
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/auth/login">
                    Login
                  </MenuItem>
                  <MenuItem component={Link} to="/auth/register">
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          ""
        )}
        <Box>
          <ThemeToggleButton />
        </Box>
      </Box>
    </AppBar>
  );
}

const OpacityAnimate = ({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "tween",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
        delay: delay,
      }}>
      {children}
    </motion.div>
  );
};
