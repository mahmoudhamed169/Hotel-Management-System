import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";

export default function NavBarFooter() {
  const { loginData } = React.useContext(AuthContext);
  let [Status, setStatus] = useState<string | null>();
  console.log(loginData, "iam here");
  const BaceNavBar = ["home", "explore"];
  const LoginUser = [{
    name:"favorite",
    Routing:"favorite-rooms"
  } ,{
    name:"Reviews",
      Routing:"room-details"

  }];
  const NotUser = ["register", "login"];
  const [Count, setCount] = React.useState(0);
  const [Reviews, setReviewa] = React.useState(-1);

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  console.log(Status);

  React.useEffect(() => {
    if(loginData){

      setStatus(loginData.role);
    }
  });
  return (
    <AppBar sx={{ background: "white" }} position="static">
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <Typography fontSize={"26px"} variant="h5" component="p" gutterBottom>
            <span style={{ color: "#007BFF" }}>Stay</span>
            <span style={{ color: "black" }}>cation.</span>
          </Typography>
        </Toolbar>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {BaceNavBar.map((title, index) => {
            return (
              <>
              <Link style={{textDecoration:"none"}} to={`/${title}`}>
                <Typography key={index}
                      color={index == 1 ?"black":"rgba(50, 82, 223, 1)"}
                   marginLeft={"20px"}
                  textTransform={"capitalize"}
                  fontWeight={"600"}
                  sx={{ cursor: "pointer" }}
                  fontSize={ loginData ?"16x":"20px"}
                  gutterBottom
               
                >
                  {title}
                </Typography>
                  </Link>
              </>
            );
          })}
          {/*  */}
          {Status ==  "user" || Status == "admin"  ? (
            <>
              {LoginUser.map((title, index) => {
                  
                return (
                      <Link style={{textDecoration:"none"}} to={`/${title.Routing}`}>
                    <Typography key={index}
                      marginLeft={"20px"}
                      fontWeight={"600"}
            
                      fontSize={ loginData ?"16x":"20px"}
                      sx={{ cursor: "pointer" }}
                      color="black"                   
                      gutterBottom
                    >
                      {title.name}
                    </Typography>
                    </Link>


                );
              })}
              <Avatar
                src={loginData.profileImage}
                sx={{ marginLeft: "10px" }}
              />

              <Dropdown>
                <MenuButton sx={{ border: "none", display: "flex" }}>
                  Upskiling <ArrowDropDownIcon />
                </MenuButton>
                <Menu slots={{ listbox: Listbox }}>
                  <MenuItem onClick={createHandleMenuClick("Profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={createHandleMenuClick("Language settings")}
                  >
                    Language settings
                  </MenuItem>
                  <MenuItem onClick={createHandleMenuClick("Log out")}>
                    Log out
                  </MenuItem>
                </Menu>
              </Dropdown>
            </>
          ):null}

          {/* no user && admin */}
          {Status != "admin"  && Status != "user" ?(
            <Typography component="div">
              {NotUser.map((btn) => {
                return (
                  <Link to={`/auth/${btn}`}>
                  <Button  key={btn} sx={{ marginX: "15px" }} variant="contained">
                    {btn+"  "}
                    {btn == "login" && "now"}
                  </Button>
                  </Link>
                );
              })}
            </Typography>
          ):null}
        </Box>
      </Container>
    </AppBar>
  );
}
const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Listbox = styled("ul")(
  ({ theme }) => `
 font-family: 'IBM Plex Sans', sans-serif;
 font-size: 0.875rem;
 box-sizing: border-box;
 padding: 6px;
 margin: 12px 0;
 min-width: 200px;
 border-radius: 12px;
 overflow: auto;
 outline: 0;
 background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
 border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
 color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
 box-shadow: 0px 4px 6px ${
   theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
 };
 z-index: 1;
 `
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
 list-style: none;
 padding: 8px;
 border-radius: 8px;
 cursor: default;
 user-select: none;

 &:last-of-type {
   border-bottom: none;
 }

 &:focus {
   outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
   background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
 }

 &.${menuItemClasses.disabled} {
   color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
 }
 `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
 font-family: 'IBM Plex Sans', sans-serif;
 font-weight: 600;
 font-size: 0.875rem;
 line-height: 1.5;
 padding: 8px 16px;
 border-radius: 8px;
 color: white;
 transition: all 150ms ease;
 cursor: pointer;
 background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
 border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
 color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
 box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

 &:hover {
   background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
   border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
 }

 &:active {
   background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
 }

 &:focus-visible {
   box-shadow: 0 0 0 4px ${
     theme.palette.mode === "dark" ? blue[300] : blue[200]
   };
   outline: none;
 }
 `
);
