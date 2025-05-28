import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ import axios
import { Box, Grid, Toolbar } from "@mui/material";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import MonetizationOn from "@mui/icons-material/MonetizationOn";
import PetsIcon from "@mui/icons-material/Pets";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import Topbar from "../../components/adminComponents/Topbar";
import Sidebar from "../../components/adminComponents/Sidebar";
import DashboardCard from "../../components/adminComponents/DashboardCard";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState([
    { title: "Users", value: "-", icon: <PeopleAlt />, color: "#66bb6a" },
    { title: "Donations", value: "-", icon: <MonetizationOn />, color: "#ffa726" },
    { title: "Adopt pet", value: "-", icon: <PetsIcon />, color: "#ef5350" },
    { title: "Total Images", value: "-", icon: <PhotoLibraryIcon />, color: "#42a5f5" },
    { title: "Pet Requested", value: "-", icon: <PetsIcon />, color: "#ab47bc" },
    { title: "Veterinary", value: "-", icon: <VaccinesIcon />, color: "#26c6da" },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/dashboard-stats");
        const data = response.data;

        setStats([
          { title: "Users", value: data.users, icon: <PeopleAlt />, color: "#66bb6a" },
          { title: "Donations", value: data.donations, icon: <MonetizationOn />, color: "#ffa726" },
          { title: "Adopt pet", value: data.adoptedPets, icon: <PetsIcon />, color: "#ef5350" },
          { title: "Total Images", value: data.totalImages, icon: <PhotoLibraryIcon />, color: "#42a5f5" },
          { title: "Pet Requested", value: data.petRequested, icon: <PetsIcon />, color: "#ab47bc" },
          { title: "Veterinary", value: data.veterinary, icon: <VaccinesIcon />, color: "#26c6da" },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ display: "flex", backgroundColor: "white", minHeight: "100vh" }}>
      <Sidebar isOpen={isSidebarOpen} />
      <Box sx={{ flexGrow: 1, p: 1 }}>
        <Topbar toggleSidebar={toggleSidebar} />
        <Toolbar />
        <Grid container spacing={2}>
          {stats.map((card, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <DashboardCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
