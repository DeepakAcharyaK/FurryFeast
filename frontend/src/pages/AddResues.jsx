import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardContent, MenuItem } from "@mui/material";
import axios from "axios";
import Navbar from '../components/Navbar'

const AddRescues = () => {

  const [formData, setformData] = useState({
    rescuetitle: "",
    location: "",
    description: ""
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setformData({ ...formData, [name]: value })
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    event.preventDefault();

    const response = await axios.post('http://localhost:3000/user/addrescue', {
      formData
    })

    console.log(response)

    setformData({
      rescuetitle: "",
      location: "",
      description: ""
    })

  };

  return (
    <>
      <Navbar/>
    <Box
      sx={{
        display: "flex",
        justifyContent:'center',
        alignItems: "center",
        padding: 3,
      }}
    >
      <Card sx={{ maxWidth: 700, width: "100%", boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ marginBottom: 3, color: "#333" }}
          >
            Give Rescue Information !!
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Rescue Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={handleOnchange}
                  name="rescuetitle"
                  label="rescuetitle"
                  placeholder="Enter rescue title"
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="location"
                  name="location"
                  onChange={handleOnchange}
                  placeholder="Enter rescue location"
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="description"
                  name="description"
                  onChange={handleOnchange}
                  placeholder="Enter a detailed description"
                  variant="outlined"
                  multiline
                  rows={4}
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
    </>
  );
};

export default AddRescues;
