import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, Coins, Wrench, Landmark, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Button from '../../components/common/Button';

const ServicesPage = () => {
  const services = [
    {
      title: 'Gold Buy & Sell',
      icon: Gem,
      desc: 'Get the best market rates for your gold. We offer transparent weight measurement and purity testing using state-of-the-art machines.',
      features: ['Live Market Rates', 'Instant Cash/Transfer', 'Purity Certification']
    },
    {
      title: 'Silver Buy & Sell',
      icon: Coins,
      desc: 'Wide range of silver ornaments and utensils. Exchange your old silver for new designs or get instant cash with minimum deduction.',
      features: ['Real-time Rates', 'No Hidden Charges', '99.9% Purity Available']
    },
    {
      title: 'Ornament Repair',
      icon: Wrench,
      desc: 'Expert restoration for your broken or old ornaments. We fix chains, rings, bracelets, and more with precision and care.',
      features: ['Skilled Craftsmen', 'Quick Turnaround', 'Status Tracking']
    },
    {
      title: 'Gold Ornament Loan',
      icon: Landmark,
      desc: 'Instant financial solutions against your gold. Low interest rates and flexible repayment options with maximum security.',
      features: ['Minimal Paperwork', 'Lowest Interest', 'Safe Custody']
    },
    {
      title: 'Silver Ornament Loan',
      icon: Landmark,
      desc: 'Liquidity against silver utensils and ornaments. Easy processing and quick disbursal of funds when you need them most.',
      features: ['Instant Approval', 'Flexible Tenure', '100% Security']
    },
    {
      title: 'Bespoke Designing',
      icon: Zap,
      desc: 'Turn your imagination into reality. Our designers work with you to create unique, custom-made jewellery for your special occasions.',
      features: ['Custom CAD Designs', 'Exclusive Collection', 'One-of-a-kind Pieces']
    }
  ];

  return (
    <div className="bg-secondary-bg">
      {/* Header */}
      <section className="bg-white py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-secondary-darkText">Our Services</h1>
          <p className="text-xl text-secondary-mutedText max-w-2xl mx-auto font-light">
            Comprehensive jewellery management and customer-focused financial solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="card group hover:border-primary-gold transition-all duration-500">
                <div className="h-16 w-16 bg-secondary-bg rounded-2xl flex items-center justify-center mb-8 border border-border group-hover:bg-primary-gold group-hover:border-primary-gold transition-all duration-500">
                  <service.icon className="h-8 w-8 text-primary-gold group-hover:text-white transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-secondary-mutedText mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-sm font-medium text-secondary-darkText">
                      <ShieldCheck className="h-4 w-4 text-success mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  {service.title.includes('Repair') ? (
                    <Link to="/check-repair">
                      <Button variant="ghost" className="text-primary-gold font-bold p-0">
                        Check Status <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : service.title.includes('Loan') ? (
                    <Link to="/check-loan">
                      <Button variant="ghost" className="text-primary-gold font-bold p-0">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/contact">
                      <Button variant="ghost" className="text-primary-gold font-bold p-0">
                        Inquire Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary-darkText rounded-[3rem] overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 md:p-20 space-y-8">
              <h2 className="text-3xl md:text-5xl font-['Outfit'] font-bold text-white leading-tight">
                Why Choose <br />
                <span className="text-primary-gold">Radhe Jewellers?</span>
              </h2>
              <div className="space-y-8 pt-4">
                {[
                  { title: 'Guaranteed Purity', desc: '100% BIS Hallmarked gold and certified silver ornaments.' },
                  { title: 'Secure Vaults', desc: 'Your pledged ornaments are stored in high-security bank-grade vaults.' },
                  { title: 'Best Valuation', desc: 'Maximum loan-to-value ratio for your ornaments based on current rates.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-6 w-6 text-primary-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative h-[400px] lg:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1588444837495-c6cfaf50c8a9?auto=format&fit=crop&q=80" 
                alt="Jewellery Display" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-darkText lg:from-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
