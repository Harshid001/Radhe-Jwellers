import React, { useState, useEffect } from 'react';
import { Settings, Store, MapPin, Phone, Mail, FileText, Lock, Save, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import api from '../../api/axios';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { toast } from 'react-hot-toast';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    shopName: 'Radhe Jewellers',
    tagline: 'Trusted Gold & Silver Services',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    gstNumber: '',
    invoicePrefix: 'BILL',
    invoiceTerms: 'Thank you for your business!'
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        setSettings(data);
      } catch (error) {
        console.error('Failed to fetch settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put('/settings', settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setIsSaving(true);
    try {
      await api.put('/auth/password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      toast.success('Password updated successfully');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-secondary-darkText">System Settings</h1>
        <p className="text-secondary-mutedText mt-1">Configure your shop profile and account security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'shop', label: 'Shop Profile', icon: Store },
            { id: 'invoice', label: 'Invoice Settings', icon: FileText },
            { id: 'security', label: 'Account Security', icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                w-full flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all
                ${activeTab === tab.id 
                  ? 'bg-primary-gold text-white shadow-lg shadow-primary-gold/20' 
                  : 'text-secondary-mutedText hover:bg-white hover:text-secondary-darkText'}
              `}
            >
              <tab.icon className="h-5 w-5 mr-3" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'shop' && (
            <div className="card p-10 space-y-8 animate-in slide-in-from-right-4 duration-300">
               <div className="flex items-center gap-6 pb-6 border-b border-border">
                  <div className="h-24 w-24 bg-secondary-bg rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-border group cursor-pointer hover:border-primary-gold transition-colors">
                     <ImageIcon className="h-8 w-8 text-secondary-mutedText group-hover:text-primary-gold transition-colors" />
                     <span className="text-[10px] font-bold text-secondary-mutedText mt-1">Upload Logo</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Shop Branding</h3>
                    <p className="text-sm text-secondary-mutedText">Your logo and shop details appear on receipts and website.</p>
                  </div>
               </div>

               <form onSubmit={handleUpdateSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput 
                      label="Shop Name" 
                      value={settings.shopName} 
                      onChange={(e) => setSettings({...settings, shopName: e.target.value})} 
                    />
                    <FormInput 
                      label="Shop Tagline" 
                      value={settings.tagline} 
                      onChange={(e) => setSettings({...settings, tagline: e.target.value})} 
                    />
                    <FormInput 
                      label="Phone Number" 
                      value={settings.phone} 
                      onChange={(e) => setSettings({...settings, phone: e.target.value})} 
                    />
                    <FormInput 
                      label="WhatsApp Number" 
                      value={settings.whatsapp} 
                      onChange={(e) => setSettings({...settings, whatsapp: e.target.value})} 
                    />
                    <FormInput 
                      label="Email Address" 
                      value={settings.email} 
                      onChange={(e) => setSettings({...settings, email: e.target.value})} 
                    />
                    <FormInput 
                      label="GST Number" 
                      value={settings.gstNumber} 
                      onChange={(e) => setSettings({...settings, gstNumber: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Address</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-secondary-bg border border-border rounded-xl text-sm outline-none focus:ring-4 focus:ring-primary-gold/20 focus:border-primary-gold transition-all"
                      rows="3"
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" loading={isSaving} icon={Save}>Save Changes</Button>
                  </div>
               </form>
            </div>
          )}

          {activeTab === 'invoice' && (
            <div className="card p-10 space-y-8 animate-in slide-in-from-right-4 duration-300">
               <h3 className="text-xl font-bold border-b border-border pb-6">Invoice Configuration</h3>
               <form onSubmit={handleUpdateSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput 
                      label="Invoice Prefix" 
                      value={settings.invoicePrefix} 
                      onChange={(e) => setSettings({...settings, invoicePrefix: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Terms & Conditions (Footer)</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-secondary-bg border border-border rounded-xl text-sm outline-none focus:ring-4 focus:ring-primary-gold/20 focus:border-primary-gold transition-all"
                      rows="5"
                      value={settings.invoiceTerms}
                      onChange={(e) => setSettings({...settings, invoiceTerms: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" loading={isSaving} icon={Save}>Update Invoice Settings</Button>
                  </div>
               </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-10 space-y-8 animate-in slide-in-from-right-4 duration-300">
               <h3 className="text-xl font-bold border-b border-border pb-6">Security Settings</h3>
               <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
                  <FormInput 
                    label="Current Password" 
                    type="password" 
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                    required
                  />
                  <FormInput 
                    label="New Password" 
                    type="password" 
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                    required
                  />
                  <FormInput 
                    label="Confirm New Password" 
                    type="password" 
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                    required
                  />
                  <div className="flex items-center gap-3 py-2 text-xs text-secondary-mutedText">
                    <ShieldCheck className="h-4 w-4 text-success" />
                    <span>Passwords must be at least 8 characters long.</span>
                  </div>
                  <Button type="submit" loading={isSaving} icon={Lock} className="w-full">Update Password</Button>
               </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
