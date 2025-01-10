import React from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../components/Navbar";

const AddDonations = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Donation Submitted");
  };

  return (
    <>
      <Navbar/>
      <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ marginBottom: 3, color: "#333" }}
          >
            Add Donation
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Donation Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Donation Title"
                  placeholder="Enter donation title"
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Amount */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount (in $)"
                  placeholder="Enter amount"
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Donation Date"
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
                  placeholder="Enter a brief description"
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
                    backgroundColor: "#4caf50",
                    padding:'10px 3px',
                    color: "#fff",
                    ":hover": {
                      backgroundColor: "#388e3c",
                    },
                  }}
                >
                  Give Donation
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

export default AddDonations;
