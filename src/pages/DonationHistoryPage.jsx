import React from "react";
import Navbar from "../components/Navbar";
import { Container, List, ListItem, ListItemText } from "@mui/material";

function DonationHistoryPage() {
  const donations = [
    { id: 1, campaign: "Educación para Todos", amount: 50 },
    { id: 2, campaign: "Salud Accesible", amount: 30 },
  ];

  return (
    <>
      <Navbar />
      <Container>
        <List>
          {donations.map((donation) => (
            <ListItem key={donation.id}>
              <ListItemText
                primary={`${donation.campaign} - $${donation.amount}`}
                secondary="Gracias por tu apoyo."
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default DonationHistoryPage;
