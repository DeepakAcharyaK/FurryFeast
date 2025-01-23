import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Box, useTheme, useMediaQuery, } from "@mui/material";
import { FaDonate } from "react-icons/fa";
import { styled } from "@mui/system";
import { MdOutlineLocalHospital } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { GiDogHouse } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 280,
    height: "100vh",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    padding: theme.spacing(2),
  },
}));

const ProfileSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 0",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
});

const StyledListItem = styled(ListItem)({
  borderRadius: "8px",
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});


const Sidebar = ({ userid, isOpen, toggleSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [loggeduserDets, setloggeduserDets] = useState({})

  useEffect(() => {
    const fetchdata = async () => {
      try {
        console.log(userid)
        const response = await axios.get('http://localhost:3000/user/search', {
          params: { userid },
        });
        setloggeduserDets(response.data.user)
        console.log('Fetched data:', response.data); 
      } catch (error) {
        console.error('Error fetching data:', error.message); 
      }
    };
  
    fetchdata(); 
  }, [userid]); 


  const navigationItems = [
    { text: "Donations made", icon: <FaDonate size={24} />, route: "/donations" },
    { text: "Adopted pets", icon: <GiDogHouse size={24} />, route: "/adopted-pets" },
    { text: "Rescued pets", icon: <MdOutlineLocalHospital size={24} />, route: "/rescued-pets" },
    { text: "Settings", icon: <FiSettings size={24} />, route: `/user/${userid}/profile/settings` },
  ];

  const drawerContent = (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ProfileSection>
        <Avatar
          src={`${loggeduserDets.profilePicture}`}
          sx={{ width: 80, height: 80, marginBottom: 2 }}
        />
        <Typography variant="h6">{loggeduserDets.username}</Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
          {loggeduserDets.email}
        </Typography>
      </ProfileSection>

      <List sx={{ flex: 1, marginTop: 2 }}>
        {navigationItems.map((item) => (
          <StyledListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.route);
              if (isMobile) toggleSidebar(); // Close sidebar on mobile after navigation
            }}
          >
            <ListItemIcon sx={{ color: "#ffffff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <StyledDrawer
      variant={isMobile ? "temporary" : "persistent"}
      open={isOpen}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {drawerContent}
    </StyledDrawer>
  );
};

export default Sidebar;

