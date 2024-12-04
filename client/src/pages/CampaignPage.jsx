import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";
import { Container, Typography, Grid, Box } from "@mui/material";
import DonationModal from "../components/DonationModal";
import campaignsData from "../assets/campaigns.json";

function CampaignPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleOpenModal = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "white",
          paddingTop: 8,
          paddingBottom: 4,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.8)",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "aliceblue",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Todas las Campañas
          </Typography>
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {campaignsData.map((campaña, index) => (
              <Grid
                item
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CampaignCard
                  campaña={campaña}
                  onClickAction={() => handleOpenModal(campaña)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <DonationModal
        open={openModal}
        onClose={handleCloseModal}
        campaign={selectedCampaign}
      />

      <Footer />
    </>
  );
}

export default CampaignPage;
