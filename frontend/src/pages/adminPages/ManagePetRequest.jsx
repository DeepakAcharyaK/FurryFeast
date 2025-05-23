import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ManagePetRequest = () => {
  const [petRequestData, setPetRequestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPetDog, setSelectedPetDog] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const columns = [
    { field: "userId", headerName: "User ID", width: 120 },
    { field: "petId", headerName: "Pet ID", width: 180 },
    { field: "requestdate", headerName: "Request date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => updateStatus(params.row._id, "Accepted")}
            style={{ marginRight: "10px" }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => updateStatus(params.row._id, "Rejected")}
          >
            Reject
          </Button>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const fetcPetRequestData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/petrequests");
      setPetRequestData(response.data.petrequests);
      setFilteredData(response.data.petrequests);
    } catch (error) {
      console.error("Error fetching requested dog data:", error);
    }
  };

  useEffect(() => {
    fetcPetRequestData();
  }, []);

  useEffect(() => {
    setFilteredData(
      petRequestData.filter((pet) =>
        pet.userId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, petRequestData]);

  const updateStatus = async (petId, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:3000/admin/petrequests/update-status/${petId}`, {
        status: newStatus,
      });
      if (response.status === 200) fetcPetRequestData();
    } catch (error) {
      console.error(`Error updating status for requested pet ${petId}:`, error);
    }
  };

  const handleDelete = (pet) => {
    setSelectedPetDog(pet);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/petrequests/delete/${selectedPetDog}`);
      setOpenDeleteDialog(false);
      setSelectedPetDog(null);
      if (response.status === 200) {
        fetcPetRequestData();
      }
    } catch (error) {
      console.error("Error deleting requested pet :", error);
    }
  };

  return (
    <div>
      <TextField
        label="Search by User id"
        variant="outlined"
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </div>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this requested pet?
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

export default ManagePetRequest;
