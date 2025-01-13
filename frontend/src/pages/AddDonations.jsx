import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddDonations = () => {
  const [formData, setFormData] = useState({
    donorname: "",
    email: "",
    contact: "",
    amount: "",
    donationdate: "",
    description: "",
    paymentReference: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.donorname) tempErrors.donorname = "Donor name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format.";
    if (!formData.contact) tempErrors.contact = "Contact number is required.";
    if (!formData.amount) tempErrors.amount = "Amount is required.";
    else if (isNaN(formData.amount) || formData.amount <= 0) tempErrors.amount = "Enter a valid amount.";
    if (!formData.donationdate) tempErrors.donationdate = "Donation date is required.";
    if (!formData.description) tempErrors.description = "Description is required.";
    if (!formData.paymentReference) tempErrors.paymentReference = "Payment reference is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Donation form Data:", formData);

      const response=axios.post('http://localhost:3000/user/adddonation',{
        donorname: formData.donorname,
        email: "",
        contact: "",
        amount: "",
        donationdate: "",
        description: "",
        paymentReference: "",
      })

      console.log(response)

      // Reset form
      setFormData({
        donorname: "",
        email: "",
        contact: "",
        amount: "",
        donationdate: "",
        description: "",
        paymentReference: "",
      });
      setErrors({});
    }
  };

  return (
    <>
      <Navbar />
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
                {/* Donor Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Donor Name"
                    name="donorname"
                    placeholder="Enter your name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={formData.donorname}
                    onChange={handleChange}
                    error={!!errors.donorname}
                    helperText={errors.donorname}
                  />
                </Grid>
                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    placeholder="Enter email address"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                {/* Contact */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact"
                    name="contact"
                    placeholder="Enter phone number"
                    variant="outlined"
                    value={formData.contact}
                    onChange={handleChange}
                    error={!!errors.contact}
                    helperText={errors.contact}
                  />
                </Grid>
                {/* Amount */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Amount (in ₹)"
                    name="amount"
                    placeholder="Enter donation amount"
                    variant="outlined"
                    value={formData.amount}
                    onChange={handleChange}
                    error={!!errors.amount}
                    helperText={errors.amount}
                  />
                </Grid>
                {/* Payment Reference */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Payment Reference"
                    name="paymentReference"
                    placeholder="Enter payment reference number"
                    variant="outlined"
                    value={formData.paymentReference}
                    onChange={handleChange}
                    error={!!errors.paymentReference}
                    helperText={errors.paymentReference}
                  />
                </Grid>
                {/* Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Donation Date"
                    name="donationdate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={formData.donationdate}
                    onChange={handleChange}
                    error={!!errors.donationdate}
                    helperText={errors.donationdate}
                  />
                </Grid>
                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    placeholder="Enter donation purpose"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={errors.description}
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
                      padding: "10px 3px",
                      color: "#fff",
                      ":hover": {
                        backgroundColor: "#388e3c",
                      },
                    }}
                  >
                    Submit Donation
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

