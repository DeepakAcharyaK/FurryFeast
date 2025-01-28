import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {Box,Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,CircularProgress} from "@mui/material";

import Navbar from '../../components/Navbar'

const DonationsMade = () => {
  const { userid } = useParams();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/donations/${userid}`
        );
        setDonations(response.data.donations);
        setLoading(false);
      } catch (err) {
        toast.error('')
        setError(err.message || "Failed to fetch donations.");
        setLoading(false);
      }
    };

    fetchDonations();
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
        <Typography variant="h4" gutterBottom>
          Donations Made
        </Typography>

        {donations.length === 0 ? (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            No donations found.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Donor Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation._id}>
                    <TableCell>{donation.donorname}</TableCell>
                    <TableCell>{donation.contact}</TableCell>
                    <TableCell>{donation.amount}</TableCell>
                    <TableCell>{donation.currency}</TableCell>
                    <TableCell>{donation.description}</TableCell>
                    <TableCell>{donation.status}</TableCell>
                    <TableCell>
                      {new Date(donation.donationdate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <ToastContainer />
    </>
  )
}

export default DonationsMade