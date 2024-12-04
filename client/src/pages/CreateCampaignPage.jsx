import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Navbar from "../components/Navbar";

function CreateCampaignPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    goal: "",
    image: "https://placehold.co/200",
    highlighted: false,
    impact: ["", "", ""],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "highlighted" ? checked : value,
    }));
  };

  const handleImpactChange = (index, value) => {
    const newImpact = [...formData.impact];
    newImpact[index] = value;
    setFormData((prev) => ({
      ...prev,
      impact: newImpact,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.goal) {
      setError("Por favor, completa todos los campos requeridos");
      return;
    }

    if (Number(formData.goal) <= 0) {
      setError("La meta de recaudación debe ser mayor que 0");
      return;
    }

    const newCampaign = {
      ...formData,
      id: Date.now(),
      raised: 0,
      goal: Number(formData.goal),
    };

    try {
      const response = await fetch("http://localhost:3001/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCampaign),
      });

      if (!response.ok) {
        throw new Error("Error al crear la campaña");
      }

      navigate("/campaigns");
    } catch (error) {
      setError("Error al crear la campaña. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Crear Nueva Campaña
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Título de la campaña"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Descripción corta"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Descripción completa"
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Meta de recaudación (€)"
              name="goal"
              type="number"
              value={formData.goal}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            {[0, 1, 2].map((index) => (
              <TextField
                key={index}
                fullWidth
                label={`Impacto ${index + 1}`}
                value={formData.impact[index]}
                onChange={(e) => handleImpactChange(index, e.target.value)}
                sx={{ mb: 2 }}
              />
            ))}

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.highlighted}
                  onChange={handleChange}
                  name="highlighted"
                />
              }
              label="Campaña destacada"
              sx={{ mb: 2 }}
            />

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate("/campaigns")}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Crear Campaña
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default CreateCampaignPage;
