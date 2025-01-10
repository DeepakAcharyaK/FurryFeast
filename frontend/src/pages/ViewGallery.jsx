import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const galleryData = [
  { id: 1, title: "Pet Rescue", image: "/gallery1.jpg" },
  { id: 2, title: "Adoption Drive", image: "/gallery2.jpg" },
];

const ViewGallery = () => (
  <Container maxWidth="lg">
    <Typography variant="h4" my={4} textAlign="center">
      View Gallery
    </Typography>
    <Grid container spacing={4}>
      {galleryData.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardMedia component="img" height="180" image={item.image} />
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default ViewGallery;
