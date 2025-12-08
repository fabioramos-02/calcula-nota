import { TextField, Box } from '@mui/material';
import type { ChangeEvent } from 'react';
import type { GradeValues } from '../../types';

interface GradeFieldsProps {
  variables: string[];
  grades: GradeValues;
  onChange: (variableName: string, value: string) => void;
}

/**
 * Componente que renderiza campos de nota para cada variável
 * Valida entrada entre 0 e 10 com suporte a decimais
 */
export function GradeFields({
  variables,
  grades,
  onChange,
}: GradeFieldsProps) {
  const handleChange = (variable: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Permite vazio ou números entre 0 e 10 com até 1 casa decimal
    if (value === '') {
      onChange(variable, '');
      return;
    }

    const numValue = parseFloat(value);
    if (!Number.isNaN(numValue) && numValue >= 0 && numValue <= 10) {
      onChange(variable, value);
    }
  };

  if (variables.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
      {variables.map((variable) => (
        <TextField
          key={variable}
          fullWidth
          label={variable}
          type="number"
          inputProps={{
            min: '0',
            max: '10',
            step: '0.1',
          }}
          value={grades[variable] || ''}
          onChange={handleChange(variable)}
          variant="outlined"
          placeholder="0-10"
          error={
            grades[variable] !== '' &&
            (parseFloat(String(grades[variable])) < 0 ||
              parseFloat(String(grades[variable])) > 10)
          }
        />
      ))}
    </Box>
  );
}
