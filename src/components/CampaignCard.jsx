import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const CampaignCard = ({ id, nombre, descripcion, imagen }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        boxShadow: 3,
        width: "100%",
      }}
    >
      {/* Imagen de la campaña */}
      <Box
        sx={{
          width: "100%",
          height: 200,
          backgroundImage: `url(${imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Contenido de la campaña */}
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
      </CardContent>

      {/* Botón de acción */}
      <CardActions>
        <Button
          size="large"
          color="primary"
          variant="contained"
          component={Link}
          to={`/campaigns/${id}`}
          sx={{ margin: "0 auto" }}
        >
          Donar ahora
        </Button>
      </CardActions>
    </Card>
  );
};

export default CampaignCard;
