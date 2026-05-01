import React from 'react';
import { Gem, ShieldCheck, Heart, Users, Star, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-secondary-bg">
      {/* Header */}
      <section className="bg-white py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-['Outfit'] font-bold text-secondary-darkText">About Radhe Jewellers</h1>
          <p className="text-xl text-secondary-mutedText max-w-2xl mx-auto font-light">
            Crafting trust and excellence since 1995. Discover the legacy behind our name.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <span className="text-primary-gold font-bold uppercase tracking-widest text-sm">Our Legacy</span>
                <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold text-secondary-darkText">Building Trust for Generations</h2>
              </div>
              <p className="text-lg text-secondary-mutedText leading-relaxed">
                Radhe Jewellers started as a small workshop in the heart of the city with a simple mission: to provide the purest gold and silver ornaments with transparent pricing and honest service.
              </p>
              <p className="text-lg text-secondary-mutedText leading-relaxed">
                Over the past 25 years, we have grown into one of the most trusted names in the jewellery industry, serving thousands of happy families across the region. Our commitment to quality and integrity remains unchanged.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <h4 className="text-3xl font-bold text-primary-gold">25+</h4>
                  <p className="text-sm font-medium text-secondary-darkText uppercase tracking-wider">Years of Trust</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-bold text-primary-gold">50K+</h4>
                  <p className="text-sm font-medium text-secondary-darkText uppercase tracking-wider">Happy Customers</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80" 
                alt="Jewellery Showroom" 
                className="rounded-2xl shadow-xl aspect-square object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&q=80" 
                alt="Craftsmanship" 
                className="rounded-2xl shadow-xl aspect-square object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-['Outfit'] font-bold text-secondary-darkText">Our Core Values</h2>
            <p className="text-lg text-secondary-mutedText">The principles that guide us every day in serving you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: ShieldCheck, 
                title: 'Uncompromised Purity', 
                desc: 'All our gold ornaments are BIS Hallmarked, ensuring you get exactly what you pay for.' 
              },
              { 
                icon: Heart, 
                title: 'Customer Centric', 
                desc: 'We treat every customer like family, providing personalized attention to your needs.' 
              },
              { 
                icon: Award, 
                title: 'Transparent Pricing', 
                desc: 'No hidden charges. Real-time market rates and clear breakdown of all costs.' 
              }
            ].map((value, i) => (
              <div key={i} className="text-center space-y-6">
                <div className="inline-flex items-center justify-center h-20 w-20 bg-secondary-bg rounded-full border-2 border-primary-gold/10 relative group hover:border-primary-gold transition-all duration-300">
                  <value.icon className="h-10 w-10 text-primary-gold" />
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-secondary-mutedText leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Philosophy */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-darkGold/90 rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Gem className="h-64 w-64 rotate-12" />
            </div>
            <div className="relative z-10 max-w-3xl space-y-8">
              <h2 className="text-3xl md:text-5xl font-['Outfit'] font-bold">"Jewellery is not just an ornament; it's an investment in your heritage."</h2>
              <p className="text-xl text-white/80 font-light leading-relaxed">
                At Radhe Jewellers, we believe that every piece of jewellery carries a legacy. That's why we meticulously select every stone and refine every gram of gold to perfection.
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary-gold fill-primary-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Ram Prasad Verma</h4>
                  <p className="text-sm text-white/60">Founder & Managing Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
