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
  useMediaQuery,
  Fab,
  Tooltip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Topbar from "../../components/adminComponents/Topbar";
import Sidebar from "../../components/adminComponents/Sidebar";

const ManageGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
          }}
        >
          <img
            src={
              params.value
                ? `http://localhost:3000${params.value}`
                : ""
            }
            alt="Gallery"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Box>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row._id)}
              size={isMobile ? "small" : "medium"}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const fetchGalleryData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/gallery"); 
      setGalleryData(response.data.data || []);
      console.log(response.data.data)
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
      let res=await axios.delete(
        `http://localhost:3000/admin/gallery/delete/${selectedImage}`
      );
      if(res.status===200){
        setOpenDeleteDialog(false);
        setSelectedImage(null);
        fetchGalleryData();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleAddImage = async () => {
    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      let res=await axios.post("http://localhost:3000/admin/gallery/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
      });

      if (res.status === 201) {
        setOpenAddDialog(false);
        setSelectedFile(null);
        fetchGalleryData();
      }
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Topbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 1, sm: 3 },
          py: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Typography  variant="h5" fontWeight={700}>
            Manage Gallery
          </Typography>
          {isMobile ? (
            <Tooltip title="Add Image">
              <Fab
                color="primary"
                size="medium"
                onClick={() => setOpenAddDialog(true)}
                sx={{ boxShadow: 2 }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
              sx={{
                borderRadius: 3,
                fontWeight: 600,
                px: 3,
                boxShadow: 2,
              }}
            >
              Add Image
            </Button>
          )}
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 2,
            p: { xs: 1, sm: 2 },
            height: { xs: 520, sm: 450 },
            width: "50%",
            overflow: "auto",
          }}
        >
          <DataGrid
            rows={galleryData}
            columns={columns}
            pageSize={isMobile ? 3 : 5}
            rowsPerPageOptions={[3, 5, 10]}
            getRowId={(row) => row._id}
            components={{
              Toolbar: GridToolbar,
            }}
            rowHeight={80}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "background.default",
                fontWeight: 700,
                fontSize: "1rem",
              },
              "& .MuiDataGrid-row": {
                bgcolor: "background.paper",
                transition: "background 0.2s",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              },
              "& .MuiDataGrid-cell": {
                py: 1,
              },
            }}
          />
        </Box>
      </Box>

      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Image</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Are you sure you want to delete this image?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Image Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Image</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1,
            }}
          >
            <Button
              variant="outlined"
              component="label"
              sx={{ alignSelf: "flex-start" }}
            >
              Select Image
              <input
                type="file"
                name="photo"
                hidden
                accept="image/*"
                multiple={false}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  } else {
                    setSelectedFile(null);
                  }
                }}
              />
            </Button>
            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenAddDialog(false)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddImage}
            color="primary"
            variant="contained"
            disabled={!selectedFile}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ManageGallery;
