import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003285', // Azul profundo para una apariencia profesional
      contrastText: '#FFFFFF', // Texto blanco para un alto contraste
    },
    secondary: {
      main: '#2E7D32', // Naranja brillante
      contrastText: '#ffffff', // Texto negro
    },

    background: {
      default: '#F5F5F5', // Gris claro para reducir la fatiga visual
      paper: '#FFFFFF', // Blanco para elementos de papel
    },
    text: {
      primary: '#333333', // Gris oscuro para el texto principal
      secondary: '#666666', // Gris medio para el texto secundario
    },
    typography: {
      fontFamily: 'Playfair Display, serif',
      fontSize: 14,
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#333333',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        color: '#333333',
      },
      body1: {
        fontSize: '1rem',
        color: '#333333',
      },
      body2: {
        fontSize: '0.875rem',
        color: '#666666',
      },
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "primary.dark",
            color: "primary.contrastText",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "primary.contrastText", // Texto blanco
          "&:hover": {
            backgroundColor: "#1565c0", // Fondo azul oscuro
          },
        },
      },
    },
  },
});

export default theme;
