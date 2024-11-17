import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Click&Dona
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/campaigns">
          Campañas
        </Button>
        <Button color="inherit" component={Link} to="/history">
          Historial
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
