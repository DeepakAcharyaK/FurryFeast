import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Paper,
} from "@mui/material";

const PetDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [vaccinations, setVaccinations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch pet details
        const petResponse = await axios.get(`http://localhost:3000/user/pets/${id}`);
        setPet(petResponse.data);

        // Fetch vaccination details
        const vaccResponse = await axios.get(`http://localhost:3000/user/vaccinations/${id}`);
        setVaccinations(vaccResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAdoptpet = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/user/pets/${id}/adopt`, {
        adoptionStatus: "Pending", 
      });
      setPet(response.data);
      alert("Adoption process initiated successfully!");
    } catch (error) {
      console.error("Error during the adoption process:", error);
      alert(
        error.response?.data?.message || "Failed to initiate the adoption process."
      );
    }
  };


  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading pet details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!pet) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6">Pet not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, padding: 2 }}>
      <Card sx={{ display: "flex", flexDirection: "column", boxShadow: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Pet Image */}
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              sx={{
                borderRadius: 3,
                height: "100%",
                maxHeight: 350,
                objectFit: "cover",
              }}
              image={pet.image}
              alt={pet.name}
            />
          </Grid>

          {/* Pet Details */}
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {pet.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Breed:</strong> {pet.breed}
                <br />
                <strong>Age:</strong> {pet.age} years
                <br />
                <strong>Gender:</strong> {pet.gender}
                <br />
                <strong>Uploaded on:</strong> {new Date(pet.createdAt).toLocaleDateString()}
                <br />
                <Typography width={80}
                  variant="body2"
                  marginTop={3}
                  style={{
                    backgroundColor:
                      pet.adoptionStatus === 'Adopted'
                        ? '#ffcdd2  '
                        : pet.adoptionStatus === 'Pending'
                          ? '#fff9c4'
                          : '#c8e6c9',
                    color:
                      pet.adoptionStatus === 'Adopted'
                        ? '#b71c1c'
                        : pet.adoptionStatus === 'Pending'
                          ? '#f57f17'
                          : '#2e7d32',
                    padding: '2px 8px',
                    borderRadius: '8px',
                  }}
                >
                  {pet.adoptionStatus}
                </Typography>
              </Typography>

              <Typography variant="h6" sx={{ mt: 3 }}>
                About {pet.gender === "Male" ? "him" : "her"},
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {pet.description}
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ mt: 4 }}>
                {pet.adoptionStatus === "Available" ? (
                  <Button
                    style={{ backgroundColor: 'green' }}
                    variant="contained"
                    onClick={()=>handleAdoptpet(pet._id)}
                    sx={{
                      px: 3,
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#fff",
                      borderRadius: "30px"
                    }}
                  >
                    Adopt {pet.name}
                  </Button>
                ):''
              }
              </Box>


            </CardContent>
          </Grid>
        </Grid>

        {/* Vaccination Details */}
        <Box sx={{ mt: 4, px: 4, py: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Vaccination Details
          </Typography>
          {vaccinations && vaccinations.length > 0 ? (
            <Grid container spacing={2}>
              {vaccinations.map((vacc, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                    <Typography variant="h6">{vacc.vaccineName}</Typography>
                    <Typography variant="body2" sx={{ color: "green" }}>
                      Vaccinated Date: {new Date(vacc.vaccinationDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "red" }}>
                      Due Date: {new Date(vacc.nextDueDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {vacc.vaccinationNotes}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No vaccination records available.
            </Typography>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default PetDetails;
