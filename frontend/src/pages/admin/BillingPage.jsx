import React, { useState, useEffect } from 'react';
import { Receipt, Plus, Search, FileDown, Trash2, User, Gem, ArrowRight, Download } from 'lucide-react';
import api from '../../api/axios';
import DataTable from '../../components/tables/DataTable';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { formatINR, formatDate } from '../../utils/formatCurrency';
import { toast } from 'react-hot-toast';

const BillingPage = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(1);
  
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [latestRates, setLatestRates] = useState([]);

  const [formData, setFormData] = useState({
    customer: '',
    transactionType: 'Sell',
    metalType: 'Gold',
    ornamentType: '',
    weight: '',
    purity: '22K',
    rate: '',
    makingCharges: 0,
    wastageCharges: 0,
    gstPercentage: 3,
    paymentMode: 'Cash'
  });

  const fetchBills = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/billing?page=${page}&search=${search}`);
      setBills(data.bills);
      setTotal(data.total);
      setPages(data.pages);
    } catch (error) {
      toast.error('Failed to fetch bills');
    } finally {
      setLoading(false);
    }
  };

  const fetchDependencies = async () => {
    try {
      const [custRes, ratesRes] = await Promise.all([
        api.get('/customers?limit=100'),
        api.get('/rates/latest')
      ]);
      setCustomers(custRes.data.customers);
      setLatestRates(ratesRes.data);
    } catch (error) {
      console.error('Failed to fetch dependencies');
    }
  };

  useEffect(() => {
    fetchBills();
  }, [page, search]);

  useEffect(() => {
    if (showModal) fetchDependencies();
  }, [showModal]);

  // Handle rate auto-fill
  useEffect(() => {
    const activeRate = latestRates.find(r => r.purity === formData.purity);
    if (activeRate) {
      setFormData(prev => ({ ...prev, rate: activeRate.ratePerGram }));
    }
  }, [formData.purity, latestRates]);

  const columns = [
    { header: 'Bill #', key: 'billNumber' },
    { 
      header: 'Customer', 
      render: (row) => (
        <div>
          <p className="font-bold">{row.customer?.name}</p>
          <p className="text-xs text-secondary-mutedText">{row.customer?.mobile}</p>
        </div>
      )
    },
    { 
      header: 'Type', 
      render: (row) => (
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
          row.transactionType === 'Sell' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
        }`}>
          {row.transactionType}
        </span>
      )
    },
    { header: 'Item', key: 'ornamentType' },
    { 
      header: 'Final Amount', 
      render: (row) => <span className="font-bold">{formatINR(row.finalAmount)}</span> 
    },
    { header: 'Date', render: (row) => formatDate(row.createdAt) }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/billing', formData);
      toast.success('Bill generated successfully!');
      setShowModal(false);
      fetchBills();
    } catch (error) {
      toast.error('Failed to generate bill');
    }
  };

  const downloadPDF = async (id, billNo) => {
    try {
      const response = await api.get(`/billing/${id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${billNo}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Failed to download PDF');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-darkText">Billing & Invoices</h1>
          <p className="text-secondary-mutedText mt-1">Generate and manage purchase/sale transactions</p>
        </div>
        <Button icon={Receipt} onClick={() => setShowModal(true)}>Create New Bill</Button>
      </div>

      <DataTable
        columns={columns}
        data={bills.map(b => ({
          ...b,
          actions: (row) => (
            <div className="flex items-center justify-end space-x-2">
              <button 
                onClick={() => downloadPDF(row._id, row.billNumber)}
                className="p-2 text-primary-gold hover:bg-primary-gold/5 rounded-lg transition-all" 
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
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
        searchPlaceholder="Search by bill number..."
      />

      {/* Bill Generation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-secondary-darkText/40 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-300">
            <div className="p-6 border-b border-border flex justify-between items-center bg-primary-gold text-white">
              <h3 className="text-xl font-bold flex items-center"><Receipt className="mr-2 h-5 w-5" /> Generate New Bill</h3>
              <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-1 rounded transition-colors font-bold">Close</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
              {/* Customer & Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Select Customer</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-secondary-bg border border-border rounded-xl text-sm outline-none"
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers.map(c => <option key={c._id} value={c._id}>{c.name} ({c.mobile})</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Transaction Type</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-secondary-bg border border-border rounded-xl text-sm outline-none"
                    value={formData.transactionType}
                    onChange={(e) => setFormData({ ...formData, transactionType: e.target.value })}
                  >
                    <option value="Sell">Sell to Customer</option>
                    <option value="Buy">Buy from Customer</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Metal Type</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-secondary-bg border border-border rounded-xl text-sm outline-none"
                    value={formData.metalType}
                    onChange={(e) => setFormData({ ...formData, metalType: e.target.value })}
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FormInput
                  label="Ornament Type"
                  placeholder="e.g. Necklace"
                  value={formData.ornamentType}
                  onChange={(e) => setFormData({ ...formData, ornamentType: e.target.value })}
                  required
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Purity</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-secondary-bg border border-border rounded-xl text-sm outline-none"
                    value={formData.purity}
                    onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                  >
                    {formData.metalType === 'Gold' ? (
                      <>
                        <option value="24K">24K</option>
                        <option value="22K">22K</option>
                        <option value="18K">18K</option>
                      </>
                    ) : (
                      <>
                        <option value="999 Silver">999 Silver</option>
                        <option value="925 Silver">925 Silver</option>
                      </>
                    )}
                  </select>
                </div>
                <FormInput
                  label="Weight (grams)"
                  type="number"
                  step="0.001"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  required
                />
                <FormInput
                  label="Rate (per gram)"
                  type="number"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  required
                />
              </div>

              {/* Charges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/50">
                <FormInput
                  label="Making Charges (₹)"
                  type="number"
                  value={formData.makingCharges}
                  onChange={(e) => setFormData({ ...formData, makingCharges: e.target.value })}
                />
                <FormInput
                  label="Wastage Charges (₹)"
                  type="number"
                  value={formData.wastageCharges}
                  onChange={(e) => setFormData({ ...formData, wastageCharges: e.target.value })}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold">Payment Mode</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-secondary-bg border border-border rounded-xl text-sm outline-none"
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Debit/Credit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              {/* Calculation Summary (Frontend logic for immediate feedback) */}
              <div className="bg-secondary-bg rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Gem className="h-6 w-6 text-primary-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-secondary-mutedText uppercase tracking-widest">Estimated Value</p>
                      <p className="text-2xl font-bold">{formatINR((formData.weight || 0) * (formData.rate || 0))}</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-2 text-secondary-mutedText">
                    <span>+ Charges</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>+ {formData.gstPercentage}% GST</span>
                 </div>
                 <div className="text-right">
                    <p className="text-xs font-bold text-primary-gold uppercase tracking-widest">Final Amount</p>
                    <p className="text-3xl font-bold text-secondary-darkText">
                      {formatINR(
                        ((formData.weight || 0) * (formData.rate || 0) + 
                        Number(formData.makingCharges) + 
                        Number(formData.wastageCharges)) * 1.03
                      )}
                    </p>
                 </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit" icon={Receipt}>Generate & Save Bill</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
