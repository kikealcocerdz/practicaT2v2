import React from "react";
import Navbar from "../components/Navbar";
import CampaignCard from "../components/CampaignCard";
import { Container, Grid } from "@mui/material";

function CampaignPage() {
  const campaigns = [
    {
      id: 1,
      title: "Educación para Todos",
      description: "Ayuda a niños a obtener educación.",
    },
    {
      id: 2,
      title: "Salud Accesible",
      description: "Financia tratamientos médicos.",
    },
    // Más campañas...
  ];

  const handleDonate = (campaignId) => {
    console.log(`Donaste a la campaña ${campaignId}`);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid container>
          {campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={campaign.id}>
              <CampaignCard
                title={campaign.title}
                description={campaign.description}
                onDonate={() => handleDonate(campaign.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default CampaignPage;
