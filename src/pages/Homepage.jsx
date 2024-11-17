import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom configurado
import Navbar from "../components/Navbar";
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

function HomePage() {
  const campañas = [
    "Educación para todos",
    "Alimentos para familias",
    "Agua limpia",
  ];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/path-to-your-image.jpg')", // Cambia a la ruta de tu imagen
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          textAlign: "center",
          paddingTop: 8,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.8)", // Fondo translúcido para el contenido
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Campañas destacadas
          </Typography>
          <Grid2 container spacing={4} sx={{ mb: 4 }}>
            {campañas.map((campaña, index) => (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {campaña}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Una breve descripción sobre la campaña "{campaña}" para
                      destacar su importancia.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      component={Link}
                      to={`/campaigns/${index}`}
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
    </>
  );
}

export default HomePage;
