import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import Navbar from "../components/Navbar";

const ProfileSettings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    profilePicture: "",
  });

  useEffect(() => {
    // Fetch user details on page load
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          password: "", // Password left empty for security
          contactNumber: response.data.contactNumber || "",
          address: response.data.address || "",
          profilePicture: response.data.profilePicture,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/users/me", formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minWidth: "100%",
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "white",
            borderRadius: 2,
            padding: 4,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 4 }}>
            Public Profile
          </Typography>

          {/* Profile Picture */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
            <Avatar
              sx={{ width: 100, height: 100, marginRight: 2, boxShadow: 2 }}
              src={formData.profilePicture}
            />
            <Box>
              <Button
                variant="contained"
                sx={{ marginBottom: 1 }}
                component="label"
              >
                Change Picture
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFormData((prev) => ({
                      ...prev,
                      profilePicture: URL.createObjectURL(file),
                    }));
                  }}
                />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    profilePicture: "https://example.com/default-profile.png",
                  }))
                }
              >
                Delete Picture
              </Button>
            </Box>
          </Box>

          {/* Profile Form */}
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ "& .MuiTextField-root": { marginBottom: 2 } }}
          >
            <TextField
              fullWidth
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              name="contactNumber"
              label="Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
              variant="outlined"
            />
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileSettings;
