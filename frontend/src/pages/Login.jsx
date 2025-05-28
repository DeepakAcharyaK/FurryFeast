import React, { useState } from "react";
import { TextField, Button, Typography, Link, Container, Box, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/Navbar'

const Login = ({ setIsloggedin, setRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateLogin = () => {
    const newErrors = {};
    if (!email) { newErrors.email = "Email is required."; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateLogin()) {
      try {
        if (email === "admin@gmail.com") {
          const adminResponse = await axios.post(
            "http://localhost:3000/admin/login",
            { email, password },
            { withCredentials: true }
          );

          if (adminResponse.status === 200) {
            console.log("Admin login successful");

            const { isloggedin, role } = adminResponse.data;


            window.localStorage.setItem("isloggedin", isloggedin);
            window.localStorage.setItem("role", role);

            setIsloggedin(isloggedin);
            setRole(role);

            navigate("/adminDashboard");

            setEmail("");
            setPassword("");

            return;
          }
        } else {
          const userResponse = await axios.post(
            "http://localhost:3000/user/login",
            { email, password },
            { withCredentials: true });

          if (userResponse.status === 200) {
            console.log("User login successful");
            toast.success('User login successful', { autoClose: 1000 })

            setTimeout(() => {
              const { token, role, isloggedin, user } = userResponse.data;

              window.localStorage.setItem("token", token);
              window.localStorage.setItem("role", role);
              window.localStorage.setItem("userid", user._id);
              window.localStorage.setItem("isloggedin", isloggedin);

              setIsloggedin(isloggedin);
              setRole(role);

              navigate(`/${user._id}`);

              setEmail("");
              setPassword("");

              return;
            }, 1000);
          }
        }

      } catch (error) {
        (error.response.data.message) && toast.error(error.response.data.message)
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
                Signup
              </span>
            </Typography>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </>

  );
};

export default Login;
