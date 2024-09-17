import { ExpandLess, ExpandMore } from "@mui/icons-material";
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import { Collapse } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
  // let {loginData} = useContext(AuthContext)

  const navigate = useNavigate()

  const [openNestedList, setOpenNestedList] = useState(false);

  const handleClickNested = () => {
    setOpenNestedList(!openNestedList);
  };

  return (
    <>
          <List>
          <ListItem disablePadding >
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

          
      <ListItem disablePadding onClick={()=>(localStorage.removeItem('token') , navigate('/auth'))}>
            
            <ListItemButton >
              <ListItemIcon>
              <LogoutIcon />
                
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

        </List>


    
    </>
  );
}
