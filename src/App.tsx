import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography } from '@mui/material';
import { GradeCalculator } from './components/GradeCalculator/GradeCalculator';
import { theme } from './theme';

/**
 * Componente principal da aplicação
 * Fornece tema MUI e layout geral
 */
export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                mb: 1,
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              Calculadora de Notas
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: '1.1rem',
              }}
            >
              Calcule sua média de forma rápida e fácil
            </Typography>
          </Box>

          <GradeCalculator
            initialFormula="(P1 + P2) / 4 + (T1 + T2) / 4"
            passingGrade={6}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
