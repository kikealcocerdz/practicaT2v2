import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function DonationForm({ onSubmit }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(amount);
    setAmount("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: "2em" }}>
      <Typography variant="h6">Realizar una donación</Typography>
      <TextField
        label="Monto"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ marginBottom: "1em" }}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Donar
      </Button>
    </Box>
  );
}

export default DonationForm;
