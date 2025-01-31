import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  TextField,
  IconButton,
} from "@mui/material";
import { CiLocationOn } from "react-icons/ci";
import { Visibility, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const ViewWorks = ({ userid }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [workData, setWorkData] = useState([]);
  const navigate = useNavigate();

  // Fetch rescue works from API
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/rescues");
        setWorkData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching rescue works:", error);
      }
    };

    fetchWorks();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTakeWork = async (id) => {
    try {
      await axios.put(`http://localhost:3000/user/rescues/${id}/take/${userid}`);
      setWorkData((prevWorkData) =>
        prevWorkData.map((work) =>
          work._id === id ? { ...work, status: "InProgress" } : work
        )
      );
    } catch (error) {
      console.error("Error updating work status:", error);
    }
  };

  const filteredWorkData = workData.filter((work) =>
    work.rescuetitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box m={4} textAlign="center">
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Work for 🐕‍🦺Pets❤️, Not for🙅us
          </Typography>
          <Typography variant="h6" my={2} textAlign="center" color="gray">
            Giving every pet a second chance at love and care.
          </Typography>
        </Box>

        <Box mb={4} display="flex" justifyContent="center">
          <TextField
            variant="outlined"
            placeholder="Search work..."
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: "40%",
              borderRadius: "25px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px",
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {filteredWorkData.length > 0 ? (
            filteredWorkData.map((work) => {
              const url = work.image
              console.log(url)
              return (
                <Grid item xs={12} sm={6} md={4} key={work._id}>
                  <Card
                    sx={{
                      borderRadius: "15px",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                    }}
                  >
                    <CardMedia component="img" height="250" image={`http://localhost:3000${url}` || "/placeholder.jpg"} alt={work.rescuetitle} />
                    <CardContent>
                      <Typography variant="h6" fontWeight={500} >
                        {work.rescuetitle}
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        <CiLocationOn />{work.location}
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        Rescue information by: {work.rescueinfoby?.email || "N/A"}
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        Rescued by: {work.rescuedby?.email || "N/A"}
                      </Typography>
                      <Typography variant="caption" display="block" mt={1}>
                        Date: {new Date(work.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          mt: 1,
                          backgroundColor:
                            work.status === "Completed"
                              ? "#c8e6c9"
                              : work.status === "InProgress"
                                ? "#fff9c4"
                                : "#fdd835",
                          color:
                            work.status === "Completed"
                              ? "#2e7d32"
                              : work.status === "InProgress"
                                ? "#f57f17"
                                : "#d84315",
                          padding: "2px 8px",
                          borderRadius: "8px",
                          display: "inline-block",
                        }}
                      >
                        {work.status}
                      </Typography>
                    </CardContent>
                    {
                      work.status != 'Completed' && (
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            disabled={work.status === "InProgress"}
                            onClick={() => handleTakeWork(work._id)}
                          >
                            {work.status === "InProgress" ? "In Progress" : "Take Work"}
                          </Button>
                        </CardActions>
                      )
                    }
                  </Card>
                </Grid>
              )
            })
          ) : (
            <Box mt={4} textAlign="center" width="100%">
              <Typography variant="h6" color="gray">
                No work found matching your search.
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default ViewWorks;
