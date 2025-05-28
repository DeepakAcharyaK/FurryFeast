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
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Topbar from "../../components/adminComponents/Topbar";
import Sidebar from "../../components/adminComponents/Sidebar";

const statusColors = {
  Accepted: "#4caf50",
  InProgress: "#ff9800",
  Rejected: "#f44336",
};

const ManageRescue = () => {
  const [rescueData, setRescueData] = useState([]);
  const [selectedRescue, setSelectedRescue] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width:900px)");

  const fetchRescueData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/rescues");
      setRescueData(
        response.data.rescues.map((rescue) => ({
          ...rescue,
          _id: rescue._id,
        }))
      );
      console.log(response)
    } catch (error) {
      console.error("Error fetching rescue data:", error);
    }
  };

  useEffect(() => {
    fetchRescueData();
  }, []);

  const updateStatus = async (rescueId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/admin/rescues/update-status/${rescueId}`,
        { status: newStatus }
      );
      if (response.status === 200) {
        setRescueData((prev) =>
          prev.map((item) =>
            item._id === rescueId ? { ...item, status: newStatus } : item
          )
        );
      }
    } catch (error) {
      console.error(`Error updating status for rescue ID ${rescueId}:`, error);
    }
  };

  const handleDelete = (rescue) => {
    setSelectedRescue(rescue);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/rescues/delete/${selectedRescue._id}`
      );
      setRescueData((prev) =>
        prev.filter((item) => item._id !== selectedRescue._id)
      );
      setOpenDeleteDialog(false);
      setSelectedRescue(null);
    } catch (error) {
      console.error("Error deleting rescue:", error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const filteredRows = rescueData.filter((row) =>
    row.rescuetitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      field: "rescuetitle",
      headerName: "Rescue Title",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "rescueinfoby",
      headerName: "Rescued By",
      flex: 1,
      minWidth: 120,
      valueGetter: (params) => params.row,
    },
    {
      field: "createdAt",
      headerName: "Rescue Date",
      flex: 1,
      minWidth: 120,
      // valueGetter: (params) =>
      // new Date(params.row.createdAt).toLocaleDateString(),
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 180,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        let color = statusColors[params.value] || "#757575";
        let icon = null;
        if (params.value === "Accepted")
          icon = <CheckCircleIcon sx={{ color, mr: 1 }} />;
        else if (params.value === "InProgress")
          icon = <HourglassEmptyIcon sx={{ color, mr: 1 }} />;
        else if (params.value === "Rejected")
          icon = <CancelIcon sx={{ color, mr: 1 }} />;
        return (
          <Box display="flex" width="100%" height="100%" alignItems="center" justifyContent="center">
            {icon}
            <Typography sx={{ color, fontWeight: 600 }}>
              {params.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            color="success"
            title="Accept"
            onClick={() => updateStatus(params.row._id, "Accepted")}
          >
            <ThumbUpIcon />
          </IconButton>
          <IconButton
            color="warning"
            title="Reject"
            onClick={() => updateStatus(params.row._id, "Rejected")}
          >
            <ThumbDownIcon />
          </IconButton>
          <IconButton
            color="error"
            title="Delete"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f6fa" }}>
      <Sidebar isOpen={isSidebarOpen} />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar toggleSidebar={toggleSidebar} />
        <Box
          sx={{
            p: isMobile ? 1 : 4,
            pt: 3,
            width: "100%",
            maxWidth: 1400,
            mx: "auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              Manage Rescue Requests
            </Typography>
            <TextField
              label="Search Rescue"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ maxWidth: 300 }}
            />
          </Box>
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              height: "100%",
              minHeight: 400,
              p: isMobile ? 1 : 3,
            }}
          >
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row._id}
              components={{
                Toolbar: GridToolbar,
              }}
              autoHeight
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  bgcolor: "#f0f0f0",
                  fontWeight: 700,
                },
                "& .MuiDataGrid-row": {
                  bgcolor: "#fafbfc",
                },
              }}
            />
          </Box>
        </Box>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete{" "}
            <b>{selectedRescue?.rescuetitle}</b>'s rescue?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ManageRescue;
