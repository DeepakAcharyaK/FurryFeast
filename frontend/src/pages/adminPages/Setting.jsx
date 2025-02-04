import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Avatar, Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const Setting = () => {
  const { adminid } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profilePicture: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/getadmindetails/67924f9af317a852e03a357e");

        const {email, password, profilePicture } = response.data.data;

        setFormData({
          email,
          password,
          profilePicture: profilePicture || "/uploads/default-profile.jpg",
        });

        setPreviewImage(profilePicture && `http://localhost:3000${profilePicture}`);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [adminid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePicture = async () => {
    setProfileImage(null);
    setPreviewImage("http://localhost:3000/uploads/default-profile.jpg");
    setFormData((prev) => ({
      ...prev,
      profilePicture: "/uploads/default-profile.jpg",
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    if (profileImage) {
      data.append("avatar", profileImage);
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/admin/updateadmindetails",
        data,
        {
          headers: { id: userid, "Content-Type": "multipart/form-data" },
        }
      );
      alert("Profile updated successfully!");
      console.log("Updated admin profile info", response.data.data);
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
      <Box
        sx={{
          minWidth: "100%",
          minHeight: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            Profile
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                marginRight: 2,
                boxShadow: 2,
              }}
              src={previewImage}
            />

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                variant="contained"
                sx={{ marginBottom: 1 }}
                component="label"
              >
                Change Picture
                <input
                  type="file"
                  name="avatar"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeletePicture}
              >
                Delete Picture
              </Button>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ "& .MuiTextField-root": { marginBottom: 2 } }}
          >
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
              value={formData.password}
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

export default Setting;