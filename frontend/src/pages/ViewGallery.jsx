import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Navbar from "../components/Navbar";

const ViewGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/gallery"); // Replace with your actual API URL
        const data = await response.json();
        setGalleryData(data.gallery);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Navbar />
        <Typography variant="h6" textAlign="center" my={4}>
          Loading gallery...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Typography variant="h4" my={4} textAlign="center">
        View Gallery
      </Typography>
      <Grid container spacing={4}>
        {galleryData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={item.image} 
              />
              <CardContent>
                <Typography variant="h6">{item.imageTitle}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewGallery;
