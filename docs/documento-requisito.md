# Documento de Requisitos - Calculadora de Notas

## Visão Geral

Sistema web para cálculo automático de médias acadêmicas com base em fórmulas personalizadas. Permite que estudantes insiram suas notas e visualizem rapidamente se foram aprovados ou se precisam de exame.

## Funcionalidades Principais

### 1. Entrada de Fórmula Personalizada
- Usuário define a fórmula de cálculo da média (ex: `(P1 + P2) / 4 + (T1 + T2) / 4`)
- Suporta operações matemáticas: soma (+), subtração (-), multiplicação (*), divisão (/) e parênteses
- Aceita variáveis com letras e números (ex: P1, T2, AP, A1)
- Validação em tempo real da sintaxe da fórmula

### 2. Campos de Entrada de Notas
- Geração automática de campos baseados nas variáveis da fórmula
- Validação de valores entre 0 e 10 com suporte a decimais
- Layout responsivo em grid (1-3 colunas conforme tamanho da tela)

### 3. Cálculo Automático
- Cálculo em tempo real conforme notas são inseridas
- Exibição da média final com uma casa decimal
- Indicação visual do status: aprovado (verde) ou exame (laranja)

### 4. Visualização de Resultados
- Barra visual de progresso mostrando a nota em relação à média mínima
- Chip de status com cor correspondente ao resultado
- Mensagem explicativa quando o aluno precisa de exame
- Indicador visual da nota mínima necessária para aprovação

## Requisitos Técnicos

### Stack Tecnológica
- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material-UI (MUI) v7
- **Linguagem**: TypeScript
- **Deployment**: Vercel

### Requisitos Não-Funcionais
- Interface responsiva para desktop, tablet e mobile
- Validação de entrada em tempo real
- Feedback visual imediato ao usuário
- Sem necessidade de backend (processamento client-side)

## Regras de Negócio

1. **Nota Mínima de Aprovação**: 6.0 (configurável)
2. **Faixa de Notas**: 0 a 10 pontos
3. **Status do Aluno**:
   - **Aprovado**: Média ≥ 6.0
   - **Exame**: Média < 6.0
4. **Precisão**: Resultados exibidos com uma casa decimal

## Exemplo de Uso

1. Usuário insere fórmula: `(A1+A2+A3+A4+AP)/5`
2. Sistema identifica 5 variáveis: A1, A2, A3, A4, AP
3. Campos de entrada são gerados automaticamente
4. Usuário preenche: A1=7.5, A2=8.0, A3=6.5, A4=7.0, AP=9.0
5. Sistema calcula automaticamente: (7.5+8.0+6.5+7.0+9.0)/5 = 7.6
6. Resultado exibido com status "Aprovado" em verde

## Arquitetura de Componentes

```
app/
├── layout.tsx          # Layout raiz com providers MUI
└── page.tsx            # Página principal

components/
└── GradeCalculator/
    ├── GradeCalculator.tsx  # Componente principal (estado e lógica)
    ├── FormulaInput.tsx     # Campo de entrada da fórmula
    ├── GradeFields.tsx      # Grid de campos de notas
    ├── ResultSummary.tsx    # Card de resultado final
    └── GradeBar.tsx         # Barra visual de progresso

utils/
├── parseFormula.ts     # Parser de fórmulas (extração de variáveis)
└── evaluateFormula.ts  # Avaliador de expressões matemáticas

types/
└── index.ts            # Definições TypeScript compartilhadas
```

## Melhorias Futuras

- Histórico de cálculos salvos no localStorage
- Exportação de resultados em PDF
- Suporte a múltiplas disciplinas
- Cálculo de nota necessária no exame para aprovação
- Temas claro/escuro
- Internacionalização (i18n)
