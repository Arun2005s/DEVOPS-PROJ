import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Zap, Star, ShieldCheck, Clock, MessageSquare, Globe, Share2, MessageCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Communication Protocol Initialized. We will reach out shortly.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-10">
          <div className="space-y-4">
             <div className="flex items-center gap-3 bg-white w-fit px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <MessageSquare size={14} className="text-primary-600" />
                <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Neural Support</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.85] uppercase">
                Establish <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Connection</span>
             </h1>
          </div>
          
          <div className="lg:w-1/3 text-right">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                Connect with our concierge through the <br/> HotelEase digital interface for immediate support.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
           
           {/* Info Section */}
           <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <ContactInfo icon={<Mail className="text-primary-600" />} label="Digital Mail" value="support@hotelease.io" />
                 <ContactInfo icon={<Phone className="text-emerald-600" />} label="Secure Line" value="+1 (555) NEURAL-0" />
                 <ContactInfo icon={<MapPin className="text-indigo-600" />} label="Headquarters" value="District 9, Cyber City" />
                 <ContactInfo icon={<Clock className="text-amber-600" />} label="Active Status" value="24/7 Response Time" />
              </div>

              {/* Branding Block */}
              <div className="bg-slate-900 p-12 lg:p-16 rounded-[4rem] relative overflow-hidden text-white shadow-2xl">
                 <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/20 rounded-full blur-[80px] -mr-40 -mt-40" />
                 </div>
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4 text-primary-400 font-black uppercase tracking-[0.3em] text-xs">
                       <ShieldCheck size={20} /> Identity Secure
                    </div>
                    <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">Your Privacy is <br/> <span className="text-primary-400">Integrated</span></h3>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] leading-relaxed">
                       All communications through the HotelEase terminal are encrypted and verified via multi-layer biometric protocols.
                    </p>
                    <div className="flex gap-4 pt-6">
                       {[Globe, Share2, MessageCircle].map((Icon, i) => (
                         <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white hover:text-slate-900 transition-all">
                            <Icon size={20} />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Form Section */}
           <div className="bg-white rounded-[4rem] p-10 lg:p-16 shadow-2xl shadow-slate-200 border border-white relative group">
              <div className="flex items-center gap-6 mb-12">
                 <div className="bg-slate-900 p-4 rounded-3xl text-white shadow-xl group-hover:rotate-12 transition-transform duration-500">
                    <Send size={28} strokeWidth={2.5} />
                 </div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-widest leading-none uppercase">Neural <br/> <span className="text-primary-600">Form</span></h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                 <InputField label="Contact Designation" placeholder="Your Name" value={form.name} onChange={(v) => setForm({...form, name: v})} />
                 <InputField label="Intelligence Node / Email" placeholder="email@nexus.io" value={form.email} onChange={(v) => setForm({...form, email: v})} />
                 <div className="space-y-3 group/msg">
                    <label className="block text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] group-focus-within/msg:text-primary-600 transition-colors">Communication / Message</label>
                    <textarea 
                      rows="5"
                      placeholder="Transmission details..."
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      className="w-full px-8 py-6 border border-slate-100 bg-slate-50 shadow-sm rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-bold text-slate-900 placeholder-slate-200 resize-none"
                    />
                 </div>

                 <button 
                   type="submit" 
                   className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-primary-600 transition-all hover:-translate-y-3 active:scale-95 group/btn flex items-center justify-center gap-4"
                 >
                    Transmit Protocol
                    <Zap size={24} strokeWidth={3} className="group-hover/btn:animate-pulse" />
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({ icon, label, value }) => (
  <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
     <div className="p-4 bg-slate-50 rounded-2xl shadow-sm text-slate-900">{icon}</div>
     <div>
        <span className="block text-slate-400 font-black text-[9px] tracking-widest uppercase mb-1">{label}</span>
        <span className="text-slate-900 font-black text-sm tracking-tight uppercase leading-none break-all">{value}</span>
     </div>
  </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-3 group">
    <label className="block text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] group-focus-within:text-primary-600 transition-colors">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-8 py-6 border border-slate-100 bg-slate-50 shadow-sm rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-bold text-slate-900 placeholder-slate-200"
      />
    </div>
  </div>
);

export default Contact;
