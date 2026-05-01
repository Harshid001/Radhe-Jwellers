import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, ShieldCheck, Clock, Award, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import Button from '../../components/common/Button';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-secondary-darkText/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-gold/20 border border-primary-gold/30 backdrop-blur-md">
              <Gem className="h-4 w-4 text-primary-gold mr-2" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary-gold">Exquisite Craftsmanship</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-['Outfit'] font-bold leading-tight">
              Timeless Elegance, <br />
              <span className="text-primary-gold">Unmatched Trust</span>
            </h1>
            
            <p className="text-xl text-gray-200 font-light leading-relaxed">
              Discover our exclusive collection of gold and silver ornaments. From traditional heritage to modern designs, we bring you the finest craftsmanship with guaranteed purity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/services">
                <Button className="w-full sm:w-auto text-lg py-4 px-10">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/check-repair">
                <Button variant="secondary" className="w-full sm:w-auto text-lg py-4 px-10 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  Check Repair Status
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: ShieldCheck, label: '100% BIS Hallmarked' },
              { icon: Award, label: 'Quality Guarantee' },
              { icon: Clock, label: '25+ Years Experience' },
              { icon: Gem, label: 'Certified Diamonds' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="bg-primary-gold/10 p-3 rounded-full">
                  <item.icon className="h-6 w-6 text-primary-gold" />
                </div>
                <span className="text-sm font-bold text-secondary-darkText">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-gold/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-gold/20 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80" 
                alt="Jewellery Crafting" 
                className="rounded-2xl shadow-2xl relative z-10 object-cover aspect-video lg:aspect-square"
              />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold text-secondary-darkText">
                A Legacy of Purity and <br className="hidden md:block" />
                <span className="text-primary-gold">Unwavering Commitment</span>
              </h2>
              <p className="text-lg text-secondary-mutedText leading-relaxed">
                Founded in 1995, Radhe Jewellers has been a cornerstone of trust in the community. We specialize in bespoke gold and silver ornaments that tell a story of heritage and love.
              </p>
              <p className="text-lg text-secondary-mutedText leading-relaxed">
                Our mission is to provide every customer with transparency and value, ensuring that your precious moments are celebrated with the finest ornaments.
              </p>
              <div className="pt-4">
                <Link to="/about">
                  <Button variant="secondary" className="px-10">Learn Our Story</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold text-secondary-darkText">Our Premium Services</h2>
            <p className="text-lg text-secondary-mutedText">
              Comprehensive jewellery solutions tailored to your needs, from acquisition to maintenance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Gold & Silver Buy-Sell', desc: 'Transparent pricing based on real-time market rates for your precious metals.' },
              { title: 'Expert Repairs', desc: 'Specialized craftsmen to restore your broken or damaged ornaments to their original glory.' },
              { title: 'Secured Loans', desc: 'Get instant liquidity against your gold ornaments with competitive interest rates.' }
            ].map((service, i) => (
              <div key={i} className="card p-8 group hover:-translate-y-2">
                <div className="h-14 w-14 bg-primary-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-gold transition-colors">
                  <Gem className="h-7 w-7 text-primary-gold group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-secondary-mutedText mb-6 leading-relaxed">{service.desc}</p>
                <Link to="/services" className="text-primary-gold font-bold flex items-center hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold text-white">Have Questions? Talk to Our Experts</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Whether you are looking to buy, sell, or repair, our dedicated team is here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <a href="tel:+919876543210" className="flex items-center justify-center bg-white text-primary-gold px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
              <Phone className="mr-3 h-5 w-5" /> Call Us Now
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-success text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
              <MessageSquare className="mr-3 h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
