import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  TextField,
  IconButton,
} from "@mui/material";
import { Visibility, Search } from "@mui/icons-material";

const workData = [
  {
    id: 1,
    title: "Rescue Mission in City Park",
    description: "Rescued 5 stray dogs and provided immediate care.",
    date: "2025-01-01",
    image: "/work1.jpg",
  },
  {
    id: 2,
    title: "Community Adoption Drive",
    description: "Organized an adoption event for 20 rescued pets.",
    date: "2024-12-15",
    image: "/work2.jpg",
  },
  {
    id: 3,
    title: "Vaccination Camp",
    description: "Vaccinated over 50 pets against common diseases.",
    date: "2024-11-20",
    image: "/work3.jpg",
  },
];

const ViewWorks = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWorkData = workData.filter((work) =>
    work.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      {/* Page Header */}
      <Box mb={4} textAlign="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          View Work
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Browse the list of all completed and ongoing works
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box mb={4} display="flex" justifyContent="center" alignItems="center">
        <TextField
          variant="outlined"
          placeholder="Search work..."
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "50%" }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <Search />
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* Work Grid */}
      <Grid container spacing={4}>
        {filteredWorkData.map((work) => (
          <Grid item xs={12} sm={6} md={4} key={work.id}>
            <Card elevation={3} sx={{ height: "100%" }}>
              {/* Work Image */}
              <CardMedia
                component="img"
                height="180"
                image={work.image}
                alt={work.title}
              />

              {/* Work Content */}
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {work.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {work.description.length > 100
                    ? work.description.substring(0, 100) + "..."
                    : work.description}
                </Typography>
                <Typography variant="caption" color="textSecondary" mt={1}>
                  Date: {work.date}
                </Typography>
              </CardContent>

              {/* Actions */}
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Visibility />}
                  onClick={() => alert(`Viewing details for: ${work.title}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results Found */}
      {filteredWorkData.length === 0 && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="textSecondary">
            No work found matching your search.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ViewWorks;
