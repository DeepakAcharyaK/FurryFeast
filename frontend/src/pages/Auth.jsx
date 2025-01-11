import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({}); // Store field errors

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate fields
  const validateFields = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        if (isLogin) {
          console.log("Login data:", formData);
          const response = await axios.post("http://localhost:3000/user/login", {
            email: formData.email,
            password: formData.password,
          });
          if (response.status === 200) {
            console.log("Login successful");
            navigate("/settings");
          }
        } else {
          console.log("Signup data:", formData);
          const response = await axios.post("http://localhost:3000/user/signup", {
            username:formData.username,
            email: formData.email,
            password: formData.password,
          });
          if (response.status === 201) {
            console.log("Signup successful");
          }
        }
        // Reset form data and close dialog
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
        onClose();
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isLogin ? "Login" : "Sign Up"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
        >
          {!isLogin && (
            <TextField
              label="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
            />
          )}
          {/* Email Field */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
          {/* Password Field */}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
          />
          {/* Confirm Password Field (Only for Signup) */}
          {!isLogin && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
            />
          )}
          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 2 }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          {/* Toggle Between Login and Signup */}
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 1, cursor: "pointer" }}
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Auth;
