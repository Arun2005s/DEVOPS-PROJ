import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import { Calendar, CreditCard, ChevronRight, Info, ShieldCheck, Zap, ArrowRight, Star } from 'lucide-react';
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

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff * room.price : 0;
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
  
  if (!room) return <div className="text-center py-40 text-4xl font-black text-red-500 bg-slate-50">Identity Unknown: Suite Not Found</div>;

  const total = calculateTotal();

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 text-slate-400 mb-12 font-black uppercase tracking-[0.2em] text-[10px]">
          <Link to="/rooms" className="hover:text-primary-600">Collection</Link>
          <ChevronRight size={12} className="text-slate-200" />
          <span className="text-slate-900">{room.name}</span>
          <ChevronRight size={12} className="text-slate-200" />
          <span className="text-primary-600">Reservation Terminal</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-white">
               <div className="h-[30rem] lg:h-[40rem] relative group">
                  <img 
                    src={room.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                     <div className="space-y-2">
                        <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none">{room.name}</h1>
                        <span className="text-white/70 font-bold uppercase tracking-[0.3em] text-xs">Premium Living Quarter</span>
                     </div>
                     <div className="bg-white/20 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white text-center">
                        <span className="block text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">Valuation</span>
                        <div className="text-4xl font-black">${room.price}</div>
                     </div>
                  </div>
               </div>
               
               <div className="p-12 lg:p-20 space-y-12">
                  <div className="max-w-3xl">
                     <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight uppercase underline decoration-primary-600 decoration-8 underline-offset-[12px]">Architectural Summary</h3>
                     <p className="text-slate-500 text-xl font-medium leading-relaxed italic">"{room.description}"</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <Amenity label="Climate Managed" sub="Smart AC" icon={<Zap className="text-primary-600" />} />
                     <li className="flex items-center gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="p-4 bg-white rounded-2xl shadow-sm text-primary-600"><Star size={24} /></div>
                        <div>
                           <span className="block text-slate-900 font-black text-lg tracking-tighter uppercase leading-none">Elite Level</span>
                           <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Guest Rating 5.0</span>
                        </div>
                     </li>
                     <Amenity label="Sanitzed Space" sub="UV Cleansing" icon={<ShieldCheck className="text-primary-600" />} />
                  </div>
               </div>
            </div>
          </div>

          {/* Secure Form */}
          <div className="lg:col-span-1 border-4 border-slate-900 rounded-[3.5rem] bg-slate-900 p-10 lg:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.3)] sticky top-32 group">
             <div className="flex items-center gap-4 mb-12">
                <div className="bg-primary-600 p-3 rounded-2xl text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                   <CreditCard size={28} />
                </div>
                <h2 className="text-3xl font-black text-white tracking-widest leading-none uppercase">Secured <br/> <span className="text-primary-400">Entry</span></h2>
             </div>

             <form onSubmit={handleBooking} className="space-y-10">
                <div className="group/field">
                  <label className="block text-slate-400 font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Arrival Protocol / Date</label>
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
                  <label className="block text-slate-400 font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Departure Protocol / Date</label>
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
                  <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 space-y-6 animate-fade-in-up">
                    <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      <span>Rate Calculation:</span>
                      <span className="text-white">${room.price} x {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} Days</span>
                    </div>
                    <div className="flex justify-between items-end pt-6 border-t border-white/10">
                      <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Total Valuation</span>
                      <span className="text-5xl font-black text-primary-400 tracking-tighter">${total}</span>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={bookingLoading}
                  className={cn(
                    "w-full py-7 rounded-3xl font-black text-xl text-white shadow-2xl transition-all duration-500 transform flex items-center justify-center gap-4 active:scale-95 group",
                    bookingLoading ? "bg-slate-700 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-500 hover:-translate-y-2 shadow-primary-900/40"
                  )}
                >
                  {bookingLoading ? 'Processing Protocol...' : 'Establish Connection'}
                  {!bookingLoading && <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />}
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Amenity = ({ icon, label, sub }) => (
  <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
     <div className="p-4 bg-white rounded-2xl shadow-sm">{icon}</div>
     <div>
        <span className="block text-slate-900 font-black text-lg tracking-tighter uppercase leading-none">{label}</span>
        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{sub}</span>
     </div>
  </div>
);

export default Booking;
