const express = require("express");
const cors = require("cors");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const CAMPAIGNS_FILE = path.join(
  __dirname,
  "../client/src/assets/campaigns.json"
);
const IMAGES_DIR = path.join(__dirname, "uploads");

// Crear directorio de uploads si no existe
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Servir archivos estáticos desde uploads
app.use("/uploads", express.static(IMAGES_DIR));

// Obtener todas las campañas
app.get("/api/campaigns", async (req, res) => {
  try {
    const data = await fsPromises.readFile(CAMPAIGNS_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Error al leer las campañas" });
  }
});

// Actualizar la cantidad recaudada de una campaña
app.put("/api/campaigns/:id/donate", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const data = await fsPromises.readFile(CAMPAIGNS_FILE, "utf8");
    const campaigns = JSON.parse(data);

    const campaign = campaigns.find((c) => c.id === parseInt(id));
    if (!campaign) {
      return res.status(404).json({ error: "Campaña no encontrada" });
    }

    campaign.raised += Number(amount);

    await fsPromises.writeFile(
      CAMPAIGNS_FILE,
      JSON.stringify(campaigns, null, 2)
    );
    res.json(campaign);
  } catch (error) {
    console.error("Error al actualizar la campaña:", error);
    res.status(500).json({ error: "Error al actualizar la campaña" });
  }
});

app.post("/api/campaigns", async (req, res) => {
  try {
    const campaignData = req.body;

    // Procesar imagen si está presente
    if (
      campaignData.imagePreview &&
      campaignData.imagePreview !== "https://placehold.co/200"
    ) {
      const base64Data = campaignData.imagePreview.split(";base64,").pop();
      const imageFileName = `campaign_${Date.now()}.jpg`;
      const imagePath = path.join(IMAGES_DIR, imageFileName);

      await fsPromises.writeFile(imagePath, base64Data, { encoding: "base64" });

      // Actualizar la ruta de la imagen a la URL completa
      campaignData.image = `http://localhost:3001/uploads/${imageFileName}`;
    } else {
      campaignData.image = "https://placehold.co/200";
    }

    delete campaignData.imagePreview;

    const data = await fsPromises.readFile(CAMPAIGNS_FILE, "utf8");
    const campaigns = JSON.parse(data);
    campaigns.push(campaignData);
    await fsPromises.writeFile(
      CAMPAIGNS_FILE,
      JSON.stringify(campaigns, null, 2)
    );

    res.status(201).json(campaignData);
  } catch (error) {
    console.error("Error al crear la campaña:", error);
    res.status(500).json({ error: "Error al crear la campaña" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
