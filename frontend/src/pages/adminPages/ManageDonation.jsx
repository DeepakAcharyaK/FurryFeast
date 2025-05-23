import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageDonation = () => {
  const [donationData, setDonationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const columns = [
    { field: "_id", headerName: "Donation ID", width: 120 },
    { field: "donorname", headerName: "Donor Name", width: 180 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "donationdate", headerName: "Donation Date", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "paymentReference", headerName: "Payment Reference", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDelete(params.row._id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchDonationData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/donations");
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
        donation.donorname.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, donationData]);

  const updateStatus = async (donationId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:3000/admin/donations/update-status/${donationId}`, {
        status: newStatus,
      });
      if (response.status === 200) fetchDonationData();
    } catch (error) {
      console.error(`Error updating status for donation ID ${donationId}:`, error);
    }
  };

  const handleDelete = (donation) => {
    setSelectedDonation(donation);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/donations/delete/${selectedDonation}`);
      setOpenDeleteDialog(false);
      setSelectedDonation(null);
      if (response.status === 200) {
        fetchDonationData();
      }
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  return (
    <div>
      <TextField
        label="Search by Donor Name"
        variant="outlined"
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </div>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this donation?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageDonation;
