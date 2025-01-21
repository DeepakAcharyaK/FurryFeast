import React, { useState } from "react";
import { TextField, Button, Typography, Link, Container, Box, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Login = () => {
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
        const response = await axios.post(
          "http://localhost:3000/user/login",
          { email, password },
          { withCredentials: true }
        );
  
        if (response.status === 200) {
          const { token, role, isloggedin, user } = response.data;
          console.log("Login successful");
          console.log(`User_id:${user._id} Email:${user.email} Role:${user.role}`);
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("role", role);
          window.localStorage.setItem("isloggedin", isloggedin);
  
          // setIsloggedin(isloggedin);
          // setRole(role);
  
          navigate(`/${user._id}`);
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
