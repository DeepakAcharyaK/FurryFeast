import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Navbar from "../../components/Navbar";

const AllRescueInfo = ({userid}) => {
    const [rescues, setRescues] = useState([]);
    const [user, setuser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchRescues = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/user/rescue/${userid}`
          );
          setRescues(response.data.rescues);
          setuser(response.data.rescues[0].rescueinfoby.username)
  
          setLoading(false);
        } catch (err) {
          setError(err.message || "Failed to fetch rescued pets.");
          setLoading(false);
        }
      };
  
      fetchRescues();
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
          All Rescue information given by <span style={{ color: '#0a6569' }}>{user}</span>
        </Typography>

        {rescues.length === 0 ? (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            No rescued pets found.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#c8cfcb" }}>
                  <TableCell>Sl.No</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rescues.map((rescue, index) => (
                  <TableRow key={rescue._id}>
                    <TableCell>{index + 1}</TableCell>
                    {
                      (rescue.image != null) ?
                        <TableCell
                          sx={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                          onClick={() => window.open(`http://localhost:3000${rescue.image}`, "_blank")}
                        >
                          View
                        </TableCell> 
                        :
                        <TableCell>Not Available</TableCell>
                    
                    }
                    <TableCell>{rescue.location}</TableCell>
                    <TableCell><span
                          style={{
                            backgroundColor:
                            rescue.status === "Rescued"? 
                                                  "#8df2a8"
                                                  : rescue.status === "Pending"?
                                                      "yellow"
                                                      : rescue.status === "InProgress"?
                                                           "#fff9c4"
                                                            : "#c8e6c9",
                            padding: "2px 8px",
                            borderRadius: "8px",
                          }}
                        >
                          {rescue.status}
                        </span></TableCell>
                    <TableCell>{rescue.rescuetitle}</TableCell>
                    <TableCell>
                      {new Date(rescue.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(rescue.createdAt).toLocaleTimeString()}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  )
}

export default AllRescueInfo