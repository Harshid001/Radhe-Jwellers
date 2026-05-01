# Radhe Jewellers Management System

A professional, full-stack jewellery shop management platform built with React, Node.js, and MongoDB.

## Features
- **Public Website:** Home, About, Services, Contact, and Status Tracking.
- **Admin Dashboard:** Business metrics and sales charts.
- **Customer Management:** KYC tracking and transaction history.
- **Billing:** Buy/Sell transactions with auto-calculations and PDF generation.
- **Inventory:** Stock management with category filtering.
- **Repairs:** Order tracking and status management.
- **Loans:** Gold/Silver loan management with interest calculations.
- **Reports:** Analytical data export (CSV/PDF).

## Tech Stack
- **Frontend:** React, Tailwind CSS, Recharts, Lucide Icons.
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, PDFKit.

---

## Setup Instructions

### 1. Database Setup
- Ensure MongoDB is installed and running locally on `mongodb://localhost:27017`.
- Alternatively, provide a MongoDB Atlas URI in the `.env` file.

### 2. Backend Setup
```bash
cd server
npm install
npm run seed  # This will create the default admin and sample data
npm run dev   # Starts server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev   # Starts website on http://localhost:5173
```

### 4. Admin Credentials
- **Email:** `admin@radhejewellers.com`
- **Password:** `Admin@123`

---

## Environment Variables (.env)

**Server (`/server/.env`):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/radhe-jewellers
JWT_SECRET=radhe_jewellers_secret_key_2026
NODE_ENV=development
```

**Frontend (`/frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Calculations Formula
- **Metal Value** = Weight × Rate × Purity %
- **Final Bill** = (Metal Value + Making + Wastage) + GST
- **Loan Interest** = Loan Amount × Monthly Rate × Duration
