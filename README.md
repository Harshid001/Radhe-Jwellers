# PayFair

PayFair is a full-stack B2B invoice financing platform for suppliers, buyers, and financiers.

## Visual Overview

### Landing & Core Platform
![Hero Page](https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339334/Screenshot_2026-05-09_203537_lrcxmg.png)

<p align="center">
  <img src="https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339333/Screenshot_2026-05-09_203414_mi2sxq.png" width="45%" alt="Dashboard" />
  <img src="https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339333/Screenshot_2026-05-09_203444_dbtteo.png" width="45%" alt="Invoices" />
</p>

### Key Features
<p align="center">
  <img src="https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339333/Screenshot_2026-05-09_203518_wruj82.png" width="45%" alt="Notifications" />
  <img src="https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339332/Screenshot_2026-05-09_203450_eote1j.png" width="45%" alt="Buyer Directory" />
</p>

<p align="center">
  <img src="https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339332/Screenshot_2026-05-09_203448_o2odrj.png" width="45%" alt="Campaigns" />
  <img src="https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339333/Screenshot_2026-05-09_203452_bjlp47.png" width="45%" alt="Savings Calculator" />
</p>

### Experience & Pricing
![How It Works](https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339332/Screenshot_2026-05-09_203435_r3bxmi.png)
![Pricing Plans](https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339333/Screenshot_2026-05-09_203428_edha6h.png)

### User Management
<p align="center">
  <img src="https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339333/Screenshot_2026-05-09_203501_zp4ati.png" width="45%" alt="Settings" />
  <img src="https://res.cloudinary.com/dh0xawlig/image/upload/q_auto/f_auto/v1778339334/Screenshot_2026-05-09_203531_ebfzvz.png" width="45%" alt="Upload Invoice" />
</p>

## Tech Stack

- Frontend: React 18, Vite 5, React Router, Tailwind CSS 3, Axios, Lucide, Recharts
- Backend: Node.js ESM, Express, Mongoose, JWT auth, Passport OAuth scaffold, optional Redis rate limiting
- Database: MongoDB with Mongoose models for users, invoices, bids, transactions, disputes, campaigns, notifications, support tickets, and bug reports

## Setup

Run these from PowerShell at the project root:

```powershell
Set-Location -LiteralPath 'D:\NewVolumeE\Summer VacationProject-2\payfair'
npm.cmd install
npm.cmd run install:all
```

Copy env files:

```powershell
Copy-Item backend\.env.example backend\.env
Copy-Item frontend\.env.example frontend\.env
```

Make sure MongoDB is running locally, or update `backend\.env` with your `MONGODB_URI`.

## Environment

Do not commit real `.env` files. The repository contains placeholder-only examples:

- `D:\NewVolumeE\Summer VacationProject-2\payfair\.env.example`
- `D:\NewVolumeE\Summer VacationProject-2\payfair\backend\.env.example`
- `D:\NewVolumeE\Summer VacationProject-2\payfair\frontend\.env.example`

Backend key variables:

- `NODE_ENV=development`
- `PORT=5000`
- `MONGODB_URI=mongodb://localhost:27017/payfair`
- `MONGO_URI=mongodb://localhost:27017/payfair` optional alias
- `DATABASE_URL=mongodb://localhost:27017/payfair` optional alias
- `JWT_SECRET=replace-with-a-strong-secret-at-least-32-characters`
- `JWT_REFRESH_SECRET=replace-with-a-strong-refresh-secret-at-least-32-characters`
- `JWT_EXPIRES_IN=7d`
- `FRONTEND_URL=http://localhost:5173`
- `BACKEND_URL=http://localhost:5000`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL` only when Google OAuth is enabled
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM` for production email delivery
- `REDIS_URL` optional. If omitted, rate limiting uses in-memory storage.
- `CLOUDINARY_*` or `AWS_*` variables only when switching upload storage away from local disk

Frontend key variable:

- `VITE_API_URL=http://localhost:5000/api/v1`
- `VITE_APP_ENV=development`
- `VITE_ENABLE_ANALYTICS=false`

Production startup validates required backend configuration. In production, `JWT_SECRET` must be non-placeholder text with at least 32 characters, database and public URLs must be set, and SMTP values must be present for auth email flows.

## Run

Run both apps:

```powershell
npm.cmd run dev
```

Run separately:

```powershell
npm.cmd run dev:backend
npm.cmd run dev:frontend
```

Direct folder commands:

```powershell
Set-Location backend
npm.cmd run dev

Set-Location ..\frontend
npm.cmd run dev
```

## Seed Data

This resets the configured MongoDB database and creates demo accounts:

```powershell
npm.cmd run seed
```

Seeded credentials:

- Supplier: `supplier@payfair.com` / `password123`
- Buyer: `buyer@payfair.com` / `password123`
- Financier: `financier@payfair.com` / `password123`

## Build

```powershell
npm.cmd run build
```

## Test and Lint

```powershell
npm.cmd run test
npm.cmd run lint
npm.cmd run test:coverage
```

See `D:\NewVolumeE\Summer VacationProject-2\payfair\TESTING.md` for the automated and manual smoke checklist.

## Troubleshooting

- Use `npm.cmd`, not bare `npm`, in PowerShell if command resolution is inconsistent.
- If the backend starts but rate limiting logs Redis warnings, remove `REDIS_URL` for local development or start Redis.
- If frontend API calls fail in dev, confirm backend is on `http://localhost:5000` and `frontend\.env` points to `/api/v1` or `http://localhost:5000/api/v1`.
- Uploaded files are stored in `backend\uploads` and ignored by Git.
