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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import campaignsData from "../assets/campaigns.json";
import { useDonations } from "../context/DonationContext";

const CampaignDetails = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [campaign, setCampaign] = useState(null);
  const { id } = useParams();
  const { addDonation } = useDonations();
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    text: "",
    severity: "success",
  });

  // Cargar los datos de la campaña
  useEffect(() => {
    const selectedCampaign =
      campaignsData.find((c) => c.id === parseInt(id)) || campaignsData[0];
    setCampaign(selectedCampaign);
  }, [id]);

  const handleDonate = async () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      setModalMessage({
        text: "Por favor, introduce un importe válido para donar.",
        severity: "error",
      });
      setOpenModal(true);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/campaigns/${campaign.id}/donate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: Number(donationAmount) }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al procesar la donación");
      }

      const updatedCampaign = await response.json();

      // Actualizar el estado local de la campaña
      setCampaign((prevCampaign) => ({
        ...prevCampaign,
        raised: updatedCampaign.raised,
      }));

      const donationData = {
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        amount: Number(donationAmount),
        image: campaign.image,
      };

      addDonation(donationData);
      setModalMessage({
        text: `¡Gracias por donar $${donationAmount} a ${campaign.title}!`,
        severity: "success",
      });
      setOpenModal(true);
      setDonationAmount("");
    } catch (error) {
      console.error("Error:", error);
      setModalMessage({
        text: "Hubo un error al procesar tu donación. Por favor, inténtalo de nuevo.",
        severity: "error",
      });
      setOpenModal(true);
    }
  };

  if (!campaign) return null;

  // Calcula el porcentaje de progreso
  const progressPercentage = Math.round(
    (campaign.raised / campaign.goal) * 100
  );

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

      {/* Modal accesible */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {modalMessage.severity === "success" ? "¡Donación Exitosa!" : "Aviso"}
        </DialogTitle>
        <DialogContent>
          <Alert
            severity={modalMessage.severity}
            id="alert-dialog-description"
            sx={{ mt: 1 }}
          >
            {modalMessage.text}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenModal(false)}
            autoFocus
            variant="contained"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default CampaignDetails;
