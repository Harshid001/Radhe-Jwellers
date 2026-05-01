import React, { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2, Eye, Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';
import api from '../../api/axios';
import DataTable from '../../components/tables/DataTable';
import Button from '../../components/common/Button';
import { toast } from 'react-hot-toast';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(1);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/customers?page=${page}&search=${search}`);
      setCustomers(data.customers);
      setTotal(data.total);
      setPages(data.pages);
    } catch (error) {
      toast.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, search]);

  const columns = [
    { 
      header: 'Customer', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-gold/10 flex items-center justify-center font-bold text-primary-gold">
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold">{row.name}</p>
            <p className="text-xs text-secondary-mutedText">{row.email || 'No email'}</p>
          </div>
        </div>
      )
    },
    { header: 'Mobile', key: 'mobile' },
    { 
      header: 'Verification', 
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
          row.verificationStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {row.verificationStatus}
        </span>
      )
    },
    { 
      header: 'ID Proof', 
      render: (row) => row.idProofType ? `${row.idProofType} (${row.idProofNumber})` : 'Not Provided' 
    }
  ];

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/customers/${id}`);
        toast.success('Customer deleted');
        fetchCustomers();
      } catch (error) {
        toast.error('Failed to delete customer');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-darkText">Customer Management</h1>
          <p className="text-secondary-mutedText mt-1">View and manage your customer database</p>
        </div>
        <Button icon={UserPlus}>Add New Customer</Button>
      </div>

      <DataTable
        columns={columns}
        data={customers.map(c => ({
          ...c,
          actions: (row) => (
            <div className="flex items-center justify-end space-x-2">
              <button className="p-2 text-secondary-mutedText hover:text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" title="View Profile">
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-2 text-secondary-mutedText hover:text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" title="Edit">
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDelete(row._id)}
                className="p-2 text-secondary-mutedText hover:text-danger hover:bg-red-50 rounded-lg transition-all" title="Delete"
              >
                <Trash2 className="h-4 w-4" />
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
        searchPlaceholder="Search by name or mobile..."
      />
    </div>
  );
};

export default CustomersPage;
