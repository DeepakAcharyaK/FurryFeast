import React, { useEffect, useState } from "react";
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

const RescuedPets = ({ userid }) => {
  const [rescues, setRescues] = useState([]);
  const [user, setuser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/rescued/${userid}`
        );
        setRescues(response.data.rescues);
        // setuser(response.data.rescues[0].rescueinfoby.username)

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

  const handleAction=async(rescueid,action)=>{
    const response = await axios.patch(`http://localhost:3000/user/rescue/${rescueid}`,{action});
  }

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          All Rescued Pets
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
                  <TableCell>Action</TableCell>
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
                    <TableCell>
                      <span style={{
                        backgroundColor:
                          rescue.status === 'Completed'
                            ? '#8df2a8 '
                            : rescue.status === 'InProgress'
                              ? '#fff9c4'
                              : '#c8e6c9',
                        color:
                          rescue.status === 'Completed'
                            ? '#3c6e49'
                            : rescue.status === 'InProgress'
                              ? '#f57f17'
                              : '#2e7d32',
                        padding: '2px 8px',
                        borderRadius: '8px',
                      }}>{rescue.status}</span>
                    </TableCell>
                    <TableCell>{rescue.rescuetitle}</TableCell>
                    <TableCell>
                      {new Date(rescue.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(rescue.createdAt).toLocaleTimeString()}
                    </TableCell>

                    {
                      rescue.status != 'Completed' && (
                        <TableCell>
                          <button
                            onClick={() => handleAction(rescue._id, "done")}
                            style={{
                              backgroundColor: "#289e2b",
                              color: "white",
                              padding: "5px 10px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                              marginRight: "5px"
                            }}
                          >
                            Done
                          </button>

                          <button
                            onClick={() => handleAction(rescue._id, "cancel")}
                            style={{
                              backgroundColor: "#eb5468",
                              color: "white",
                              padding: "5px 10px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer"
                            }}
                          >
                            Cancel
                          </button>
                        </TableCell>
                      )
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default RescuedPets;
