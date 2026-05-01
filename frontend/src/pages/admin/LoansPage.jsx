import React, { useState, useEffect } from 'react';
import { Landmark, Plus, Edit, Download, Landmark as LandmarkIcon, CreditCard, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import DataTable from '../../components/tables/DataTable';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { formatINR, formatDate } from '../../utils/formatCurrency';
import { toast } from 'react-hot-toast';

const LoansPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(1);
  
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer: '',
    mobile: '',
    ornamentType: '',
    metalType: 'Gold',
    weight: '',
    purity: '22K',
    rate: '',
    loanPercentage: 75,
    monthlyInterestRate: 1.5,
    durationMonths: 12,
    penalty: 0
  });

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/loans?page=${page}&search=${search}`);
      setLoans(data.loans);
      setTotal(data.total);
      setPages(data.pages);
    } catch (error) {
      toast.error('Failed to fetch loans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [page, search]);

  const columns = [
    { header: 'Loan ID', key: 'loanId' },
    { 
      header: 'Customer', 
      render: (row) => (
        <div>
          <p className="font-bold">{row.customer?.name}</p>
          <p className="text-xs text-secondary-mutedText">{row.mobile}</p>
        </div>
      )
    },
    { header: 'Item', render: (row) => `${row.ornamentType} (${row.weight}g)` },
    { 
      header: 'Loan Amt', 
      render: (row) => <span className="font-bold text-primary-gold">{formatINR(row.loanAmount)}</span> 
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
          row.status === 'Active' ? 'bg-blue-100 text-blue-700' : 
          row.status === 'Closed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {row.status}
        </span>
      )
    },
    { header: 'Due Date', render: (row) => formatDate(row.dueDate) }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-darkText">Loan Management</h1>
          <p className="text-secondary-mutedText mt-1">Track ornaments pledged for financial loans</p>
        </div>
        <Button icon={Plus}>New Loan Entry</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Loan Principal', value: formatINR(2540000), icon: DollarSign, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Interest Earned', value: formatINR(125000), icon: CreditCard, color: 'text-success bg-green-50' },
          { label: 'Overdue Loans', value: '4 Accounts', icon: AlertCircle, color: 'text-danger bg-red-50' }
        ].map((stat, i) => (
          <div key={i} className="card p-6 flex items-center gap-4">
             <div className={`p-3 rounded-xl ${stat.color}`}>
               <stat.icon className="h-6 w-6" />
             </div>
             <div>
               <p className="text-xs font-bold text-secondary-mutedText uppercase tracking-widest">{stat.label}</p>
               <p className="text-xl font-bold text-secondary-darkText mt-1">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={loans.map(l => ({
          ...l,
          actions: (row) => (
            <div className="flex items-center justify-end space-x-2">
              <button className="p-2 text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" title="Add Payment">
                <Plus className="h-4 w-4" />
              </button>
              <button className="p-2 text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" title="Download Contract">
                <Download className="h-4 w-4" />
              </button>
              <button className="p-2 text-secondary-mutedText hover:text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" title="Edit">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          )
        }))}
        loading={loading}
        total={total}
        page={page}
        pages={pages}
        onPageChange={setPage}
        onSearch={setSearch}
        searchPlaceholder="Search loan ID or mobile..."
      />
    </div>
  );
};

export default LoansPage;
