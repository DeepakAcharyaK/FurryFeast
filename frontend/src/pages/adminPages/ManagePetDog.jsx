import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Typography, IconButton, Paper, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { format } from "date-fns";

const ManagePetDog = () => {
  const [petDogData, setPetDogData] = useState([]);
  const [selectedPetDog, setSelectedPetDog] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openVaccinationDialog, setOpenVaccinationDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    vaccinated: "",
    description: "",
    adoptionStatus: "",
  });
  const [vaccinationData, setVaccinationData] = useState({
    vaccineName: "",
    vaccinationDate: "",
    nextDueDate: "",
    vaccinationNotes: "",
    status: "Completed",
  });

  useEffect(() => {
    fetchPetDogData();
  }, []);

  const fetchPetDogData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/pets"); // Adjusted to the correct route
      setPetDogData(response.data.pets);
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };

  const handleDelete = (petId) => {
    setSelectedPetDog(petId);
    setOpenDeleteDialog(true);
  };

  const handleEdit = (pet) => {
    setFormData(pet);
    setOpenAddDialog(true);
  };

  const handleVaccinationEdit = (pet) => {
    setFormData(pet);
    setOpenVaccinationDialog(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVaccinationChange = (e) => {
    setVaccinationData({ ...vaccinationData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleVaccinationSave = async () => {
    try {
      await axios.post("http://localhost:3000/admin/Vaccinations/add", vaccinationData); // Corrected vaccination route
      setOpenVaccinationDialog(false);
      fetchPetDogData();
    } catch (error) {
      console.error("Error saving vaccination details:", error);
    }
  };

  const handlePetSave = async () => {
    try {
      await axios.post("http://localhost:3000/admin/pets", formData); // Corrected pet save route
      setOpenAddDialog(false);
      fetchPetDogData();
    } catch (error) {
      console.error("Error saving pet details:", error);
    }
  };

  const handlePetDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/pets/delete/${selectedPetDog}`); // Corrected pet delete route
      setOpenDeleteDialog(false);
      fetchPetDogData();
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const columns = [
    {
      field: "image",
      headerName: "Profile",
      width: 100,
      renderCell: (params) => (
        <Avatar src={`http://localhost:3000${params.value}`} alt="Pet Image" sx={{ width: 50, height: 50 }} />
      ),
    },
    { field: "name", headerName: "Pet Name", width: 150 },
    { field: "breed", headerName: "Breed", width: 130 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "vaccinationDets", headerName: "Vaccinated", width: 140,
      renderCell: (params) =>
        params.row.vaccinationDets.length > 0? (
          params.row.vaccinationDets.map((vaccination, index) => (
            <div key={index}>
              <strong>{vaccination.vaccineName}:</strong>{vaccination.status}
            </div>
          ))
        ) : (
          "No vaccinations"
        ),
     },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "createdAt",
      headerName: "Date Added",
      width: 180,
      renderCell: (params) => format(new Date(params.value), "dd/MM/yyyy"),
    },
    { field: "adoptionStatus", headerName: "Status", width: 140 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)} color="error">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleVaccinationEdit(params.row)} color="secondary">
            <AddCircleOutlineIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>Manage Pet Dogs</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={() => setOpenAddDialog(true)}
        sx={{ mb: 2 }}
      >
        Add Pet
      </Button>
      <Paper elevation={3} sx={{ p: 2, width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={petDogData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </Paper>

      {/* Add Pet Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Pet Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Pet Name"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Breed"
                fullWidth
                name="breed"
                value={formData.breed}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                fullWidth
                name="age"
                type="number"
                value={formData.age}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Gender"
                fullWidth
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="outlined" component="span">Upload Image</Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adoption Status"
                fullWidth
                name="adoptionStatus"
                value={formData.adoptionStatus}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handlePetSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Vaccination Details Dialog */}
      <Dialog open={openVaccinationDialog} onClose={() => setOpenVaccinationDialog(false)}>
        <DialogTitle>Enter Vaccination Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Vaccine Name"
                fullWidth
                name="vaccineName"
                value={vaccinationData.vaccineName}
                onChange={handleVaccinationChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Vaccination Date"
                fullWidth
                name="vaccinationDate"
                type="date"
                value={vaccinationData.vaccinationDate}
                onChange={handleVaccinationChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Next Due Date"
                fullWidth
                name="nextDueDate"
                type="date"
                value={vaccinationData.nextDueDate}
                onChange={handleVaccinationChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Vaccination Notes"
                fullWidth
                name="vaccinationNotes"
                value={vaccinationData.vaccinationNotes}
                onChange={handleVaccinationChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVaccinationDialog(false)}>Cancel</Button>
          <Button onClick={handleVaccinationSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this pet?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handlePetDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagePetDog;
