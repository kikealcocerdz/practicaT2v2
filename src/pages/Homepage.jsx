import React from "react";
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
  Grid2,
} from "@mui/material";
import Footer from "../components/Footer";

function HomePage() {
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
                opacity: 1,
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
              variant="p"
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
            bgcolor: "rgba(255, 255, 255, 0.8)", // Fondo translúcido para el contenido
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
          <Grid2
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
              <Grid2
                item
                xs={12}
                sm={6}
                md={4}
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
                      src={`https://placehold.co/200`}
                      alt={campaña.nombre}
                      width="100%"
                      height="100%"
                    />
                    <Typography variant="body2" color="text.secondary">
                      Una breve descripción sobre la campaña "
                      {campaña.descripcion}" para destacar su importancia.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      color="primary"
                      variant="contained"
                      component={Link}
                      to={`/campaigns/${campaña.id}`}
                    >
                      Donar ahora
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default HomePage;
