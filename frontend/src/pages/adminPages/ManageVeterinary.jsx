import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
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
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Topbar from "../../components/adminComponents/Topbar";
import Sidebar from "../../components/adminComponents/Sidebar";

const initialFormValues = {
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
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ManageVeterinary = () => {
  const [veterinaryData, setVeterinaryData] = useState([]);
  const [selectedVeterinary, setSelectedVeterinary] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formValues, setFormValues] = useState(initialFormValues);

  const columns = useMemo(
    () => [
      { field: "name", headerName: "Name", flex: 1, minWidth: 140 },
      { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
      { field: "contact", headerName: "Contact", flex: 1, minWidth: 120 },
      { field: "clinicName", headerName: "Clinic Name", flex: 1, minWidth: 140 },
      { field: "clinicAddress", headerName: "Clinic Address", flex: 1, minWidth: 180 },
      { field: "specialization", headerName: "Specialization", flex: 1, minWidth: 120 },
      { field: "availability", headerName: "Availability", flex: 1, minWidth: 120 },
      { field: "location", headerName: "Location", flex: 1, minWidth: 120 },
      { field: "experience", headerName: "Experience", flex: 1, minWidth: 80 },
      { field: "ratings", headerName: "Ratings", flex: 1, minWidth: 80 },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 120,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => handleEdit(params.row)}
              color="primary"
              aria-label="edit"
              size="small"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(params.row)}
              color="error"
              aria-label="delete"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        ),
      },
    ],
    // eslint-disable-next-line
    []
  );

  const fetchVeterinaryData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/veterinaries");
      setVeterinaryData(response.data.Veterinaries || []);
    } catch (error) {
      console.error("Error fetching veterinary data:", error);
    }
  };

  useEffect(() => {
    fetchVeterinaryData();
  }, []);

  const handleEdit = (veterinary) => {
    setSelectedVeterinary(veterinary);
    setFormValues({ ...veterinary });
    setOpenAddEditDialog(true);
  };

  const handleDelete = (veterinary) => {
    setSelectedVeterinary(veterinary);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/veterinaries/delete/${selectedVeterinary._id}`
      );
      fetchVeterinaryData();
      setOpenDeleteDialog(false);
      setSelectedVeterinary(null);
    } catch (error) {
      console.error("Error deleting veterinary:", error);
    }
  };

  const handleAdd = () => {
    setFormValues(initialFormValues);
    setSelectedVeterinary(null);
    setOpenAddEditDialog(true);
  };

  const handleSave = async () => {
    try {
      if (selectedVeterinary) {
        await axios.put(
          `http://localhost:3000/admin/veterinaries/edit/${selectedVeterinary._id}`,
          formValues
        );
      } else {
        await axios.post(
          "http://localhost:3000/admin/veterinaries/add",
          formValues
        );
      }
      fetchVeterinaryData();
      setOpenAddEditDialog(false);
      setSelectedVeterinary(null);
    } catch (error) {
      console.error("Error saving veterinary:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Filter rows by name (case-insensitive)
  const filteredRows = useMemo(
    () =>
      veterinaryData.filter((row) =>
        row.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [veterinaryData, searchQuery]
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#F4F6F8", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Topbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, maxWidth: 1200, mx: "auto", backgroundColor: '#F4F6F8', boxShadow: 'none' }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" fontWeight={600}>
            Manage Veterinaries
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ borderRadius: 2, fontWeight: 500 }}
          >
            Add Veterinary
          </Button>
        </Stack>
        <Box mb={2} display="flex" alignItems="center" gap={1}>
          <SearchIcon color="action" />
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 250 }}
          />
        </Box>
        <Box sx={{ height: 400, width: "100%", bgcolor: "white", borderRadius: 2 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7, 15, 30]}
            getRowId={(row) => row._id}
            components={{ Toolbar: CustomToolbar }}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "primary.light",
                color: "primary.dark",
                fontWeight: 600,
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "primary.lighter",
              },
              border: 0,
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
          {selectedVeterinary ? "Edit Veterinary" : "Add Veterinary"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {Object.keys(initialFormValues).map((key) => (
              <TextField
                key={key}
                label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                name={key}
                value={formValues[key] || ""}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                size="small"
                type={key === "email" ? "email" : key === "ratings" || key === "experience" ? "number" : "text"}
              />
            ))}
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
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <b>{selectedVeterinary?.name}</b>?
          </Typography>
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

export default ManageVeterinary;
