import React from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Toolbar,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PetsIcon from "@mui/icons-material/Pets";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const AdminSidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/dash-board" },
    { name: "Manage Work", icon: <WorkIcon />, path: "/manage-work" },
    { name: "Manage Volunteer", icon: <VolunteerActivismIcon />, path: "/manage-volunteer" },
    { name: "Manage Rescue", icon: <PetsIcon />, path: "/manage-rescue" },
    { name: "Manage Gallery", icon: <PhotoLibraryIcon />, path: "/manage-gallery" },
    { name: "Manage Donation", icon: <AttachMoneyIcon />, path: "/manage-donation" },
    { name: "Manage Pet Dog", icon: <PetsIcon />, path: "/manage-pet-dog" },
    { name: "Manage Pet Request", icon: <PetsIcon />, path: "/manage-pet-request" },
    { name: "Manage Vaccination", icon: <VaccinesIcon />, path: "/manage-vaccination" },
    { name: "Manage Veterinary", icon: <VaccinesIcon />, path: "/manage-veterinary" },
    { name: "Settings", icon: <SettingsIcon />, path: "/setting" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "black", // Set sidebar background to black
          color: "red", // Set text color to red
        },
      }}
    >
      <Toolbar />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2 }}>
        <Avatar
          src="/static/images/avatar/1.jpg"
          alt="Admin Avatar"
          sx={{ width: 64, height: 64, border: "2px solid red" }} // Red border around avatar
        />
        <Typography variant="h6" sx={{ marginTop: 1, color: "red" }}> {/* Red color for admin name */}
          Admin Name
        </Typography>
      </Box>

      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={NavLink}
            to={item.path}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#d1e0fc" : "transparent", // Highlight active menu
              textDecoration: 'none', // Remove the underline on active
            })}
            sx={{
              "&:hover": {
                backgroundColor: "#333", // Dark hover background for contrast
              },
              color: "red", // Red color for text/icons when active
            }}
          >
            <ListItemIcon sx={{ color: "red" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ color: "red" }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
