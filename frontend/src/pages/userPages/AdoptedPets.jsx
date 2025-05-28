import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

import Navbar from "../../components/Navbar";

const AdoptedPets = ({ userid }) => {
  const navigate = useNavigate();

  const [adoptedPets, setAdoptedPets] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdoptedPets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/adoptedPets/${userid}`
        );

        setAdoptedPets(response.data.alladoptedpets);
        setUser(response.data.alladoptedpets[0]?.userId?.username);

        setLoading(false);
      } catch (err) {
        console.log(err)
        toast.error("Failed to fetch adopted pets.");
        setError(err.message || "Failed to fetch adopted pets.");
        setLoading(false);
      }
    };

    fetchAdoptedPets();
  }, [userid]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />

      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          All Adopted Pets by <span style={{ color: "#0a6569" }}>{user}</span>
        </Typography>

        {adoptedPets.length === 0 ? (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            No adopted pets found.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#c8cfcb" }}>
                  <TableCell>Photo</TableCell>
                  <TableCell>Pet Name</TableCell>
                  <TableCell>Breed</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {

              }
              <TableBody>
                {adoptedPets.map((pet,key) => {
                  console.log(key,pet)
                  const {_id, name, breed, age, gender,image } = pet.petId;

                  return (
                    <TableRow key={_id}>
                      <TableCell>
                        <img
                          src={image? `http://localhost:3000${image}`: '/images/no-image.jpg'}
                          alt={name}
                          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }}
                        />
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{breed}</TableCell>
                      <TableCell>{age} years</TableCell>
                      <TableCell>{gender}</TableCell>
                      <TableCell>
                        <span
                          style={{
                            backgroundColor:
                              pet.status === "Approved"
                                ? "#8df2a8"
                                : pet.status === "Pending"
                                  ? "#fff9c4"
                                  : "#c8e6c9",
                            color:
                              pet.status === "Approved"
                                ? "#3c6e49"
                                : pet.status === "Pending"
                                  ? "#f57f17"
                                  : "#2e7d32",
                            padding: "2px 8px",
                            borderRadius: "8px",
                          }}
                        >
                          {pet.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(pet.requestdate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(pet.requestdate).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            backgroundColor: "blue",
                            color: "white",
                            cursor: "pointer",
                            padding: "2px 8px",
                            borderRadius: "8px",
                          }}
                          onClick={() => navigate(`/user/${userid}/adopt/pets/petdetails/${_id}`)}
                          variant="p"
                        >
                          View Details
                        </Typography>
                      </TableCell>


                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <ToastContainer />
    </>
  );
};

export default AdoptedPets;
