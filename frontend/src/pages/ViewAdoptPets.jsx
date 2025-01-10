import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

const petsData = [
  { id: 1, name: "Buddy", breed: "Golden Retriever", image: "/pet1.jpg" },
  { id: 2, name: "Luna", breed: "Siberian Husky", image: "/pet2.jpg" },
];

const ViewAdoptPets = () => (
  <Container maxWidth="lg">
    <Typography variant="h4" my={4} textAlign="center">
      View Adoptable Pets
    </Typography>
    <Grid container spacing={4}>
      {petsData.map((pet) => (
        <Grid item xs={12} sm={6} md={4} key={pet.id}>
          <Card>
            <CardMedia component="img" height="180" image={pet.image} />
            <CardContent>
              <Typography variant="h6">{pet.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Breed: {pet.breed}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" fullWidth>
                Adopt
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default ViewAdoptPets;
