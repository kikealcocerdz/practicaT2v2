import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CampaignDetails = ({ match }) => {
  // Datos de ejemplo para la campaña. En producción, podrías cargar esto dinámicamente según el ID.
  const campaign = {
    id: match?.params?.id || "1",
    title: "Educación para todos",
    description:
      "Brindar acceso a la educación básica a niños en comunidades vulnerables. Tu donación se destinará a la compra de útiles escolares, uniformes, y mejoras en las instalaciones educativas.",
    logo: "https://via.placeholder.com/150", // Logo de la campaña
    impact: [
      "Cada $10 ayuda a comprar un libro escolar.",
      "Con $50 se puede proveer uniformes completos a un niño.",
      "Una donación de $100 puede mejorar un aula escolar.",
    ],
    raised: 6000,
    goal: 10000,
  };

  const [donationAmount, setDonationAmount] = useState("");

  const handleDonate = () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Por favor, introduce un importe válido para donar.");
      return;
    }
    alert(`¡Gracias por donar $${donationAmount}!`);
    // Aquí podrías integrar tu lógica para procesar la donación (API, backend, etc.).
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
          minHeight: "calc(100vh - 64px - 200px)",
        }}
      >
        {/* Encabezado de la campaña */}
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={campaign.logo}
            alt={`${campaign.title} logo`}
            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
          />
          <Typography variant="h4" fontWeight="bold">
            {campaign.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {campaign.description}
          </Typography>
        </Box>

        {/* Detalles del impacto */}
        <Card sx={{ width: "100%", boxShadow: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ¿Cómo ayuda tu donación?
            </Typography>
            <ul>
              {campaign.impact.map((item, index) => (
                <li key={index}>
                  <Typography variant="body1">{item}</Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Formulario de donación */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Contribuye a esta campaña</Typography>
          <TextField
            type="number"
            label="Introduce el importe ($)"
            variant="outlined"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            sx={{ width: "50%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleDonate}
            sx={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Donar ahora
          </Button>
        </Box>

        {/* Progreso de la campaña */}
        <Box
          sx={{
            width: "100%",
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
            textAlign: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h6">Progreso de la campaña</Typography>
          <Typography variant="body1">
            Meta: ${campaign.goal.toLocaleString()} <br />
            Recaudado: ${campaign.raised.toLocaleString()} <br />
            Faltante: ${(campaign.goal - campaign.raised).toLocaleString()}
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default CampaignDetails;
