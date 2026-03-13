# Playwright Avançado - Framework de Testes E2E

**Framework de automação de testes end-to-end** construído com **Playwright + TypeScript**, demonstrando arquitetura escalável e boas práticas para equipes de QA.

Este projeto serve como **referência arquitetural** para implementação de testes automatizados em ambientes corporativos, com foco em **manutenibilidade, reusabilidade e execução paralela eficiente**.

## 🎯 Propósito do Framework

Este é um **projeto modelo** que implementa:

- **Arquitetura enterprise-ready** para testes E2E
- **Padrões de design** para automação sustentável
- **Estrutura modular** que facilita a manutenção e expansão
- **Integração UI + API** para testes híbridos
- **Execução paralela otimizada** para CI/CD

**Alvo de validação**: Ecossistema **Serverest** (API REST + Frontend React)

## 🛠️ Stack Tecnológico

| Componente | Versão | Propósito |
|------------|--------|----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Playwright** | 1.58.2 | Framework de automação E2E |
| **TypeScript** | 5.x | Tipagem forte e desenvolvimento seguro |
| **Faker.js** | 10.3.0 | Geração de dados dinâmicos |
| **Dotenv** | 16.3.1 | Gestão de variáveis de ambiente |

## 📁 Arquitetura do Framework

```text
├── 📋 playwright.config.ts     # Configuração central do Playwright
├── 📦 package.json            # Dependências e scripts de execução
├── 🔧 .env                    # Variáveis de ambiente (não versionado)
├── 📂 tests/                  # Especificações de teste
│   ├── 🔐 login.spec.ts
│   ├── 👤 user-registration.spec.ts
│   └── 📦 product-management.spec.ts
└── 📂 src/                   # Código-fonte do framework
    ├── 🏗️ core/              # Camada de infraestrutura
    │   ├── ⚙️ fixtures/      # Injeção de dependências
    │   └── 🏭 factories/     # Geração de dados dinâmicos
    ├── 🖥️ pages/             # Page Objects (UI)
    ├── 🎯 selectors/         # Localizadores centralizados
    ├── 🌐 services/          # Camada de API
    ├── 📝 data/              # Dados e mensagens de teste
    ├── 📋 types/             # Contratos TypeScript
    └── 🛠️ utils/             # Utilitários diversos
```

## 🏗️ Padrões Arquiteturais Implementados

### 🎯 Page Object Model (POM)

**Localização**: `src/pages/` + `src/selectors/`

- **Separação de responsabilidades**: Actions em Pages, Locators em Selectors
- **Reutilização**: Selectors compartilhados entre diferentes fluxos
- **Manutenibilidade**: Alterações de UI impactam apenas um ponto

```typescript
// Exemplo de uso
await loginPage.goto();
await loginPage.login(testUser.email, testUser.password);
await loginPage.validateLoginSuccess();
```

### 🌐 Camada de Serviços API

**Localização**: `src/services/`

- **Abstração HTTP**: Cliente API centralizado com configuração de `BASE_URL_API`
- **Operações CRUD**: Serviços dedicados para usuários e produtos
- **Setup/Teardown**: Suporte para criação e limpeza de dados de teste

**Serviços disponíveis**:
- `userService.ts`: gerenciamento de usuários
- `productService.ts`: gerenciamento de produtos  
- `apiClient.ts`: cliente HTTP base

### ⚙️ Fixtures Customizadas

**Localização**: `src/core/fixtures/`

**Injeção de dependências** para composição de contexto de teste:

- **page.fixture.ts**: Injeta Page Objects (loginPage, registerPage, productPage)
- **api.fixture.ts**: Injeta utilidades API e `testUser` com cleanup automático
- **test.fixture.ts**: Composição final utilizada nos specs

### 🏭 Factory Pattern para Dados

**Localização**: `src/core/factories/`

- **Dados dinâmicos**: Geração de dados únicos por execução
- **Isolamento**: Evita colisões em execução paralela
- **Realismo**: Dados realísticos usando Faker.js

### 📝 Gestão de Dados e Mensagens

**Localização**: `src/data/` + `src/types/`

- **Mensagens centralizadas**: Textos esperados em um único local
- **Tipagem forte**: Contratos TypeScript entre camadas
- **Consistência**: Validações padronizadas

## 🚀 Setup do Ambiente

### Pré-requisitos

- **Node.js** 18+ 
- **Package manager**: npm ou pnpm
- **Browsers Playwright** (instalados via setup)

### Instalação e Configuração

```bash
# Clonar o projeto
git clone <repositório>
cd Playwright-Avancado

# Instalar dependências
npm install
# ou
pnpm install

# Instalar browsers do Playwright
npx playwright install
# ou
pnpm exec playwright install
```

### 🔧 Configuração de Ambiente

Crie o arquivo `.env` na raiz do projeto:

```env
# URLs do ambiente de teste
BASE_URL_API=https://api.serverest.dev
BASE_URL_WEB=https://front.serverest.dev

# Configurações de execução
WORKERSLOCAL=2
WORKERSCI=4
RETRIESLOCAL=0
RETRIESCI=1
```

## ⚡ Execução dos Testes

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm test` | Executa todos os testes |
| `npm run test:parallel` | Execução paralela (4 workers) |
| `npm run test:chrome` | Apenas Chrome em modo headed |
| `npm run test:headed` | Todos os browsers em modo visível |
| `npm run test:ui` | Interface interativa do Playwright |
| `npm run test:debug` | Modo debug com breakpoint |
| `npm run report` | Abre relatório HTML |

### Execução Específica

```bash
# Executar arquivo específico
npx playwright test tests/login.spec.ts

# Executar por título de teste
npx playwright test --grep "TC-001"

# Executar em browser específico
npx playwright test --project=chromium

# Execução com modo debug
npx playwright test --debug
```

## 🔄 Estratégia de Paralelismo

### Configuração Multi-Browser

O framework executa testes em **três browsers simultaneamente**:
- **Chromium** (Chrome/Edge)
- **Firefox** 
- **WebKit** (Safari)

### Otimização para CI/CD

```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true,        // Paralelismo total
  workers: process.env.CI ? 4 : 2,  // Workers adaptativos
  retries: process.env.CI ? 1 : 0,  // Retry estratégico
});
```

### Mitigação de Flakiness

- **Dados dinâmicos**: Faker.js gera dados únicos por execução
- **Cleanup automático**: Fixtures com gerenciamento de lifecycle
- **Isolamento**: Cada teste executa em contexto independente
- **Retry inteligente**: Apenas em ambientes CI

## 📊 Relatórios e Evidências

### Artefatos Gerados

| Tipo | Localização | Condição |
|------|-------------|----------|
| **Relatório HTML** | `playwright-report/` | Sempre |
| **Screenshots** | `test-results/` | Apenas em falhas |
| **Videos** | `test-results/` | Apenas em falhas |
| **Trace files** | `test-results/` | Primeiro retry |

### Visualização

```bash
# Abrir relatório completo
npm run report
# ou
npx playwright show-report
```

## 📋 Suíte de Testes Implementada

### 🔐 Autenticação (`login.spec.ts`)

| ID | Cenário | Tipo |
|----|---------|------|
| TC-001 | Login com credenciais válidas | Positivo |
| TC-002 | Login com credenciais inválidas | Negativo |
| TC-003 | Login com campos vazios | Validação |
| TC-004 | Validação de formato e-mail | Validação |
| TC-005 | Redirecionamento por perfil | Funcional |

### 👤 Gestão de Usuários (`user-registration.spec.ts`)

| ID | Cenário | Tipo |
|----|---------|------|
| TC-007 | Cadastro com sucesso | Positivo |
| TC-008 | Cadastro com e-mail duplicado | Negativo |
| TC-009 | Cadastro com campos obrigatórios vazios | Validação |

### 📦 Gestão de Produtos (`product-management.spec.ts`)

| ID | Cenário | Tipo |
|----|---------|------|
| TC-010 | Cadastro de produto com sucesso | Positivo |
| TC-011 | Cadastro com campos inválidos | Validação |
| TC-012 | Cadastro com campos vazios | Validação |
| TC-013 | Exclusão de produto | Funcional |
| TC-014 | Cadastro com nome duplicado | Negativo |

## 🎯 Boas Práticas Implementadas

### Padrões de Código
- ✅ **Single Responsibility**: Cada classe com uma responsabilidade clara
- ✅ **Dependency Injection**: Fixtures para composição de contexto
- ✅ **Type Safety**: TypeScript em todas as camadas
- ✅ **Immutability**: Dados de teste como objetos imutáveis

### Gestão de Testes
- ✅ **AAA Pattern**: Arrange, Act, Assert em todos os testes
- ✅ **Descriptive Names**: Títulos que descrevem o comportamento
- ✅ **Independent Tests**: Sem dependências entre testes
- ✅ **Clean Teardown**: Remoção automática de recursos criados

### Performance e Escalabilidade
- ✅ **Parallel Execution**: Aproveitamento máximo de recursos
- ✅ **Smart Retry**: Retry apenas onde realmente necessário
- ✅ **Selective Execution**: Execução por browser, arquivo ou padrão
- ✅ **Resource Management**: Cleanup eficiente de memória e conexões

## 🚀 Como Evoluir este Framework

### Adicionando Novos Fluxos

1. **Page Object**: Crie classe em `src/pages/`
2. **Selectors**: Defina localizadores em `src/selectors/`
3. **Factory**: Implemente geração de dados em `src/core/factories/`
4. **Service**: Adicione suporte API em `src/services/`
5. **Spec**: Escreva testes usando fixtures existentes

### Extendindo Fixtures

```typescript
// src/core/fixtures/custom.fixture.ts
import { test as base } from './test.fixture';

export const test = base.extend({
  customPage: async ({ page }, use) => {
    // Sua lógica customizada
    await use(customPage);
  }
});
```

### Configuração para Novos Ambientes

```typescript
// config/env.ts
export const env = {
  // ... variáveis existentes
  newEnvironment: process.env.NEW_ENV_URL
};
```

## 🔧 Troubleshooting

### Problemas Comuns

| Problema | Causa | Solução |
|----------|-------|---------|
| Browser não inicia | Permissões SO/Checar instalação | `npx playwright install` |
| Testes flaky | Dados compartilhados | Usar fixtures com dados dinâmicos |
| Timeout em API | Lentidão da rede | Aumentar timeouts no config |
| Paralelismo falhando | Dependência entre testes | Isolar dados e cleanup |

### Debug Avançado

```bash
# Verificar configuração
npx playwright test --list

# Execução com traces detalhados
npx playwright test --trace on

# Modo interativo
npx playwright test --ui
```

---

## 📜 Licença e Contribuição

Este é um **projeto de referência** para equipes de QA. Sinta-se à vontade para:

- ✅ **Adotar** a arquitetura em seus projetos
- ✅ **Adaptar** conforme necessidades específicas
- ✅ **Contribuir** com melhorias e padrões
- ✅ **Compartilhar** aprendizados com a comunidade

**Desenvolvido com ❤️ para a comunidade de QA Automation**

---

> **Nota**: Este framework foi projetado como **modelo educacional e referência arquitetural**. Adapte as implementações conforme as necessidades específicas do seu projeto e ambiente.
