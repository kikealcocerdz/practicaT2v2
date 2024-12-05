import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import HomePage from "./pages/Homepage";
import CampaignDetails from "./pages/CampaignDetails";
import DonationHistoryPage from "./pages/DonationHistoryPage";
import CampaignPage from "./pages/CampaignPage";
import { DonationProvider } from "./context/DonationContext";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Cargar Stripe
const stripePromise = loadStripe("TU_CLAVE_PUBLICABLE_DE_STRIPE");

function App() {
  return (
    <DonationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/campaigns/:id" element={<CampaignDetails />} />
              <Route path="/campaigns" element={<CampaignPage />} />
              <Route path="/history" element={<DonationHistoryPage />} />
              <Route
                path="/campaigns/create"
                element={<CreateCampaignPage />}
              />
            </Routes>
          </Elements>
        </Router>
      </ThemeProvider>
    </DonationProvider>
  );
}

export default App;
