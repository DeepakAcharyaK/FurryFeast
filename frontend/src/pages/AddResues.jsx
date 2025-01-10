import React from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardContent, MenuItem } from "@mui/material";

const AddRescues = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Rescue Submitted");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fb",
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
            Add Rescue
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Rescue Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
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
                  label="Location"
                  placeholder="Enter rescue location"
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Rescue Type */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Rescue Type"
                  variant="outlined"
                  required
                >
                  <MenuItem value="Animal Rescue">Animal Rescue</MenuItem>
                  <MenuItem value="Natural Disaster">Natural Disaster</MenuItem>
                  <MenuItem value="Medical Emergency">Medical Emergency</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              {/* Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Rescue Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Time */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Rescue Time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  placeholder="Enter a detailed description"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
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
                  Submit Rescue
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddRescues;
