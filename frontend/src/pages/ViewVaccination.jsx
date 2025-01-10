import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const vaccinationData = [
  {
    id: 1,
    petName: "Buddy",
    date: "2024-12-01",
    vaccine: "Rabies Vaccine",
  },
  {
    id: 2,
    petName: "Luna",
    date: "2024-12-10",
    vaccine: "Distemper Vaccine",
  },
];

const ViewVaccination = () => (
  <Container maxWidth="lg">
    <Typography variant="h4" my={4} textAlign="center">
      View Vaccination Records
    </Typography>
    <Grid container spacing={4}>
      {vaccinationData.map((record) => (
        <Grid item xs={12} sm={6} md={4} key={record.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{record.petName}</Typography>
              <Typography variant="body2" color="textSecondary">
                Vaccine: {record.vaccine}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {record.date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default ViewVaccination;
