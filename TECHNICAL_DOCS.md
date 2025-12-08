# 📖 Documentação Técnica - Calculadora de Notas

**Versão:** 1.0.0  
**Última Atualização:** 8 de dezembro de 2025  
**Autor:** Fabio Ramos  

---

## 📑 Índice

1. [Arquitetura da Aplicação](#arquitetura-da-aplicação)
2. [Fluxo de Dados](#fluxo-de-dados)
3. [Componentes](#componentes)
4. [Utilities](#utilities)
5. [Tipos TypeScript](#tipos-typescript)
6. [Padrões e Convenções](#padrões-e-convenções)
7. [Guia do Desenvolvedor](#guia-do-desenvolvedor)
8. [Decisões de Design](#decisões-de-design)

---

## Arquitetura da Aplicação

### Visão Geral

A aplicação segue a arquitetura de **componentes React com estado centralizado** e **separação clara de responsabilidades**.

```
┌────────────────────────────────────────────────────────────┐
│ App.tsx (Provider de Tema)                                 │
│ └── GradeCalculator (Orquestrador de Estado)               │
│     ├── FormulaInput (Entrada)                             │
│     │   └── useCallback: handleFormulaChange               │
│     ├── GradeFields (Renderização Dinâmica)                │
│     │   └── useCallback: handleGradeChange                 │
│     └── ResultSummary (Saída)                              │
│         └── GradeBar (Sub-componente de Visualização)      │
└────────────────────────────────────────────────────────────┘
```

### Princípios Arquiteturais

✅ **Single Responsibility Principle (SRP)**: Cada componente tem uma responsabilidade única
✅ **Separation of Concerns**: Lógica de negócio separada da apresentação
✅ **DRY (Don't Repeat Yourself)**: Reutilização de componentes e funções
✅ **Props Drilling Minimizado**: Estado apenas onde necessário
✅ **Tipagem Forte**: TypeScript para máxima segurança

---

## Fluxo de Dados

### 1️⃣ Entrada da Fórmula

```
┌─────────────────────────────────────────┐
│ Usuário digita: (P1 + P2) / 2           │
│                                         │
│ ↓ onChange → setFormula()               │
│                                         │
│ ↓ useEffect monitora [formula]          │
│                                         │
│ parseFormula("(P1 + P2) / 2")          │
│   ├─ Remove espaços                     │
│   ├─ Valida caracteres inválidos        │
│   ├─ Extrai variáveis: [P1, P2]         │
│   ├─ Valida presença de operador        │
│   └─ Retorna { variables, isValid }     │
│                                         │
│ ↓ setVariables([P1, P2])                │
│ ↓ setFormulaError('')                   │
│ ↓ Inicializa grades: { P1: '', P2: '' } │
└─────────────────────────────────────────┘
```

### 2️⃣ Entrada de Notas

```
┌──────────────────────────────────────────┐
│ Usuário digita nota: P1 = 7.5            │
│                                          │
│ ↓ onChange → handleGradeChange()         │
│                                          │
│ ↓ Validação de intervalo (0-10)          │
│                                          │
│ ↓ setGrades({ P1: 7.5, P2: '' })         │
│                                          │
│ ↓ useEffect monitora [grades]            │
│                                          │
│ evaluateFormula(formula, vars, grades)  │
│   ├─ Valida se todas as notas preenchidas
│   ├─ Substitui variáveis: (7.5 + X) / 2 │
│   ├─ Calcula: new Function()             │
│   └─ Retorna { result, error }           │
│                                          │
│ ↓ setAverage(resultado)                  │
│ ↓ setStatus('approved' ou 'needsExam')  │
└──────────────────────────────────────────┘
```

### 3️⃣ Saída Visual

```
┌────────────────────────────────────────┐
│ ResultSummary renderiza quando:         │
│ - allGradesFilled === true              │
│ - average !== null                      │
│                                        │
│ ↓ GradeBar visualiza:                   │
│   ├─ Barra preenchida por porcentagem   │
│   ├─ Indicador de nota mínima           │
│   └─ Cores conforme status              │
│                                        │
│ ↓ Chip de status:                       │
│   ├─ Verde: "✅ Aprovado"               │
│   └─ Laranja: "⚠️ Precisa de Exame"    │
└────────────────────────────────────────┘
```

---

## Componentes

### 🎯 GradeCalculator (Principal)

**Localização:** `src/components/GradeCalculator/GradeCalculator.tsx`

**Responsabilidades:**
- Gerenciar estado global da calculadora
- Orquestrar fluxo de dados entre componentes
- Implementar lógica de cálculo

**Estado Interno:**
```typescript
const [formula, setFormula] = useState<string>
const [variables, setVariables] = useState<string[]>
const [grades, setGrades] = useState<GradeValues>
const [average, setAverage] = useState<number | null>
const [status, setStatus] = useState<StudentStatus>
const [formulaError, setFormulaError] = useState<string>
```

**Props:**
```typescript
interface GradeCalculatorProps {
  initialFormula?: string  // Ex: "(P1 + P2) / 2"
  passingGrade?: number    // Default: 6
}
```

**Ciclos de Vida:**
1. Ao montar: Carrega `initialFormula` se fornecida
2. Ao mudar fórmula: Re-extrai variáveis, limpa notas
3. Ao preencher notas: Calcula média automaticamente
4. Status: Atualiza conforme resultado

---

### 📝 FormulaInput

**Localização:** `src/components/GradeCalculator/FormulaInput.tsx`

**Responsabilidades:**
- Renderizar campo de entrada da fórmula
- Exibir erros de validação
- Permitir edição

**Props:**
```typescript
interface FormulaInputProps {
  formula: string
  error: string
  onChange: (formula: string) => void
}
```

**Validação Visual:**
- Campo vazio: sem erro
- Campo com texto: mostra erro se inválido
- Campo válido: sem erro

---

### 🔢 GradeFields

**Localização:** `src/components/GradeCalculator/GradeFields.tsx`

**Responsabilidades:**
- Renderizar campos de nota dinamicamente
- Validar entrada em tempo real
- Manter layout responsivo

**Props:**
```typescript
interface GradeFieldsProps {
  variables: string[]
  grades: GradeValues
  onChange: (variableName: string, value: string) => void
}
```

**Layout Responsivo:**
```css
grid-template-columns: {
  xs: "1fr",           /* 1 coluna em mobile */
  sm: "1fr 1fr",       /* 2 colunas em tablet */
  md: "1fr 1fr 1fr"    /* 3 colunas em desktop */
}
```

**Validação de Entrada:**
```
Entrada: "7.5"
├─ Verifica se vazio: ✓
├─ Converte para número: 7.5
├─ Valida intervalo 0-10: ✓
└─ Aceita
```

---

### 📊 ResultSummary

**Localização:** `src/components/GradeCalculator/ResultSummary.tsx`

**Responsabilidades:**
- Exibir resultado final apenas quando pronto
- Mostrar status de aprovação
- Integrar visualização com GradeBar

**Props:**
```typescript
interface ResultSummaryProps {
  average: number | null
  status: StudentStatus
  passingGrade: number
  showResult: boolean  // Controla visibilidade
}
```

**Lógica de Exibição:**
```javascript
if (!showResult || average === null) return null
// Renderiza Card com resultado
```

**Status Configuração:**
```typescript
const statusConfig = {
  approved: { label: 'Aprovado', color: 'success' },
  needsExam: { label: 'Precisa de Exame', color: 'warning' },
  notCalculated: { label: 'Cálculo Pendente', color: 'default' }
}
```

---

### 📈 GradeBar

**Localização:** `src/components/GradeCalculator/GradeBar.tsx`

**Responsabilidades:**
- Visualizar nota com barra progressiva
- Indicar visualmente a nota mínima
- Mudar cor conforme aprovação

**Props:**
```typescript
interface GradeBarProps {
  label: string            // "MF", "P1", etc.
  value: number           // 7.5
  min?: number            // 0
  max?: number            // 10
  passingGrade?: number   // 6
}
```

**Cálculos Visual:**
```typescript
const percentage = ((value - min) / (max - min)) * 100
const isApproved = value >= passingGrade

// Cor da barra:
// - Se aprovado: verde (#4CAF50)
// - Se reprovado: laranja (#FF9800)

// Linha da nota mínima:
// - Posição: ((passingGrade - min) / (max - min)) * 100%
// - Cor: laranja semi-transparente
```

---

## Utilities

### 🔧 parseFormula.ts

**Função:** `parseFormula(formula: string)`

**Entradas:**
```typescript
formula: "(P1 + P2) / 4 + (T1 + T2) / 4"
```

**Processo:**
```
1. Remove espaços: "(P1+P2)/4+(T1+T2)/4"

2. Valida caracteres:
   - Regex: /^[A-Za-z0-9+\-*/().\s]+$/
   - Se inválido: retorna erro

3. Extrai variáveis:
   - Regex: /[A-Za-z]+\d+/g
   - Resultado: ["P1", "P2", "T1", "T2"]

4. Remove duplicatas e ordena:
   - Set: {"P1", "P2", "T1", "T2"}
   - Array: ["P1", "P2", "T1", "T2"]

5. Valida presença de operador:
   - Regex: /[+\-*/]/
   - Se não encontrado: erro

6. Retorna sucesso com variáveis
```

**Saída:**
```typescript
{
  variables: ["P1", "P2", "T1", "T2"],
  isValid: true,
  error: ""
}
```

**Casos de Erro:**
```typescript
// Fórmula vazia
parseFormula("")
// → { variables: [], isValid: false, error: "Fórmula não pode estar vazia" }

// Sem variáveis
parseFormula("5 + 3")
// → { variables: [], isValid: false, error: "Fórmula deve conter..." }

// Sem operador
parseFormula("P1 P2")
// → { variables: [], isValid: false, error: "Fórmula deve conter..." }

// Caracteres inválidos
parseFormula("P1 @ P2")
// → { variables: [], isValid: false, error: "Fórmula contém caracteres inválidos..." }
```

---

### 🧮 evaluateFormula.ts

**Função:** `evaluateFormula(formula, variables, grades)`

**Entradas:**
```typescript
formula: "(P1 + P2) / 2"
variables: ["P1", "P2"]
grades: { P1: 7.5, P2: 8.5 }
```

**Processo:**
```
1. Valida preenchimento:
   for (const v of variables) {
     if (grades[v] === '' || undefined) retorna erro
   }

2. Substitui variáveis:
   "(P1 + P2) / 2"
   → "(7.5 + P2) / 2"
   → "(7.5 + 8.5) / 2"

3. Avalia com Function:
   new Function(`return ${expression}`)()
   → 8.0

4. Valida resultado:
   if (!Number.isFinite(result)) retorna erro

5. Arredonda para 1 decimal:
   Math.round(8.0 * 10) / 10 = 8.0
```

**Saída:**
```typescript
{
  result: 8.0,
  error: ""
}
```

**Casos de Erro:**
```typescript
// Nota faltando
evaluateFormula("...", ["P1", "P2"], { P1: 7.5, P2: '' })
// → { result: null, error: "Todas as notas devem ser preenchidas: P2" }

// Sintaxe inválida
evaluateFormula("P1 +++ P2", ["P1", "P2"], { P1: 7.5, P2: 8.5 })
// → { result: null, error: "Erro ao calcular fórmula. Verifique a sintaxe." }

// Resultado inválido
evaluateFormula("P1 / 0", ["P1"], { P1: 7.5 })
// → { result: null, error: "Resultado da fórmula inválido" }
```

---

### 🎨 theme.ts

**Objetivo:** Centralizar configuração de tema MUI

**Seções:**

1. **Palette (Cores)**
```typescript
primary: {
  main: '#26A69A',    // Verde teal - elementos principais
  light: '#80CBC4',   // Variação clara
  dark: '#00897B'     // Variação escura
}

secondary: {
  main: '#FF9800',    // Laranja - atenção e notas mínimas
  light: '#FFB74D',
  dark: '#F57C00'
}

success: { main: '#4CAF50' }   // Verde - aprovado
warning: { main: '#FF9800' }   // Laranja - aviso
error: { main: '#F44336' }     // Vermelho - reprovado
```

2. **Typography (Tipografia)**
```typescript
h1: { fontSize: '2.5rem', fontWeight: 600 }
h2: { fontSize: '2rem', fontWeight: 600 }
h3: { fontSize: '1.5rem', fontWeight: 600 }
h4: { fontSize: '1.25rem', fontWeight: 600 }
body1: { fontSize: '1rem' }
body2: { fontSize: '0.875rem' }
```

3. **Components Customizados**
```typescript
MuiCard: { boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }
MuiTextField: { borderRadius: '8px' }
```

---

## Tipos TypeScript

### 📦 types/index.ts

```typescript
// Valores das notas: número ou vazio (antes de preencher)
export interface GradeValues {
  [variableName: string]: number | ''
}

// Estados possíveis do aluno
export type StudentStatus = 'approved' | 'needsExam' | 'notCalculated'

// Estado completo da calculadora (não é usado atualmente, mas útil para Context/Redux)
export interface CalculatorState {
  formula: string
  variables: string[]
  grades: GradeValues
  average: number | null
  status: StudentStatus
  formulaError: string
}
```

---

## Padrões e Convenções

### Nomes de Variáveis

✅ **Bom:**
```typescript
const [isApproved, setIsApproved] = useState(false)
const handleGradeChange = (variable: string) => {}
const passingGrade = 6
```

❌ **Ruim:**
```typescript
const [apr, setApr] = useState(false)  // Ambíguo
const handleChange = () => {}          // Não específico
const pg = 6                           // Criptografado
```

### Estrutura de Componentes

```typescript
import { useState, useEffect } from 'react'
import { SomeComponent } from './path'
import type { SomeType } from '../types'

interface ComponentProps {
  prop1: string
  prop2: number
}

/**
 * Descrição do componente
 * O que faz e responsabilidade principal
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState('')

  useEffect(() => {
    // Lógica
  }, [state])

  const handleEvent = () => {
    // Manipulador
  }

  return <div>{/* JSX */}</div>
}
```

### Comentários

```typescript
// ✅ Comentário que explica o POR QUÊ
// Extrai variáveis usando regex para padrão P1, T2, etc.
const variablePattern = /[A-Za-z]+\d+/g

// ❌ Comentário óbvio (evite)
// Cria um array vazio
const array = []
```

### Validação

```typescript
// ✅ Validação no ponto de entrada
const handleChange = (value: string) => {
  if (value < 0 || value > 10) return
  setGrade(value)
}

// ❌ Validação tardia
const handleChange = (value: string) => {
  setGrade(value)  // Pode aceitar valores inválidos
}
```

---

## Guia do Desenvolvedor

### Adicionando Nova Variável à Fórmula

O regex em `parseFormula.ts` já suporta qualquer padrão de letra+dígitos:

```typescript
const variablePattern = /[A-Za-z]+\d+/g

// Funciona com:
"P1", "P2", "T1", "T2"  // ✅
"AP", "PO", "PI"        // ✅
"NOTA1", "TRABALHO2"    // ✅
"P", "T" (sem dígito)   // ❌ Não funciona
```

**Não precisa alterar código** - funciona automaticamente!

### Mudando a Nota Mínima

Em `src/App.tsx`:
```tsx
<GradeCalculator passingGrade={7} />  // Era 6, agora 7
```

Ou para tornar configurável:
```tsx
const [passingGrade, setPassingGrade] = useState(6)
<GradeCalculator passingGrade={passingGrade} />
```

### Personalizando Cores

Em `src/theme.ts`:
```typescript
primary: {
  main: '#1976D2',  // Mude a cor primária
}
secondary: {
  main: '#DC004E',  // Mude a cor secundária
}
```

### Adicionando Nova Métrica

Exemplo: Adicionar "Percentual de Aproveitamento"

1. Crie novo componente:
```typescript
// src/components/GradeCalculator/AchievementPercent.tsx
export function AchievementPercent({ average }: { average: number }) {
  const percent = (average / 10) * 100
  return <Typography>{percent.toFixed(1)}%</Typography>
}
```

2. Importe em `GradeCalculator.tsx`:
```typescript
import { AchievementPercent } from './AchievementPercent'

// Dentro do return:
<AchievementPercent average={average} />
```

### Adicionando Persistência (LocalStorage)

Em `GradeCalculator.tsx`:
```typescript
// Carregar ao montar
useEffect(() => {
  const saved = localStorage.getItem('formula')
  if (saved) setFormula(saved)
}, [])

// Salvar ao mudar
useEffect(() => {
  localStorage.setItem('formula', formula)
}, [formula])
```

### Adicionando Histórico

```typescript
// Novo estado
const [history, setHistory] = useState<HistoryEntry[]>([])

// Ao calcular
useEffect(() => {
  if (average !== null) {
    setHistory(prev => [...prev, {
      formula,
      grades,
      average,
      timestamp: new Date()
    }])
  }
}, [average])
```

---

## Decisões de Design

### Por que não usar `eval()`?

```typescript
// ❌ Inseguro
eval("7.5 + 8.5")  // Pode executar código malicioso

// ✅ Seguro - Function é controlado
new Function("return 7.5 + 8.5")()
```

**Vantagem:** Function cria um escopo isolado e não pode acessar variáveis externas.

### Por que não usar libs de parser?

**Alternativas consideradas:**
- `expr-eval`: Adicionaria 15KB
- `mathjs`: Adicionaria 28KB
- Custom Parser: 50 linhas, zero dependências

**Decisão:** Parser customizado para:
- ✅ Tamanho mínimo (bundle)
- ✅ Controle total
- ✅ Segurança
- ✅ Didático

### Por que hooks ao invés de Class Components?

```typescript
// ✅ Modern - Hooks
const [formula, setFormula] = useState('')

// ❌ Legacy - Class
this.state = { formula: '' }
```

**Vantagens Hooks:**
- Código mais legível
- Melhor composição
- Fácil testar
- Comunidade prefere

### Por que Grid ao invés de Flexbox para campos?

```typescript
// ✅ Grid - Responsivo automático
sx={{ 
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }
}}

// ❌ Flexbox - Precisa de media queries
sx={{ display: 'flex', flexWrap: 'wrap' }}
```

Grid CSS é melhor para layouts com múltiplas colunas.

---

## 📋 Checklist para Contribuições

- [ ] Código sem `any` (use tipos específicos)
- [ ] Nomes descritivos (sem abreviações)
- [ ] Componentes < 150 linhas
- [ ] Comentários para lógica complexa
- [ ] Build sem erros: `npm run build`
- [ ] Sem console.log() em produção
- [ ] Props com interface TypeScript
- [ ] Responsividade verificada

---

**Última Atualização:** 8 de dezembro de 2025  
**Autor:** Fabio Ramos
