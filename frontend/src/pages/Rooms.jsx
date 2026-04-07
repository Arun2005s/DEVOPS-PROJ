import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import { Filter, DollarSign, Bed, Wind } from 'lucide-react';

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

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl font-bold">Loading Rooms...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 md:mb-0">Find Your Perfect Room</h1>
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
          <Filter size={20} className="text-gray-500" />
          <select 
            className="outline-none bg-transparent font-medium text-gray-700 cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredRooms.map((room) => (
          <div key={room._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition duration-300 hover:shadow-2xl flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <img 
                src={room.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
                alt={room.name} 
                className="w-full h-full object-cover transition duration-500 hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-full font-bold shadow-md">
                ${room.price} / Day
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{room.name}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${room.type.includes('AC') ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                  {room.type}
                </span>
              </div>
              <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">{room.description}</p>
              <div className="flex gap-4 mb-8 text-gray-500 text-sm">
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg"><Bed size={16} /> Max 2</div>
                <div className="flex items-center gap-1 bg-gray-50 px-3 py-2 rounded-lg"><Wind size={16} /> {room.type.includes('AC') ? 'AC' : 'Fan'}</div>
              </div>
              <Link 
                to={`/booking/${room._id}`} 
                className="mt-auto block text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition duration-300 shadow-sm"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredRooms.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-2xl text-gray-500 font-medium">No rooms found matching your filter.</p>
        </div>
      )}
    </div>
  );
};

export default Rooms;
