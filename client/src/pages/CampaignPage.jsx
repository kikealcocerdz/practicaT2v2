import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import campaignsData from "../assets/campaigns.json";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function CampaignPage() {
  return (
    <>
      <Navbar />
      <Box
        role="main"
        sx={{
          minHeight: "100vh",
          backgroundColor: "white",
          paddingTop: 8,
          paddingBottom: 4,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.8)",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "aliceblue",
            mb: 4,
            display: { xs: "flex", md: "block" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography variant="h4" component="h2">
              Todas las Campañas
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/campaigns/create"
              sx={{
                color: "primary.contrastText",
                marginX: 1,
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                },
              }}
            >
              Crear Nueva Campaña
            </Button>
          </Box>
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              display: {
                xs: "flex",
                sm: "grid",
              },
              gridTemplateColumns: {
                sm: "repeat(auto-fit, minmax(300px, 1fr))",
              },
            }}
          >
            {campaignsData.map((campaña, index) => (
              <Grid
                item
                key={index}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CampaignCard campaña={campaña} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default CampaignPage;
