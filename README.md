# 🚀 API RESTful Node.js + TypeScript (Production-Grade)

[![CI Pipeline](https://github.com/reneerocha/api-nodejs/actions/workflows/ci.yml/badge.svg)](https://github.com/reneerocha/api-nodejs/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-556096)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-Cache-red)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)](https://www.docker.com/)

API RESTful desenvolvida com **Node.js, TypeScript e Arquitetura Limpa**, aplicando boas práticas de desenvolvimento backend, persistência híbrida (**PostgreSQL + MongoDB**), cacheamento em **Redis**, cobertura de **testes automatizados (Jest)**, containerização **Docker** e integração contínua via **GitHub Actions**.

---

## 🏛️ Arquitetura e Decisões Técnicas

- **Linguagem & Runtime**: TypeScript estritamente tipado sobre Node.js 20 LTS.
- **Camada WEB**: Express.js estruturado com Controllers, Services, Middlewares e tratamento global de erros.
- **Persistência Principal (Relacional)**: **PostgreSQL** gerenciado via **Prisma ORM** (Modelagem de Pessoas/Recursos).
- **Audit Logging (Não-Relacional)**: **MongoDB** via Mongoose para auditoria assíncrona de eventos de escrita.
- **Performance & Cache**: **Redis** para armazenamento em cache de rotas de leitura frequente (`GET /person`), reduzindo a carga no banco relacional.
- **Segurança**: Middlewares `Helmet` para headers HTTP seguros e `CORS`.
- **Testes**: Testes de integração e unidade desenvolvidos com **Jest** e **Supertest**.
- **CI/CD & DevOps**: Esteira automatizada no **GitHub Actions** (compilação TypeScript + execução de testes) e orquestração local via `docker-compose`.

---

## 🛠️ Tecno-Stack

- **Core**: Node.js, TypeScript, Express.js.
- **Databases**: PostgreSQL (Prisma ORM), MongoDB (Mongoose), Redis (ioredis).
- **Testes**: Jest, Supertest.
- **DevOps**: Docker, Docker Compose, GitHub Actions.

---

## 📌 Rotas da API

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/health` | Status de saúde da aplicação (Health Check) |
| `GET` | `/person` | Lista todas as pessoas (com suporte a cache no Redis) |
| `POST` | `/person` | Cria uma nova pessoa (Persiste no Postgres + Audit log no Mongo + Invalida cache) |
| `GET` | `/person/:id` | Busca uma pessoa por ID |
| `PATCH` | `/person/:id` | Atualiza dados de uma pessoa por ID |
| `DELETE` | `/person/:id` | Remove uma pessoa do sistema |

---

## 🐳 Executando com Docker Compose (Forma Recomendada)

Para subir toda a infraestrutura de banco de dados (PostgreSQL, MongoDB e Redis) junto com a API Node.js em containers:

```bash
# Subir ambiente completo
docker-compose up -d --build

# Verificar logs da API
docker-compose logs -f app
```

A API estará disponível em `http://localhost:3000`.

---

## 💻 Execução Local para Desenvolvimento

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Executar em modo desenvolvimento
npm run dev

# 4. Rodar a suíte de testes
npm test
```

---

## 🧪 Suíte de Testes Automatizados

```bash
npm test
```

Os testes automatizados validam o contrato de requisições, tratamento de erros e integridade das respostas HTTP.

---

## 👤 Autor

**Renee Rocha**
- **GitHub**: [@reneerocha](https://github.com/reneerocha)
- **LinkedIn**: [Renee Rocha](https://github.com/reneerocha)
- **Email**: reneerocha.pi@gmail.com
