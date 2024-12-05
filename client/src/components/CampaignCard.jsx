import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaña }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(campaña?.image);

  const handleClick = () => {
    navigate(`/campaigns/${campaña.id}`);
  };

  const handleImageError = () => {
    setImageUrl("https://placehold.co/200");
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        height: 450, // Altura fija para uniformidad
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Espaciado uniforme entre contenido y acciones
        alignItems: "center",
        boxShadow: 3, // Sombra para un diseño limpio
        padding: 2, // Espaciado interno
        backgroundColor: "background.paper", // Fondo consistente con el tema
      }}
    >
      {/* Contenido de la Tarjeta */}
      <CardContent
        sx={{
          width: "100%",
          textAlign: "center", // Centrar texto
        }}
      >
        {/* Título */}
        <Typography variant="h6" component="div" gutterBottom>
          {campaña.title}
        </Typography>

        {/* Imagen */}
        <CardMedia
          component="img"
          height="180" // Altura fija para imágenes consistentes
          image={imageUrl}
          alt={campaña.title}
          onError={handleImageError}
          sx={{
            objectFit: "cover",
            width: "100%",
            borderRadius: 2, // Bordes redondeados para coherencia
          }}
        />

        {/* Descripción */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginTop: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3, // Máximo de líneas visibles
            WebkitBoxOrient: "vertical",
          }}
        >
          {campaña.description}
        </Typography>
      </CardContent>

      {/* Acciones */}
      <CardActions
        sx={{
          justifyContent: "center",
          width: "100%",
          paddingTop: 2,
        }}
      >
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={handleClick}
          to={`/campaigns/${campaña.id}`}
          sx={{
            color: "primary.contrastText",
            marginX: 1,
            "&:hover": {
              backgroundColor: "primary.dark",
              color: "primary.contrastText",
            },
          }}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
};

export default CampaignCard;
