import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ image: null });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setGallery(response.data);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', form.image);

    try {
      if (editingId) {
        // Update existing gallery item
        await axios.put(`/api/gallery/${editingId}`, formData);
      } else {
        // Add new gallery item
        await axios.post('/api/gallery', formData);
      }
      fetchGallery();
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/gallery/${id}`);
      fetchGallery();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ image: null });
    setEditingId(null);
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  return React.createElement(Box, { sx: { padding: 4 } },
    React.createElement(Typography, { variant: "h4", gutterBottom: true }, 'Manage Gallery'),

    // Button to open upload dialog
    React.createElement(Button, {
      variant: "contained", color: "primary", onClick: () => setOpen(true), sx: { marginBottom: 2 }
    }, 'Add Image'),

    // Gallery list
    React.createElement(List, null,
      gallery.map(item =>
        React.createElement(ListItem, {
          key: item._id, sx: {
            display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9f9f9',
            marginBottom: 2, borderRadius: 2, padding: 2
          }
        },
          React.createElement(Box, { sx: { display: 'flex', alignItems: 'center' } },
            React.createElement('img', {
              src: item.image, alt: "Gallery Item", style: { width: 100, height: 100, marginRight: 16, borderRadius: 8 }
            }),
            React.createElement(ListItemText, { primary: `Uploaded By: ${item.uploadedBy}` })
          ),
          React.createElement(Box, null,
            React.createElement(IconButton, { color: "primary", onClick: () => handleEdit(item), sx: { marginRight: 1 } },
              React.createElement(Edit)
            ),
            React.createElement(IconButton, { color: "error", onClick: () => handleDelete(item._id) },
              React.createElement(Delete)
            )
          )
        )
      )
    ),

    // No data fallback
    gallery.length === 0 && React.createElement(Typography, { variant: "body1", color: "textSecondary", align: "center" }, 'No items in the gallery yet.'),

    // Popup for adding/editing images
    React.createElement(Dialog, { open: open, onClose: handleClose, fullWidth: true, maxWidth: "sm" },
      React.createElement(DialogTitle, null, editingId ? 'Edit Image' : 'Add Image'),
      React.createElement('form', { onSubmit: handleFormSubmit },
        React.createElement(DialogContent, null,
          React.createElement(Button, { variant: "contained", component: "label", sx: { marginTop: 2 } },
            'Upload Image',
            React.createElement('input', {
              type: "file", hidden: true, accept: "image/*", onChange: handleFileChange
            })
          )
        ),
        React.createElement(DialogActions, null,
          React.createElement(Button, { onClick: handleClose, color: "secondary" }, 'Cancel'),
          React.createElement(Button, { type: "submit", variant: "contained", color: "primary" },
            editingId ? 'Update' : 'Add')
        )
      )
    )
  );
};

export default ManageGallery;
