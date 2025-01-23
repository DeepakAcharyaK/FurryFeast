import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageDonation = () => {
  const [donorName, setDonorName] = useState("");
  const [contact, setContact] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [donationData, setDonationData] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

     
      // donatedby: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref:'User'
      // },
      // status: {
      //     type: String,
      //     enum: ["Pending", "Accepted", "Rejected"],
      //     default: "Pending",
      // }
  const columns = [
    { field: "_id", headerName: "Donation ID", width: 120 },
    { field: "donorname", headerName: "Donor Name", width: 180 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "donationdate", headerName: "Donation Date", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "paymentReference", headerName: "Payment reference", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => updateStatus(params.row.donation_id, "Accepted")}
            style={{ marginRight: "10px" }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => updateStatus(params.row.donation_id, "Rejected")}
          >
            Reject
          </Button>
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
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
          id: donation.donation_id, // Ensure the key matches DataGrid's expectations
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

  const handleEdit = (donation) => {
    setDonorName(donation.donorname);
    setContact(donation.contact);
    setDonationDate(donation.donation_date);
    setDescription(donation.description);
    setStatus(donation.status);
    setSelectedDonation(donation);
    setOpenDialog(true);
  };

  const handleDelete = (donation) => {
    setSelectedDonation(donation);
    setOpenDeleteDialog(true);
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3005/api/donations/add", {
        donorName,
        contact,
        donationDate,
        description,
        status: "Pending",
      });
      fetchDonationData();
    } catch (error) {
      console.error("Error adding donation:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3005/api/donations/update/${selectedDonation.donation_id}`,
        {
          donorName,
          contact,
          donationDate,
          description,
          status,
        }
      );
      fetchDonationData();
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  };

  const handleSubmit = async () => {
    if (selectedDonation) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
    setOpenDialog(false);
    setDonorName("");
    setContact("");
    setDonationDate("");
    setDescription("");
    setStatus("");
    setSelectedDonation(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3005/api/donations/delete/${selectedDonation.donation_id}`
      );
      fetchDonationData();
      setOpenDeleteDialog(false);
      setSelectedDonation(null);
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  const updateStatus = async (donationId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:3005/api/donations/update-status/${donationId}`,
        { status: newStatus }
      );
      fetchDonationData();
    } catch (error) {
      console.error(`Error updating status for donation ID ${donationId}:`, error);
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

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedDonation ? "Update Donation" : "Add Donation"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Donor Name"
            type="text"
            fullWidth
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Contact"
            type="text"
            fullWidth
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Donation Date"
            type="date"
            fullWidth
            value={donationDate}
            onChange={(e) => setDonationDate(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedDonation ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedDonation?.donor_name}'s donation?
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

