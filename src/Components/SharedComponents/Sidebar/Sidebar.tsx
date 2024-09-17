import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Badge, Collapse } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidebar() {
  // let {loginData} = useContext(AuthContext)

  const navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openNestedList, setOpenNestedList] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 

  const handleClickNested = () => {
    setOpenNestedList(!openNestedList);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Typography variant="h6" sx={{ ml: 1 }}>
              {/* {loginData.userName} */}
              user name
            </Typography>
            <IconButton
              size="large"
              aria-label="Arrow Drop Down"
              color="inherit"
            >
              <Badge color="error">
                <ArrowDropDownIcon />
                
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          
       
          <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>(navigate('/dashboard'))}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>



          <ListItem disablePadding>
            <ListItemButton onClick={()=>(navigate('/dashboard/users'))}>
              <ListItemIcon>
              <GroupIcon />
                
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>(navigate('/dashboard/rooms'))}>
              <ListItemIcon>
              <DashboardIcon />
                
              </ListItemIcon>
              <ListItemText primary="Rooms" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>(navigate('/dashboard/ads'))}>
              <ListItemIcon>
              <CalendarMonthIcon />
                
              </ListItemIcon>
              <ListItemText primary="Ads" />
            </ListItemButton>
          </ListItem>



       <ListItemButton onClick={handleClickNested} >
        <ListItemIcon  >
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Bookings"  onClick={()=>(navigate('/dashboard/booking'))}/>
        {openNestedList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openNestedList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={()=>(navigate('/dashboard/room-facilities'))} >
            <ListItemIcon>
            <BedroomParentIcon/>
             
            </ListItemIcon>
            <ListItemText primary="Facilities" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItem disablePadding>
            <ListItemButton onClick={()=>(navigate('/auth/forget-password'))}>
              <ListItemIcon>
              <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary="Change password" />
            </ListItemButton>
          </ListItem>

          
      <ListItem disablePadding onClick={()=>(localStorage.removeItem('token') , navigate('auth'))}>
            
            <ListItemButton >
              <ListItemIcon>
              <LogoutIcon />
                
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

        </List>


        </Drawer>
      </Box>
    </>
  );
}
