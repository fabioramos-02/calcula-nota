# Calculadora de Notas

Aplicação web para calcular médias de notas com fórmulas customizáveis. Insira sua fórmula, preencha as notas e veja o resultado em tempo real.

## Funcionalidades

- 📝 Fórmulas dinâmicas: `(P1 + P2) / 2`, `P1 * 0.4 + P2 * 0.6`, etc.
- 🎯 Campos gerados automaticamente conforme a fórmula
- ⚡ Cálculo em tempo real
- 📊 Visualização com barra de progresso
- 📱 Design responsivo

## Tecnologias

- React 19.2.1
- TypeScript 5.9.3
- Material-UI 7.3.6
- Vite 7.2.7

## Instalação

```bash
# Clone o repositório
git clone https://github.com/fabioramos-02/calcula-nota.git
cd calcula-nota

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

## Como Usar

1. Digite uma fórmula (ex: `(P1 + P2) / 2`)
2. Preencha as notas nos campos gerados
3. Visualize o resultado automaticamente

**Exemplos de fórmulas:**
```
(P1 + P2) / 2
(P1 * 0.4) + (P2 * 0.6)
(P1 + P2) / 4 + (T1 + T2) / 4
```

## Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
```

## Estrutura do Projeto

```
src/
├── components/GradeCalculator/
│   ├── GradeCalculator.tsx    # Componente principal
│   ├── FormulaInput.tsx       # Input da fórmula
│   ├── GradeFields.tsx        # Campos de notas
│   ├── ResultSummary.tsx      # Resultado final
│   └── GradeBar.tsx           # Barra visual
├── utils/
│   ├── parseFormula.ts        # Parser de fórmulas
│   └── evaluateFormula.ts     # Avaliador de fórmulas
└── types/
    └── index.ts               # Tipos TypeScript
```

## Licença

MIT

## Contato

**Fabio Ramos**

- Email: fabio.ramos@ufms.br
- GitHub: [@fabioramos-02](https://github.com/fabioramos-02)
- LinkedIn: [Fabio Ramos](https://www.linkedin.com/in/fabio-ramos-7b8608204/)
