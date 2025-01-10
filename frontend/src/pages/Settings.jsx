import React from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";

const ProfileSettings = () => {
  return (
    <>
    <Navbar/>

    <Box sx={{
      minWidth:'100%',
      minHeight:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
    <Box
      maxWidth={'md'}
      sx={{
        display: "flex",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          padding: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
          Settings
        </Typography>
        <List>
          <ListItem button>
            <ListItemText primary="Public profile" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Account settings" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Notifications" />
          </ListItem>
          <Divider />

        </List>
      </Box>

      {/* Profile Form */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "white",
          marginLeft: 4,
          borderRadius: 2,
          padding: 4,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 4 }}>
          Public profile
        </Typography>
        {/* Profile Picture */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              marginRight: 2,
              boxShadow: 2,
            }}
            src="https://via.placeholder.com/100"
          />
          <Box sx={{display:'flex',flexDirection:'column'}}>
            <Button variant="contained" sx={{ marginBottom: 1 }}>
              Change picture
            </Button>
            <Button variant="outlined" color="error">
              Delete picture
            </Button>
          </Box>
        </Box>

        {/* Profile Form Fields */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { marginBottom: 2 },
            maxWidth: 600,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            label="First name"
            defaultValue="Ildiko"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Last name"
            defaultValue="Gaspar"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Location"
            defaultValue="emailis@privato.com"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Profession"
            defaultValue="UI/UX Designer"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Bio"
            defaultValue="Open-Source designer @ UI Design Daily"
            variant="outlined"
            multiline
            rows={3}
          />
        </Box>
      </Box>
    </Box>
    </Box>
    </>
  );
};

export default ProfileSettings;
