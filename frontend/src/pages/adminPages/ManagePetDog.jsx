import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Typography,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Stack,
  MenuItem,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import Topbar from "../../components/adminComponents/Topbar";
import Sidebar from "../../components/adminComponents/Sidebar";

const genderOptions = ["Male", "Female"];
const adoptionStatusOptions = ["Available", "Adopted", "Pending"];

const ManagePetDog = () => {
  const [petDogData, setPetDogData] = useState([]);
  const [selectedPetDog, setSelectedPetDog] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openVaccinationDialog, setOpenVaccinationDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    vaccinated: "",
    description: "",
    adoptionStatus: "",
  });

  const [vaccinationData, setVaccinationData] = useState({
    petId: "",
    petName: "",
    vaccineName: "",
    vaccinationDate: "",
    nextDueDate: "",
    vaccinationNotes: "",
    status: "Completed",
  });

  useEffect(() => {
    fetchPetDogData();
  }, []);

  const fetchPetDogData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/pets");
      setPetDogData(response.data.pets);
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };

  const handleDelete = (petId) => {
    setSelectedPetDog(petId);
    setOpenDeleteDialog(true);
  };

  const handleEdit = (pet) => {
    setFormData(pet);
    setFileName(pet.image ? pet.image.split('/').pop() : "");
    setSelectedFile(null);
    setOpenAddDialog(true);
  };

  const handleVaccinationEdit = (pet) => {
    if (!pet || !pet._id) {
      console.error("Error: Pet data is missing or invalid", pet);
      return;
    }
    setSelectedPetDog(pet);
    setVaccinationData({
      petId: pet._id,
      petName: pet.name,
      vaccineName: "",
      vaccinationDate: "",
      nextDueDate: "",
      vaccinationNotes: "",
      status: "Completed",
    });
    setOpenVaccinationDialog(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVaccinationChange = (e) => {
    setVaccinationData({ ...vaccinationData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName("");
    }
  };

  const handleVaccinationSave = async () => {
    if (!selectedPetDog) {
      console.error("Error: No pet selected for vaccination.");
      return;
    }
    const vaccinationDataToSend = {
      petId: selectedPetDog?._id || "",
      petName: selectedPetDog?.name || "",
      vaccineName: vaccinationData.vaccineName,
      vaccinationDate: vaccinationData.vaccinationDate,
      nextDueDate: vaccinationData.nextDueDate,
      vaccinationNotes: vaccinationData.vaccinationNotes,
      status: vaccinationData.status,
    };
    if (
      !vaccinationDataToSend.petId ||
      !vaccinationDataToSend.vaccineName ||
      !vaccinationDataToSend.vaccinationDate
    ) {
      console.error("Error: Missing required fields", vaccinationDataToSend);
      return;
    }
    try {

      console.log(JSON.stringify(vaccinationDataToSend))

      const response = await fetch(
        `http://localhost:3000/admin/add/vaccinations/details/${selectedPetDog._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vaccinationDataToSend),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.error("Error saving vaccination details:", result);
      } else {
        setOpenVaccinationDialog(false);
        fetchPetDogData();
      }
    } catch (error) {
      console.error("Error in handleVaccinationSave:", error);
    }
  };

  const handlePetSave = async () => {
    try {
      const formDataToSend = new FormData();

      // Append all form fields except image
      for (const key in formData) {
        if (key !== 'image' && key !== '_id') {
          formDataToSend.append(key, formData[key]);
        }
      }

      // Append the image file if selected
      if (selectedFile) {
        formDataToSend.append('image', selectedFile);
      }

      const endpoint = formData._id
        ? `http://localhost:3000/admin/pets/edit/${formData._id}`
        : "http://localhost:3000/admin/pets";

      const method = formData._id ? 'put' : 'post';

      const response = await axios({
        method,
        url: endpoint,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200 || response.status === 201) {
        setOpenAddDialog(false);
        setSelectedPetDog(null);
        setSelectedFile(null);
        setFileName("");
        fetchPetDogData();
      }
    } catch (error) {
      console.error("Error saving pet details:", error);
    }
  };

  const handlePetDelete = async () => {
    if (!selectedPetDog) {
      console.error("Error: No pet selected for deletion");
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:3000/admin/pets/delete/${selectedPetDog}`
      );
      if (response.status === 200) {
        fetchPetDogData();
      }
      setOpenDeleteDialog(false);
      setSelectedPetDog(null);
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const columns = [
    {
      field: "image",
      headerName: "Profile",
      width: 100,
      renderCell: (params) => (
        <Avatar
          src={`http://localhost:3000${params.value}`}
          alt="Pet Image"
          sx={{ width: 50, height: 50, border: "2px solid #e0e0e0" }}
        />
      ),
      sortable: false,
      filterable: false,
    },
    { field: "name", headerName: "Pet Name", width: 150 },
    { field: "breed", headerName: "Breed", width: 130 },
    { field: "age", headerName: "Age", width: 50 },
    { field: "gender", headerName: "Gender", width: 100 },
    {
      field: "vaccinationDets",
      headerName: "Vaccinated",
      width: 140,
      renderCell: (params) =>
        params.row.vaccinationDets.length > 0 ? (
          <Stack spacing={0.5}>
            {params.row.vaccinationDets.map((vaccination, index) => (
              <Typography
                key={index}
                variant=""
                color={vaccination.status === "Completed" ? "success.main" : "warning.main"}
              >
                <strong>{vaccination.status}: {params.row.vaccinationDets.length}</strong>
              </Typography>
            ))}
          </Stack>
        ) : (
          <Typography variant="" color="red">
            Not vaccinated
          </Typography>
        ),
    },
    {
      field: "createdAt",
      headerName: "Date Added",
      width: 180,
      renderCell: (params) =>
        format(new Date(params.value), "dd/MM/yyyy"),
    },
    {
      field: "adoptionStatus",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        let color;

        switch (params.value) {
          case "Available":
            color = "success";
            break;
          case "Pending":
            color = "warning";
            break;
          case "Adopted":
            color = "error";
            break;
          default:
            color = "default";
        }

        return <Chip label={params.value} color={color} size="small" />;
      },
    }
    ,
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: "flex",
            height: "100%",
            padding:'2px 2px',
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            size="small"
            sx={{ bgcolor: "#e3f2fd" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row._id)}
            color="error"
            size="small"
            sx={{ bgcolor: "#ffebee" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => handleVaccinationEdit(params.row)}
            color="secondary"
            size="small"
            sx={{ bgcolor: "#f3e5f5" }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Stack>
      ),
      sortable: false,
      filterable: false,
      align: "center", // optional, aligns header content
      headerAlign: "center", // optional, aligns header label
    }

  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 },
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Topbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3, width: "80%", display: 'flex', justifyContent: 'space-evenly' }} >
        <Typography variant="h5" sx={{ fontWeight: "bold", flex: 1 }}>
          Manage Pets
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setFormData({
              name: "",
              breed: "",
              age: "",
              gender: "",
              image: "",
              vaccinated: "",
              description: "",
              adoptionStatus: "",
            });
            setFileName("");
            setSelectedFile(null);
            setOpenAddDialog(true);
          }}
          sx={{
            borderRadius: 2,
            fontWeight: 500,
          }}
        >
          Add Pet
        </Button>
      </Stack>
      <Card
        elevation={4}
        sx={{
          p: 2,
          width: "80%",
          bgcolor: "#fff",
          boxShadow: 'none'
        }}
      >
        <CardContent>
          <DataGrid
            rows={petDogData}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
            disableRowSelectionOnClick
            components={{ Toolbar: GridToolbar }}
          />
        </CardContent>
      </Card>

      {/* Add / Edit Pet Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>{formData._id ? "Edit Pet" : "Add Pet"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {["name", "breed", "age", "gender", "description", "adoptionStatus"].map((field, i) => (
              <Grid item xs={12} sm={field === "description" ? 12 : 6} key={i}>
                {field === "gender" || field === "adoptionStatus" ? (
                  <TextField
                    select
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formData[field]}
                    onChange={handleFormChange}
                  >
                    {(field === "gender" ? genderOptions : adoptionStatusOptions).map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formData[field]}
                    onChange={handleFormChange}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={handleImageUpload}
                />
              </Button>
              {fileName && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Selected file: {fileName}
                </Typography>
              )}
              {formData.image && !fileName && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Current image: {formData.image.split('/').pop()}
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handlePetSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Pet</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this pet?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handlePetDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Vaccination Dialog */}
      <Dialog open={openVaccinationDialog} onClose={() => setOpenVaccinationDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Vaccination Record</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                label="Vaccine Name"
                name="vaccineName"
                fullWidth
                value={vaccinationData.vaccineName}
                onChange={handleVaccinationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Vaccination Date"
                name="vaccinationDate"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={vaccinationData.vaccinationDate}
                onChange={handleVaccinationChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Next Due Date"
                name="nextDueDate"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={vaccinationData.nextDueDate}
                onChange={handleVaccinationChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="vaccinationNotes"
                fullWidth
                multiline
                rows={3}
                value={vaccinationData.vaccinationNotes}
                onChange={handleVaccinationChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenVaccinationDialog(false)}>Cancel</Button>
          <Button onClick={handleVaccinationSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagePetDog;