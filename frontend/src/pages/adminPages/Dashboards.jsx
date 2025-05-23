import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Grid, Paper, Box, Button,} from "@mui/material";
import {Menu, Dashboard, TableChart, AccountCircle, ExitToApp, Notifications, Settings, BarChart, PeopleAlt, MonetizationOn,} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PetsIcon from "@mui/icons-material/Pets";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useParams } from 'react-router-dom';


const Dashboards = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "white" }}>
      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? 240 : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItem>
            <Typography variant="h6">Material Dashboard 2</Typography>
          </ListItem>
          {[
             { text: "Dashboard", icon: <DashboardIcon />, path: "/adminDashboard" },
             { text: "Manage Rescue", icon: <PetsIcon />, path: "/manageRescue" },
             { text: "Manage Gallery", icon: <PhotoLibraryIcon />, path: "/adminGallery" },
             { text: "Manage Donation", icon: <AttachMoneyIcon />, path: "/Donations" },
             { text: "Manage Pet Dog", icon: <PetsIcon />, path: "/managePetDog" },
             { text: "Manage Pet Request", icon: <PetsIcon />, path: "/managePetRequest" },
             { text: "Manage Vaccination", icon: <VaccinesIcon />, path: "/manageVaccination" },
             { text: "Manage Veterinary", icon: <VaccinesIcon />, path: "/manageVeterinary" },
             { text: "Settings", icon: <SettingsIcon />, path: "/adminSetting" },
          ].map((item, index) => (
            <ListItem button key={index} onClick={()=>navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Navbar */}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
              <Menu />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <IconButton color="inherit">
              <Settings />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Toolbar /> {/* Spacer for fixed Navbar */}
        <Grid container spacing={2}>
          {/* Cards */}
          {[ 
            { title: "Users", value: "10", icon: <PeopleAlt />, color: "#66bb6a" },
            { title: "Donations", value: "0", icon: <MonetizationOn />, color: "#ffa726" },
            { title: "Adopt pet", value: "3", icon: <PetsIcon />, color: "#ef5350" },
            { title: "Total Images", value: "20", icon: <PhotoLibraryIcon />, color: "#ef5350" },
            { title: "Pet Requested", value: "5", icon: <PetsIcon />, color: "#ef5350" },
            { title: "Veterinary", value: "1", icon: <VaccinesIcon />, color: "#ef5350" },
          ].map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderLeft: `4px solid ${card.color}`,
                }}
              >
                <Box>
                  <Typography variant="h6">{card.value}</Typography>
                  <Typography variant="subtitle1">{card.title}</Typography>
                </Box>
                <IconButton sx={{ color: card.color }}>{card.icon}</IconButton>
              </Paper>
            </Grid>
          ))}

          {/* Charts Placeholder */}
          {/* {[1, 2, 3].map((chart, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{ height: 200, display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <Typography>Chart {chart}</Typography>
              </Paper>
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboards;