import React, { useState } from 'react';
import { Search, Wrench, Clock, Calendar, CheckCircle2, AlertCircle, User, Info } from 'lucide-react';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import api from '../../api/axios';
import { formatINR, formatDate } from '../../utils/formatCurrency';
import { toast } from 'react-hot-toast';

const CheckRepairStatusPage = () => {
  const [repairId, setRepairId] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await api.post('/repairs/check-status', { repairId, mobile });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch repair status. Please check your credentials.');
      toast.error('Repair order not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'text-gray-500 bg-gray-100 border-gray-200',
      'In Progress': 'text-primary-gold bg-primary-gold/10 border-primary-gold/20',
      'Completed': 'text-success bg-green-50 border-green-200',
      'Delivered': 'text-blue-600 bg-blue-50 border-blue-200',
      'Cancelled': 'text-danger bg-red-50 border-red-200',
    };
    return colors[status] || 'text-gray-500 bg-gray-100';
  };

  return (
    <div className="bg-secondary-bg min-h-[80vh]">
      {/* Header */}
      <section className="bg-white py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-gold/10 rounded-2xl mb-4">
            <Wrench className="h-8 w-8 text-primary-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-secondary-darkText">Check Repair Status</h1>
          <p className="text-xl text-secondary-mutedText max-w-2xl mx-auto font-light">
            Enter your Repair ID and registered mobile number to track your ornament's repair progress.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-12 mb-12">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <FormInput
                label="Repair ID"
                id="repairId"
                value={repairId}
                onChange={(e) => setRepairId(e.target.value)}
                placeholder="REP-1001"
                required
              />
              <FormInput
                label="Mobile Number"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9876543210"
                required
              />
              <Button type="submit" loading={loading} icon={Search} className="h-[46px]">
                Track Status
              </Button>
            </form>
          </div>

          {/* Results Section */}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="card overflow-hidden border-t-4 border-primary-gold p-0">
                <div className="p-8 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-secondary-mutedText uppercase tracking-wider mb-1">Status for</p>
                    <h3 className="text-2xl font-bold text-secondary-darkText">{result.repairId}</h3>
                  </div>
                  <div className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center ${getStatusColor(result.status)}`}>
                    <Clock className="h-4 w-4 mr-2" />
                    {result.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                  {[
                    { label: 'Customer Name', value: result.customerName, icon: User },
                    { label: 'Ornament Type', value: result.ornamentType, icon: Info },
                    { label: 'Estimated Delivery', value: formatDate(result.expectedDeliveryDate), icon: Calendar },
                    { label: 'Repair Charges', value: result.finalCharge > 0 ? formatINR(result.finalCharge) : formatINR(result.estimatedCharge) + ' (Est.)', icon: CheckCircle2 }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 flex items-start gap-4">
                      <div className="h-10 w-10 bg-secondary-bg rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary-gold" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-secondary-mutedText uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-lg font-bold text-secondary-darkText">{item.value || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-8 bg-gray-50 flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-primary-gold" />
                  <p className="text-sm text-secondary-mutedText">
                    Please bring your original receipt during collection. For any queries, call us at <span className="font-bold">+91 98765 43210</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="card p-8 border-danger/20 bg-red-50 flex items-center gap-4 animate-in shake duration-500">
              <div className="h-12 w-12 bg-danger/10 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-danger" />
              </div>
              <div>
                <h4 className="font-bold text-danger">Status Check Failed</h4>
                <p className="text-danger/80">{error}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CheckRepairStatusPage;
