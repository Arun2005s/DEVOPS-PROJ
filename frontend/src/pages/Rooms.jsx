import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import { 
  Filter, Star, ArrowRight, ShieldCheck, Wifi, Coffee, 
  MapPin, Users, BedDouble, Search, Percent, Zap
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredRooms = rooms.filter(room => {
    const matchesType = filterType === 'All' || room.type.includes(filterType);
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          room.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-slate-50">
       <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
       <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Curating Your Selection</span>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-10">
          <div className="space-y-4">
             <div className="flex items-center gap-3 bg-white w-fit px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <Zap size={14} className="text-primary-600" />
                <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Real-time Inventory</span>
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.85] uppercase">
                Find Your <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Perfect Suite</span>
             </h1>
          </div>
          
          <div className="w-full lg:w-fit space-y-6">
             {/* Search Bar */}
             <div className="relative group w-full lg:w-96">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={20} />
                <input 
                   type="text" 
                   placeholder="Search location or suite..."
                   className="w-full pl-16 pr-6 py-5 rounded-full border border-white bg-white shadow-2xl shadow-slate-200/50 outline-none focus:ring-4 focus:ring-primary-600/10 transition-all font-bold text-slate-900 placeholder-slate-200"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             {/* Filter Chips */}
             <div className="flex items-center gap-4 bg-white p-2 pl-6 rounded-full shadow-xl border border-slate-100 overflow-x-auto no-scrollbar">
               <div className="flex items-center gap-3 border-r border-slate-100 pr-4 mr-2">
                  <Filter size={16} className="text-primary-600" />
                  <span className="text-slate-400 font-black uppercase tracking-widest text-[9px] hidden sm:inline">Filters</span>
               </div>
               <div className="flex gap-2">
                  {['All', 'Deluxe', 'Suite', 'AC', 'Single', 'Double'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0",
                        filterType === type 
                          ? "bg-slate-900 text-white shadow-lg shadow-slate-300" 
                          : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      {type}
                    </button>
                  ))}
               </div>
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
          <div className="text-center py-40 bg-white rounded-[4rem] shadow-2xl shadow-slate-100 border-2 border-dashed border-slate-100 flex flex-col items-center">
            <div className="p-10 bg-slate-50 rounded-full mb-8 animate-bounce">
               <Star size={48} className="text-slate-200" />
            </div>
            <p className="text-4xl text-slate-900 font-black uppercase tracking-tighter mb-4 leading-none">No Matches Located</p>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] max-w-sm mx-auto">Adjust your search parameters to access high-value inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RoomCard = ({ room }) => (
  <div className="group bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200 border border-white hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col hover:-translate-y-6 relative">
    
    {/* Badge Overlay */}
    <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 pointer-events-none">
       <span className="bg-slate-900/40 backdrop-blur-md text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 w-fit">
          {room.type}
       </span>
       {room.status === 'booked' && (
         <span className="bg-red-500 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg w-fit">
            Reserved
         </span>
       )}
    </div>

    {/* Image container */}
    <div className="h-96 overflow-hidden relative">
      <img 
        src={room.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'} 
        alt={room.name} 
        className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Quick Info Hover */}
      <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-900/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/10 rounded-lg"><BedDouble size={14} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest">{room.bedType}</span>
             </div>
             <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-white/10 rounded-lg"><Users size={14} /></div>
                <span className="text-[10px] font-black uppercase tracking-widest">{room.capacity} GUESTS</span>
             </div>
          </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-10 lg:p-12 flex-grow flex flex-col">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-[0.3em]">
           <MapPin size={12} strokeWidth={3} />
           {room.location}
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter group-hover:text-primary-600 transition-colors uppercase leading-[0.85]">{room.name}</h2>
      </div>
      
      <p className="text-slate-500 font-medium mb-10 line-clamp-2 leading-relaxed text-sm italic">"{room.description}"</p>
      
      {/* Amenities Preview */}
      <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-slate-50">
         {room.amenities.slice(0, 3).map((ame, i) => (
           <span key={i} className="flex items-center gap-2 bg-slate-50 text-slate-400 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-100">
              <CheckIcon ame={ame} /> {ame}
           </span>
         ))}
         {room.amenities.length > 3 && (
           <span className="text-slate-300 font-black text-[9px] uppercase tracking-widest flex items-center px-2">+{room.amenities.length - 3} More</span>
         )}
      </div>

      <div className="flex items-end justify-between mt-auto">
        <div>
           <span className="text-slate-400 font-black uppercase tracking-widest text-[9px] block mb-1">Standard Valuation</span>
           <div className="text-5xl font-black text-slate-900 tracking-tighter">
             <span className="text-2xl mr-0.5">$</span>{room.price}
           </div>
        </div>
        <Link 
          to={room.status === 'available' ? `/booking/${room._id}` : '#'} 
          className={cn(
            "group/btn p-6 rounded-3xl transition-all duration-500 shadow-2xl hover:scale-110 active:scale-95",
            room.status === 'available' 
              ? "bg-slate-900 hover:bg-primary-600 text-white shadow-slate-200" 
              : "bg-slate-100 text-slate-300 cursor-not-allowed shadow-none"
          )}
        >
          <ArrowRight size={28} strokeWidth={2.5} className="group-hover/btn:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  </div>
);

const CheckIcon = ({ ame }) => {
  const name = ame.toLowerCase();
  if (name.includes('wifi')) return <Wifi size={10} />;
  if (name.includes('coffee')) return <Coffee size={10} />;
  if (name.includes('ac')) return <Zap size={10} />;
  return <Star size={10} />;
};

export default Rooms;
