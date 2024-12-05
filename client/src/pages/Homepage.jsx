import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroBackgroundImage from "../assets/hero-background-image.jpg";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";
import campaignsData from "../assets/campaigns.json";

function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campañasDestacadas = campaignsData.filter(
    (campaña) => campaña.highlighted
  );

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
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: 8,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: "center",
            justifyContent: "space-around",
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            maxWidth: "1200px",
            height: "auto",
            padding: 3,
            borderRadius: 2,
            gap: 3,
            color: "black",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 2,
              padding: 3,
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontFamily: "Playfair Display, serif",
                fontSize: { xs: "2.5rem", md: "3rem" },
              }}
            >
              DonarAUnClick
            </Typography>
            <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
              Donde las donaciones llegan a su destino
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 2,
              padding: 3,
              maxWidth: "600px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              ¿Qué es DonarAUnClick?
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              <strong>DonarAUnClick</strong> es una plataforma que conecta
              personas con ONGs y servicios locales. Con un enfoque en la{" "}
              <strong>transparencia</strong> y la{" "}
              <strong>responsabilidad</strong>, trabajamos para hacer visibles
              los beneficios que aportan las donaciones.
            </Typography>
            <Button
              size="large"
              color="primary"
              variant="contained"
              component={Link}
              to="/campaigns"
              sx={{
                color: "primary.contrastText",
                margin: 1,
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                },
              }}
            >
              Haz tu primera donación
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Featured Campaigns */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Campañas destacadas
          </Typography>
          <Grid
            container
            spacing={3}
            pt={6}
            pb={6}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 3,
            }}
          >
            {campañasDestacadas.map((campaña, index) => (
              <CampaignCard
                key={index}
                campaña={campaña}
                onClickAction={() => handleOpenModal(campaña)}
              />
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
}

export default HomePage;
