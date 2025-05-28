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
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Topbar from "../../components/adminComponents/Topbar";
import Sidebar from "../../components/adminComponents/Sidebar";

const ManagePetRequest = () => {
  const [petRequestData, setPetRequestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPetDog, setSelectedPetDog] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const columns = [
    { 
      field: "userId", 
      headerName: "User ID", 
      width: 120,
      renderCell: (params) => {
        const user=params.row.userId.username;
        return (
          <Typography variant="body2" sx={{display: 'flex', alignItems: 'center',width: '100%',height: '100%'}}>
            {user ? user : "N/A"}
          </Typography>
        );
      } 
    },
    { field: "petId", headerName: "Pet Name", width: 180,
      renderCell: (params) => {
        const user=params.row.petId.name;
        return (
          <Typography variant="body2" sx={{display: 'flex', alignItems: 'center',width: '100%',height: '100%'}}>
            {user ? user : "N/A"}
          </Typography>
        );
      }
     },
    { field: "requestdate", headerName: "Request Date", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            display: 'flex', alignItems: 'center',width: '100%',height: '100%',
            color:
              params.value === "Accepted"
                ? "success.main"
                : params.value === "Rejected"
                  ? "error.main"
                  : "warning.main",
            fontWeight: 600,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} sx={{display: 'flex', alignItems: 'center',width: '100%',height: '100%'}}>
          <IconButton
            color="success"
            onClick={() => updateStatus(params.row._id, "Accepted")}
            disabled={params.row.status === "Accepted"}
            aria-label="accept"
            size="small"
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => updateStatus(params.row._id, "Rejected")}
            disabled={params.row.status === "Rejected"}
            aria-label="reject"
            size="small"
          >
            <CancelIcon />
          </IconButton>
          <IconButton
            color="default"
            onClick={() => handleDelete(params.row._id)}
            aria-label="delete"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const fetchPetRequestData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/petrequests");
      setPetRequestData(response.data.petrequests || []);
      setFilteredData(response.data.petrequests || []);
    } catch (error) {
      setSnackbar({ open: true, message: "Error fetching data.", severity: "error" });
    }
  };

  useEffect(() => {
    fetchPetRequestData();
  }, []);

  useEffect(() => {
    setFilteredData(
      petRequestData.filter((pet) =>
        String(pet.userId || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, petRequestData]);

  const updateStatus = async (petId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/admin/petrequests/update-status/${petId}`,
        { status: newStatus }
      );
      if (response.status === 200) {
        setSnackbar({ open: true, message: `Status updated to ${newStatus}.`, severity: "success" });
        fetchPetRequestData();
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Error updating status.", severity: "error" });
    }
  };

  const handleDelete = (petId) => {
    setSelectedPetDog(petId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/admin/petrequests/delete/${selectedPetDog}`
      );
      setOpenDeleteDialog(false);
      setSelectedPetDog(null);
      if (response.status === 200) {
        setSnackbar({ open: true, message: "Request deleted.", severity: "success" });
        fetchPetRequestData();
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Error deleting request.", severity: "error" });
    }
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <Topbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Box elevation={3} sx={{ maxWidth: 1100, mx: "auto", p: 3, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" ,mt:3}}>

        <div className="top-container" style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Typography variant="h5" fontWeight={700} mb={2} color="">
            Manage Pet Requests
          </Typography>
          <TextField
            label="Search here..."
            variant="outlined"
            margin="normal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2, width: 300 }}
          />

        </div>

        <Box sx={{ height: 450, width: "100%", mt: 2 }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[7, 14, 21]}
            getRowId={(row) => row._id}
            components={{ Toolbar: GridToolbar }}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
              "& .MuiDataGrid-columnHeaders": { bgcolor: "primary.light" },
              "& .MuiDataGrid-row:hover": { bgcolor: "#f0f4ff" },
            }}
          />
        </Box>
      </Box>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this requested pet?</Typography>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManagePetRequest;