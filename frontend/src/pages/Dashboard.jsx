import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, Mail, Calendar, MapPin, Search, Star, CreditCard, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const endpoint = user?.role === 'admin' ? '/api/bookings' : '/api/bookings/mybookings';
        const { data } = await API.get(endpoint);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings', error);
        setLoading(false);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  if (loading) return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-slate-50">
       <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
       <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Accessing Secure Records</span>
    </div>
  );

  const filteredBookings = bookings.filter(booking => 
    booking.roomId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header / Profile Card */}
        <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 mb-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -ml-48 -mb-48" />
           </div>

           <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
              <div className="w-28 h-28 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary-900 group">
                <User size={56} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="space-y-3">
                <h4 className="text-primary-400 font-black uppercase tracking-[0.3em] text-xs">Profile Integrated</h4>
                <h1 className="text-5xl font-black text-white tracking-tighter leading-none">{user.name}</h1>
                <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                   <span className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest"><Mail size={14} className="text-primary-600" /> {user.email}</span>
                   <span className="w-1.5 h-1.5 bg-slate-700 rounded-full hidden md:block" />
                   <span className="bg-white/10 backdrop-blur-sm border border-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{user.role} ACCESS</span>
                </div>
              </div>
           </div>

           <div className="relative z-10 w-full md:w-fit bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col items-center md:items-end gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Active Bookings</span>
              <span className="text-6xl font-black text-white">{bookings.length}</span>
           </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-8">
           <div className="flex items-center gap-4">
              <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-xl">
                 <Briefcase size={24} />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Central <span className="text-primary-600">Archive</span></h2>
           </div>

           <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search index..."
                className="w-full pl-16 pr-6 py-5 rounded-full border border-white bg-white shadow-2xl shadow-slate-100 outline-none focus:ring-4 focus:ring-primary-600/10 transition-all font-bold text-slate-900 placeholder-slate-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
                    <th className="px-12 py-8">Suite Information / Identity</th>
                    <th className="px-12 py-8">Temporal Range</th>
                    <th className="px-12 py-8">Valuation</th>
                    <th className="px-12 py-8">Protocol Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                            <img 
                              src={booking.roomId?.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80'} 
                              alt="Room" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="font-black text-slate-900 text-xl tracking-tighter uppercase group-hover:text-primary-600 transition-colors">{booking.roomId?.name}</div>
                            <div className="text-slate-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                               <MapPin size={10} className="text-primary-600" />
                               {user.role === 'admin' ? booking.userId?.name : 'Secured Perimeter'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                         <div className="flex items-center gap-4 bg-slate-50 w-fit px-6 py-3 rounded-2xl border border-slate-100/50">
                            <div className="p-2 bg-white rounded-lg text-primary-600 shadow-sm"><Calendar size={18} /></div>
                            <div className="flex flex-col">
                               <span className="text-slate-900 font-bold text-sm tracking-tight">{new Date(booking.checkIn).toLocaleDateString()}</span>
                               <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Arrival</span>
                            </div>
                            <div className="h-6 w-px bg-slate-200 mx-2" />
                            <div className="flex flex-col text-right">
                               <span className="text-slate-900 font-bold text-sm tracking-tight">{new Date(booking.checkOut).toLocaleDateString()}</span>
                               <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Departure</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-3">
                           <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm"><CreditCard size={20} /></div>
                           <div>
                              <span className="text-3xl font-black text-slate-900 tracking-tighter"><span className="text-base mr-0.5">$</span>{booking.totalAmount}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <div className={cn(
                          "px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit shadow-md border animate-fade-in",
                          booking.status === 'booked' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                          booking.status === 'cancelled' ? "bg-red-50 text-red-700 border-red-100" : 
                          "bg-slate-100 text-slate-700 border-slate-100"
                        )}>
                          {booking.status} System
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBookings.length === 0 && (
                <div className="text-center py-40 flex flex-col items-center">
                  <div className="p-10 bg-slate-50 rounded-full mb-8 animate-pulse">
                    <Search size={64} className="text-slate-200" />
                  </div>
                  <p className="text-3xl text-slate-900 font-black uppercase tracking-tighter mb-4">No Archives Found</p>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Modify your search to locate secure entries.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
