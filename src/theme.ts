import { createTheme } from '@mui/material/styles';

/**
 * Tema customizado da aplicação
 * Cores inspiradas no design da imagem de referência
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: '#26A69A', // Verde teal semelhante à imagem
      light: '#80CBC4',
      dark: '#00897B',
    },
    secondary: {
      main: '#FF9800', // Laranja para atenção/notas mínimas
      light: '#FFB74D',
      dark: '#F57C00',
    },
    success: {
      main: '#4CAF50', // Verde para aprovado
    },
    warning: {
      main: '#FF9800', // Laranja para aviso
    },
    error: {
      main: '#F44336', // Vermelho para reprovado
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});
