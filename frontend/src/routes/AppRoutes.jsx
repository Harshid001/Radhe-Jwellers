import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Public Pages
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import ServicesPage from '../pages/public/ServicesPage';
import ContactPage from '../pages/public/ContactPage';
import CheckRepairStatusPage from '../pages/public/CheckRepairStatusPage';
import CheckLoanStatusPage from '../pages/public/CheckLoanStatusPage';

// Admin Pages
import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import CustomersPage from '../pages/admin/CustomersPage';
import RatesPage from '../pages/admin/RatesPage';
import BillingPage from '../pages/admin/BillingPage';
import InventoryPage from '../pages/admin/InventoryPage';
import RepairsPage from '../pages/admin/RepairsPage';
import LoansPage from '../pages/admin/LoansPage';
import ReportsPage from '../pages/admin/ReportsPage';
import StaffPage from '../pages/admin/StaffPage';
import SettingsPage from '../pages/admin/SettingsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/check-repair" element={<CheckRepairStatusPage />} />
        <Route path="/check-loan" element={<CheckLoanStatusPage />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="rates" element={<RatesPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="repairs" element={<RepairsPage />} />
        <Route path="loans" element={<LoansPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
