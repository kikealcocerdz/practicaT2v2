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
  const [imageUrl, setImageUrl] = useState(
    campaña?.image || "https://placehold.co/200"
  );

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
        height: "100%",
        display: "flex",
        width: "75%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ width: "100%" }}>
        <Typography variant="h6" component="div" gutterBottom>
          {campaña.title}
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={campaña.title}
          onError={handleImageError}
          sx={{
            objectFit: "cover",
            width: "100%",
            borderRadius: 1,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {campaña.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
};

export default CampaignCard;
