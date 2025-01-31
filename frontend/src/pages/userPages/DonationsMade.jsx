import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";

import Navbar from '../../components/Navbar'

const DonationsMade = ({ userid }) => {
  const navigate = useNavigate()

  const [donations, setDonations] = useState([]);
  const [user, setuser] = useState('');
  // const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/donations/${userid}`
        );

        // const paymentres = await axios.get(
        //   `http://localhost:3000/user/payment/${userid}`
        // );

        setDonations(response.data.donations);
        setuser(response.data.donations[0].donatedby.username)
        // setPayments(paymentres.data.Payments);

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
        <Typography variant="h5" fontWeight={600} gutterBottom>
          All Donations made by <span style={{ color: '#0a6569' }}>{user}</span>
        </Typography>

        {donations.length === 0 ? (
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            No donations found.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#c8cfcb' }}>
                  <TableCell>Donor Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {donations.map((donation, index) => (
                  <TableRow key={donation._id}>
                    <TableCell>{donation.donorname}</TableCell>
                    <TableCell>{donation.contact}</TableCell>
                    <TableCell>Rs. {donation.amount}</TableCell>
                    <TableCell>{donation.description}</TableCell>
                    <TableCell>
                      <span style={{
                        backgroundColor:
                          donation.status === 'Success'
                            ? '#8df2a8 '
                            : donation.status === 'Pending'
                              ? '#fff9c4'
                              : '#c8e6c9',
                        color:
                          donation.status === 'Success'
                            ? '#3c6e49'
                            : donation.status === 'Pending'
                              ? '#f57f17'
                              : '#2e7d32',
                        padding: '2px 8px',
                        borderRadius: '8px',
                      }}>{donation.status}</span>
                    </TableCell>
                    <TableCell>
                      {
                        (donation.status === 'Success') ?
                          <Typography
                            sx={{
                              backgroundColor: 'orange',
                              color: 'white',
                              cursor: 'pointer',
                              padding: '2px 8px',
                              borderRadius: '8px'
                            }}
                            onClick={() => window.open(`http://localhost:3000/uploads/pdf/Invoice_${donation._id}.pdf`, "_blank")}
                            variant="p"
                          >
                            Download
                          </Typography>
                          :
                          <Typography sx={{ backgroundColor: 'green', color: 'white', cursor: 'pointer', padding: '2px 8px', borderRadius: '8px' }} onClick={() => navigate(`/user/${userid}/donation/${donation._id}/payment/type/details`)} variant='p'>PayNow</Typography>
                      }
                    </TableCell>
                    <TableCell>
                      {new Date(donation.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(donation.updatedAt).toLocaleTimeString()}
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