import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import Sidebar from "../../components/adminComponents/Sidebar";
import Topbar from "../../components/adminComponents/Topbar";

const drawerWidth = 240;

const Setting = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch existing email and password from the database
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/getadmindetails");
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        console.log(data.data);
        setFormData({
          email: data.data.email || "",
          password: data.data.password || "",
        });
      } catch (error) {
        setFormData({
          email: "",
          password: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogConfirm = async () => {
    setOpenDialog(false);
    try {
      await fetch("http://localhost:3000/admin/updatedetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Details updated successfully");
    } catch (error) {
      console.error("Failed to update details:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        isOpen={isSidebarOpen}
        variant="persistent"
        onClose={toggleSidebar}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          marginLeft: `${drawerWidth}px`,
          minHeight: "100vh",
          background: "#f5f6fa",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar
          toggleSidebar={toggleSidebar}
          admin={{ name: "Admin User", avatar: "/images/adminprofile.jpeg" }}
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "#f5f6fa",
              borderRadius: 2,
              padding: 4,
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 4 }}>
              Settings
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 4,
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 110,
                  height: 110,
                  boxShadow: 2,
                }}
                src="/images/adminprofile.jpeg"
              />
            </Box>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{ "& .MuiTextField-root": { marginBottom: 2 } }}
              >
                <TextField
                  fullWidth
                  name="email"
                  disabled="true"
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="email"
                  required
                />
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="text"
                  value={formData.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 2, width: "100%" }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Box>
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Confirm Changes</DialogTitle>
            <DialogContent>
              Are you sure you want to make these changes?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                No
              </Button>
              <Button onClick={handleDialogConfirm} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default Setting;
