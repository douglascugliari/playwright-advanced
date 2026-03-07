# Playwright — Guia de Testes Automatizados E2E

[![Playwright](https://img.shields.io/badge/Playwright-1.58-2EAD4C?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm)](https://pnpm.io/)

Projeto **referência** para implementação de testes end-to-end (E2E) com [Playwright](https://playwright.dev/), demonstrando **boas práticas** e **padrões de automação** modernos. Utiliza TypeScript, Page Object Model (POM), Factory Pattern e integração com Faker para dados dinâmicos.

**Ideal para:** Desenvolvedores e QA que desejam aprender a estruturar testes automatizados de forma profissional e escalável.

---

## Índice

- [🎯 Por que este projeto?](#-por-este-projeto)
- [📋 Funcionalidades testadas](#-funcionalidades-testadas)
- [🛠️ Tecnologias](#️-tecnologias)
- [📁 Estrutura do projeto](#-estrutura-do-projeto)
- [⚙️ Pré-requisitos](#️-pré-requisitos)
- [🚀 Instalação](#-instalação)
- [▶️ Executando os testes](#️-executando-os-testes)
- [📝 Cenários de teste](#cenários-de-teste)
- [🏗️ Arquitetura](#arquitetura)
- [📊 Relatórios](#relatórios)
- [🎯 Aplicação sob teste](#aplicação-sob-teste)

---

## 🎯 Por que este projeto?

Este projeto serve como **template e guia** para implementar testes E2E com Playwright seguindo as melhores práticas do mercado. Você aprenderá:

- **Estrutura organizada**: Separação clara entre páginas, dados de teste e casos de teste
- **Padrões profissionais**: Page Object Model, Factory Pattern, Helpers
- **Dados dinâmicos**: Uso do Faker para gerar dados realistas e únicos
- **Manutenibilidade**: Código limpo, tipado e fácil de manter
- **Boas práticas**: Configuração robusta, relatórios detalhados e evidências

---

## 📋 Funcionalidades testadas

| Módulo | Descrição | Casos de teste |
|--------|-----------|----------------|
| **Autenticação** | Login com credenciais válidas/inválidas, validação de campos e redirecionamento por perfil | 5 cenários |
| **Cadastro de usuários** | Registro com sucesso, e-mail já existente e campos obrigatórios | 3 cenários |
| **Gestão de produtos** | Cadastro, exclusão, validações e produto com nome duplicado (requer login admin) | 5 cenários |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| **Playwright** | 1.58+ | Framework de automação E2E moderno |
| **TypeScript** | 5.x | Tipagem estática e melhor DX |
| **pnpm** | 10.x | Gerenciador de pacotes eficiente |
| **Faker.js** | 10.x | Geração de dados dinâmicos e realistas |
| **dotenv** | 16.x | Gestão de variáveis de ambiente |
| **Serverest** | - | Aplicação alvo para testes (API + Front) |

---

## 📁 Estrutura do projeto

```
Playwright/
├── playwright.config.ts      # Configuração central do Playwright
├── package.json              # Dependências e scripts
├── .env / .env-example       # Variáveis de ambiente
├── src/
│   ├── pages/                # Page Objects (POM)
│   │   ├── LoginPage.ts      # Página de login
│   │   ├── RegisterUserPage.ts # Página de cadastro
│   │   └── ProductPage.ts    # Página de produtos
│   ├── data/                 # Dados de teste
│   │   ├── factories/        # Factory Pattern para dados
│   │   │   ├── userFactory.ts
│   │   │   └── productFactory.ts
│   │   └── messages/          # Mensagens de validação
│   ├── utils/
│   │   └── auth-helper.ts    # Helper para autenticação
│   └── types/
│       └── testUser.ts       # Tipos TypeScript
└── tests/
    ├── auth-login.spec.ts           # Testes de autenticação
    ├── user-registration.spec.ts    # Testes de cadastro
    └── product-management.spec.ts  # Testes de produtos
```

**Princípios da estrutura:**
- **Separação de responsabilidades**: Cada pasta tem um propósito claro
- **Reutilização**: Page Objects e Factories podem ser usados em múltiplos testes
- **Manutenibilidade**: Mudanças na UI afetam apenas os Page Objects
- **Escalabilidade**: Fácil adicionar novas páginas e testes

---

## ⚙️ Pré-requisitos

- **Node.js** 18+ (recomendado LTS)
- **pnpm** (ou npm/yarn, ajustando os comandos)
- Navegadores: Chromium, Firefox e WebKit são instalados via Playwright

---

## 🚀 Instalação

1. **Clone o repositório:**

   ```bash
   git clone <repository-url>
   cd "Testes Automatizados/Playwright"
   ```

2. **Instale as dependências:**

   ```bash
   pnpm install
   ```

3. **Configure as variáveis de ambiente:**

   ```bash
   cp .env-example .env
   # Edite o arquivo .env com suas credenciais se necessário
   ```

4. **Instale os binários dos navegadores:**

   ```bash
   pnpm run install-browsers
   ```

---

## ▶️ Executando os testes

| Comando | Descrição |
|---------|-----------|
| `pnpm test` | Executa todos os testes (modo headless, 4 workers) |
| `pnpm run test:parallel` | Executa com 4 workers em paralelo |
| `pnpm run test:chrome` | Apenas Chromium, modo headed (janela visível) |
| `pnpm run test:headed` | Todos os projetos, modo headed |
| `pnpm run test:ui` | Abre a UI interativa do Playwright |
| `pnpm run test:debug` | Modo debug (step-by-step) |
| `pnpm run report` | Abre o último relatório HTML gerado |

**Exemplos práticos:**

```bash
# Rodar todos os testes
pnpm test

# Rodar apenas testes de login
pnpm test tests/auth-login.spec.ts

# Rodar com interface gráfica (recomendado para desenvolvimento)
pnpm run test:ui

# Rodar em modo debug para troubleshooting
pnpm run test:debug tests/auth-login.spec.ts

# Rodar apenas no Chrome com janela visível
pnpm run test:chrome
```

---

## Cenários de teste

### Autenticação e login (`auth-login.spec.ts`)

| ID | Cenário |
|----|---------|
| TC-001 | Login com credenciais válidas |
| TC-002 | Login com e-mail inválido |
| TC-003 | Login com senha incorreta |
| TC-004 | Login com campos vazios |
| TC-005 | Validação de formato de e-mail |
| TC-006 | Redirecionamento para área admin conforme perfil |

### Cadastro de usuários (`user-registration.spec.ts`)

| ID | Cenário |
|----|---------|
| TC-007 | Cadastro de novo usuário com sucesso |
| TC-008 | Cadastro com e-mail já existente |
| TC-009 | Cadastro com campos obrigatórios vazios |

### Gestão de produtos (`product-management.spec.ts`)

| ID | Cenário |
|----|---------|
| TC-010 | Cadastrar novo produto com sucesso |
| TC-011 | Cadastrar produto com campos inválidos (preço/quantidade negativos) |
| TC-012 | Cadastrar produto com campos vazios |
| TC-013 | Excluir produto |
| TC-014 | Cadastrar produto com nome duplicado |

> Os testes de gestão de produtos fazem login como admin antes de cada teste via `AuthHelper`.

---

## Arquitetura

- **Page Object Model (POM):** cada tela (login, cadastro, produtos) possui uma classe em `src/pages/` com locators e ações reutilizáveis.
- **Test Data:** dados de teste centralizados em `src/data/` por fluxo (login, register, product), facilitando manutenção e variações (sucesso, falha, vazios).
- **Auth Helper:** `src/utils/auth-helper.ts` realiza login prévio para specs que dependem de usuário autenticado (ex.: gestão de produtos).
- **Base URL:** `https://front.serverest.dev` configurada em `playwright.config.ts`; os Page Objects usam caminhos relativos (ex.: `/login`, `/cadastrarusuarios`).

---

## Configuração

Principais opções em `playwright.config.ts`:

- **Projetos (browsers):** Chromium, Firefox, WebKit, Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12).
- **Base URL:** `https://front.serverest.dev`.
- **Paralelismo:** `fullyParallel: true`; 4 workers localmente, 1 em CI.
- **Retries:** 2 em CI, 0 local.
- **Evidências:** trace no primeiro retry; screenshot e vídeo apenas em falha.
- **Reporters:** list (console) e HTML.

Para CI, use variável de ambiente `CI=true` para ativar retries e 1 worker.

---

## Relatórios

Após a execução, o relatório HTML é gerado em `playwright-report/`. Para visualizar:

```bash
pnpm run report
```

Trace, screenshots e vídeos (em caso de falha) ficam em `test-results/`.

---

## Aplicação sob teste

Os testes utilizam o front-end do **[Serverest](https://serverest.dev/)** (`https://front.serverest.dev`), um projeto aberto de API REST + interface para prática de testes e desenvolvimento. Não é necessário subir ambiente local para rodar os testes contra esse front.

---

## Licença

ISC.
