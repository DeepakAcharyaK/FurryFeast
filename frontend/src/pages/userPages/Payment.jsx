import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Grid, Stepper, Step, StepLabel } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "../../components/Navbar";
import { ErrorOutlined } from "@mui/icons-material";

function Payment({ userid }) {
  const { donationid } = useParams();
  const [formData, setFormData] = useState({
    userid: userid || "",
    donationid: donationid || "",
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    amount: '',
    cvv: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/getuserdetails", {
          headers: { id: userid },
        });

        const dontaiondets = await axios.get(`http://localhost:3000/user/getdonationdets/${donationid}`);

        if (response.status === 200) {
          console.log('user dets:', response);
          const { username } = response.data.data;
          setFormData((prev) => ({ ...prev, nameOnCard: username }));
        }

        if (dontaiondets.status === 200) {
          console.log('donation dets:', dontaiondets)
          const { amount } = dontaiondets.data.donation;
          setFormData((prev) => ({ ...prev, amount: amount }));
        }

      } catch (error) {
        error.status === 404 && toast.warn(error.response.data.message);
        error.status === 500 && toast.error(error.response.data.message);
        console.log('error occured while fetching..', error)
      }
    };
    fetchDetails();
  }, [userid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setAgreeTerms(e.target.checked);
  };

  const handleGenerateInvoice = async (donationDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/generate-invoice",
        donationDetails,
        { responseType: "blob" } 
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice_${donationDetails.donationid}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      alert("Invoice downloaded successfully!");
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Failed to generate invoice.");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.warn("Please agree to the Terms of Use.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/payment/save", formData);
      if (response.status === 200) {
        toast.success("Payment Confirmed and Details Saved!");

        handleGenerateInvoice(formData)

        setFormData({
          userid: userid || "",
          donationid: donationid || "",
          nameOnCard: "",
          cardNumber: "",
          expiryDate: "",
          amount: '',
          cvv: "",
        })
      }
    } catch (error) {
      error.status === 404 && toast.warn(error.response.data.message);
      error.status === 500 && toast.error(error.response.data.message);
      console.log('error in payment', ErrorOutlined)
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "black",
          justifyContent: "start",
          padding: 2,
        }}
      >
        <Stepper activeStep={2} sx={{ mb: 4, width: "60%" }}>
          {["Details", "Review", "Payment"].map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 4,
            boxShadow: 3,
            padding: 4,
            maxWidth: 500,
            width: "90%",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Card Details
          </Typography>

          <TextField
            label="Name on Card"
            variant="outlined"
            name="nameOnCard"
            value={formData.nameOnCard}
            fullWidth
            sx={{ mb: 2 }}
            onChange={handleChange}
          />

          <TextField
            label="Card Number"
            variant="outlined"
            name="cardNumber"
            fullWidth
            sx={{ mb: 2 }}
            placeholder="XXXX XXXX XXXX XXXX"
            value={formData.cardNumber}
            onChange={handleChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date (MM/YY)"
                variant="outlined"
                name="expiryDate"
                fullWidth
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Security Code (CVV)"
                variant="outlined"
                name="cvv"
                fullWidth
                placeholder="XXXX"
                value={formData.cvv}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Typography variant="h5" color="green" fontWeight="bold" sx={{ m: 3 }}>
            Rs. {formData.amount}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              style={{ width: 40, marginRight: 10 }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard"
              style={{ width: 40, marginRight: 10 }}
            />
            <img
              src="https://logos-world.net/wp-content/uploads/2020/11/American-Express-Logo-700x394.png"
              alt="American Express"
              style={{ width: 40 }}
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={agreeTerms}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I agree to Fiit{" "}
                <a href="#terms" style={{ color: "#1976d2" }}>
                  Terms of Use
                </a>
              </Typography>
            }
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#ff4081",
              color: "#fff",
              fontWeight: "bold",
              mt: 3,
              "&:hover": { backgroundColor: "#e91e63" },
            }}
          >
            Confirm Payment
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}

export default Payment;

