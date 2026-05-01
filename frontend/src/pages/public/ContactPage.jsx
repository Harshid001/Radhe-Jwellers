import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, Clock, ShieldCheck } from 'lucide-react';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import { toast } from 'react-hot-toast';
import api from '../../api/axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Note: We'll need an inquiry endpoint on the backend
      // await api.post('/inquiries', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      toast.success('Your inquiry has been sent! We will contact you soon.');
      setFormData({ name: '', mobile: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary-bg">
      {/* Header */}
      <section className="bg-white py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-secondary-darkText">Contact Us</h1>
          <p className="text-xl text-secondary-mutedText max-w-2xl mx-auto font-light">
            Have questions? We're here to help. Reach out to us through any channel.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-['Outfit'] font-bold text-secondary-darkText">Get in Touch</h2>
                <p className="text-lg text-secondary-mutedText leading-relaxed">
                  Visit our showroom for a personalized consultation or contact us digitally. Our team is ready to assist you with all your jewellery needs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="card p-6 flex flex-col space-y-4">
                  <div className="h-12 w-12 bg-primary-gold/10 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Our Showroom</h4>
                    <p className="text-sm text-secondary-mutedText">123 Jewellery Lane, Main Bazaar, City - 400001</p>
                  </div>
                </div>

                <div className="card p-6 flex flex-col space-y-4">
                  <div className="h-12 w-12 bg-primary-gold/10 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Call/WhatsApp</h4>
                    <p className="text-sm text-secondary-mutedText">+91 98765 43210</p>
                  </div>
                </div>

                <div className="card p-6 flex flex-col space-y-4">
                  <div className="h-12 w-12 bg-primary-gold/10 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <p className="text-sm text-secondary-mutedText">info@radhejewellers.com</p>
                  </div>
                </div>

                <div className="card p-6 flex flex-col space-y-4">
                  <div className="h-12 w-12 bg-primary-gold/10 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Business Hours</h4>
                    <p className="text-sm text-secondary-mutedText">Mon - Sat: 10AM - 8PM</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-3xl overflow-hidden shadow-xl h-[300px] bg-gray-200 relative group">
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/80.9,15.5,12/800x400?access_token=none')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-primary-gold/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center border border-primary-gold/20">
                    <MapPin className="h-5 w-5 text-primary-gold mr-2" />
                    <span className="font-bold text-secondary-darkText">View on Google Maps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="card p-10 md:p-12">
              <div className="space-y-4 mb-10">
                <h3 className="text-2xl font-bold text-secondary-darkText">Send an Inquiry</h3>
                <p className="text-secondary-mutedText">Fill out the form below and our manager will get back to you within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  label="Full Name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Mobile Number"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                  />
                  <FormInput
                    label="Email Address"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-sm font-semibold text-secondary-darkText">
                    Your Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm transition-all duration-200 outline-none focus:ring-4 focus:ring-primary-gold/20 focus:border-primary-gold"
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  loading={loading} 
                  className="w-full py-4 text-lg"
                  icon={Send}
                >
                  Send Inquiry
                </Button>

                <div className="pt-4 flex items-center justify-center space-x-2 text-sm text-secondary-mutedText">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span>Your data is secure and confidential.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/919876543210" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-success text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm px-0 group-hover:px-2">
          Chat with us
        </span>
        <MessageSquare className="h-6 w-6" />
      </a>
    </div>
  );
};

export default ContactPage;
