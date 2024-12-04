import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{
        top: "auto",
        bottom: 0,
        backgroundColor: "#333",
        padding: "1rem 0",
      }}
    >
      <Toolbar
        sx={{ flexDirection: "column", alignItems: "center", gap: "1rem" }}
      >
        <Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <IconButton
            color="inherit"
            href="https://www.facebook.com"
            target="_blank"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.twitter.com"
            target="_blank"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.instagram.com"
            target="_blank"
          >
            <InstagramIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: "#aaa", textAlign: "center", maxWidth: "600px" }}
        >
          Este sitio está diseñado para conectar personas con campañas
          solidarias. Promovemos la transparencia y el compromiso social.
          Contáctanos si tienes alguna duda o sugerencia.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#aaa", textAlign: "center", marginTop: "1rem" }}
        >
          © {new Date().getFullYear()} DonarAUnClick. Todos los derechos
          reservados.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
