# ARXATEC SERVICE

**The historical backend for an early Arxatec platform.**

**Technologies:** Node.js, Express 4, TypeScript 5, Prisma 6, PostgreSQL 16 and Redis.

[Repository overview](../README.md) · [The story](../README.md#the-story) · [Frontend platform](../arxatec-platform/README.md)

## The story

This service is the backend preserved alongside the early [Arxatec platform](../arxatec-platform/README.md). It contains HTTP routes, business logic and a Prisma schema for an earlier stage of the product's development.

> **Important:** This service is archived and incomplete. It is not the current Arxatec backend and is not intended for production use.

## What is in the prototype

| Area | Examples in the source |
| --- | --- |
| **Accounts** | Registration, login and password-reset routes. |
| **Legal platform** | Lawyer and client routes, plus case models and code. |
| **Community** | Community, article and notification routes. |
| **Integrations** | Email, forms, waitlist, chatbot, file storage and Socket.IO configuration. |
| **API reference** | Swagger UI at `/api-docs` and a `/ping` route. |

Most API routes are mounted under `/api/v1`. The cases route is commented out in [`src/routes.ts`](src/routes.ts), even though case code and database models are present. Other integrations require separate services or credentials and may be unfinished.

## Project structure

```text
arxatec-service/
├── docker-compose.yml       Local PostgreSQL and Redis services
├── prisma/
│   └── schema.prisma        Database models and connection configuration
├── public/                 Public files and assets
├── src/
│   ├── config/             Environment, database, email, Redis and socket setup
│   ├── docs/               Swagger configuration
│   ├── infrastructure/     External storage and JWT helpers
│   ├── middlewares/        Request and authentication middleware
│   ├── modules/            Domain areas and feature implementations
│   ├── utils/              Shared helpers
│   ├── index.ts            HTTP server entry point
│   └── routes.ts           Central API router
├── .env.sample             Example environment variables
└── package.json            Dependencies and scripts
```

Modules combine domain, data and presentation layers; some features, such as authentication, are also grouped into vertical slices. See [CONTRIBUTING.md](CONTRIBUTING.md) for the historical development conventions.

## Running locally

Use Node.js 22 or newer, npm and Docker with Compose. The commands below create a **local disposable database** using the included Compose file. They were checked with Node.js 24 and npm 11. The archived lockfile is incomplete for current npm, so this installation resolves the declared version ranges without modifying it:

```bash
git clone https://github.com/arxatec-engine/arxatec-prototype.git
cd arxatec-prototype/arxatec-service
npm install --no-package-lock
cp -n .env.sample .env
```

Edit `.env` and set at least the following for the included local services:

```env
DATABASE_URL_PROD="postgresql://arxatec:arxatec@localhost:5432/arxatecservice?schema=public"
DIRECT_URL_PROD="postgresql://arxatec:arxatec@localhost:5432/arxatecservice?schema=public"
REDIS_URL="redis://localhost:6379"
PORT="3000"
APP_URL="http://localhost:"
SOCKET_URL="http://localhost:5173"
JWT_SECRET="01234567890123456789012345678901"
```

Despite their names, `DATABASE_URL_PROD` and `DIRECT_URL_PROD` are the variables currently read by the Prisma schema, including for a local database. The sample JWT value is for local development only; the service requires at least 32 ASCII characters. Email, Gemini and AWS S3 features need their own configuration; consult [`.env.sample`](.env.sample) and [`src/config/env/index.ts`](src/config/env/index.ts).

```bash
docker compose up -d db redis
npx prisma db push
npm run dev
```

`prisma db push` synchronizes the schema and generates the Prisma client. No migration history is included in this archive: use a fresh local database, since schema synchronization can alter existing data. The Compose file uses ports `5432` and `6379` and names the database container `my_postgres`; ensure these are available.

The service listens at [http://localhost:3000](http://localhost:3000). Check [http://localhost:3000/ping](http://localhost:3000/ping) for `pong` and open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for the historical Swagger UI.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the service with the TypeScript watcher. |
| `npm run build` | Bundle the service into `dist/`. |
| `npm start` | Start a previously built service. |
| `npx prisma validate` | Validate the Prisma schema and configured database URLs. |

## People

The later Arxatec team included **Rafael Martín Aguirre Gonzalo** and **Yhefry Michael Gaspar Almonacid**, with substantial contributions from **Harvey Yerik Vasquez Huaranga** until June. **Yemis Paredez** built the preceding 2024 MVP. See the [repository overview](../README.md#the-people) and Git history for the wider context and contributors.
