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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageWork = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');
  const [workData, setWorkData] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const columns = [
    { field: 'work_id', headerName: 'Work ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 180 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'assigned_to', headerName: 'Assigned To', width: 150 },
    { field: 'deadline', headerName: 'Deadline', width: 150 },
    { field: 'status', headerName: 'Status', width: 130 },
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

  const fetchWorkData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/work");
      setWorkData(response.data.map(work => ({
        ...work,
        id: work.work_id, // Ensure ID matches the data
      })));
    } catch (error) {
      console.error("Error fetching work data:", error);
    }
  };

  useEffect(() => {
    fetchWorkData();
  }, []);

  const handleEdit = (work) => {
    setTitle(work.title);
    setDescription(work.description);
    setAssignedTo(work.assigned_to);
    setDeadline(work.deadline);
    setStatus(work.status);
    setSelectedWork(work);
    setOpenDialog(true);
  };

  const handleDelete = (work) => {
    setSelectedWork(work);
    setOpenDeleteDialog(true);
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:3005/admin/work/add", { title, description, assignedTo, deadline, status });
      fetchWorkData();
    } catch (error) {
      console.error("Error adding work:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3005/work/update/${selectedWork.work_id}`, { title, description, assignedTo, deadline, status });
      fetchWorkData();
    } catch (error) {
      console.error("Error updating work:", error);
    }
  };

  const handleSubmit = async () => {
    if (selectedWork) {
      await handleUpdate();
    } else {
      await handleAdd();
    }
    setOpenDialog(false);
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setDeadline('');
    setStatus('');
    setSelectedWork(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3005/api/work/delete/${selectedWork.work_id}`);
      fetchWorkData();
      setOpenDeleteDialog(false);
      setSelectedWork(null);
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
        Add Work
      </Button>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={workData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedWork ? 'Update Work' : 'Add Work'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            label="Assigned To"
            type="text"
            fullWidth
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            fullWidth
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
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
            {selectedWork ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Delete Confirmation */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedWork?.title}?
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

export default ManageWork;
