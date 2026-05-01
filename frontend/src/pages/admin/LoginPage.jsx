import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gem, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Logged in successfully!');
      navigate('/admin/dashboard');
    } else {
      toast.error(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-secondary-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        {/* Brand */}
        <div className="text-center mb-8 sm:mb-10">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6 transform transition-transform hover:scale-105">
            <div className="bg-primary-gold p-2.5 sm:p-3 rounded-2xl shadow-lg shadow-primary-gold/20">
              <Gem className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
            <span className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-secondary-darkText tracking-tight">
              Radhe <span className="text-primary-gold">Jewellers</span>
            </span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-secondary-darkText">Admin Login</h1>
          <p className="text-sm sm:text-base text-secondary-mutedText mt-2">Manage your shop, customers, and transactions</p>
        </div>

        {/* Login Card */}
        <div className="card p-6 sm:p-10 shadow-2xl shadow-primary-gold/5 border border-primary-gold/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Mail className="h-5 w-5 text-secondary-mutedText" />
              </div>
              <FormInput
                label="Email Address"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@radhejewellers.com"
                inputClassName="pl-12"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Lock className="h-5 w-5 text-secondary-mutedText" />
              </div>
              <FormInput
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                inputClassName="pl-12 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute bottom-2.5 right-3 p-1.5 text-secondary-mutedText hover:text-primary-gold transition-colors z-20"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary-gold focus:ring-primary-gold" />
                <span className="ml-2 text-secondary-mutedText group-hover:text-secondary-darkText transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-primary-gold font-bold hover:underline">Forgot password?</a>
            </div>

            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full py-3.5 sm:py-4 text-base sm:text-lg"
              icon={ShieldCheck}
            >
              Secure Login
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <Link to="/" className="text-sm font-medium text-secondary-mutedText hover:text-primary-gold flex items-center justify-center transition-colors">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Public Website
            </Link>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-10 flex items-center justify-center space-x-6 text-secondary-mutedText">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="text-xs font-medium uppercase tracking-widest">SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="text-xs font-medium uppercase tracking-widest">JWT Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
