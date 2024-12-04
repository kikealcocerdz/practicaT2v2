import React, { useState } from "react";
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
  CardMedia,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import campaignsData from "../assets/campaigns.json";
import { useDonations } from "../context/DonationContext";

const CampaignDetails = () => {
  const { id } = useParams();
  const [donationAmount, setDonationAmount] = useState("");
  const [campaign, setCampaign] = useState(
    campaignsData.find((c) => c.id === parseInt(id)) || campaignsData[0]
  );
  const { addDonation } = useDonations();
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    text: "",
    severity: "success",
  });

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
        text: `¡Gracias por donar ${donationAmount}€ a ${campaign.title}!`,
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

  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/200";
  };

  if (!campaign) return null;

  // Calcula el porcentaje de progreso
  const actualPercentage = Math.round((campaign.raised / campaign.goal) * 100);

  // Máximo valor de la barra de progreso a 100
  const progressBarValue = Math.min(actualPercentage, 100);

  return (
    <>
      <Navbar />
      <Container
        maxWidth="md"
        sx={{
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
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
          <CardMedia
            component="img"
            src={campaign.image}
            alt={`${campaign.title} logo`}
            onError={handleImageError}
            sx={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <Typography variant="h4" fontWeight="bold">
            {campaign.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            {campaign.description}
          </Typography>
        </Box>

        {/* Detalles del impacto */}
        {(campaign.fullDescription ||
          campaign.impact.some((item) => item !== "")) && (
          <Card sx={{ width: "100%", boxShadow: 2, borderRadius: 2 }}>
            <CardContent>
              {campaign.fullDescription && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Descripción
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {campaign.fullDescription}
                  </Typography>
                </>
              )}

              {campaign.impact.some((item) => item !== "") && (
                <>
                  <Typography variant="h6" gutterBottom>
                    ¿Cómo ayuda tu donación?
                  </Typography>
                  <ul>
                    {campaign.impact.map(
                      (item, index) =>
                        item && (
                          <li key={index}>
                            <Typography variant="body1">{item}</Typography>
                          </li>
                        )
                    )}
                  </ul>
                </>
              )}
            </CardContent>
          </Card>
        )}

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 2,
              // Estilos responsivos
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: {
                xs: 1,
                sm: 2, // Mayor separación en pantallas medianas o mayores
              },
            }}
          >
            <TextField
              type="number"
              label="Introduce el importe (€)"
              variant="outlined"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              sx={{ width: "70%" }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDonate}
              sx={{
                padding: "10px 40px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Donar ahora
            </Button>
          </Box>
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
            mb: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Progreso de la campaña
          </Typography>

          {/* Información del progreso */}
          <Typography variant="body1" gutterBottom>
            Meta: {campaign.goal.toLocaleString()}€ <br />
            Recaudado: {campaign.raised.toLocaleString()}€ <br />
            Faltante:
            {Math.max(campaign.goal - campaign.raised, 0).toLocaleString()}€
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
              value={progressBarValue}
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
              aria-valuenow={progressBarValue}
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
            {actualPercentage}% completado
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
