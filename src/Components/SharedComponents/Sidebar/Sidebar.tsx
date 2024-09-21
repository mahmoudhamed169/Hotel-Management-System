import { useTheme } from "@emotion/react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Collapse } from "@mui/material";
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

  const [openNestedList, setOpenNestedList] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickNested = () => {
    setOpenNestedList(!openNestedList);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#203FC7", height: "100%", color: "#fff" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemIcon sx={{ fontWeight: "600", fontSize: "13px" }}>
                <HomeIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard/users")}>
              <ListItemIcon>
                <GroupIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard/rooms")}>
              <ListItemIcon sx={{ color: "#ffff" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Rooms" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard/ads")}>
              <ListItemIcon sx={{ color: "#ffff" }}>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Ads" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard/booking")}>
              <ListItemIcon sx={{ color: "#ffff" }}>
                <GroupIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Booking" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/dashboard/room-facilities")}
            >
              <ListItemIcon sx={{ color: "#ffff" }}>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="facilities" />
            </ListItemButton>
          </ListItem>

        <ChangePassword/>

          <ListItem
            disablePadding
            onClick={() => (
              localStorage.removeItem("token"), navigate("/auth")
            )}
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
    </>
  );
}
