import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0', // Azul más oscuro para mejor contraste
      contrastText: '#ffffff', // Texto blanco para buen contraste
    },
    secondary: {
      main: '#c62828', // Rojo más oscuro para mejor contraste
      contrastText: '#ffffff', // Texto blanco para buen contraste
    },
    background: {
      default: '#fafafa', // Fondo claro
      paper: '#ffffff', // Fondo de elementos como tarjetas
    },
    text: {
      primary: '#212121', // Texto principal (color oscuro)
      secondary: '#757575', // Texto secundario
    },
    action: {
      hover: 'rgba(21, 101, 192, 0.08)', // Hover accesible con fondo claro
    },
  },
  typography: {
    fontFamily: 'Playfair Display, serif',
    fontSize: 14, // Tamaño base accesible
    h1: {
      fontSize: '2.5rem', // Tamaño grande accesible
      fontWeight: 700,
      color: '#212121',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#212121',
    },
    body1: {
      fontSize: '1rem',
      color: '#212121',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#757575',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(21, 101, 192, 0.2)', // Hover accesible
          },
        },
      },
    },
  },
});

export default theme;
