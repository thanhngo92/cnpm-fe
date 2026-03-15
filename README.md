# Cosmetics shop management software

Cosmetics shop management software is a full-stack web application for managing and operating an online cosmetics store.

## Current project status

This repository currently includes:

- Frontend storefront (React Router + Vite + TypeScript)
- Backend authentication API (Express + MongoDB + JWT)
- Core shopping flow screens (home, products, promotion, cart, checkout)

## Main features (implemented)

### Frontend (`fe`)

- Auth UI pages:
  - Login (`/glowup/login`)
  - Register (`/glowup/register`)
  - Forgot password (`/glowup/forgot-password`)
- User pages:
  - Home (`/glowup`)
  - Products (`/glowup/products`)
  - Promotion (`/glowup/promotion`)
  - Cart (`/glowup/cart`)
- Checkout flow pages:
  - Shipping (`/glowup/checkout`)
  - Payment (`/glowup/checkout/payment`)
  - QR Payment (`/glowup/checkout/qr-payment`)
  - Complete (`/glowup/checkout/complete`)
- Topbar + cart item count
- Reusable UI components (button, input, card, label, textarea, loading)

### Backend (`be`)

- Authentication APIs:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me` (requires `Authorization: Bearer <token>`)
  - `POST /api/auth/logout`
- JWT token generation and verification
- User schema with role support (`user`, `admin`)
- MongoDB connection with Mongoose

## Tech stack

### Frontend

- React 19
- React Router 7
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `cors`, `dotenv`

## Project structure

```text
CNPM/
  be/  # Backend API
  fe/  # Frontend app
```

## Setup and run

## 1. Backend

```bash
cd be
npm install
```

Create `.env` in `be`:

```env
PORT=5000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=15p
CORS_ORIGIN=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

## 2. Frontend

```bash
cd fe
npm install
```

Create `.env` in `fe`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

## Notes

- Backend auth is JWT-based and uses Bearer token for protected routes.
- Auth UI screens exist in frontend; behavior/flow can be extended based on your final product logic.
- The project currently focuses on web app flow (desktop-oriented UI).

## Roadmap suggestions

- Complete end-to-end auth integration (token storage + guarded routes)
- Admin dashboard modules (products, inventory, orders, promotions)
- Order management and payment status tracking
- User profile and order history
- Testing (unit/integration) and CI pipeline
