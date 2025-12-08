'use client';

import { TextField, Box } from '@mui/material';
import type { ChangeEvent } from 'react';
import { parseFormula } from '@/utils/parseFormula';

interface FormulaInputProps {
  formula: string;
  error: string;
  onChange: (formula: string) => void;
}

/**
 * Componente para entrada e validação da fórmula
 * Usa regex para validar caracteres e estrutura
 */
export function FormulaInput({ formula, error, onChange }: FormulaInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFormula = e.target.value;
    onChange(newFormula);
  };

  const validation = parseFormula(formula);

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Fórmula da Média"
        placeholder="Ex: (P1 + P2) / 4 + (T1 + T2) / 4"
        value={formula}
        onChange={handleChange}
        error={!validation.isValid && formula.length > 0}
        helperText={
          !validation.isValid && formula.length > 0 ? validation.error : error
        }
        multiline
        maxRows={2}
        variant="outlined"
      />
    </Box>
  );
}
