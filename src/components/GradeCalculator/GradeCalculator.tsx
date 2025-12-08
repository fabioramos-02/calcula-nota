import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FormulaInput } from './FormulaInput';
import { GradeFields } from './GradeFields';
import { ResultSummary } from './ResultSummary';
import { parseFormula } from '../../utils/parseFormula';
import { evaluateFormula } from '../../utils/evaluateFormula';
import type { GradeValues, StudentStatus } from '../../types';

interface GradeCalculatorProps {
  initialFormula?: string;
  passingGrade?: number;
}

/**
 * Componente principal da Calculadora de Notas
 * Gerencia estado da fórmula, variáveis e cálculo de média
 */
export function GradeCalculator({
  initialFormula = '',
  passingGrade = 6,
}: GradeCalculatorProps) {
  const [formula, setFormula] = useState(initialFormula);
  const [variables, setVariables] = useState<string[]>([]);
  const [grades, setGrades] = useState<GradeValues>({});
  const [average, setAverage] = useState<number | null>(null);
  const [status, setStatus] = useState<StudentStatus>('notCalculated');
  const [formulaError, setFormulaError] = useState('');

  // Atualiza variáveis ao mudar fórmula
  useEffect(() => {
    const result = parseFormula(formula);

    if (result.isValid) {
      setVariables(result.variables);
      setFormulaError('');

      // Inicializa grades para novas variáveis
      const newGrades: GradeValues = {};
      result.variables.forEach((v) => {
        newGrades[v] = grades[v] || '';
      });
      setGrades(newGrades);
      setAverage(null);
      setStatus('notCalculated');
    } else {
      setVariables([]);
      setFormulaError(result.error);
      setAverage(null);
      setStatus('notCalculated');
    }
  }, [formula]);

  // Calcula média quando grades mudam
  useEffect(() => {
    if (variables.length === 0) return;

    const result = evaluateFormula(formula, variables, grades);

    if (result.error) {
      setAverage(null);
      setStatus('notCalculated');
      return;
    }

    if (result.result !== null) {
      setAverage(result.result);
      setStatus(result.result >= passingGrade ? 'approved' : 'needsExam');
    }
  }, [grades, variables, formula, passingGrade]);

  const handleGradeChange = (variable: string, value: string) => {
    setGrades((prev) => ({
      ...prev,
      [variable]: value === '' ? '' : parseFloat(value),
    }));
  };

  const allGradesFilled =
    variables.length > 0 &&
    variables.every((v) => grades[v] !== '' && grades[v] !== undefined);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card sx={{ bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography
            variant="h3"
            sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
          >
            Fórmula da Média
          </Typography>
          <FormulaInput
            formula={formula}
            error={formulaError}
            onChange={setFormula}
          />
        </CardContent>
      </Card>

      {variables.length > 0 && (
        <Card sx={{ bgcolor: 'background.paper' }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}
            >
              Notas
            </Typography>
            <GradeFields
              variables={variables}
              grades={grades}
              onChange={handleGradeChange}
            />
          </CardContent>
        </Card>
      )}

      <ResultSummary
        average={average}
        status={status}
        passingGrade={passingGrade}
        showResult={allGradesFilled}
      />
    </Box>
  );
}
