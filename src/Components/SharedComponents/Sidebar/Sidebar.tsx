import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../../../Pages/AuthPages/ChangePassword/ChangePassword";

export default function Sidebar() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>("");

  const handleNavigation = (path: string) => {
    setActiveLink(path); // Set the active link
    navigate(path); // Navigate to the specified path
  };

  return (
    <Box sx={{ backgroundColor: "#203FC7", height: "100%", color: "#fff" }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/dashboard")}
            sx={{
              backgroundColor: activeLink === "/dashboard" ? "#1a2d7a" : "transparent",
            }}
          >
            <ListItemIcon sx={{ fontWeight: "600", fontSize: "13px" }}>
              <HomeIcon sx={{ color: "#ffff" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/dashboard/users")}
            sx={{
              backgroundColor: activeLink === "/dashboard/users" ? "#1a2d7a" : "transparent",
            }}
          >
            <ListItemIcon>
              <GroupIcon sx={{ color: "#ffff" }} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/dashboard/rooms")}
            sx={{
              backgroundColor: activeLink === "/dashboard/rooms" ? "#1a2d7a" : "transparent",
            }}
          >
            <ListItemIcon sx={{ color: "#ffff" }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/dashboard/ads")}
            sx={{
              backgroundColor: activeLink === "/dashboard/ads" ? "#1a2d7a" : "transparent",
            }}
          >
            <ListItemIcon sx={{ color: "#ffff" }}>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Ads" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/dashboard/booking")}
            sx={{
              backgroundColor: activeLink === "/dashboard/booking" ? "#1a2d7a" : "transparent",
            }}
          >
            <ListItemIcon sx={{ color: "#ffff" }}>
              <GroupIcon sx={{ color: "#ffff" }} />
            </ListItemIcon>
            <ListItemText primary="Booking" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/dashboard/room-facilities")}
            sx={{
              backgroundColor: activeLink === "/dashboard/room-facilities" ? "#1a2d7a" : "transparent",
            }}
          >
            <ListItemIcon sx={{ color: "#ffff" }}>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Facilities" />
          </ListItemButton>
        </ListItem>

        <ChangePassword />

        <ListItem
          disablePadding
          onClick={() => {
            localStorage.removeItem("token");
            handleNavigation("/auth");
          }}
        >
          <ListItemButton>
            <ListItemIcon sx={{ color: "#ffff" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
