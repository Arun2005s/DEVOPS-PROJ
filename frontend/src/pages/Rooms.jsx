import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import { Filter, DollarSign, Bed, Wind, Star, ArrowRight, ShieldCheck, Wifi, Coffee } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');

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

  const filteredRooms = filterType === 'All' 
    ? rooms 
    : rooms.filter(room => room.type.includes(filterType));

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-slate-50">
       <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
       <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Curating Your Selection</span>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-10">
          <div className="space-y-4">
             <h4 className="text-primary-600 font-black uppercase tracking-[0.3em] text-sm">Our Collection</h4>
             <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">Find Your <br/> Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Suite</span></h1>
          </div>
          
          <div className="flex items-center gap-6 bg-white p-2 pl-8 rounded-full shadow-2xl shadow-slate-200 border border-slate-100 w-full lg:w-fit">
            <div className="flex items-center gap-3">
               <Filter size={20} className="text-primary-600" />
               <span className="text-slate-400 font-bold uppercase tracking-widest text-xs hidden sm:inline">Filter By</span>
            </div>
            <div className="flex gap-2">
               {['All', 'AC', 'Non-AC', 'Single', 'Double'].map((type) => (
                 <button
                   key={type}
                   onClick={() => setFilterType(type)}
                   className={cn(
                     "px-6 py-3 rounded-full text-sm font-black transition-all",
                     filterType === type 
                       ? "bg-slate-900 text-white shadow-xl shadow-slate-300" 
                       : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                   )}
                 >
                   {type}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredRooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
        
        {filteredRooms.length === 0 && (
          <div className="text-center py-40 bg-white rounded-[3rem] shadow-2xl shadow-slate-100 border-2 border-dashed border-slate-100 flex flex-col items-center">
            <div className="p-8 bg-slate-50 rounded-full mb-8">
               <Star size={48} className="text-slate-200" />
            </div>
            <p className="text-3xl text-slate-900 font-black mb-4">No Matches Found</p>
            <p className="text-slate-400 font-medium max-w-sm mx-auto">Try adjusting your filters or expanding your search criteria to see more suites.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RoomCard = ({ room }) => (
  <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200 border border-white hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-4">
    {/* Image container */}
    <div className="h-80 overflow-hidden relative">
      <img 
        src={room.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
        alt={room.name} 
        className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
      />
      <div className="absolute top-6 left-6 flex gap-2">
         <span className="bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
            {room.type}
         </span>
         <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-200">
            Featured
         </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex gap-4 text-white/90">
             <div className="flex items-center gap-2 text-xs font-bold"><Wifi size={14} /> WiFi High-speed</div>
             <div className="flex items-center gap-2 text-xs font-bold"><Coffee size={14} /> Gourmet Coffee</div>
          </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-10 flex-grow flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors uppercase leading-[0.8]">{room.name}</h2>
      </div>
      <p className="text-slate-500 font-medium mb-8 line-clamp-2 leading-relaxed">{room.description}</p>
      
      <div className="flex items-end justify-between mt-auto pt-8 border-t border-slate-50">
        <div>
           <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] block mb-1">Per Night</span>
           <div className="text-4xl font-black text-slate-900">
             <span className="text-xl">$</span>{room.price}
           </div>
        </div>
        <Link 
          to={`/booking/${room._id}`} 
          className="group/btn bg-slate-900 hover:bg-primary-600 text-white p-5 rounded-3xl transition-all duration-300 shadow-xl shadow-slate-200 hover:scale-110 active:scale-95"
        >
          <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </div>
);

export default Rooms;
