import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Users, Wrench, Landmark, 
  Receipt, ShoppingBag, Clock, ArrowUpRight, ArrowDownRight, Gem
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import api from '../../api/axios';
import { formatINR } from '../../utils/formatCurrency';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/reports/dashboard');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!stats) return <div>Error loading dashboard</div>;

  const statCards = [
    { label: "Today's Sales", value: formatINR(stats.todaySales), icon: TrendingUp, color: "text-success bg-green-50", trend: "+12.5%", isPositive: true },
    { label: "Today's Purchases", value: formatINR(stats.todayPurchases), icon: TrendingDown, color: "text-danger bg-red-50", trend: "-2.4%", isPositive: false },
    { label: "Pending Repairs", value: stats.pendingRepairs, icon: Wrench, color: "text-primary-gold bg-primary-gold/10", trend: "5 new", isPositive: true },
    { label: "Active Loans", value: stats.activeLoans, icon: Landmark, color: "text-blue-600 bg-blue-50", trend: "2 due", isPositive: false },
  ];

  const chartData = stats.monthlySales.map(item => ({
    name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][item._id.month - 1],
    amount: item.total
  }));

  // Fallback data if empty
  const data = chartData.length > 0 ? chartData : [
    { name: 'Jan', amount: 400000 }, { name: 'Feb', amount: 300000 },
    { name: 'Mar', amount: 600000 }, { name: 'Apr', amount: 800000 },
    { name: 'May', amount: 500000 }, { name: 'Jun', amount: 900000 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-darkText">Dashboard Overview</h1>
        <p className="text-secondary-mutedText mt-1">Real-time business performance and metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="card group hover:border-primary-gold transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center text-xs font-bold ${card.isPositive ? 'text-success' : 'text-danger'}`}>
                {card.trend}
                {card.isPositive ? <ArrowUpRight className="h-3 w-3 ml-1" /> : <ArrowDownRight className="h-3 w-3 ml-1" />}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-mutedText">{card.label}</p>
              <p className="text-2xl font-bold text-secondary-darkText mt-1 tracking-tight">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold">Monthly Sales Performance</h3>
            <select className="text-xs font-bold px-3 py-1.5 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary-gold/20">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F1F1" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [formatINR(value), 'Sales']}
                />
                <Area type="monotone" dataKey="amount" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-8">
          <div className="card h-full">
            <h3 className="text-lg font-bold mb-6">Inventory Value</h3>
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
               <div className="relative h-48 w-48 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[12px] border-secondary-bg"></div>
                  <div className="absolute inset-0 rounded-full border-[12px] border-primary-gold border-t-transparent -rotate-45"></div>
                  <div className="text-center">
                    <Gem className="h-8 w-8 text-primary-gold mx-auto mb-2" />
                    <p className="text-xs font-bold text-secondary-mutedText uppercase tracking-widest">Total Valuation</p>
                    <p className="text-2xl font-bold">{formatINR(stats.inventoryValue)}</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 w-full gap-4 pt-6">
                 <div className="text-center">
                   <p className="text-[10px] font-bold text-secondary-mutedText uppercase mb-1">Total Items</p>
                   <p className="text-lg font-bold text-secondary-darkText">152</p>
                 </div>
                 <div className="text-center">
                   <p className="text-[10px] font-bold text-secondary-mutedText uppercase mb-1">Total Cust.</p>
                   <p className="text-lg font-bold text-secondary-darkText">{stats.totalCustomers}</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity (Placeholders for now) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Critical Alerts</h3>
            <span className="text-xs font-bold px-2 py-1 bg-red-100 text-red-600 rounded">Action Needed</span>
          </div>
          <div className="space-y-4">
             {[
               { icon: Landmark, msg: 'Loan #LOAN-1045 is overdue by 5 days', time: '2 hours ago', color: 'text-red-600 bg-red-50' },
               { icon: Wrench, msg: 'Repair #REP-1022 reached delivery date', time: '5 hours ago', color: 'text-amber-600 bg-amber-50' },
               { icon: Users, msg: 'New customer KYC pending verification', time: 'Yesterday', color: 'text-blue-600 bg-blue-50' }
             ].map((alert, i) => (
               <div key={i} className="flex items-center p-3 rounded-xl border border-transparent hover:border-border transition-all">
                  <div className={`p-2.5 rounded-lg mr-4 ${alert.color}`}>
                    <alert.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-secondary-darkText">{alert.msg}</p>
                    <p className="text-xs text-secondary-mutedText">{alert.time}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Receipt, label: 'Create Bill', path: '/admin/billing', color: 'bg-primary-gold' },
              { icon: Wrench, label: 'Add Repair', path: '/admin/repairs', color: 'bg-secondary-darkText' },
              { icon: Landmark, label: 'New Loan', path: '/admin/loans', color: 'bg-primary-darkGold' },
              { icon: Users, label: 'Add Customer', path: '/admin/customers', color: 'bg-gray-400' }
            ].map((action, i) => (
              <a 
                key={i} 
                href={action.path}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border border-border hover:border-primary-gold group transition-all"
              >
                <div className={`p-3 rounded-xl mb-3 text-white ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold text-secondary-darkText">{action.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
