import { Box, Typography } from '@mui/material';

interface GradeBarProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  passingGrade?: number;
}

/**
 * Componente de barra visual para exibir notas
 * Inspira-se no design do print da Uniderp
 */
export function GradeBar({
  label,
  value,
  min = 0,
  max = 10,
  passingGrade = 6,
}: GradeBarProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const isApproved = value >= passingGrade;

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            minWidth: '60px',
            bgcolor: 'primary.main',
            color: 'white',
            p: 1.5,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
          }}
        >
          {label}
        </Box>

        <Box sx={{ flex: 1 }}>
          {/* Barra de fundo */}
          <Box
            sx={{
              width: '100%',
              height: '30px',
              bgcolor: '#E0E0E0',
              borderRadius: 1,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Barra preenchida */}
            <Box
              sx={{
                height: '100%',
                width: `${percentage}%`,
                bgcolor: isApproved ? 'success.main' : 'warning.main',
                borderRadius: 1,
                transition: 'width 0.3s ease',
              }}
            />

            {/* Indicador de nota mínima */}
            <Box
              sx={{
                position: 'absolute',
                left: `${((passingGrade - min) / (max - min)) * 100}%`,
                top: 0,
                height: '100%',
                width: '2px',
                bgcolor: 'secondary.main',
                opacity: 0.7,
              }}
            />
          </Box>

          {/* Nota e percentual */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 0.5,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {value.toFixed(1)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'secondary.main' }}>
              Mínima: {passingGrade}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
