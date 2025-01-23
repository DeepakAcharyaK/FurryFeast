import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
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

const ManageVolunteer = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState("");
  const [status, setStatus] = useState("");
  const [volunteerData, setVolunteerData] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const columns = [
    { field: "id", headerName: "Volunteer ID", width: 120 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "contact", headerName: "Contact", width: 180 },
    { field: "availability", headerName: "Availability", width: 150 },
    { field: "skills", headerName: "Skills", width: 200 },
    { field: "status", headerName: "Status", width: 130 },
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

  const fetchVolunteerData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/volunteers");
      setVolunteerData(
        response.data.map((volunteer) => ({
          ...volunteer,
          id: volunteer.volunteer_id, // Ensure ID matches the DataGrid's requirements
        }))
      );
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
    }
  };

  useEffect(() => {
    fetchVolunteerData();
  }, []);

  const handleEdit = (volunteer) => {
    setName(volunteer.name);
    setContact(volunteer.contact);
    setAvailability(volunteer.availability);
    setSkills(volunteer.skills);
    setStatus(volunteer.status);
    setSelectedVolunteer(volunteer);
    setOpenDialog(true);
  };

  const handleDelete = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setOpenDeleteDialog(true);
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3000/api/volunteers/add", {
        name,
        contact,
        availability,
        skills,
        status,
      });
      fetchVolunteerData();
    } catch (error) {
      console.error("Error adding volunteer:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/volunteers/update/${selectedVolunteer.volunteer_id}`,
        { name, contact, availability, skills, status }
      );
      fetchVolunteerData();
    } catch (error) {
      console.error("Error updating volunteer:", error);
    }
  };

  const handleSubmit = async () => {
    if (selectedVolunteer) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
    setOpenDialog(false);
    resetForm();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/volunteers/delete/${selectedVolunteer.volunteer_id}`
      );
      fetchVolunteerData();
      setOpenDeleteDialog(false);
      setSelectedVolunteer(null);
    } catch (error) {
      console.error("Error deleting volunteer:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setContact("");
    setAvailability("");
    setSkills("");
    setStatus("");
    setSelectedVolunteer(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
      >
        Add Volunteer
      </Button>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={volunteerData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedVolunteer ? "Update Volunteer" : "Add Volunteer"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            label="Availability"
            type="text"
            fullWidth
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Skills"
            type="text"
            fullWidth
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedVolunteer ? "Update" : "Add"}
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
          Are you sure you want to delete {selectedVolunteer?.name}?
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

export default ManageVolunteer;
