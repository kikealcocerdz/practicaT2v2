import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function DonationModal({ open, onClose, campaign }) {
  const [donationAmount, setDonationAmount] = useState("");

  const handleDonate = () => {
    console.log(
      `Donación realizada: ${donationAmount}€ a la campaña ${campaign.nombre}`
    );
    alert(`¡Gracias por tu donación de ${donationAmount}€ a ${campaign.nombre}!`);
    setDonationAmount("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ marginTop: 1 }}>Donar a {campaign?.nombre}</DialogTitle>
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
            marginTop: 2,
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          paddingBottom: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleDonate}
          color="primary"
          variant="contained"
          disabled={!donationAmount}
        >
          Donar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DonationModal;
