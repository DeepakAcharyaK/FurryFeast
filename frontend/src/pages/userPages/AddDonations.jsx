import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardContent, } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Navbar from '../../components/Navbar'

const AddDonations = ({ userid }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donorname: "",
    contact: "",
    email: "",
    amount: "",
    description: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {

      try {
        const response = await axios.get("http://localhost:3000/user/getuserdetails", {
          headers: { id: userid },
        });
        if (response.status === 200) {
          const { email, contactNumber, username } = response.data.data;
          console.log('fetched user dets:', response);
          setFormData({ ...formData, email: email, donorname: username, contact: contactNumber })
          console.log('formdata', formData)
        }
      } catch (error) {
        err.status === 404 && toast.warn(err.response.data.message);
        err.status === 500 && toast.error(err.response.data.message);
        console.log('error in fetching user dets:', error)
      }
    }

    fetchDetails();
  }, [userid])


  const validate = () => {
    let tempErrors = {};
    if (!formData.donorname) tempErrors.donorname = "Donor name is required.";
    if (!formData.contact) tempErrors.contact = "Contact number is required.";
    if (!formData.amount) tempErrors.amount = "Amount is required.";
    else if (isNaN(formData.amount) || formData.amount <= 0) tempErrors.amount = "Enter a valid amount.";
    if (!formData.description) tempErrors.description = "Description is required.";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3000/user/adddonation', { formData, userid });
  
        if (response.status === 200) {
          const newDonationId = response.data.donationDetails._id;
          console.log('Donation details:', response);
          console.log('donation id:', newDonationId);
  
          const id = toast.loading("Please wait...", { position: "top-center" });
  
          setTimeout(() => {
            toast.update(id, {
              render: "Details are saving...",
              type: "info",
              isLoading: true,
              position: "top-center",
              autoClose: false,
            });
  
            setTimeout(() => {
              toast.update(id, {
                render: "Details saved! Soon navigating to payment page...",
                type: "success",
                isLoading: false,
                position: "top-center",
                autoClose: 2000,
              });
  
              setFormData({
                donorname: "",
                contact: "",
                amount: "",
                description: "",
              });
              setErrors({});
  
              setTimeout(() => {
                navigate(`/user/${userid}/donation/${newDonationId}/payment/type/details`);
              }, 2000);
            }, 1000);
          }, 1000);
        }
      } catch (error) {
        error.response?.status === 500 && toast.error(error.response.data.message);
        error.response?.status === 404 && toast.error(error.response.data.message);
        console.log('Failed to add donation', error);
      }
    }
  };
  

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: "start",
          alignItems: "center",
          minHeight: "100vh",
          padding: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600} align="center">
          Make a Donation💰
        </Typography>
        <Typography variant="h6" my={2} textAlign="center" color="gray">
          Your Kindness Can Change Lives❤️Donate Today and Make a Difference!
        </Typography>
        <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
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
                    disabled={true}
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
      <ToastContainer />
    </>
  );
};

export default AddDonations;

