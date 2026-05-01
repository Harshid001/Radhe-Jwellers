import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, Filter, Edit, Trash2, Tag, Gem, Info, Image as ImageIcon } from 'lucide-react';
import api from '../../api/axios';
import DataTable from '../../components/tables/DataTable';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { formatINR } from '../../utils/formatCurrency';
import { toast } from 'react-hot-toast';

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/inventory?page=${page}&search=${search}`);
      setItems(data.items);
      setTotal(data.total);
      setPages(data.pages);
    } catch (error) {
      toast.error('Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page, search]);

  const columns = [
    { 
      header: 'Item', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
            {row.image ? <img src={row.image} alt={row.itemName} className="object-cover w-full h-full" /> : <ImageIcon className="h-5 w-5 text-gray-400" />}
          </div>
          <div>
            <p className="font-bold">{row.itemName}</p>
            <p className="text-xs text-secondary-mutedText">{row.category}</p>
          </div>
        </div>
      )
    },
    { header: 'Metal', render: (row) => `${row.metalType} (${row.purity})` },
    { header: 'Weight', render: (row) => `${row.weight}g` },
    { header: 'Price', render: (row) => <span className="font-bold">{formatINR(row.sellingPrice)}</span> },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
          row.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-darkText">Inventory Stock</h1>
          <p className="text-secondary-mutedText mt-1">Manage and track your jewellery collection</p>
        </div>
        <Button icon={Plus}>Add New Item</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Value', value: formatINR(1500000), icon: Tag, color: 'text-primary-gold bg-primary-gold/10' },
          { label: 'Available Items', value: '142', icon: Package, color: 'text-success bg-green-50' },
          { label: 'In Repair/Loan', value: '10', icon: Info, color: 'text-blue-600 bg-blue-50' }
        ].map((stat, i) => (
          <div key={i} className="card flex items-center gap-4 p-6">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-secondary-mutedText uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold text-secondary-darkText mt-0.5">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={items.map(i => ({
          ...i,
          actions: (row) => (
            <div className="flex items-center justify-end space-x-2">
              <button className="p-2 text-secondary-mutedText hover:text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" title="Edit">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 text-secondary-mutedText hover:text-danger hover:bg-red-50 rounded-lg transition-all" title="Delete">
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
        searchPlaceholder="Search items..."
      />
    </div>
  );
};

export default InventoryPage;
