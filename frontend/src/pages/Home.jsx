import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MonitorCheck, Award, Zap, ArrowRight, Star, Coffee, Wifi } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=90"
            alt="Hotel Banner"
            className="w-full h-full object-cover brightness-[0.45] scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/90" />
        </div>
        
        <div className="relative z-10 px-6 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-primary-400 text-sm font-bold uppercase tracking-widest mb-8 animate-fade-in-up shadow-xl">
             <Star size={16} fill="currentColor" />
             <span>The Gold Standard in Smart Stays</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter animate-fade-in-up delay-100">
             Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Sanctuary</span> <br/>
             Awaits
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-100/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed animate-fade-in-up delay-200">
             Discover the intersection of luxury and technology. 
             Seamlessly book your next escape with Europe's premier smart hotel collection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
            <Link to="/rooms" className="group bg-primary-600 hover:bg-primary-700 text-white px-10 py-5 rounded-full text-lg font-black transition-all flex items-center gap-3 shadow-[0_20px_50px_rgba(2,132,199,0.3)] hover:-translate-y-1">
              Explore Suites
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/register" className="px-10 py-5 rounded-full text-lg font-black text-white border-2 border-white/30 hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm">
              Join the Club
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-3 opacity-50">
           <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Featured Statistics */}
      <section className="-mt-20 relative z-20 px-6 container mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-white bg-white/70 backdrop-blur-2xl">
           <StatItem label="Active Members" value="25,000+" />
           <StatItem label="Global Locations" value="120+" />
           <StatItem label="Guest Rating" value="4.9/5.0" />
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-32 px-6 container mx-auto lg:max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h4 className="text-primary-600 font-black uppercase tracking-[0.3em] text-sm mb-4">Core Philosophy</h4>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">The Modern <br/> Guest Experience</h2>
          </div>
          <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed">
             Beyond four walls and a bed, we curate environments that anticipate your needs and elevate your soul.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<ShieldCheck className="text-primary-600" size={32} />}
            title="Ironclad Security"
            description="End-to-end encrypted check-ins and state-of-the-art keyless entry systems for total peace of mind."
          />
          <FeatureCard 
            icon={<MonitorCheck className="text-primary-600" size={32} />}
            title="Digital Concierge"
            description="Our AI-powered platform handles every request with precision, from room service to custom itineraries."
          />
          <FeatureCard 
            icon={<Award className="text-primary-600" size={32} />}
            title="Elite Perks"
            description="Enjoy exclusive access to rooftop lounges, private spas, and curated member-only events worldwide."
          />
          <FeatureCard 
            icon={<Zap className="text-primary-600" size={32} />}
            title="Zero Latency"
            description="High-speed 10Gbps mesh WiFi and voice-controlled automation come standard in every suite."
          />
        </div>
      </section>
      
      {/* Visual Break Section */}
      <section className="px-6 pb-32 container mx-auto lg:max-w-7xl">
         <div className="relative h-[25rem] rounded-[3rem] overflow-hidden group shadow-2xl">
            <img 
               src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
               className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
               alt="Luxury interior"
            />
            <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
               <div className="text-center">
                  <h3 className="text-white text-4xl font-black mb-6">Redefining Presence</h3>
                  <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:scale-110 transition-transform">Virtual Tour</button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="p-10 flex flex-col items-center justify-center border-r last:border-0 border-slate-100 group hover:bg-slate-50 transition-colors">
     <span className="text-slate-900 text-4xl font-black mb-2 group-hover:text-primary-600 transition-colors">{value}</span>
     <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">{label}</span>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all flex flex-col items-start group hover:-translate-y-3">
    <div className="mb-8 p-5 bg-slate-50 rounded-2xl group-hover:bg-primary-50 transition-colors group-hover:scale-110 duration-500">{icon}</div>
    <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed mb-6">{description}</p>
    <div className="w-12 h-1 bg-slate-100 group-hover:w-full group-hover:bg-primary-600 transition-all duration-700" />
  </div>
);

export default Home;
