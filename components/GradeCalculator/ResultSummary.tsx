'use client';

import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { GradeBar } from './GradeBar';
import type { StudentStatus } from '@/types';

interface ResultSummaryProps {
  average: number | null;
  status: StudentStatus;
  passingGrade: number;
  showResult: boolean;
}

/**
 * Componente que exibe o resultado final
 * Mostra média, situação e barra visual
 */
export function ResultSummary({
  average,
  status,
  passingGrade,
  showResult,
}: ResultSummaryProps) {
  if (!showResult || average === null) {
    return null;
  }

  const statusConfig = {
    approved: {
      label: 'Aprovado',
      color: 'success' as const,
    },
    needsExam: {
      label: 'Precisa de Exame',
      color: 'warning' as const,
    },
    notCalculated: {
      label: 'Cálculo Pendente',
      color: 'default' as const,
    },
  };

  const config = statusConfig[status];

  return (
    <Card sx={{ mb: 3, bgcolor: 'background.paper' }}>
      <CardContent>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
        >
          Resultado Final
        </Typography>

        <Box sx={{ mb: 2 }}>
          <GradeBar
            label="MF"
            value={average}
            passingGrade={passingGrade}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Média Final:
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {average.toFixed(1)}
            </Typography>
          </Box>
          <Chip
            label={config.label}
            color={config.color}
            variant="filled"
            sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}
          />
        </Box>

        {status === 'needsExam' && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: 'warning.light',
              borderRadius: 1,
              borderLeft: '4px solid',
              borderLeftColor: 'secondary.main',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              Sua média ficou abaixo de {passingGrade}. Você terá direito a exame!
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
