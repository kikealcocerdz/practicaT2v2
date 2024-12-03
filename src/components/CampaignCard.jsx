import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaña }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/campaigns/${campaña.id}`);
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
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {campaña.title}
        </Typography>
        <img
          src={campaña.image}
          alt={campaña.title}
          width="100%"
          height="100%"
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
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default CampaignCard;
