import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { 
  Calendar, CreditCard, ChevronRight, Info, ShieldCheck, Zap, 
  ArrowRight, Star, MapPin, Users, BedDouble, CheckCircle2,
  Wifi, Coffee, Phone, Clock
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await API.get(`/api/rooms/${id}`);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room', error);
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const calculateDays = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const calculateTotal = () => {
    return calculateDays() * (room?.price || 0);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotal();
    if (totalAmount <= 0) {
      alert('Violation: Departure must occur after arrival.');
      return;
    }

    setBookingLoading(true);
    try {
      await API.post('/api/bookings', {
        roomId: id,
        checkIn,
        checkOut,
        totalAmount,
      });
      alert('Integration Successful: Suite Secured.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Booking failed', error);
      alert('Protocol error during reservation.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-slate-50">
       <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
       <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Initializing Secure Protocol</span>
    </div>
  );
  
  if (!room) return <div className="text-center py-40 text-4xl font-black text-red-500 bg-slate-50 uppercase tracking-tighter">Identity Unknown: Suite Not Found</div>;

  const total = calculateTotal();
  const days = calculateDays();

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 text-slate-400 mb-12 font-black uppercase tracking-[0.2em] text-[10px]">
          <Link to="/rooms" className="hover:text-primary-600 transition-colors">Digital Collection</Link>
          <ChevronRight size={12} className="text-slate-200" />
          <span className="text-slate-900">{room.name}</span>
          <ChevronRight size={12} className="text-slate-200" />
          <span className="text-primary-600">Reservation Terminal</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Detailed Info Column */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-white">
               {/* Hero Image */}
               <div className="h-[30rem] lg:h-[45rem] relative group overflow-hidden">
                  <img 
                    src={room.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80'} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-white">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full w-fit">
                           <MapPin size={14} className="text-primary-400" />
                           <span className="font-black uppercase tracking-[0.2em] text-[10px]">{room.location}</span>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                           {room.name.split(' ').map((word, i) => (
                             <span key={i} className="block">{word}</span>
                           ))}
                        </h1>
                     </div>
                     <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] text-center min-w-[12rem]">
                        <span className="block text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Valuation / Night</span>
                        <div className="text-4xl lg:text-5xl font-black tracking-tighter">₹{room.price}</div>
                     </div>
                  </div>
               </div>
               
               {/* Details Content */}
               <div className="p-12 lg:p-20 space-y-16">
                  <div className="flex flex-col lg:flex-row justify-between gap-12">
                     <div className="lg:w-2/3 space-y-8">
                        <h3 className="text-4xl font-black text-slate-900 tracking-tight uppercase leading-none">Architectural <br/> <span className="text-primary-600">Summary</span></h3>
                        <p className="text-slate-500 text-xl font-medium leading-relaxed italic border-l-8 border-primary-600 pl-8 py-4 bg-slate-50 rounded-r-3xl">
                           "{room.description}"
                        </p>
                     </div>
                     <div className="lg:w-1/3 bg-slate-900 p-8 lg:p-10 rounded-[3rem] text-white shadow-xl flex flex-col justify-center gap-8">
                        <div className="flex items-center gap-5">
                           <div className="p-3 bg-primary-600 rounded-2xl shrink-0"><Users size={24} /></div>
                           <div className="flex flex-col">
                              <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-0.5">Guest Protocol</div>
                              <div className="text-lg lg:text-xl font-black uppercase text-primary-400 leading-none">{room.capacity} Maximum</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-5">
                           <div className="p-3 bg-indigo-600 rounded-2xl shrink-0"><BedDouble size={24} /></div>
                           <div className="flex flex-col">
                              <div className="text-[9px] font-black uppercase tracking-widest opacity-60 mb-0.5">Core Configuration</div>
                              <div className="text-lg lg:text-xl font-black uppercase text-indigo-400 leading-none">{room.bedType}</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  {/* Amenities Grid */}
                  <div className="space-y-10">
                     <div className="flex items-center gap-4">
                        <div className="h-0.5 flex-grow bg-slate-100" />
                        <h4 className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Included Amenities</h4>
                        <div className="h-0.5 flex-grow bg-slate-100" />
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {room.amenities.map((ame, i) => (
                           <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-primary-600/20 transition-all duration-300">
                              <div className="p-2 bg-white rounded-lg text-primary-600 shadow-sm group-hover:scale-110 transition-transform"><CheckIcon name={ame} /></div>
                              <span className="text-slate-900 font-black uppercase tracking-widest text-[10px]">{ame}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Safety Protocols */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <ProtocolCard icon={<ShieldCheck className="text-emerald-600" />} label="Digital Key Entry" sub="Biometric verification ready" />
                     <ProtocolCard icon={<Clock className="text-primary-600" />} label="24/7 Concierge" sub="Instant neural support" />
                  </div>
               </div>
            </div>
          </div>

          {/* Secure Reservation Form */}
          <div className="lg:col-span-1 border-4 border-slate-900 rounded-[4rem] bg-slate-900 p-10 lg:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.4)] sticky top-32 group">
             <div className="flex items-center gap-5 mb-12">
                <div className="bg-primary-600 p-4 rounded-3xl text-white shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                   <CreditCard size={32} strokeWidth={2.5} />
                </div>
                <div>
                   <h2 className="text-3xl font-black text-white tracking-widest leading-none uppercase">Secured</h2>
                   <span className="text-primary-400 font-black uppercase tracking-[0.2em] text-[10px]">Reservation Terminal</span>
                </div>
             </div>

             <form onSubmit={handleBooking} className="space-y-10">
                <div className="group/field">
                  <label className="block text-slate-500 font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Arrival protocol / Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-primary-400 transition-colors" size={20} />
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-16 pr-6 py-6 bg-white/5 border border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/20 focus:border-primary-400 transition-all font-black text-white text-lg placeholder-slate-700"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="group/field">
                  <label className="block text-slate-500 font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Departure protocol / Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-primary-400 transition-colors" size={20} />
                    <input 
                      type="date" 
                      required
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full pl-16 pr-6 py-6 bg-white/5 border border-white/10 rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/20 focus:border-primary-400 transition-all font-black text-white text-lg placeholder-slate-700"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>

                {total > 0 && (
                  <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 space-y-6 animate-fade-in-up">
                    <div className="flex justify-between items-center text-slate-500 font-bold uppercase tracking-widest text-[9px]">
                      <span>Dynamic Valuation</span>
                      <span className="text-white">₹{room.price} x {days} Units</span>
                    </div>
                    <div className="flex justify-between items-end pt-8 border-t border-white/10">
                      <div>
                         <span className="text-primary-400 font-black uppercase tracking-[0.2em] text-[10px] block mb-1">Total Due</span>
                         <span className="text-6xl font-black text-white tracking-tighter">₹{total}</span>
                      </div>
                      <div className="p-4 bg-primary-600/20 text-primary-400 rounded-2xl animate-pulse">
                         <Star size={24} />
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={bookingLoading}
                  className={cn(
                    "w-full py-8 rounded-[2.5rem] font-black text-xl text-white shadow-2xl transition-all duration-500 transform flex items-center justify-center gap-4 active:scale-95 group",
                    bookingLoading ? "bg-slate-800 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-500 hover:-translate-y-3 shadow-primary-900/60"
                  )}
                >
                  {bookingLoading ? 'Uploading Protocol...' : 'Establish Connection'}
                  {!bookingLoading && <ArrowRight size={28} strokeWidth={2.5} className="group-hover:translate-x-3 transition-transform" />}
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProtocolCard = ({ icon, label, sub }) => (
  <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
     <div className="p-4 bg-white rounded-2xl shadow-sm">{icon}</div>
     <div>
        <span className="block text-slate-900 font-black text-lg tracking-tighter uppercase leading-none">{label}</span>
        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{sub}</span>
     </div>
  </div>
);

const CheckIcon = ({ name }) => {
  const n = name.toLowerCase();
  if (n.includes('wifi')) return <Wifi size={14} />;
  if (n.includes('coffee')) return <Coffee size={14} />;
  if (n.includes('ac')) return <Zap size={14} />;
  return <CheckCircle2 size={14} />;
};

export default Booking;
