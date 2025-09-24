# Admin Panel

## Overview
Admin Panel is an administrative dashboard for user and role management.  
Main features:
- Login/logout with access/refresh tokens stored in httpOnly cookies
- Users can log in with any account from the database (default password for all users: `Qwerty123`)
- Users table with:
    - Pagination
    - Sorting by `Name` and `Created`
    - Filtering by roles
- Users with `ADMIN` role can update roles of other users
- Internationalization: English, Russian, Ukrainian
- Theme toggle (dark/light)

## Technologies

### Frontend
- TypeScript, React (Vite)
- TanStack Query, Zustand
- Tailwind CSS, Headless UI
- React Router, i18next, ky
- ESLint, Prettier, Husky

### Backend
- TypeScript, Nest.js
- Prisma, PostgreSQL
- JWT, Jest
- ESLint, Prettier

### Hosting
- Frontend: Vercel
- Backend: Render

## Requirements
- Node.js: 22.19.0
- npm: 10.9.3

## Installation and Running

### Backend

#### — Run PostgreSQL client

#### — Move to backend directory (from root)
```bash
cd backend
```

#### — Install dependencies
```bash
npm install
```

#### — Apply database migrations
```bash
npm run prisma:migrate
```

#### — Run seeds (required to populate users)
```bash
npm run prisma:seed
```

#### — Run Backend
```bash
npm run start
```

### Frontend

#### — Move to frontend directory (from root)
```bash
cd frontend
```

#### — Install dependencies
```bash
npm install
```

#### — Run Frontend
```bash
npm run dev
```

## Environment Variables

### Backend
| Variable       | Description |
|----------------|-------------|
| `PORT`         | Server port |
| `NODE_ENV`     | Environment (`development` or `production`) |
| `DATABASE_URL` | PostgreSQL connection URL |
| `JWT_SECRET`   | Secret key for JWT tokens |
| `ORIGIN`       | Frontend URL allowed for CORS |

### Frontend
| Variable        | Description |
|-----------------|-------------|
| `VITE_API_URL`  | Backend server URL (Render) |

## Deployment

- **Frontend:** [Vercel](#)
- **Backend:** [Render](#)
- **Swagger API:** [Render Swagger](#)  
