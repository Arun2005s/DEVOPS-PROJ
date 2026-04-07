import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import { Calendar, CreditCard, ChevronRight, Info } from 'lucide-react';

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
      alert('Check-out date must be after check-in date');
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
      alert('Booking Successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Booking failed', error);
      alert('Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-2xl font-bold">Loading...</div>;
  if (!room) return <div className="text-center py-20 text-2xl font-bold text-red-500">Room not found</div>;

  const total = calculateTotal();

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex items-center gap-2 text-gray-500 mb-8 text-sm md:text-base">
        <span>Rooms</span>
        <ChevronRight size={16} />
        <span>{room.name}</span>
        <ChevronRight size={16} />
        <span className="text-primary-600 font-bold">Booking Confirmation</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Room Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <div className="h-[400px]">
              <img 
                src={room.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'} 
                alt={room.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-10">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900">{room.name}</h1>
                <span className="bg-primary-50 text-primary-600 px-6 py-2 rounded-full font-bold text-lg">
                  ${room.price} / Night
                </span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{room.description}</p>
              
              <div className="bg-gray-50 p-8 rounded-2xl flex flex-col md:flex-row gap-8 justify-around border border-gray-100">
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-full shadow-sm text-primary-600 mb-3"><Calendar size={28} /></div>
                  <span className="font-bold text-gray-800">Check-In</span>
                  <span className="text-gray-500 text-sm">{checkIn || 'Not Selected'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-full shadow-sm text-primary-600 mb-3"><Calendar size={28} /></div>
                  <span className="font-bold text-gray-800">Check-Out</span>
                  <span className="text-gray-500 text-sm">{checkOut || 'Not Selected'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 border-b pb-4">Secure Booking</h2>
            <form onSubmit={handleBooking} className="space-y-8">
              <div>
                <label className="block text-gray-700 font-bold mb-3">Check-In Date</label>
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-3">Check-Out Date</label>
                <input 
                  type="date" 
                  required
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              {total > 0 && (
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Rate:</span>
                    <span>${room.price} x {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))} Days</span>
                  </div>
                  <div className="flex justify-between text-2xl font-extrabold text-blue-900 pt-2 border-t border-blue-200">
                    <span>Total Cost:</span>
                    <span>${total}</span>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={bookingLoading}
                className={`w-full py-5 rounded-2xl font-bold text-lg text-white shadow-xl transition-all duration-300 transform ${bookingLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-1 active:scale-95 shadow-primary-200 hover:shadow-primary-300'}`}
              >
                {bookingLoading ? 'Processing...' : 'Confirm My Stay'}
              </button>
              
              <div className="flex items-center gap-2 justify-center text-gray-400 text-sm pt-4">
                <CreditCard size={16} />
                <span>Secure payment handled at checkout</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
