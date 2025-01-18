import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Alert,
  Chip,
  Avatar,
  Tooltip,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import Navbar from "../components/Navbar";

const ViewVeterinary = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVeterinarians = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/viewveterinary");
        setVets(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch veterinarians. Please try again later.");
        setLoading(false);
      }
    };

    fetchVeterinarians();
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const filteredVets = vets.filter((vet) =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWhatsAppClick = (contact, name) => {
    const message = encodeURIComponent(`Hi Dr. ${name}, I would like to consult you.`);
    const whatsappUrl = `https://wa.me/${contact}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCallClick = (contact) => {
    const phoneUrl = `tel:${contact}`;
    window.location.href = phoneUrl;
  };

  return (
    <>
        <Navbar/>
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom >
        Veterinary Directory
      </Typography>

      <Box sx={{ px: 4, mb: 4, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Search veterinarians by name..."
          fullWidth
          sx={{ maxWidth: 600 ,
            "& .MuiOutlinedInput-root": {
        borderRadius: "30px", // Adjust the value for desired roundness
      },}}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mx: 2 }}>
          {error}
        </Alert>
      ) : (
        <Grid container spacing={3} sx={{ px: 4 }}>
          {filteredVets.map((vet) => (
            <Grid item xs={12} sm={6} md={4} key={vet._id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: "#1976d2",
                        mr: 2,
                        width: 56,
                        height: 56,
                        fontSize: 24,
                      }}
                    >
                      {vet.name[0]}
                    </Avatar>
                    <Typography variant="h6" color="text.primary">
                      {vet.name}
                    </Typography>
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    <strong>Clinic:</strong> {vet.clinicName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Contact:</strong> {vet.contact}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    color={isValidEmail(vet.email) ? "textPrimary" : "error"}
                  >
                    <strong>Email:</strong>{" "}
                    {isValidEmail(vet.email) ? vet.email : "Invalid email"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Address:</strong> {vet.clinicAddress}
                  </Typography>
                  <Box my={1}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Specializations:</strong>
                    </Typography>
                    {vet.specialization.map((specialization, index) => (
                      <Chip
                        key={index}
                        label={specialization}
                        color="primary"
                        variant="outlined"
                        sx={{
                          mr: 1,
                          mb: 1,
                          fontWeight: "bold",
                          backgroundColor: "#e3f2fd",
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    <strong>Availability:</strong> {vet.availability}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Experience:</strong> {vet.experience} years
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Location:</strong> {vet.location}
                  </Typography>
                  <Tooltip title={`${vet.ratings}/5 rating`} arrow>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#ff9800",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      ⭐ {vet.ratings}/5
                    </Typography>
                  </Tooltip>
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<WhatsAppIcon />}
                      onClick={() => handleWhatsAppClick(vet.contact, vet.name)}
                      sx={{
                        textTransform: "none",
                      }}
                    >
                      Message on WhatsApp
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PhoneIcon />}
                      onClick={() => handleCallClick(vet.contact)}
                      sx={{
                        textTransform: "none",
                      }}
                    >
                      Call
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    </>
  );
};

export default ViewVeterinary;
