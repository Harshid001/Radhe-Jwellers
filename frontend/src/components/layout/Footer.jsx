import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, MapPin, Phone, Mail, Camera, Globe, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="Radhe Jewellers" className="h-12 sm:h-14 lg:h-16 w-auto object-contain" />
            </Link>
            <p className="text-secondary-mutedText leading-relaxed">
              Serving our community with trust and excellence in gold and silver jewellery since 1995. Quality and integrity are our hallmarks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-gray-50 text-secondary-mutedText hover:bg-primary-gold hover:text-white transition-all">
                <Camera className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-50 text-secondary-mutedText hover:bg-primary-gold hover:text-white transition-all">
                <Globe className="h-5 w-5" />
              </a>
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-50 text-secondary-mutedText hover:bg-success hover:text-white transition-all">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Repair Status', 'Loan Status', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-secondary-mutedText hover:text-primary-gold transition-colors flex items-center group"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-gold mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-4">
              {['Gold Buy & Sell', 'Silver Buy & Sell', 'Ornament Repair', 'Gold Loans', 'Silver Loans'].map((service) => (
                <li key={service} className="text-secondary-mutedText">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-gold mr-3 mt-1 flex-shrink-0" />
                <span className="text-secondary-mutedText">
                  123 Jewellery Lane, Main Bazaar, City - 400001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-gold mr-3 flex-shrink-0" />
                <span className="text-secondary-mutedText">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-gold mr-3 flex-shrink-0" />
                <span className="text-secondary-mutedText">info@radhejewellers.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-mutedText text-center md:text-left">
            © {new Date().getFullYear()} Radhe Jewellers. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-secondary-mutedText">
            <a href="#" className="hover:text-primary-gold">Privacy Policy</a>
            <a href="#" className="hover:text-primary-gold">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
