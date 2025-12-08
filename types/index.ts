/**
 * Tipos compartilhados da aplicação
 */

export interface GradeValues {
  [variableName: string]: number | '';
}

export type StudentStatus = 'approved' | 'needsExam' | 'notCalculated';

export interface CalculatorState {
  formula: string;
  variables: string[];
  grades: GradeValues;
  average: number | null;
  status: StudentStatus;
  formulaError: string;
}
