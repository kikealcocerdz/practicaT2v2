const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const CAMPAIGNS_FILE = path.join(
  __dirname,
  "../client/src/assets/campaigns.json"
);

// Obtiene todas las campañas
app.get("/api/campaigns", async (req, res) => {
  try {
    const data = await fs.readFile(CAMPAIGNS_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Error al leer las campañas" });
  }
});

// Actualiza la cantidad recaudada de una campaña
app.put("/api/campaigns/:id/donate", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const data = await fs.readFile(CAMPAIGNS_FILE, "utf8");
    const campaigns = JSON.parse(data);

    const campaign = campaigns.find((c) => c.id === parseInt(id));
    if (!campaign) {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }

    campaign.raised += Number(amount);

    await fs.writeFile(CAMPAIGNS_FILE, JSON.stringify(campaigns, null, 2));
    res.json(campaign);
  } catch (error) {
    console.error("Error al actualizar la campaña:", error);
    res.status(500).json({ error: "Error al actualizar la campaña" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
