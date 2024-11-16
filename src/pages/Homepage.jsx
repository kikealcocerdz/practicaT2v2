import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@mui/material";

function HomePage() {
  return (
    <>
      <Navbar />
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1em" }}>
          Bienvenido a la Plataforma de Donaciones
        </Typography>
        <Typography variant="body1">
          Ayuda a las organizaciones benéficas a marcar la diferencia. Explora
          campañas activas, realiza donaciones y consulta tu historial.
        </Typography>
      </Container>
    </>
  );
}

export default HomePage;
