import React, { useContext, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import LoadingSpinner from '../common/LoadingSpinner';
import { Menu } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) return <LoadingSpinner fullScreen />;
  if (!user) return <Navigate to="/admin/login" />;

  return (
    <div className="flex min-h-screen bg-secondary-bg">
      <AdminSidebar 
        logout={logout} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      <main className="flex-1 overflow-x-hidden">
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center">
            <button 
              className="mr-4 md:hidden text-secondary-darkText hover:text-primary-gold"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-bold text-secondary-darkText hidden sm:block">
              Welcome, {user.name}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs px-3 py-1 bg-primary-gold/10 text-primary-gold rounded-full font-bold uppercase">
              {user.role}
            </span>
          </div>
        </header>
        <div className="p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
