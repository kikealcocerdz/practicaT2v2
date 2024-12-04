import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import HomePage from "./pages/Homepage";
import CampaignDetails from "./pages/CampaignDetails";
import DonationHistoryPage from "./pages/DonationHistoryPage";
import CampaignPage from "./pages/CampaignPage";
import { DonationProvider } from "./context/DonationContext";

function App() {
  return (
    <DonationProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/campaigns/:id" element={<CampaignDetails />} />
            <Route path="/campaigns" element={<CampaignPage />} />
            <Route path="/history" element={<DonationHistoryPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </DonationProvider>
  );
}

export default App;
