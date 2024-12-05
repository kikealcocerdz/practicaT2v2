import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, backgroundColor: "primary.main", height: "100%" }}>
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          sx={{
            color: "primary.contrastText", // Fuerza el texto a blanco
            "&:hover": {
              backgroundColor: "primary.dark", // Cambia el fondo al hacer hover
            },
          }}
        >
          <ListItemText
            primary="Inicio"
            sx={{ color: "inherit" }} // Asegura que herede el color del ListItem
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/campaigns"
          sx={{
            color: "primary.contrastText",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <ListItemText primary="Campañas" sx={{ color: "inherit" }} />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/history"
          sx={{
            color: "primary.contrastText",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <ListItemText primary="Historial" sx={{ color: "inherit" }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component={"header"}
        position="fixed"
        sx={{ backgroundColor: "primary.main", boxShadow: 3 }}
      >
        <Toolbar>
          {/* Logo o Nombre */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "primary.contrastText",
              fontWeight: "bold",
              "&:hover": {
                textDecoration: "underline",
                color: "primary.contrastText",
              },
            }}
          >
            DonarAUnClick
          </Typography>

          {/* Menú para pantallas grandes */}
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{
                color: "primary.contrastText",
                marginX: 1,
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                },
              }}
            >
              Inicio
            </Button>
            <Button
              component={Link}
              to="/campaigns"
              sx={{
                color: "primary.contrastText",
                marginX: 1,
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                },
              }}
            >
              Campañas
            </Button>
            <Button
              component={Link}
              to="/history"
              sx={{
                color: "primary.contrastText",
                marginX: 1,
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                },
              }}
            >
              Historial
            </Button>
          </Box>

          {/* Menú para pantallas pequeñas */}
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para dispositivos móviles */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;
