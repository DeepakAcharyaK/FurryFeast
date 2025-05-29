import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import Navbar from '../../components/Navbar';

const AddRescues = () => {
  let userid = localStorage.getItem('userid');
  console.log('userid:', userid);
  const [formData, setformData] = useState({
    rescuetitle: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null); 

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('image:', image);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("rescuetitle", formData.rescuetitle);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", image); 
      formDataToSend.append("userid", userid);

      console.log("FormData contents:");
      formDataToSend.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await axios.post(
        "http://localhost:3000/user/addrescue",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Rescue information has been successfully sent");
        console.log("Rescue details:", response.data.data);
        
        // Reset form fields
        setformData({
          rescuetitle: "",
          location: "",
          description: "",
        });

        // Clear the image state and file input
        setImage(null);
        document.querySelector('input[type="file"]').value = "";
      }
    } catch (error) {
      error.response?.status === 500 && toast.error(error.response.data.message);
      error.response?.status === 404 && toast.error(error.response.data.message);
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600} align="center">
          Please🙏 Rescue Me🐕‍🦺
        </Typography>
        <Typography variant="h6" my={2} textAlign="center" color="gray">
          Be the Hero They Deserve: Rescue, Love, Transform Lives
        </Typography>
        <Card sx={{ maxWidth: 700, width: "100%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent sx={{ padding: 5 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Rescue Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleOnchange}
                    name="rescuetitle"
                    value={formData.rescuetitle}
                    label="Rescue Title"
                    placeholder="Enter rescue title"
                    variant="outlined"
                    required
                  />
                </Grid>

                {/* Location */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleOnchange}
                    name="location"
                    value={formData.location}
                    label="Location"
                    placeholder="Enter rescue location"
                    variant="outlined"
                    required
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    onChange={handleOnchange}
                    name="description"
                    value={formData.description}
                    label="Description"
                    placeholder="Enter a detailed description"
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>

                {/* Image Upload */}
                <Grid item xs={12}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      ":hover": {
                        backgroundColor: "#0056b3",
                      },
                    }}
                  >
                    Add Rescue
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </>
  );
};

export default AddRescues;

