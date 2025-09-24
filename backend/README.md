# Admin Panel Backend

This is the backend part of the Admin Panel project.

## Requirements
- Node.js 22.x
- npm 10.x
- PostgreSQL database

## Installation
```bash
npm install
```

## Apply database migrations
```bash
npm run prisma:migrate
```

## Run seeds (required to populate users)
```bash
npm run prisma:seed
```

## Running
```bash
npm run start
```
Backend will run on http://localhost:4000 by default.

## Environment Variables

- `PORT` – server port
- `NODE_ENV` – environment (development or production)
- `DATABASE_URL` – PostgreSQL connection URL
- `JWT_SECRET` – secret key for JWT tokens
- `ORIGIN` – frontend URL allowed for CORS

## Jest

```bash
npm run test
npm run test:e2e
```
