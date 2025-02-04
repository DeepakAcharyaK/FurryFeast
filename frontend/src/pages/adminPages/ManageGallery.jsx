import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon

const ManageGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false); // State for edit dialog
  const [selectedFile, setSelectedFile] = useState(null);
  const [newDescription, setNewDescription] = useState(""); // State for new description

  const columns = [
    { 
      field: "image", 
      headerName: "Image", 
      width: 250, 
      renderCell: (params) => (
        <img src={params.value} alt="Gallery" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200, // Increase width for edit and delete buttons
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}> {/* Add handleEdit function here */}
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchGalleryData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/gallery");
      setGalleryData(response.data.gallery);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const handleDelete = (imageId) => {
    setSelectedImage(imageId);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/admin/gallery/delete/${selectedImage}`);
      setOpenDeleteDialog(false);
      setSelectedImage(null);
      fetchGalleryData();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleAddImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      // Capture the response from the POST request
      const response = await axios.post("http://localhost:3000/admin/gallery/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpenAddDialog(false);
      setSelectedFile(null);
      fetchGalleryData();
      // Log the successful response
      console.log('Image added successfully:', response.data);
    } catch (error) {
      // Catch and log any errors that occur during the image upload
      console.error("Error adding image:", error);
    }
  };

  const handleEdit = (image) => {
    setSelectedImage(image._id);  // Set the selected image ID
    setNewDescription(image.description);  // Set current description for editing
    setOpenEditDialog(true);  // Open the edit dialog
  };

  const handleUpdateDescription = async () => {
    try {
      await axios.put(`http://localhost:3000/admin/gallery/update/${selectedImage}`, { description: newDescription });
      setOpenEditDialog(false);
      setNewDescription("");
      fetchGalleryData();
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)} style={{ marginBottom: "10px" }}>
        Add Image
      </Button>
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          rows={galleryData}
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
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this image?
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

      {/* Dialog for Adding an Image */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            accept="image/*"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddImage} color="primary" disabled={!selectedFile}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Editing Description */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Description</DialogTitle>
        <DialogContent>
          <TextField
            label="Description"
            fullWidth
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateDescription} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageGallery;
