import React from 'react';
import { Camera, Image as ImageIcon, Zap, Star, Layout, Maximize2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Gallery = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', title: 'Grand Lobby', category: 'Architecture' },
    { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', title: 'Infinity Pool', category: 'Leisure' },
    { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', title: 'Main Entrance', category: 'Architecture' },
    { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', title: 'Presidential Suite', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=80', title: 'Gourmet Dining', category: 'Culinary' },
    { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80', title: 'Executive Lounge', category: 'Business' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          <div className="space-y-4">
             <div className="flex items-center gap-3 bg-white w-fit px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <Camera size={14} className="text-primary-600" />
                <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Visual Archives</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.85] uppercase">
                Neural <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Atmosphere</span>
             </h1>
          </div>
          
          <div className="lg:w-1/3 text-right">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                Experience the convergence of architectural perfection <br/> and digital tranquility through our cinematic portal.
             </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
          {images.map((img, i) => (
            <div key={i} className="relative group overflow-hidden rounded-[2.5rem] bg-white border border-white shadow-xl hover:shadow-2xl transition-all duration-700 break-inside-avoid">
               <img 
                 src={img.url} 
                 alt={img.title}
                 className="w-full object-cover transition duration-1000 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <span className="text-primary-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2">{img.category}</span>
                  <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">{img.title}</h3>
                  <div className="mt-6 flex justify-between items-center border-t border-white/20 pt-6">
                     <div className="flex items-center gap-2 text-white/60">
                        <Star size={14} className="text-yellow-400" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Verified View</span>
                     </div>
                     <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white hover:text-slate-900 transition-all">
                        <Maximize2 size={18} />
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-32 p-16 lg:p-24 bg-slate-900 rounded-[4rem] relative overflow-hidden text-center flex flex-col items-center">
           <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary-600/10 rounded-full blur-[100px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[100px] -ml-48 -mb-48" />
           </div>
           
           <div className="relative z-10 space-y-10">
              <div className="p-4 bg-primary-600 w-fit rounded-3xl text-white mx-auto shadow-2xl">
                 <Star size={40} strokeWidth={2.5} />
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none">Your Journey <br/> <span className="text-primary-400">Starts Here</span></h2>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs max-w-sm mx-auto">
                 Ready to step inside the neural lux? <br/> Your reservation is waiting.
              </p>
              <div className="pt-6">
                 <Link to="/rooms" className="px-12 py-6 bg-white text-slate-900 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-primary-600 hover:text-white transition-all inline-flex items-center gap-4 group">
                    Explore Suites
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
