/**
 * Parser de fórmulas: extrai variáveis de notas
 * Identifica padrões como P1, P2, T1, T2, PO, etc.
 */

export function parseFormula(formula: string): {
  variables: string[];
  isValid: boolean;
  error: string;
} {
  // Remove espaços
  const cleaned = formula.trim();

  if (!cleaned) {
    return { variables: [], isValid: false, error: 'Fórmula não pode estar vazia' };
  }

  // Verifica caracteres inválidos (apenas letras, números, operadores e parênteses)
  const validPattern = /^[A-Za-z0-9+\-*/().\s]+$/;
  if (!validPattern.test(cleaned)) {
    return {
      variables: [],
      isValid: false,
      error: 'Fórmula contém caracteres inválidos. Use apenas: letras, números, +, -, *, /, (, ), .',
    };
  }

  // Extrai variáveis (padrão: letra seguida de dígito, ex: P1, T2)
  const variablePattern = /[A-Za-z]+\d+/g;
  const extractedVars = cleaned.match(variablePattern) || [];

  // Remove duplicatas e ordena
  const variables = [...new Set(extractedVars)].sort();

  if (variables.length === 0) {
    return {
      variables: [],
      isValid: false,
      error: 'Fórmula deve conter pelo menos uma variável (ex: P1, T1)',
    };
  }

  // Verifica se há operadores
  const hasOperator = /[+\-*/]/.test(cleaned);
  if (!hasOperator) {
    return {
      variables: [],
      isValid: false,
      error: 'Fórmula deve conter pelo menos uma operação (+, -, *, /)',
    };
  }

  return { variables, isValid: true, error: '' };
}
