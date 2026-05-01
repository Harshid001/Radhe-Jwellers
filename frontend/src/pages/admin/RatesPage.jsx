import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, History, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { formatINR, formatDate } from '../../utils/formatCurrency';
import { toast } from 'react-hot-toast';

const RatesPage = () => {
  const [latestRates, setLatestRates] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [newRate, setNewRate] = useState({
    metalType: 'Gold',
    purity: '24K',
    ratePerGram: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [latestRes, historyRes] = await Promise.all([
        api.get('/rates/latest'),
        api.get('/rates/history?limit=10')
      ]);
      setLatestRates(latestRes.data);
      setHistory(historyRes.data.rates);
    } catch (error) {
      toast.error('Failed to fetch rates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await api.post('/rates', newRate);
      toast.success('Rates updated successfully');
      setNewRate({ ...newRate, ratePerGram: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to update rates');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-secondary-darkText">Market Rates</h1>
          <p className="text-secondary-mutedText mt-1">Manage daily gold and silver rates</p>
        </div>
        <Button variant="secondary" icon={RefreshCw} onClick={fetchData}>Refresh Data</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Rates Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestRates.map((rate, i) => (
            <div key={i} className="card border-t-4 border-primary-gold relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                 <TrendingUp className="h-20 w-20" />
               </div>
               <div className="flex items-center justify-between mb-4">
                 <span className="text-xs font-bold uppercase tracking-widest text-primary-gold px-2 py-1 bg-primary-gold/10 rounded">
                   {rate.metalType} • {rate.purity}
                 </span>
                 <span className="text-xs text-secondary-mutedText flex items-center">
                   <Clock className="h-3 w-3 mr-1" />
                   {new Date(rate.date).toLocaleTimeString()}
                 </span>
               </div>
               <p className="text-3xl font-bold text-secondary-darkText">{formatINR(rate.ratePerGram)} <span className="text-sm font-medium text-secondary-mutedText">/ gram</span></p>
               <p className="text-xs text-secondary-mutedText mt-2">Last updated: {formatDate(rate.date)}</p>
            </div>
          ))}
          
          {latestRates.length === 0 && !loading && (
             <div className="col-span-2 card bg-amber-50 border-amber-200 flex flex-col items-center justify-center py-12 text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-amber-500" />
                <div>
                   <h3 className="text-lg font-bold text-amber-800">No Rates Found</h3>
                   <p className="text-amber-700">Please add the latest market rates to get started.</p>
                </div>
             </div>
          )}
        </div>

        {/* Add Rate Form */}
        <div className="card">
          <h3 className="text-lg font-bold mb-6 flex items-center">
            <Plus className="h-5 w-5 mr-2 text-primary-gold" /> Update Current Rate
          </h3>
          <form onSubmit={handleAddRate} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Metal Type</label>
              <select 
                className="w-full px-4 py-2.5 bg-secondary-bg border border-border rounded-xl text-sm outline-none focus:ring-4 focus:ring-primary-gold/20 focus:border-primary-gold transition-all"
                value={newRate.metalType}
                onChange={(e) => setNewRate({ ...newRate, metalType: e.target.value })}
              >
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Purity</label>
              <select 
                className="w-full px-4 py-2.5 bg-secondary-bg border border-border rounded-xl text-sm outline-none focus:ring-4 focus:ring-primary-gold/20 focus:border-primary-gold transition-all"
                value={newRate.purity}
                onChange={(e) => setNewRate({ ...newRate, purity: e.target.value })}
              >
                {newRate.metalType === 'Gold' ? (
                  <>
                    <option value="24K">24K (99.9%)</option>
                    <option value="22K">22K (91.6%)</option>
                    <option value="18K">18K (75%)</option>
                  </>
                ) : (
                  <>
                    <option value="999 Silver">999 Pure Silver</option>
                    <option value="925 Silver">925 Sterling Silver</option>
                  </>
                )}
              </select>
            </div>

            <FormInput
              label="Rate per Gram (₹)"
              type="number"
              value={newRate.ratePerGram}
              onChange={(e) => setNewRate({ ...newRate, ratePerGram: e.target.value })}
              placeholder="e.g. 6250"
              required
            />

            <Button type="submit" loading={isUpdating} className="w-full">Update Rate</Button>
          </form>
        </div>
      </div>

      {/* History Section */}
      <div className="card p-0">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center">
            <History className="h-5 w-5 mr-2 text-primary-gold" /> Rate History
          </h3>
          <Button variant="ghost" className="text-xs font-bold text-primary-gold uppercase">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-secondary-bg/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-secondary-mutedText uppercase tracking-widest">Metal</th>
                <th className="px-6 py-4 text-xs font-bold text-secondary-mutedText uppercase tracking-widest">Purity</th>
                <th className="px-6 py-4 text-xs font-bold text-secondary-mutedText uppercase tracking-widest">Rate / gram</th>
                <th className="px-6 py-4 text-xs font-bold text-secondary-mutedText uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold">{h.metalType}</td>
                  <td className="px-6 py-4 text-sm text-secondary-mutedText">{h.purity}</td>
                  <td className="px-6 py-4 text-sm font-bold text-secondary-darkText">{formatINR(h.ratePerGram)}</td>
                  <td className="px-6 py-4 text-sm text-secondary-mutedText">{formatDate(h.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RatesPage;
