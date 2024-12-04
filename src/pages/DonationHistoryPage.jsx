import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDonations } from "../context/DonationContext";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DonationHistoryPage() {
  const { donations, clearHistory } = useDonations();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClearHistory = () => {
    setOpenDialog(true);
  };

  const handleConfirmClear = () => {
    clearHistory();
    setOpenDialog(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "100vh", pt: 10, pb: 4 }}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4" component="h1">
              Historial de Donaciones
            </Typography>
            {donations.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClearHistory}
              >
                Limpiar Historial
              </Button>
            )}
          </Box>

          {donations.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography>Aún no has realizado ninguna donación.</Typography>
            </Paper>
          ) : (
            <List>
              {donations.map((donation) => (
                <ListItem
                  key={donation.id}
                  component={Paper}
                  sx={{ mb: 2, borderRadius: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar src={donation.image} alt={donation.campaignTitle} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${donation.campaignTitle}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          Monto: ${donation.amount}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2">
                          Fecha: {donation.date}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Container>
      </Box>

      {/* Diálogo de confirmación */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Confirmar borrado?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción eliminará permanentemente todo el historial de
            donaciones. ¿Estás seguro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmClear} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
}

export default DonationHistoryPage;
