import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import axios from "axios";

const petsData = [
  { id: 1, name: "Buddy", breed: "Golden Retriever", age: 3, image: "/pet1.jpg", description: "Friendly and energetic, loves playing fetch." },
  { id: 2, name: "Luna", breed: "Siberian Husky", age: 2, image: "/pet2.jpg", description: "Very intelligent and loves the snow." },
];

const PetDetailsModal = ({ open, pet, handleClose }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}
    >
      {pet ? (
        <>
          <Typography variant="h5" gutterBottom>
            {pet.name}
          </Typography>
          <img src={pet.image} alt={pet.name} style={{ width: "100%", borderRadius: "8px" }} />
          <Typography variant="body1" mt={2}>
            <strong>Breed:</strong> {pet.breed}
          </Typography>
          <Typography variant="body1" mt={1}>
            <strong>Age:</strong> {pet.age} years
          </Typography>
          <Typography variant="body2" mt={1}>
            <strong>Description:</strong> {pet.description}
          </Typography>
        </>
      ) : (
        <Typography variant="body1">No pet details available.</Typography>
      )}
    </Box>
  </Modal>
);

const ViewAdoptPets = () => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
    setIsModalOpen(false);
  };

  const handleRequestAdopt = async (petId) => {
    
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" my={4} textAlign="center">
        View Adoptable Pets
      </Typography>
      <Grid container spacing={4}>
        {petsData.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia component="img" height="200" image={pet.image} alt={pet.name} />
              <CardContent>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Breed: {pet.breed}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Age: {pet.age} years
                </Typography>
              </CardContent>
              <CardActions sx={{ flexDirection: "column", gap: 1 }}>
                <Button variant="contained" color="primary" fullWidth onClick={() => handleViewDetails(pet)}>
                  View More Details
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => handleRequestAdopt(pet.id)}
                >
                  Request Adopt
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <PetDetailsModal open={isModalOpen} pet={selectedPet} handleClose={handleCloseModal} />
    </Container>
  );
};

export default ViewAdoptPets;
