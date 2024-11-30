import React, { useState } from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom configurado
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Footer from "../components/Footer";

function HomePage() {
  const [openModal, setOpenModal] = useState(false); // Estado para el modal
  const [selectedCampaign, setSelectedCampaign] = useState(null); // Campaña seleccionada
  const [donationAmount, setDonationAmount] = useState(""); // Monto de la donación

  const campañas = [
    {
      id: 1,
      nombre: "Educación para todos",
      descripcion:
        "Brindar acceso a la educación básica a niños en comunidades vulnerables.",
      imagen: "https://placehold.co/200",
    },
    {
      id: 2,
      nombre: "Alimentos para familias",
      descripcion:
        "Proveer alimentos esenciales a familias necesitadas en comunidades rurales.",
      imagen: "https://placehold.co/200",
    },
    {
      id: 3,
      nombre: "Agua limpia",
      descripcion:
        "Ayudar a construir sistemas de agua potable en regiones remotas.",
      imagen: "https://placehold.co/200",
    },
  ];

  // Manejar apertura del modal
  const handleOpenModal = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenModal(true);
  };

  // Manejar cierre del modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setDonationAmount("");
  };

  // Manejar donación
  const handleDonate = () => {
    console.log(
      `Donación realizada: ${donationAmount}€ a la campaña ${selectedCampaign.nombre}`
    );
    handleCloseModal();
    alert(`¡Gracias por tu donación de ${donationAmount}€ a ${selectedCampaign.nombre}!`);
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
              to="#campaigns"
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
            {campañas.map((campaña, index) => (
              <Grid
                item
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    display: "flex",
                    width: "75%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {campaña.nombre}
                    </Typography>
                    <img
                      src={campaña.imagen}
                      alt={campaña.nombre}
                      width="100%"
                      height="100%"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {campaña.descripcion}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={() => handleOpenModal(campaña)}
                    >
                      Donar ahora
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle
          sx={{ 
            marginTop: 1
          }}
        >Donar a {selectedCampaign?.nombre}</DialogTitle>
        <DialogContent>
          <TextField
            label="Cantidad a donar (€)"
            type="number"
            fullWidth
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            InputProps={{
              inputProps: { min: 1 },
            }}
            sx={{ 
              marginBottom: 1,
              marginTop: 2
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            paddingBottom: "16px", // Añade un margen inferior al contenedor de botones
            display: "flex",       // Habilitar flexbox
            justifyContent: "center", // Centrar horizontalmente
          }}
        >
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleDonate}
            color="primary"
            variant="contained"
            disabled={!donationAmount || donationAmount <= 0}
          >
            Confirmar donación
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </>
  );
}

export default HomePage;
