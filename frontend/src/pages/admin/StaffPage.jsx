import React, { useState, useEffect } from 'react';
import { UserCog, UserPlus, Edit, Trash2, Mail, Shield, CheckCircle2, XCircle } from 'lucide-react';
import api from '../../api/axios';
import DataTable from '../../components/tables/DataTable';
import Button from '../../components/common/Button';
import { toast } from 'react-hot-toast';

const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/staff');
      setStaff(data);
    } catch (error) {
      toast.error('Failed to fetch staff members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const columns = [
    { 
      header: 'Staff Member', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-secondary-darkText text-white flex items-center justify-center font-bold">
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold">{row.name}</p>
            <p className="text-xs text-secondary-mutedText">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Role', 
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
          row.role === 'Admin' ? 'bg-primary-gold/10 text-primary-gold' : 'bg-gray-100 text-gray-700'
        }`}>
          {row.role}
        </span>
      )
    },
    { 
      header: 'Status', 
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.isActive ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <XCircle className="h-4 w-4 text-danger" />
          )}
          <span className={`text-xs font-bold ${row.isActive ? 'text-success' : 'text-danger'}`}>
            {row.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      )
    },
    { header: 'Joined', render: (row) => new Date(row.createdAt).toLocaleDateString() }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-darkText">Staff Management</h1>
          <p className="text-secondary-mutedText mt-1">Manage employee accounts and role-based permissions</p>
        </div>
        <Button icon={UserPlus}>Add Staff Member</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
           <div className="card bg-primary-gold text-white p-8">
              <Shield className="h-12 w-12 mb-6 opacity-40" />
              <h3 className="text-xl font-bold mb-2">Role Based Access</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Assign specific roles to your staff to control what they can see and manage in the system.
              </p>
              <ul className="space-y-3 text-sm font-medium">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Admin: Full Access</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Billing: Rates & Invoices</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2" /> Manager: Repairs & Loans</li>
              </ul>
           </div>
        </div>

        <div className="md:col-span-2">
          <DataTable
            columns={columns}
            data={staff.map(s => ({
              ...s,
              actions: (row) => (
                <div className="flex items-center justify-end space-x-2">
                  <button className="p-2 text-secondary-mutedText hover:text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" title="Edit Permissions">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-secondary-mutedText hover:text-danger hover:bg-red-50 rounded-lg transition-all" title="Remove Staff">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )
            }))}
            loading={loading}
            total={staff.length}
            page={1}
            pages={1}
            onPageChange={() => {}}
            searchPlaceholder="Search staff..."
          />
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
