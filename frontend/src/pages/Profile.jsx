import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Pets, Favorite, VolunteerActivism, Menu } from "@mui/icons-material";

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState("rescue");

  // Mock Data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const rescues = [
    { id: 1, animal: "Dog", location: "New York", date: "2023-01-15" },
    { id: 2, animal: "Cat", location: "Los Angeles", date: "2023-02-20" },
  ];

  const donations = [
    { id: 1, amount: "$100", date: "2023-03-01", purpose: "Animal Shelter" },
    { id: 2, amount: "$50", date: "2023-04-10", purpose: "Rescue Mission" },
  ];

  const adoptedPets = [
    { id: 1, name: "Buddy", type: "Dog", adoptedDate: "2023-05-10" },
    { id: 2, name: "Whiskers", type: "Cat", adoptedDate: "2023-06-25" },
  ];

  const sidebarItems = [
    { text: "Rescue Info", icon: <Pets />, section: "rescue" },
    { text: "Donations", icon: <VolunteerActivism />, section: "donation" },
    { text: "Adopted Pets", icon: <Favorite />, section: "adopted" },
  ];

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "rescue":
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">Rescue Information</Typography>
              {rescues.map((rescue) => (
                <Typography key={rescue.id}>
                  {rescue.animal} - {rescue.location} - {rescue.date}
                </Typography>
              ))}
            </CardContent>
          </Card>
        );
      case "donation":
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">Donation Details</Typography>
              {donations.map((donation) => (
                <Typography key={donation.id}>
                  {donation.amount} - {donation.date} - {donation.purpose}
                </Typography>
              ))}
            </CardContent>
          </Card>
        );
      case "adopted":
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">Adopted Pets</Typography>
              {adoptedPets.map((pet) => (
                <Typography key={pet.id}>
                  {pet.name} - {pet.type} - {pet.adoptedDate}
                </Typography>
              ))}
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            User Dashboard
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {sidebarItems.map((item, index) => (
            <ListItem
              button
              key={index}
              selected={selectedSection === item.section}
              onClick={() => setSelectedSection(item.section)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          {/* User Info */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      width: 60,
                      height: 60,
                      fontSize: "24px",
                    }}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5">{user.name}</Typography>
                    <Typography color="textSecondary">{user.email}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Section Content */}
          <Grid item xs={12}>
            {renderSectionContent()}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
