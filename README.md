<div align="center">

# 📊 Calculadora de Notas

[![React](https://img.shields.io/badge/React-19.2.1-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.6-0081CB?logo=mui&logoColor=white)](https://mui.com)
[![Vite](https://img.shields.io/badge/Vite-7.2.7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-4CAF50)](LICENSE)

> Uma ferramenta web moderna, didática e intuitiva para calcular médias de notas com fórmulas customizáveis.

**Desenvolvido por [Fabio Ramos](https://github.com) para fins educacionais e apoio à comunidade**

[🚀 Demo](#demo) • [📚 Documentação](#documentação) • [⚙️ Instalação](#instalação) • [🤝 Contribuir](#contribuindo)

</div>

---

## 🎯 Sobre o Projeto

A **Calculadora de Notas** foi criada para resolver um problema real: alunos desesperados tentando calcular suas médias e descifrar fórmulas complexas de cálculo da instituição. 

Inspirada no sistema da Uniderp, esta aplicação oferece uma solução **genérica, simples e elegante** onde qualquer pessoa pode:
- Digitar sua própria fórmula de cálculo
- Preencher as notas automaticamente
- Ver o resultado em tempo real com feedback visual intuitivo

## ✨ Características Principais

| Característica | Descrição |
|---|---|
| 📝 **Fórmula Dinâmica** | Informe qualquer fórmula: `(P1 + P2) / 2`, `P1 * 0.4 + P2 * 0.6`, etc. |
| 🎯 **Campos Automáticos** | Os campos são gerados automaticamente conforme a fórmula detecta variáveis |
| ⚡ **Cálculo em Tempo Real** | A média é recalculada conforme você digita cada nota |
| 🎨 **Design Responsivo** | Interface moderna baseada em Material Design (MUI) |
| ✅ **Validações Inteligentes** | Feedback amigável com mensagens de erro claras e úteis |
| 📊 **Visualização com Barras** | Gráfico visual mostrando a nota e a mínima necessária para passar |
| 🌈 **Tema Customizado** | Cores inspiradas no design da Uniderp com verde teal e laranja |


## 🚀 Demo

Veja a aplicação em ação:

```
┌─────────────────────────────────────────────┐
│    Calculadora de Notas                     │
│  Calcule sua média de forma rápida e fácil  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Fórmula da Média                            │
│                                             │
│ Fórmula da Média                            │
│ ┌─────────────────────────────────────────┐ │
│ │ (P1 + P2) / 4 + (T1 + T2) / 4       ✓  │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Notas                                       │
│                                             │
│ P1: ┌─────┐  P2: ┌─────┐  T1: ┌─────┐    │
│     │ 5.5 │      │ 9.3 │      │ 9   │    │
│     └─────┘      └─────┘      └─────┘    │
│                                             │
│ T2: ┌─────┐                                │
│     │ 9.2 │                                │
│     └─────┘                                │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Resultado Final                             │
│                                             │
│ MF ▰▰▰▰▰▰▰▰▰░░░ 8.3              ✅ Aprovado │
│    ^ mínima: 6                              │
└─────────────────────────────────────────────┘
```

## 📚 Documentação

### Estrutura de Diretórios

```
calcula-nota/
├── 📄 index.html              # HTML principal
├── 📄 package.json            # Dependências e scripts
├── 📄 tsconfig.json          # Configuração TypeScript
├── 📄 vite.config.ts         # Configuração Vite
├── 📄 README.md              # Esta documentação
│
└── 📁 src/
    ├── 📄 main.tsx           # Entry point React
    ├── 📄 App.tsx            # Componente raiz
    ├── 📄 theme.ts           # Tema MUI customizado
    ├── 📄 index.css          # Estilos globais
    │
    ├── 📁 components/GradeCalculator/
    │   ├── GradeCalculator.tsx    # Componente principal (lógica)
    │   ├── FormulaInput.tsx       # Input da fórmula + validação
    │   ├── GradeFields.tsx        # Campos de notas gerados dinamicamente
    │   ├── ResultSummary.tsx      # Card do resultado final
    │   └── GradeBar.tsx           # Barra visual da nota
    │
    ├── 📁 utils/
    │   ├── parseFormula.ts        # Parser: extrai variáveis da fórmula
    │   └── evaluateFormula.ts     # Calcula a média com as notas
    │
    └── 📁 types/
        └── index.ts              # Tipos TypeScript compartilhados
```

### Tecnologias

| Tecnologia | Versão | Propósito |
|---|---|---|
| **React** | 19.2.1 | Framework UI para aplicação web |
| **TypeScript** | 5.9.3 | Tipagem estática para segurança de código |
| **Material-UI (MUI)** | 7.3.6 | Design System com componentes prontos |
| **Vite** | 7.2.7 | Build tool ultra-rápido para desenvolvimento |
| **Emotion** | 11.14.0 | CSS-in-JS utilizado pelo MUI |

## ⚙️ Instalação

### Pré-requisitos

- **Node.js** ≥ 18.x (Download: https://nodejs.org)
- **npm** (incluído com Node.js) ou **yarn**

### Passo a Passo

1. **Clone ou baixe o repositório:**
```bash
git clone https://github.com/seu-usuario/calcula-nota.git
cd calcula-nota
```

2. **Instale as dependências:**
```bash
npm install
# ou
yarn install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
# ou
yarn dev
```

4. **Abra no navegador:**
```
http://localhost:5173
```

## 🎮 Como Usar

### Exemplo Prático 1: Cálculo Simples

```
Fórmula: (P1 + P2) / 2

Campos gerados:
- P1: 7.5
- P2: 8.5

Resultado: (7.5 + 8.5) / 2 = 8.0 ✅ Aprovado
```

### Exemplo Prático 2: Cálculo com Pesos

```
Fórmula: (P1 * 0.4) + (P2 * 0.6)

Campos gerados:
- P1: 8.0
- P2: 6.0

Resultado: (8.0 * 0.4) + (6.0 * 0.6) = 6.8 ✅ Aprovado
```

### Exemplo Prático 3: Cálculo Complexo (estilo Uniderp)

```
Fórmula: (P1 + P2) / 4 + (T1 + T2) / 4

Campos gerados:
- P1: 5.5
- P2: 9.3
- T1: 9.0
- T2: 9.2

Resultado: (5.5 + 9.3) / 4 + (9.0 + 9.2) / 4 = 8.25 ✅ Aprovado
```

## 📋 Validações e Regras

### Fórmula

✅ **Aceita:**
- Variáveis alfanuméricas: `P1`, `P2`, `T1`, `T2`, `PO`, `AP`, etc.
- Operadores: `+`, `-`, `*`, `/`
- Parênteses: `(` e `)`
- Números decimais: `0.5`, `3.14`, etc.
- Espaços em branco (ignorados)

❌ **Rejeita:**
- Caracteres especiais: `#`, `@`, `!`, etc.
- Funções não suportadas: `Math.max()`, `Math.min()`, etc.
- Variáveis sem dígito: `P`, `T` (precisa de `P1`, `T1`)
- Fórmula vazia

**Mensagens de validação:**
| Erro | Causa | Solução |
|---|---|---|
| "Fórmula não pode estar vazia" | Campo vazio | Digite uma fórmula |
| "Fórmula deve conter pelo menos uma variável (ex: P1, T1)" | Sem variáveis | Adicione pelo menos uma variável |
| "Fórmula deve conter pelo menos uma operação (+, -, *, /)" | Sem operadores | Adicione uma operação entre as variáveis |
| "Fórmula contém caracteres inválidos..." | Caracteres não permitidos | Use apenas: letras, números, +, -, *, /, (, ), . |

### Notas

✅ **Válidas:** `0` a `10` (inclusive decimais: `7.5`, `8.3`)
❌ **Inválidas:** Valores fora do intervalo, texto, caracteres especiais

**Comportamento:**
- Todos os campos devem ser preenchidos para calcular
- A média é recalculada automaticamente em tempo real
- Campos vazios impedem o cálculo com mensagem clara

### Status de Aprovação

```
Média ≥ 6.0  → ✅ APROVADO      (Verde)
Média < 6.0  → ⚠️ PRECISA DE EXAME (Laranja)
```

## 🔧 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento (hot-reload)
npm run dev

# Build para produção (otimizado)
npm run build

# Visualizar versão build localmente
npm run preview
```

## 🎨 Personalização

### Mudar a Fórmula Padrão

Edite `src/App.tsx`:

```tsx
<GradeCalculator
  initialFormula="(P1 + P2) / 2"  // ← Altere aqui
  passingGrade={6}
/>
```

### Mudar a Média Mínima para Aprovação

Edite `src/App.tsx`:

```tsx
<GradeCalculator
  initialFormula="(P1 + P2) / 4 + (T1 + T2) / 4"
  passingGrade={7}  // ← Altere para 7 ao invés de 6
/>
```

### Customizar Cores do Tema

Edite `src/theme.ts`:

```ts
palette: {
  primary: {
    main: '#26A69A',  // ← Cor primária (verde teal)
  },
  secondary: {
    main: '#FF9800',  // ← Cor secundária (laranja)
  },
}
```

## 📱 Responsividade

A aplicação funciona perfeitamente em todos os tamanhos de tela:

| Dispositivo | Breakpoint | Layout |
|---|---|---|
| 📱 Smartphone | < 600px | 1 coluna |
| 📱 Tablet | 600px - 960px | 2 colunas |
| 💻 Desktop | > 960px | 3 colunas |

## 🚀 Deploy

### Vercel (Recomendado - Mais Fácil)

1. Faça push para GitHub (você precisa de um repositório público):
```bash
git push origin main
```

2. Acesse https://vercel.com
3. Clique em **"Add New..."** → **"Project"**
4. Selecione seu repositório do GitHub
5. Vite será detectado automaticamente
6. Clique em **"Deploy"**
7. Sua aplicação estará disponível em minutos! 🎉

**Observação:** Vercel detecta que é um projeto Vite e configura tudo automaticamente.

### Netlify

1. Faça build local:
```bash
npm run build
```

2. Acesse https://app.netlify.com
3. Arraste a pasta `dist/` para fazer upload
4. Sua aplicação estará online instantaneamente

### GitHub Pages

1. Faça build:
```bash
npm run build
```

2. Adicione ao `vite.config.ts`:
```ts
export default defineConfig({
  base: '/calcula-nota/',  // nome do seu repositório
  plugins: [react()],
})
```

3. Faça push da pasta `dist/` para a branch `gh-pages`

## 📖 Exemplos de Fórmulas

Copie e cola qualquer uma dessas fórmulas para testar:

```bash
# Simples - Média aritmética
(P1 + P2) / 2

# Com três notas
(P1 + P2 + P3) / 3

# Com pesos
(P1 * 0.4) + (P2 * 0.6)

# Estilo Uniderp
(P1 + P2) / 4 + (T1 + T2) / 4

# Com prova final
(P1 + P2 + P3 + T1 + T2) / 5

# Complexa com múltiplos pesos
(P1 * 0.3) + (P2 * 0.3) + (T1 * 0.2) + (T2 * 0.2)

# Com prova optativa
(P1 + P2 + P3) / 3 * 0.8 + PO * 0.2

# Semestral
(P1 + T1 + T2 + T3) / 4
```

## 🏗️ Arquitetura

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│ App.tsx                                                 │
│ └── GradeCalculator (Estado principal)                 │
│     ├── FormulaInput → parseFormula() → [variáveis]   │
│     ├── GradeFields (renderiza campos dinamicamente)    │
│     │   └── onChange → setGrades                        │
│     └── ResultSummary                                   │
│         └── evaluateFormula() → média → status         │
│             └── GradeBar (visualização)                 │
└─────────────────────────────────────────────────────────┘
```

### Responsabilidades dos Componentes

| Componente | Responsabilidade |
|---|---|
| **GradeCalculator** | Gerencia todo o estado e lógica da calculadora |
| **FormulaInput** | Renderiza input da fórmula com validação |
| **GradeFields** | Renderiza campos de nota dinamicamente |
| **ResultSummary** | Exibe resultado final com status |
| **GradeBar** | Visualização gráfica da nota |

### Responsabilidades das Utilities

| Arquivo | Função | Responsabilidade |
|---|---|---|
| **parseFormula.ts** | `parseFormula()` | Extrai variáveis da fórmula com validação |
| **evaluateFormula.ts** | `evaluateFormula()` | Calcula resultado com segurança |
| **theme.ts** | `theme` | Define cores e tipografia MUI |

## 🐛 Resolução de Problemas

### Port 5173 já está em uso

```bash
# A app tentará porta 5174, 5175, etc automaticamente
npm run dev

# Ou especifique uma porta
npm run dev -- --port 3000
```

### Erro ao fazer build

```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Fórmula não está calculando

Certifique-se de que:
- ✅ Todas as notas estão preenchidas
- ✅ A fórmula contém pelo menos uma variável
- ✅ A fórmula contém pelo menos um operador
- ✅ Não há caracteres inválidos

## 📚 Recursos Úteis

- 📖 [Documentação React](https://react.dev)
- 📖 [Documentação Material-UI](https://mui.com)
- 📖 [Documentação Vite](https://vitejs.dev)
- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você encontrar um bug ou tiver uma ideia:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença **MIT**. Você é livre para usar, modificar e distribuir.

```
MIT License

Copyright (c) 2025 Fabio Ramos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👨‍💻 Sobre o Autor

**Fabio Ramos**

Desenvolvedor apaixonado por criar ferramentas que resolvem problemas reais. Este projeto foi criado com o objetivo de:

- 🎓 **Fins Educacionais**: Demonstrar boas práticas em React, TypeScript e desenvolvimento web moderno
- 🤝 **Apoio à Comunidade**: Ajudar alunos a entender seus sistemas de notas sem mistério
- 💡 **Inspiração**: Servir como base para outros aprender e construir projetos similares

### Contato & Redes

- 📧 Email: [seu-email@exemplo.com]
- 🐙 GitHub: [github.com/seu-usuario]
- 💼 LinkedIn: [linkedin.com/in/seu-perfil]
- 🌐 Portfólio: [seu-portfolio.com]

---

## 🌟 Diga Obrigado

Se este projeto te ajudou, considere:
- ⭐ Dar uma estrela no GitHub
- 📢 Compartilhar com amigos e colegas
- 🐛 Reportar bugs e sugerir melhorias
- 💌 Enviar feedback

---

<div align="center">

**Desenvolvido com ❤️ para a comunidade de educação**

*Última atualização: 8 de dezembro de 2025*

[⬆ Voltar ao topo](#-calculadora-de-notas)

</div>
