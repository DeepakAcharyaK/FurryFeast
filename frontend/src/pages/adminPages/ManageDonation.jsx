import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  TextField,
  Paper,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Topbar from "../../components/adminComponents/Topbar";
import Sidebar from "../../components/adminComponents/Sidebar";

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarExport />
  </GridToolbarContainer>
);

const ManageDonation = () => {
  const [donationData, setDonationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const columns = [
    { field: "donorname", headerName: "Donor Name", width: 180 },
    { field: "contact", headerName: "Contact", width: 150 },
    // { field: "donationdate", headerName: "Donation Date", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    // { field: "paymentReference", headerName: "Payment Reference", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <span
          style={{
            borderRadius:'5px',
            padding: "3px 4px",
            backgroundColor: params.value === "Success" ? "#e8f5e9" : "#fff3e0",
            color: params.value === "Success" ? "green" : "orange",
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {params.value}
        </span>
      ),
    },
  ];

  const fetchDonationData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/donations"
      );
      setDonationData(response.data.donations);
      setFilteredData(response.data.donations);
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };

  useEffect(() => {
    fetchDonationData();
  }, []);

  useEffect(() => {
    setFilteredData(
      donationData.filter((donation) =>
        donation.donorname
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, donationData]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        py: 4,
        px: { xs: 1, sm: 4 },
      }}
    >
      <Topbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Paper
        elevation={3}
        sx={{
          maxWidth: 1200,
          bgcolor: "#f4f6f8",
          mx: "auto",
          border: "none",
          boxShadow: "none",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={3} mt={2}>
          Manage Donations
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <TextField
            label="Search by Donor Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8, 16, 32]}
            getRowId={(row) => row._id}
            components={{ Toolbar: CustomToolbar }}
            sx={{
              bgcolor: "#fff",
              borderRadius: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#e3f2fd",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "#f4f6f8",
              },
            }}
          />
        </Box>
      </Paper>

    </Box>
  );
};

export default ManageDonation;
