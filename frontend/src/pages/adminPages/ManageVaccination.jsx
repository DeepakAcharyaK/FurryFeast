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

const ManageVaccination = () => {
  const [vaccinationData, setVaccinationData] = useState([]);
  const [selectedVaccination, setSelectedVaccination] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    petName: "",
    vaccineName: "",
    vaccinationDate: "",
    nextDueDate: "",
    vaccinationNotes: "",
  });

  const columns = [
    { field: "petName", headerName: "Pet Name", width: 200 },
    { field: "vaccineName", headerName: "Vaccine Name", width: 150 },
    { field: "vaccinationDate", headerName: "Vaccination Date", width: 150 },
    { field: "nextDueDate", headerName: "Next Due-Date", width: 200 },
    { field: "vaccinationNotes", headerName: "Vaccination Notes", width: 150 },

  ];

  const fetchVaccinationData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/vaccinations");
      setVaccinationData(response.data.vaccinations);
      console.log(vaccinationData)
    } catch (error) {
      console.error("Error fetching vaccination data:", error);
    }
  };
 
  useEffect(() => {
     // Fetch vaccination data
    fetchVaccinationData();
  }, []);

    useEffect(() => {
      console.log(vaccinationData);
    }, [vaccinationData]);

  const handleEdit = (vaccination) => {
    setSelectedVaccination(vaccination);
    setFormValues(vaccination);
    setOpenAddEditDialog(true);
  };

  const handleDelete = (vaccination) => {
    setSelectedVaccination(vaccination);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/vaccinations/delete/${selectedVaccination._id}`);
      fetchVaccinationData();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting vaccination:", error);
    }
  };

  const handleAdd = () => {
    setFormValues({
      petid:" ",
      petName: "",
      vaccineName: "",
      vaccinationDate: "",
      nextDueDate: "",
      vaccinationNotes: "",
    });
    setSelectedVaccination(null);
    setOpenAddEditDialog(true);
  };

  const handleSave = async () => {
    try {
      if (selectedVaccination) {
        // Update existing vaccination
        const response=await axios.put(
          `http://localhost:3000/admin/vaccinations/edit/${selectedVaccination._id}`,{
          formValues
        });
        console.log(response)
      } else {
        // Add new vaccination
        const response=await axios.post(
        "http://localhost:3000/admin/vaccinations/add",
        formValues
      );
        console.log(response)
      }

      fetchVaccinationData();
      setOpenAddEditDialog(false);
    } catch (error) {
      console.error("Error saving vaccination:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
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
          rows={vaccinationData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={openAddEditDialog} onClose={() => setOpenAddEditDialog(false)}>
        <DialogTitle>{selectedVaccination ? "Edit Vaccination" : "Add Vaccination"}</DialogTitle>
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
          Are you sure you want to delete {selectedVaccination?.name}?
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

export default ManageVaccination;
