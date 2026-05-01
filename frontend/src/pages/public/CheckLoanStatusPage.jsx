import React, { useState } from 'react';
import { Search, Landmark, Calendar, User, Info, AlertCircle, CreditCard, DollarSign } from 'lucide-react';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import api from '../../api/axios';
import { formatINR, formatDate } from '../../utils/formatCurrency';
import { toast } from 'react-hot-toast';

const CheckLoanStatusPage = () => {
  const [loanId, setLoanId] = useState('');
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
      const { data } = await api.post('/loans/check-status', { loanId, mobile });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch loan status. Please check your credentials.');
      toast.error('Loan record not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'text-primary-gold bg-primary-gold/10 border-primary-gold/20',
      'Closed': 'text-success bg-green-50 border-green-200',
      'Overdue': 'text-danger bg-red-50 border-red-200',
      'Defaulted': 'text-white bg-secondary-darkText border-secondary-darkText',
    };
    return colors[status] || 'text-gray-500 bg-gray-100';
  };

  return (
    <div className="bg-secondary-bg min-h-[80vh]">
      {/* Header */}
      <section className="bg-white py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-primary-gold/10 rounded-2xl mb-4">
            <Landmark className="h-8 w-8 text-primary-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-secondary-darkText">Check Loan Status</h1>
          <p className="text-xl text-secondary-mutedText max-w-2xl mx-auto font-light">
            Monitor your jewellery loan details, due dates, and outstanding balance securely.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8 md:p-12 mb-12">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <FormInput
                label="Loan ID"
                id="loanId"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                placeholder="LOAN-1001"
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
                Check Details
              </Button>
            </form>
          </div>

          {/* Results Section */}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6">
              <div className="card overflow-hidden border-t-4 border-primary-gold p-0">
                <div className="p-8 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-secondary-mutedText uppercase tracking-wider mb-1">Loan Account</p>
                    <h3 className="text-2xl font-bold text-secondary-darkText">{result.loanId}</h3>
                  </div>
                  <div className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center ${getStatusColor(result.status)}`}>
                    <Landmark className="h-4 w-4 mr-2" />
                    {result.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                  {[
                    { label: 'Customer', value: result.customerName, icon: User },
                    { label: 'Loan Amount', value: formatINR(result.loanAmount), icon: DollarSign },
                    { label: 'Accrued Interest', value: formatINR(result.interestAmount), icon: TrendingUp },
                    { label: 'Due Date', value: formatDate(result.dueDate), icon: Calendar },
                    { label: 'Final Payable', value: formatINR(result.finalPayableAmount), icon: CreditCard },
                    { label: 'Paid Amount', value: formatINR(result.paidAmount), icon: CheckCircle2 }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-6 flex items-start gap-4">
                      <div className="h-10 w-10 bg-secondary-bg rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.icon && <item.icon className="h-5 w-5 text-primary-gold" />}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-secondary-mutedText uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-lg font-bold text-secondary-darkText">{item.value || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-8 bg-primary-gold/5 flex flex-col md:flex-row justify-between items-center gap-6">
                   <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-primary-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-secondary-mutedText">Outstanding Balance</p>
                        <p className="text-3xl font-bold text-secondary-darkText">{formatINR(result.remainingAmount)}</p>
                      </div>
                   </div>
                   <Button variant="primary" className="w-full md:w-auto">Pay Online (Coming Soon)</Button>
                </div>
              </div>

              <div className="card p-6 bg-amber-50 border-amber-200 flex items-start gap-4">
                <Info className="h-6 w-6 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Important:</strong> Repayment can be made via UPI, Bank Transfer or Cash at our showroom. Please ensure payment is made before the due date to avoid penalty charges. Overdue loans may result in auction of pledged ornaments as per terms and conditions.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="card p-8 border-danger/20 bg-red-50 flex items-center gap-4 animate-in shake duration-500">
              <div className="h-12 w-12 bg-danger/10 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-danger" />
              </div>
              <div>
                <h4 className="font-bold text-danger">Loan Check Failed</h4>
                <p className="text-danger/80">{error}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Dummy component for TrendingUp icon as it was used in code but not imported
const TrendingUp = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const CheckCircle2 = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

export default CheckLoanStatusPage;
