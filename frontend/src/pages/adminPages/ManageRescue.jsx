import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar, } from "@mui/x-data-grid";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageRescue = () => {

  const [rescueData, setRescueData] = useState([]);
  const [selectedRescue, setSelectedRescue] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const columns = [
    { field: '_id', headerName: 'Rescue ID', width: 150,},
    { field: 'rescuetitle', headerName: 'Rescue Title', width: 180,},
    {
      field: 'rescueinfoby',
      headerName: 'Rescued By',
      width: 180,
      renderCell: (params) =>params.row.username, // Accessing the `name` property
    },
    { field: 'createdAt', headerName: 'Rescue Date', width: 150,},
    { field: 'location', headerName: 'Location', width: 180},
    { field: 'description', headerName: 'Description', width: 250,},
    { field: 'status', headerName: 'Status', width: 250,},
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => updateStatus1(params.row._id, "Accepted")}
            style={{ marginRight: "10px" }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => updateStatus1(params.row._id, "Rejected")}
          >
            Reject
          </Button>
          <IconButton onClick={() => handleDelete(params.row._id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  
  

  const fetchRescueData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/rescues");
      setRescueData(
        response.data.rescues.map((rescue) => ({
        ...rescue,
        _id: rescue._id
      }))
    );
  }catch (error) {
    console.error("Error fetching rescue data:", error);
  }
};

  useEffect(() => {
    fetchRescueData();
  }, []);

   useEffect(() => {
      console.log(rescueData);
    }, [rescueData]);


    const updateStatus1 = async (rescueId, newStatus) => {
      try {
        const response = await axios.patch(`http://localhost:3000/admin/rescues/update-status/${rescueId}`, {
          status: newStatus
        });
        if (response.status == 200)
          fetchRescueData();
      } catch (error) {
        console.error(`Error updating status for rescue ID ${rescueId}:`, error);
      }
    };

    const handleDelete = (rescue) => {
      setSelectedRescue(rescue);
      setOpenDeleteDialog(true);
      console.log(selectedRescue)
    };

    const confirmDelete = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/admin/rescues/delete/${selectedRescue}`);
        setOpenDeleteDialog(false)
        setSelectedRescue(null);
        if (response == 200) {
          fetchRescueData();
        }
      } catch (error) {
        console.error("Error deleting rescuing:", error);
      }
    };

    return (
      <div>
         <TextField
            label="Search Rescue"
            variant="outlined"
            size="small"
            margin="normal"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={rescueData}
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
            Are you sure you want to delete {selectedRescue?.rescuetitle}'s rescue?
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

export default ManageRescue;
