import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import { Camera, Image as ImageIcon, Zap, Star, Layout, Maximize2, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Gallery = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await API.get('/api/rooms');
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms', error);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleSelectRoom = async (room) => {
    setLoading(true);
    setSelectedRoom(room);
    try {
      const { data } = await API.get(`/api/gallery?roomId=${room._id}`);
      setGalleryImages(data);
    } catch (error) {
      console.error('Error fetching room gallery', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedRoom(null);
    setGalleryImages([]);
  };

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
             {selectedRoom ? (
               <div className="space-y-2">
                 <button onClick={handleBack} className="text-primary-600 font-black uppercase tracking-widest text-[9px] flex items-center gap-2 hover:gap-4 transition-all mb-4">
                   <ArrowRight size={14} className="rotate-180" /> Return to Clusters
                 </button>
                 <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.85] uppercase">
                    {selectedRoom.name} <br/> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Inventory</span>
                 </h1>
               </div>
             ) : (
               <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.85] uppercase">
                  Neural <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Atmosphere</span>
               </h1>
             )}
          </div>
          
          <div className="lg:w-1/3 text-right">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                {selectedRoom 
                  ? `Exploring the specific visual identity of ${selectedRoom.location}. CINEMATIC ASSET PROTOCOL ACTIVE.`
                  : "Experience the convergence of architectural perfection and digital tranquility through our cinematic portal."}
             </p>
          </div>
        </div>

        {/* Gallery Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
             <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
             <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Syncing Visual Records</span>
          </div>
        ) : !selectedRoom ? (
          /* Room Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {rooms.map((room) => (
               <div 
                 key={room._id} 
                 onClick={() => handleSelectRoom(room)}
                 className="group relative h-[35rem] rounded-[3rem] overflow-hidden cursor-pointer bg-slate-900 shadow-2xl transition-all duration-700 hover:-translate-y-4"
               >
                  <img 
                    src={room.images[0] || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'} 
                    className="w-full h-full object-cover opacity-60 transition duration-1000 group-hover:scale-110 group-hover:opacity-100"
                    alt={room.name}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
                     <span className="text-primary-400 font-black uppercase tracking-[0.3em] text-[10px] mb-3 block">{room.location}</span>
                     <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none mb-6">{room.name}</h3>
                     <div className="flex justify-between items-center border-t border-white/20 pt-8">
                        <span className="text-white/60 font-bold uppercase tracking-widest text-[9px]">View Gallery</span>
                        <div className="p-4 bg-white/10 rounded-2xl text-white group-hover:bg-primary-600 transition-colors">
                           <Layout size={20} />
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          /* Drill-down Gallery View */
          galleryImages.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
              {galleryImages.map((img) => (
                <div key={img._id} className="relative group overflow-hidden rounded-[2.5rem] bg-white border border-white shadow-xl hover:shadow-2xl transition-all duration-700 break-inside-avoid">
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
          ) : (
            <div className="text-center py-40 bg-white rounded-[4rem] shadow-2xl shadow-slate-100 border-2 border-dashed border-slate-100 flex flex-col items-center">
               <div className="p-10 bg-slate-50 rounded-full mb-8">
                  <ImageIcon size={48} className="text-slate-200" />
               </div>
               <p className="text-4xl text-slate-900 font-black uppercase tracking-tighter mb-4 leading-none">Archives Empty</p>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] max-w-sm mx-auto">This specific cluster has not yet been visually indexed.</p>
               <button onClick={handleBack} className="mt-10 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary-600 transition-all">Rotate to Main Archive</button>
            </div>
          )
        )}

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
