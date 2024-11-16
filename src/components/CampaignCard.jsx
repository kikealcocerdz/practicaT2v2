import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

function CampaignCard({ title, description, onDonate }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "1em" }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1em" }}
          onClick={onDonate}
        >
          Donar
        </Button>
      </CardContent>
    </Card>
  );
}

export default CampaignCard;
