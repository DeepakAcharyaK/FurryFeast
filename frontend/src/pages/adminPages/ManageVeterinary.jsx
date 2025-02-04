import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const ManageVeterinary = () => {
  const [veterinaryData, setVeterinaryData] = useState([]);
  const [selectedVeterinary, setSelectedVeterinary] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    clinicName: "",
    clinicAddress: "",
    specialization: "",
    availability: "",
    location: "",
    experience: "",
    ratings: "",
  });

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "clinicName", headerName: "Clinic Name", width: 150 },
    { field: "clinicAddress", headerName: "Clinic Address", width: 200 },
    { field: "specialization", headerName: "Specialization", width: 150 },
    { field: "availability", headerName: "Availability", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "experience", headerName: "Experience", width: 100 },
    { field: "ratings", headerName: "Ratings", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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

  const fetchVeterinaryData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/veterinaries");
      setVeterinaryData(response.data.Veterinaries);
      console.log(veterinaryData)
    } catch (error) {
      console.error("Error fetching veterinary data:", error);
    }
  };
 
  useEffect(() => {
     // Fetch veterinary data
    fetchVeterinaryData();
  }, []);

    useEffect(() => {
      console.log(veterinaryData);
    }, [veterinaryData]);

  const handleEdit = (veterinary) => {
    setSelectedVeterinary(veterinary);
    setFormValues(veterinary);
    setOpenAddEditDialog(true);
  };

  const handleDelete = (veterinary) => {
    setSelectedVeterinary(veterinary);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/veterinaries/delete/${selectedVeterinary._id}`);
      fetchVeterinaryData();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting veterinary:", error);
    }
  };

  const handleAdd = () => {
    setFormValues({
      name: "",
      email: "",
      contact: "",
      clinicName: "",
      clinicAddress: "",
      specialization: "",
      availability: "",
      location: "",
      experience: "",
      ratings: "",
    });
    setSelectedVeterinary(null);
    setOpenAddEditDialog(true);
  };

  const handleSave = async () => {
    try {
      if (selectedVeterinary) {
        // Update existing veterinary
        const response=await axios.put(
          `http://localhost:3000/admin/veterinaries/edit/${selectedVeterinary._id}`,{
          formValues
        });
        console.log(response)
      } else {
        // Add new veterinary
        const response=await axios.post(
          "http://localhost:3000/admin/veterinaries/add",{
          formValues,
        });
        console.log(response)
      }

      fetchVeterinaryData();
      setOpenAddEditDialog(false);
    } catch (error) {
      console.error("Error saving veterinary:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        style={{ marginBottom: "20px" }}
      >
        Add Veterinary
      </Button>
      <div>
      <TextField
        label="Search Veterinary"
        variant="outlined"
        size="small"
        margin="normal"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={veterinaryData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={openAddEditDialog} onClose={() => setOpenAddEditDialog(false)}>
        <DialogTitle>{selectedVeterinary ? "Edit Veterinary" : "Add Veterinary"}</DialogTitle>
        <DialogContent>
          {Object.keys(formValues).map((key) => (
            <TextField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              name={key}
              value={formValues[key]}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedVeterinary?.name}?
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

export default ManageVeterinary;
