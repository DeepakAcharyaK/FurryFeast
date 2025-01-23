import React, { useState } from "react";
import { TextField, Button, Typography, Link, Container, Box, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar'

const Login = ({setIsloggedin,setRole}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateLogin = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (validateLogin()) {
      try {
        // Admin Login API Call
        if (email === "admin@gmail.com" && password === "admin") {
          const adminResponse = await axios.post(
            "http://localhost:3000/admin/login",
            { email, password },
            { withCredentials: true }
          );
  
          if (adminResponse.status === 200) {
            console.log("Admin login successful");
  
            const { token, isloggedin, role } = adminResponse.data;
  
            // Store admin details in localStorage
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("isloggedin", isloggedin);
            window.localStorage.setItem("role", role);
  
            setIsloggedin(isloggedin);
            setRole(role);
  
            // Navigate to admin routes
            navigate("/adminDashboard");
  
            // Clear email and password fields
            setEmail("");
            setPassword("");
  
            return; // Exit after successful admin login
          }
        }
  
        // User Login API Call
        const userResponse = await axios.post(
          "http://localhost:3000/user/login",
          { email, password },
          { withCredentials: true }
        );
  
        if (userResponse.status === 200) {
          console.log("User login successful");
  
          const { token, role, isloggedin, user } = userResponse.data;
  
          // Store user details in localStorage
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("role", role);
          window.localStorage.setItem("userid", user._id);
          window.localStorage.setItem("isloggedin", isloggedin);
  
          setIsloggedin(isloggedin);
          setRole(role);
  
          // Navigate to user routes
          navigate(`/${user._id}`);
  
          // Clear email and password fields
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.error("Login error:", error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
            <Link
              href="#"
              variant="body2"
              onClick={() => alert("Forgot Password feature coming soon!")}
            >
              Forgot password?
            </Link>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already a user?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{ cursor: "pointer", color: "blue", fontWeight: "bold" }}
              >
                Login
              </span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
