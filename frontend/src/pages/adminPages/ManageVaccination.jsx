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
  Box,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Topbar from "../../components/adminComponents/Topbar";
import Sidebar from "../../components/adminComponents/Sidebar";

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
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    { field: "petName", headerName: "Pet Name", flex: 1, minWidth: 150 },
    { field: "vaccineName", headerName: "Vaccine Name", flex: 1, minWidth: 130 },
    { field: "vaccinationDate", headerName: "Vaccination Date", flex: 1, minWidth: 130 },
    { field: "nextDueDate", headerName: "Next Due-Date", flex: 1, minWidth: 150 },
    { field: "vaccinationNotes", headerName: "Vaccination Notes", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row)}
            aria-label="edit"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row)}
            aria-label="delete"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const fetchVaccinationData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/vaccinations");
      setVaccinationData(response.data.vaccinations);
    } catch (error) {
      console.error("Error fetching vaccination data:", error);
    }
  };
  useEffect(() => {
    fetchVaccinationData();
  }, []);

  const handleEdit = (vaccination) => {
    setSelectedVaccination(vaccination);
    setFormValues({
      petName: vaccination.petName || "",
      vaccineName: vaccination.vaccineName || "",
      vaccinationDate: vaccination.vaccinationDate || "",
      nextDueDate: vaccination.nextDueDate || "",
      vaccinationNotes: vaccination.vaccinationNotes || "",
    });
    setOpenAddEditDialog(true);
  };

  const handleDelete = (vaccination) => {
    setSelectedVaccination(vaccination);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/vaccinations/delete/${selectedVaccination._id}`
      );
      fetchVaccinationData();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting vaccination:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedVaccination) {
        await axios.put(
          `http://localhost:3000/admin/vaccinations/edit/${selectedVaccination._id}`,
          formValues
        );
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

  // Filter data based on search query
  const filteredData = vaccinationData.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <Box sx={{ p: { xs: 1, md: 3 }, width:'100%', minHeight: "100vh" , mx: "auto",backgroundColor: "#f5f5f5",display:'flex',alignItems:'center',justifyContent:'center',mt:3}}> 
      <Topbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />

      <Paper  elevation={3} sx={{ p: 3,border:'none',boxShadow:'none',maxWidth: 1100,bgcolor: "#f4f6f8"}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            Manage Vaccinations
          </Typography>
        </Stack>
        <Box mb={2}>
          <TextField
            label="Search Vaccination"
            variant="outlined"
            size="small"
            width="20%"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={7}
            getRowId={(row) => row._id}
            components={{ Toolbar: GridToolbar }}
            sx={{
              borderRadius: 2,
              backgroundColor: "#fafbfc",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f0f4f8",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openAddEditDialog}
        onClose={() => setOpenAddEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedVaccination ? "Edit Vaccination" : "Add Vaccination"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Pet Name"
              name="petName"
              disabled="true"
              value={formValues.petName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Vaccine Name"
              name="vaccineName"
              value={formValues.vaccineName}
              onChange={handleInputChange}
              fullWidth
              required
            />
            <TextField
              label="Vaccination Date"
              name="vaccinationDate"
              type="date"
              value={formValues.vaccinationDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Next Due Date"
              name="nextDueDate"
              type="date"
              value={formValues.nextDueDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Vaccination Notes"
              name="vaccinationNotes"
              value={formValues.vaccinationNotes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEditDialog(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete vaccination for{" "}
          <b>{selectedVaccination?.petName}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageVaccination;
