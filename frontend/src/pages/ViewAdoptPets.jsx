import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar'

const ViewAdoptPets = () => {
  const {userid} = useParams();
  const [petsData, setPetsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/viewpets");
        console.log(response.data);
        setPetsData(response.data.data);
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };
    fetchPets();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/user/${userid}/adopt/pets/petdetails/${id}`);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{marginBottom:'10px'}}>
        <Typography variant="h3" my={4} fontWeight={700} textAlign="center">
          Find & adopt your pet dog
        </Typography>
        <Typography variant="h6" my={4} textAlign="center" color="gray">
          Search through our curated list of rescued dogs available for adoption and find the one that seems most compatible to you and your lifestyle.
        </Typography>
        <Grid container spacing={4}>
          {petsData.length > 0 ? (
            petsData.map((pet) => (
              <Grid item xs={12} sm={6} md={4} key={pet._id}>
                <Card onClick={() => handleCardClick(pet._id)} sx={{borderRadius:'25px',cursor:'pointer',boxShadow:'0 8px 32px 0 rgba(113, 113, 114, 0.37)'}}>
                  <CardMedia component="img" height="250" image={pet.image} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {pet.name}
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">
                          Breed:
                        </Typography>
                        <Typography variant="body2">{pet.breed}</Typography>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">
                          Age:
                        </Typography>
                        <Typography variant="body2">{pet.age}</Typography>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">
                          Gender:
                        </Typography>
                        <Typography variant="body2">{pet.gender}</Typography>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">
                          Status:
                        </Typography>
                        <Typography
                          variant="body2"
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
                      </div>
                    </div>
                  </CardContent>

                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No pets available for adoption at the moment.
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );

};

export default ViewAdoptPets;
