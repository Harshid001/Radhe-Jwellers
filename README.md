# Radhe Jwellers

Welcome to **Radhe Jwellers** - Your trusted source for exquisite jewelry and premium accessories.

## 🌟 About Us

Radhe Jwellers is a full-featured e-commerce platform dedicated to showcasing and selling high-quality jewelry pieces. From traditional designs to contemporary collections, we bring elegance and craftsmanship to every customer experience.

## 🎯 Features

- **Elegant Product Showcase** - Browse our curated collection of jewelry and accessories
- **Responsive Design** - Seamless experience across all devices
- **User-Friendly Interface** - Intuitive navigation and product discovery
- **Secure Transactions** - Safe and secure checkout process
- **Customer Accounts** - Personalized user profiles and order history
- **Product Search & Filtering** - Find exactly what you're looking for
- **Real-Time Inventory** - Always up-to-date stock information

## 💻 Tech Stack

- **Frontend**: React 18, Vite 5, React Router, Tailwind CSS 3, Axios, Lucide Icons
- **Backend**: Node.js, Express, Mongoose, JWT Authentication, MongoDB
- **Database**: MongoDB with collections for products, users, orders, and more
- **Styling**: Tailwind CSS 3 for modern, responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Harshid001/Radhe-Jwellers.git
cd Radhe-Jwellers
```

2. **Install dependencies**
```bash
npm install
npm run install:all
```

3. **Setup environment files**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

4. **Configure environment variables**

**Backend (.env)**:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/radhe-jwellers
JWT_SECRET=your-secret-key-min-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-min-32-characters
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

**Frontend (.env)**:
```
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_ENV=development
```

## 📦 Running the Project

### Development Mode

**Run both frontend and backend:**
```bash
npm run dev
```

**Run individually:**
```bash
npm run dev:backend
npm run dev:frontend
```

### Production Build

```bash
npm run build
```

### Seed Database

Populate the database with sample data:
```bash
npm run seed
```

## 📂 Project Structure

```
Radhe-Jwellers/
├── backend/              # Express.js API server
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   └── config/          # Configuration files
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── styles/      # Tailwind styles
│   └── public/          # Static assets
└── package.json         # Root dependencies
```

## 🧪 Testing & Linting

```bash
npm run test
npm run lint
npm run test:coverage
```

## 🔧 Troubleshooting

- **MongoDB Connection Issues**: Ensure MongoDB is running locally or update `MONGODB_URI` in `.env`
- **Port Already in Use**: Change the `PORT` in backend `.env` (default: 5000)
- **CORS Errors**: Verify `FRONTEND_URL` matches your frontend URL
- **Frontend API Calls Fail**: Check that `VITE_API_URL` points to your backend correctly

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run both backend and frontend in development mode |
| `npm run dev:backend` | Run backend only |
| `npm run dev:frontend` | Run frontend only |
| `npm run build` | Build for production |
| `npm run seed` | Populate database with sample data |
| `npm run test` | Run tests |
| `npm run lint` | Run ESLint |

## 📝 Environment Variables

### Backend
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (min 32 chars)
- `JWT_REFRESH_SECRET` - JWT refresh secret (min 32 chars)
- `FRONTEND_URL` - Frontend application URL
- `BACKEND_URL` - Backend application URL

### Frontend
- `VITE_API_URL` - Backend API base URL
- `VITE_APP_ENV` - Application environment
- `VITE_ENABLE_ANALYTICS` - Analytics flag (optional)

## 🎨 Design System

Built with Tailwind CSS 3 for a modern, responsive design that works seamlessly across all devices.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Made with ❤️ by Radhe Jwellers Team**
