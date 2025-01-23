import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry"; // Import Masonry
import Navbar from '../components/Navbar'

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
      <>
        <Navbar />
    <Container maxWidth="lg">
      <Typography variant="h4" my={4} textAlign="center">
        View Gallery
      </Typography>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {galleryData.map((item) => (
          <Card key={item._id} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={item.image}
              alt={item.description}
              sx={{ borderRadius: 2 }}
            />
          </Card>
        ))}
      </Masonry>
    </Container>
      </>
  );
};

export default ViewGallery;
