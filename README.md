# BITO — POS Checkout (MERN)

One end-to-end workflow: cashier logs in → searches catalog → cart → places
order → payment webhook confirms → receipt. Admin sees a sales report with
margin that a cashier can never reach. Multi-tenant, single shared backend.

## Stack
- Backend: Node.js + Express + TypeScript, MongoDB (Mongoose)
- Frontend: React + TypeScript (Vite)
- MongoDB runs as a single-node replica set (transactions available)
- Everything runs via `docker compose`

## Run
```bash
docker compose up --build
```
- Frontend: http://localhost:5173
- Backend health check: http://localhost:4000/health
- MongoDB: localhost:27017 (replica set `rs0`)

Secrets have safe dev defaults, so no `.env` is required. To override:
```bash
cp .env.example .env   # then edit JWT_SECRET / WEBHOOK_SECRET
```

## Seed data
```bash
docker compose exec backend npm run seed
```
(Seeds tenants + an admin and cashier per tenant — used to verify isolation.)

## Layout
```
backend/src/
  config/      env + db connection
  models/      Mongoose schemas
  middleware/  auth, tenant scoping, role guard, error handling
  services/    business logic (tenant-scoped, server-trusted)
  routes/      one router per stage
frontend/src/  React screens (login, catalog+cart, receipt, admin report)
```

See `DECISIONS.md` for the design rationale.
