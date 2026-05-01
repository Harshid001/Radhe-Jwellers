import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, TrendingUp, Receipt, Package, 
  Wrench, Landmark, FileText, Settings, LogOut, Gem, UserCog, X
} from 'lucide-react';

const AdminSidebar = ({ logout, isOpen, setIsOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Rates', icon: TrendingUp, path: '/admin/rates' },
    { name: 'Billing', icon: Receipt, path: '/admin/billing' },
    { name: 'Inventory', icon: Package, path: '/admin/inventory' },
    { name: 'Repairs', icon: Wrench, path: '/admin/repairs' },
    { name: 'Loans', icon: Landmark, path: '/admin/loans' },
    { name: 'Reports', icon: FileText, path: '/admin/reports' },
    { name: 'Staff', icon: UserCog, path: '/admin/staff' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50
        w-64 bg-white border-r border-border flex flex-col h-screen 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div className="flex items-center">
            <img src="/favicon.svg" alt="Logo" className="h-8 w-8" />
            <span className="ml-2.5 text-xl font-bold font-['Outfit'] text-secondary-darkText">
              Admin <span className="text-primary-gold">Panel</span>
            </span>
          </div>
          <button 
            className="md:hidden text-secondary-mutedText hover:text-danger"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-primary-gold text-white shadow-md shadow-primary-gold/20' 
                  : 'text-secondary-mutedText hover:bg-gray-50 hover:text-secondary-darkText'}
              `}
            >
              <item.icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-secondary-mutedText group-hover:text-secondary-darkText'}`} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
