const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/rates', require('./routes/rateRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use('/api/repairs', require('./routes/repairRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Radhe Jewellers API is running' });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
