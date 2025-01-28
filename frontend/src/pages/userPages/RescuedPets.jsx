import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const RescuedPets = () => {
  const { userid } = useParams();
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/rescues/${userid}`
        );
        setRescues(response.data.rescues);
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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rescued Pets
      </Typography>

      {rescues.length === 0 ? (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          No rescued pets found.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {rescues.map((rescue) => (
            <Card key={rescue._id} sx={{ width: 300 }}>
              {rescue.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={rescue.image}
                  alt={rescue.rescuetitle}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {rescue.rescuetitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Location:</strong> {rescue.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> {rescue.status}
                </Typography>
                {rescue.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 1 }}
                  >
                    {rescue.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RescuedPets;
