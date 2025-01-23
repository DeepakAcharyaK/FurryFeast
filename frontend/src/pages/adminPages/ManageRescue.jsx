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
  DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageRescue = () => {
  const [username, setUsername] = useState('');
  const [rescueId, setRescueId] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [rescueData, setRescueData] = useState([]);
  const [selectedRescue, setSelectedRescue] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const columns = [
    { 
      field: 'rescue_id', 
      headerName: 'Rescue ID', 
      width: 150,
      headerCellClassName: 'bold-header' // Applying custom class
    },
    { 
      field: 'username', 
      headerName: 'User Name', 
      width: 180,
      headerCellClassName: 'bold-header' 
    },
    { 
      field: 'image', 
      headerName: 'Image', 
      width: 180,
      headerCellClassName: 'bold-header' 
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      width: 250,
      headerCellClassName: 'bold-header' 
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      headerCellClassName: 'bold-header' 
    },
    { 
      field: 'rescue_date', 
      headerName: 'Rescue Date', 
      width: 150,
      headerCellClassName: 'bold-header' 
    },
    {
      field: 'actions',
      headerName: 'Actions',
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
  
  

  const fetchRescueData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/rescue");
      setRescueData(response.data.map(rescue => ({
        ...rescue,
        id: rescue.rescue_id, // Ensure ID matches the data
      })));
    } catch (error) {
      console.error("Error fetching rescue data:", error);
    }
  };

  useEffect(() => {
    fetchRescueData();
  }, []);

  const handleEdit = (rescue) => {
    setUsername(rescue.username);
    setRescueId(rescue.rescue_id);
    setImage(rescue.image);
    setDescription(rescue.description);
    setStatus(rescue.status);
    setSelectedRescue(rescue);
    setOpenDialog(true);
  };

  const handleDelete = (rescue) => {
    setSelectedRescue(rescue);
    setOpenDeleteDialog(true);
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3005/api/rescue/add", { username, rescueId, image, description, status });
      fetchRescueData();
    } catch (error) {
      console.error("Error adding rescue:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3005/api/rescue/update/${selectedRescue.rescue_id}`, { username, rescueId, image, description, status });
      fetchRescueData();
    } catch (error) {
      console.error("Error updating rescue:", error);
    }
  };

  const handleSubmit = async () => {
    if (selectedRescue) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
    setOpenDialog(false);
    setUsername('');
    setRescueId('');
    setImage('');
    setDescription('');
    setStatus('');
    setSelectedRescue(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3005/api/rescue/delete/${selectedRescue.rescue_id}`);
      fetchRescueData();
      setOpenDeleteDialog(false);
      setSelectedRescue(null);
    } catch (error) {
      console.error("Error deleting rescue:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Add Rescue
      </Button>

      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={rescueData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedRescue ? 'Update Rescue' : 'Add Rescue'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Rescue ID"
            type="text"
            fullWidth
            value={rescueId}
            onChange={(e) => setRescueId(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            {selectedRescue ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the rescue with ID {selectedRescue?.rescue_id}?
          </DialogContentText>
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

export default ManageRescue;
