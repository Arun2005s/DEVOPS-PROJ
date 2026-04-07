import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, Mail, Calendar, MapPin, Search } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const endpoint = user.role === 'admin' ? '/api/bookings' : '/api/bookings/mybookings';
        const { data } = await API.get(endpoint);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings', error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (loading) return <div className="text-center py-20 text-2xl font-bold">Loading...</div>;

  const filteredBookings = bookings.filter(booking => 
    booking.roomId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-primary-100 rounded-3xl flex items-center justify-center text-primary-600 shadow-inner">
            <User size={48} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-500 font-medium flex items-center gap-2 mt-2">
              <Mail size={16} />
              {user.email} • {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
            </p>
          </div>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search bookings..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary-500 transition-all shadow-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 border-b border-gray-50 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <Briefcase className="text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-800">
              {user.role === 'admin' ? 'Managed Bookings' : 'Your Recent Stays'}
            </h2>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-bold text-sm uppercase tracking-wider">
                <th className="px-8 py-6">Room / Guest</th>
                <th className="px-8 py-6">Date Range</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors duration-200 group">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                        <img 
                          src={booking.roomId?.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'} 
                          alt="Room Preview" 
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{booking.roomId?.name}</div>
                        <div className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                          <User size={12} />
                          {user.role === 'admin' ? booking.userId?.name : 'Verified stay'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-3 text-gray-700 font-semibold bg-gray-100/50 w-fit px-4 py-2 rounded-xl">
                      <Calendar size={18} className="text-primary-500" />
                      <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
                      <span className="text-gray-300 mx-1">→</span>
                      <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="text-xl font-extrabold text-blue-900 flex items-center">
                      <span className="text-sm mr-1 font-bold opacity-60">$</span>
                      {booking.totalAmount}
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <span className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm ${
                      booking.status === 'booked' ? 'bg-green-100 text-green-700 border border-green-200' : 
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700 border border-red-200' : 
                      'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-32 bg-white flex flex-col items-center">
              <div className="p-8 bg-gray-50 rounded-full mb-6">
                <Search size={48} className="text-gray-300" />
              </div>
              <p className="text-2xl text-gray-400 font-bold">No bookings found</p>
              <p className="text-gray-400 mt-2">Try searching with a different term or browse rooms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
