import React, { useState, useEffect } from "react";
import {Container,Typography,Card,CardMedia,CardContent,} from "@mui/material";
import Masonry from "@mui/lab/Masonry"; 
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";

import Navbar from '../../components/Navbar'

const ViewGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/gallery"); 
        if(response.status===200){
          console.log('fetched gallery details',response)
          setGalleryData(response.data.gallery);
        }
        setLoading(false);
      } catch (error) {
        error.status===404 && toast.warn(error.response.data.message);
        error.status===500  && toast.warn(error.response.data.message);
        console.error("Error fetching gallery data:", error);
        setLoading(false);
      }
    };
  
    fetchGalleryData();
  }, [])

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
      <Container maxWidth="lg" style={{ marginTop: '25px' }}>
        <Typography variant="h4" fontWeight={600} align="center"  >
          Gallery
        </Typography>
        <Typography variant="h6" my={2} textAlign="center" color="gray">
          Celebrate the joy of pets with our gallery—capturing heartwarming moments and cherished memories of our furry friends.
        </Typography>

        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {galleryData.map((item) => (
            <Card key={item._id} sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={`img${item._id}`}
                sx={{ borderRadius: 2 }}
              />
            </Card>
          ))}
        </Masonry>
      </Container>
      <ToastContainer/>
    </>
  );
};

export default ViewGallery;
