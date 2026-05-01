import React, { useState, useEffect } from 'react';
import { Wrench, Plus, Edit, Download, Trash2, Clock, CheckCircle2, User, Phone } from 'lucide-react';
import api from '../../api/axios';
import DataTable from '../../components/tables/DataTable';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { formatINR, formatDate } from '../../utils/formatCurrency';
import { toast } from 'react-hot-toast';

const RepairsPage = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const fetchRepairs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/repairs?page=${page}&search=${search}`);
      setRepairs(data.repairs);
      setTotal(data.total);
      setPages(data.pages);
    } catch (error) {
      toast.error('Failed to fetch repairs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, [page, search]);

  const columns = [
    { header: 'Repair ID', key: 'repairId' },
    { 
      header: 'Customer', 
      render: (row) => (
        <div>
          <p className="font-bold">{row.customer?.name}</p>
          <p className="text-xs text-secondary-mutedText">{row.mobile}</p>
        </div>
      )
    },
    { header: 'Item', render: (row) => `${row.ornamentType} (${row.metalType})` },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
          row.status === 'Completed' ? 'bg-green-100 text-green-700' : 
          row.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {row.status}
        </span>
      )
    },
    { 
      header: 'Charge', 
      render: (row) => <span className="font-bold">{formatINR(row.finalCharge || row.estimatedCharge)}</span> 
    },
    { header: 'Delivery', render: (row) => formatDate(row.expectedDeliveryDate) }
  ];

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/repairs/${id}/status`, { status });
      toast.success(`Status updated to ${status}`);
      fetchRepairs();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-darkText">Repair Orders</h1>
          <p className="text-secondary-mutedText mt-1">Manage ornament repairs and status updates</p>
        </div>
        <Button icon={Wrench}>Create Repair Order</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pending', count: 8, color: 'border-gray-200' },
          { label: 'In Progress', count: 12, color: 'border-primary-gold' },
          { label: 'Completed', count: 45, color: 'border-success' },
          { label: 'Today Deliv.', count: 3, color: 'border-blue-500' }
        ].map((stat, i) => (
          <div key={i} className={`card p-6 border-l-4 ${stat.color}`}>
             <p className="text-xs font-bold text-secondary-mutedText uppercase tracking-widest">{stat.label}</p>
             <p className="text-2xl font-bold text-secondary-darkText mt-1">{stat.count}</p>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={repairs.map(r => ({
          ...r,
          actions: (row) => (
            <div className="flex items-center justify-end space-x-2">
              <select 
                className="text-xs border border-border rounded p-1 outline-none mr-2"
                value={row.status}
                onChange={(e) => updateStatus(row._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button className="p-2 text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" title="Download Receipt">
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
        searchPlaceholder="Search repair ID or mobile..."
      />
    </div>
  );
};

export default RepairsPage;
