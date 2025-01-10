import React from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { LocalHospital } from "@mui/icons-material";

const vetData = [
  { id: 1, name: "Dr. Smith", specialty: "Veterinary Surgeon", contact: "123-456-7890" },
  { id: 2, name: "Dr. Taylor", specialty: "Animal Nutritionist", contact: "098-765-4321" },
];

const ViewVeterinary = () => (
  <Container maxWidth="sm">
    <Typography variant="h4" my={4} textAlign="center">
      Veterinary Contacts
    </Typography>
    <List>
      {vetData.map((vet) => (
        <ListItem key={vet.id}>
          <ListItemIcon>
            <LocalHospital />
          </ListItemIcon>
          <ListItemText
            primary={vet.name}
            secondary={`${vet.specialty} - Contact: ${vet.contact}`}
          />
        </ListItem>
      ))}
    </List>
  </Container>
);

export default ViewVeterinary;
