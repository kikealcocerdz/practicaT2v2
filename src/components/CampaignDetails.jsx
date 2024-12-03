import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import campaignsData from "../assets/campaigns.json";

const CampaignDetails = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const { id } = useParams();

  // Resettear la posición de scroll cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Busca la campaña que coincida con el ID de la URL
  const campaign =
    campaignsData.find((c) => c.id === parseInt(id)) || campaignsData[0]; // Si no se encuentra, se usa la primera campaña

  // Calcula el porcentaje de progreso
  const progressPercentage = Math.round(
    (campaign.raised / campaign.goal) * 100
  );

  const handleDonate = () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Por favor, introduce un importe válido para donar.");
      return;
    }
    alert(`¡Gracias por donar $${donationAmount} a ${campaign.title}!`);
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
            src={campaign.image}
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
          <Typography variant="h6" gutterBottom>
            Progreso de la campaña
          </Typography>

          {/* Información del progreso */}
          <Typography variant="body1" gutterBottom>
            Meta: ${campaign.goal.toLocaleString()} <br />
            Recaudado: ${campaign.raised.toLocaleString()} <br />
            Faltante: ${(campaign.goal - campaign.raised).toLocaleString()}
          </Typography>

          {/* Barra de progreso accesible */}
          <Box
            sx={{
              width: "100%",
              mt: 2,
              mb: 1,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#2e7d32",
                  borderRadius: 5,
                },
              }}
              aria-label="Progreso de la campaña"
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </Box>

          {/* Porcentaje de progreso */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
            aria-live="polite"
          >
            {progressPercentage}% completado
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default CampaignDetails;
