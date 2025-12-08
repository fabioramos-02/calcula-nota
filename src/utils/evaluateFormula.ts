/**
 * Avalia a fórmula com as notas fornecidas
 * Substitui variáveis pelos valores e calcula o resultado
 */

import type { GradeValues } from '../types';

export function evaluateFormula(
  formula: string,
  variables: string[],
  grades: GradeValues
): {
  result: number | null;
  error: string;
} {
  // Verifica se todas as variáveis têm notas
  const missingVariables = variables.filter(
    (v) => grades[v] === '' || grades[v] === undefined
  );

  if (missingVariables.length > 0) {
    return {
      result: null,
      error: `Todas as notas devem ser preenchidas: ${missingVariables.join(', ')}`,
    };
  }

  try {
    // Substitui variáveis pelos valores
    let expression = formula;
    variables.forEach((variable) => {
      const value = grades[variable];
      expression = expression.replace(new RegExp(variable, 'g'), String(value));
    });

    // Avalia a expressão com Function (mais seguro que eval)
    // eslint-disable-next-line no-new-func
    const calculate = new Function(`return ${expression}`);
    const result = calculate() as number;

    // Valida se o resultado é um número válido
    if (!Number.isFinite(result)) {
      return {
        result: null,
        error: 'Resultado da fórmula inválido',
      };
    }

    return { result: Math.round(result * 10) / 10, error: '' };
  } catch {
    return {
      result: null,
      error: 'Erro ao calcular fórmula. Verifique a sintaxe.',
    };
  }
}
