import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroBackgroundImage from "../assets/hero-background-image.jpg";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";
import campaignsData from "../assets/campaigns.json";

function HomePage() {
  const [openModal, setOpenModal] = useState(false); // Estado para el modal
  const [selectedCampaign, setSelectedCampaign] = useState(null); // Campaña seleccionada

  // Conseguir campañas destacadas
  const campañas = campaignsData;
  const campañasDestacadas = campañas.filter((campaña) => campaña.highlighted);

  // Manejar apertura del modal
  const handleOpenModal = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenModal(true);
  };

  // Manejar cierre del modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Box
          marginTop={4}
          sx={{
            textAlign: "center",
            height: "60vh",
            width: "75vw",
            borderRadius: "15px",
            justifyContent: "center",
            gap: 8,
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${heroBackgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            color: "white",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              align="center"
              sx={{
                fontWeight: "bold",
                borderRadius: "15px",
                padding: "15px",
                fontFamily: "Playfair Display, serif",
              }}
            >
              DonarAUnClick
            </Typography>
            <Typography
              variant="h7"
              component="h3"
              align="center"
              gutterBottom
              sx={{
                marginTop: 1,
                padding: "10px",
              }}
            >
              Donde las donaciones llegan a su destino
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "15px",
              justifyContent: "center",
              padding: "50px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              width={"80%"}
              textAlign={"left"}
              fontWeight={"regular"}
              gutterBottom
            >
              ¿Qué es DonarAUnClick?
            </Typography>
            <Typography
              variant="body1"
              component="p"
              align="justify"
              gutterBottom
              sx={{ maxWidth: "80%" }}
            >
              <strong>DonarAUnClick</strong> es una plataforma que busca dar a
              las personas la oportunidad de donar a sus comunidades y a los
              servicios locales. Con un enfoque en la{" "}
              <strong>transparencia y la responsabilidad</strong>, nos permite
              hacer visibles los beneficios que aportan las donaciones. Nuestro
              trabajo es conectar a las distintas ONGs con las personas que
              desean ayudar.
            </Typography>
            <Button
              size="large"
              color="primary"
              variant="contained"
              component={Link}
              to="/campaigns"
              sx={{
                marginTop: 2,
                width: "80%",
                padding: "10px",
              }}
            >
              Haz tu primera donación
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "white",
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          textAlign: "center",
          paddingTop: 8,
        }}
      >
        <Container
          maxWidth="lg"
          id="campaigns"
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
            Campañas destacadas
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
            {campañasDestacadas.map((campaña, index) => (
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

      <Footer />
    </>
  );
}

export default HomePage;
