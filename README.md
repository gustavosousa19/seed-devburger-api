# ⚙️ DevBurguer API (Backend)

Este repositório contém o servidor e a API que gerenciam a lógica de negócios, autenticação de usuários, persistência de dados de produtos e processamento de pagamentos para a hamburgueria **DevBurguer**.

---

## 🚀 Tecnologias Utilizadas

A API foi desenvolvida utilizando as ferramentas mais modernas do ecossistema Node.js:

* **[Node.js (v20+)](https://nodejs.org/)** - Ambiente de execução com suporte nativo a `--watch`.
* **[Express 5](https://expressjs.com/)** - Framework para criação de rotas HTTP.
* **[Sequelize 6](https://sequelize.org/)** - ORM para gerenciamento e consultas ao banco de dados PostgreSQL.
* **[JWT (JsonWebToken)](https://jwt.io/)** - Autenticação segura de usuários.
* **[Stripe API](https://stripe.com/)** - Gateway para processamento de pagamentos.
* **[Biome](https://biomejs.dev/)** - Ferramenta ultra rápida para formatação e linting do código.

---

## 🔧 Como Rodar o Projeto

### Pré-requisitos
Antes de começar, você precisa ter instalado o **Node.js** e o gerenciador de pacotes **pnpm**. Também precisará de um banco de dados **PostgreSQL** ativo.

### Passo a Passo

1. **Abra o terminal na pasta do projeto:**
   ```bash
   cd hamburgueria

2. **Instale as dependências:**
   ```bash
   pnpm install

3. **Configuração das Variáveis de Ambiente (.env):**
    Verifique ou crie o arquivo .env na raiz do projeto com as suas credenciais:
    
   ```Snippet de código

    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_NAME=devburger
    STRIPE_SECRET_KEY=sua_chave_secreta_do_stripe

4. **Rode as Migrations (Criar as tabelas no Banco de Dados):**
   ```bash
   pnpm sequelize db:migrate
# Se houver dados iniciais para popular (seeds):
    pnpm sequelize db:seed:all

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev

1. **Abra o terminal na pasta do projeto:**
   ```bash
   cd hamburgueria