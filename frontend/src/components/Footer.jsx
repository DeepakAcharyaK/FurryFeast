import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "grey.900",
        color: "white",
        textAlign: "center",
        py: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        FURRY FEASTS
      </Typography>
      <Typography variant="body2">
        123, Bejai Main Road, Near City Centre Mall
      </Typography>
      <Typography variant="body2">Mangalore, Karnataka - 575004</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Phone:{" "}
        <Link href="tel:+919876543210" color="#FFA500">
          +91 98765 43210
        </Link>
      </Typography>
      <Typography variant="body2">
        Email:{" "}
        <Link href="mailto:info@mangalorepethaven.com" color="#FFA500">
          info@mangalorepethaven.com
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
