import React, { useState } from 'react';
import { FileText, Download, Filter, TrendingUp, ShoppingBag, Wrench, Landmark, Users } from 'lucide-react';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { formatINR } from '../../utils/formatCurrency';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('sales');
  
  const tabs = [
    { id: 'sales', label: 'Sales Report', icon: TrendingUp },
    { id: 'purchases', label: 'Purchase Report', icon: ShoppingBag },
    { id: 'repairs', label: 'Repair Income', icon: Wrench },
    { id: 'loans', label: 'Loan Portfolio', icon: Landmark },
    { id: 'customers', label: 'Customer Growth', icon: Users },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-darkText">Business Reports</h1>
          <p className="text-secondary-mutedText mt-1">Export data and analyze your shop performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={FileText}>Export CSV</Button>
          <Button icon={Download}>Download PDF Report</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-1 bg-white p-1 rounded-2xl border border-border overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-primary-gold text-white shadow-lg shadow-primary-gold/20' 
                : 'text-secondary-mutedText hover:bg-gray-50 hover:text-secondary-darkText'}
            `}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <FormInput label="From Date" type="date" />
        <FormInput label="To Date" type="date" />
        <div className="space-y-1.5">
          <label className="text-sm font-semibold">Metal Filter</label>
          <select className="w-full px-4 py-2.5 bg-secondary-bg border border-border rounded-xl text-sm outline-none">
            <option>All Metals</option>
            <option>Gold Only</option>
            <option>Silver Only</option>
          </select>
        </div>
        <Button variant="secondary" icon={Filter} className="h-[46px]">Apply Filters</Button>
      </div>

      {/* Report Summary Data (Placeholder for now) */}
      <div className="card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-bold capitalize">{activeTab} Summary</h3>
        </div>
        <div className="p-8 flex flex-col items-center justify-center space-y-4 text-center py-24">
           <div className="h-20 w-20 bg-secondary-bg rounded-full flex items-center justify-center mb-4">
             <FileText className="h-10 w-10 text-gray-300" />
           </div>
           <h4 className="text-xl font-bold text-secondary-darkText">Select a date range to generate report</h4>
           <p className="text-secondary-mutedText max-w-md">Detailed analytical reports with breakdown of taxes, making charges, and purity will appear here once you apply the filters.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
