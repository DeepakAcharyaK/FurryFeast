import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, } from "@mui/x-data-grid";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageDonation = () => {

  const [donationData, setDonationData] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  const columns = [
    { field: "_id", headerName: "Donation ID", width: 120 },
    { field: "donorname", headerName: "Donor Name", width: 180 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "donationdate", headerName: "Donation Date", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "paymentReference", headerName: "Payment Reference", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "status", headerName: "Status", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => updateStatus(params.row._id, "Accepted")}
            style={{ marginRight: "10px" }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => updateStatus(params.row._id, "Rejected")}
          >
            Reject
          </Button>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchDonationData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/donations");
      setDonationData(
        response.data.donations.map((donation) => ({
          ...donation,
          email: donation.email
        }))
      );
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };

  useEffect(() => {
    fetchDonationData();
  }, []);

  useEffect(() => {
    console.log(donationData);
  }, [donationData]);

  const updateStatus = async (donationId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:3000/admin/donations/update-status/${donationId}`, {
        status: newStatus
      });
      if (response.status == 200)
        fetchDonationData();
    } catch (error) {
      console.error(`Error updating status for donation ID ${donationId}:`, error);
    }
  };

  const handleDelete = (donation) => {
    setSelectedDonation(donation);
    setOpenDeleteDialog(true);
    console.log(selectedDonation)
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/donations/delete/${selectedDonation}`);
      setOpenDeleteDialog(false)
      setSelectedDonation(null);
      if (response == 200) {
        fetchDonationData();
      }
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };



  return (
    <div>
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={donationData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>

      {/* Dialog for Delete Confirmation */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedDonation?.donorname}'s donation?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            color="secondary"
          >
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

