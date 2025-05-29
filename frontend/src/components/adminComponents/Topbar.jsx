import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Menu as MuiMenu, MenuItem } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Topbar = ({ toggleSidebar, admin = { name: "Admin User", avatar: "" } }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    handleMenuClose();
    navigate("/adminSetting");
  };

  const handleLogout = () => {
    window.localStorage.removeItem("isloggedin");
    window.localStorage.removeItem("role");
    window.open('/', '_self');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <IconButton edge="start" onClick={toggleSidebar} color="inherit" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          Admin Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <IconButton
            onClick={handleAvatarClick}
            sx={{
              p: 0,
              borderRadius: "50%",
              border: "2px solid #e0e0e0",
              transition: "border-color 0.2s",
              "&:hover": { borderColor: "#1976d2" },
            }}
          >
            <Avatar
              src="/images/adminprofile.jpeg"
              alt={admin.name}
              sx={{ width: 40, height: 40,backgroundSize: "cover" ,backgroundPosition: "center"}}
            >
              {admin.name[0]}
            </Avatar>
          </IconButton>
          <MuiMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 160,
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              },
            }}
          >
            <MenuItem onClick={handleSettings}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MuiMenu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
