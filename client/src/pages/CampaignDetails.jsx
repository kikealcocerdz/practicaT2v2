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
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import campaignsData from "../assets/campaigns.json";
import { useDonations } from "../context/DonationContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CampaignDetails = () => {
  const { id } = useParams();
  const [donationAmount, setDonationAmount] = useState("");
  const [campaign, setCampaign] = useState(
    campaignsData.find((c) => c.id === parseInt(id)) || campaignsData[0]
  );
  const { addDonation } = useDonations();
  const [openModal, setOpenModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

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
      // Simulación de procesamiento de pago según método
      if (paymentMethod === "card") {
        if (!stripe || !elements) {
          throw new Error("Error de integración con Stripe.");
        }
        const cardElement = elements.getElement(CardElement);
        const mockToken = { id: `tok_mock_${Date.now()}` };
        console.log("Tarjeta procesada, token:", mockToken);
      } else if (paymentMethod === "paypal") {
        console.log("Procesando pago con PayPal...");
      } else if (paymentMethod === "googlepay") {
        console.log("Procesando pago con Google Pay...");
      }

      // Simular una petición al servidor
      const updatedRaised = campaign.raised + parseFloat(donationAmount);
      setCampaign((prev) => ({ ...prev, raised: updatedRaised }));

      addDonation({
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        amount: parseFloat(donationAmount),
        image: campaign.image,
      });

      setModalMessage({
        text: `¡Gracias por donar ${donationAmount}€ a ${campaign.title}!`,
        severity: "success",
      });
      setOpenModal(true);
      setDonationAmount("");
    } catch (error) {
      console.error("Error al procesar la donación:", error);
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
        role="main"
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
        {/* Formulario de Donación */}
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
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleDonate();
            }}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <TextField
              type="number"
              label="Introduce el importe (€)"
              variant="outlined"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              fullWidth
              required
            />

            {/* Métodos de Pago */}
            <Typography variant="h6">Selecciona un método de pago:</Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              row
              sx={{ justifyContent: "center", gap: 2 }}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Tarjeta"
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="PayPal"
              />
              <FormControlLabel
                value="googlepay"
                control={<Radio />}
                label="Google Pay"
              />
            </RadioGroup>

            {/* Mostrar campos según método de pago */}
            {paymentMethod === "card" && (
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: 2,
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                <CardElement />
              </Box>
            )}

            {paymentMethod === "paypal" && (
              <Typography variant="body2" color="text.secondary">
                Serás redirigido a PayPal para completar el pago.
              </Typography>
            )}

            {paymentMethod === "googlepay" && (
              <Typography variant="body2" color="text.secondary">
                Usa Google Pay para completar el pago.
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
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
