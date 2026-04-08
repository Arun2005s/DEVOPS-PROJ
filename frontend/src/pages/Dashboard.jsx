import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, User, Mail, Calendar, MapPin, Search, Star, CreditCard, 
  ChevronRight, Plus, X, Image as ImageIcon, CheckCircle2, Trash2, 
  Settings, LayoutDashboard, BedDouble, Users
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'rooms'
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Room form state
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [roomForm, setRoomForm] = useState({
    name: '',
    price: '',
    type: 'Suite',
    description: '',
    location: '',
    capacity: 2,
    bedType: 'King',
    amenities: '',
    images: ''
  });

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Architecture',
    roomId: '',
    images: []
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'bookings') {
        const endpoint = user?.role === 'admin' ? '/api/bookings' : '/api/bookings/mybookings';
        const { data } = await API.get(endpoint);
        setBookings(data);
      } else if (activeTab === 'rooms' && user?.role === 'admin') {
        const { data } = await API.get('/api/rooms');
        setRooms(data);
      } else if (activeTab === 'gallery' && user?.role === 'admin') {
        const { data } = await API.get('/api/gallery');
        setGallery(data);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...roomForm,
        price: Number(roomForm.price),
        capacity: Number(roomForm.capacity),
        amenities: roomForm.amenities.split(',').map(s => s.trim()).filter(s => s),
        images: roomForm.images.split(',').map(s => s.trim()).filter(s => s)
      };
      await API.post('/api/rooms', formattedData);
      setShowRoomModal(false);
      setRoomForm({ name: '', price: '', type: 'Suite', description: '', location: '', capacity: 2, bedType: 'King', amenities: '', images: '' });
      fetchData();
    } catch (error) {
      alert('Failed to establish room protocol.');
    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm('Confirm deletion of this high-value asset?')) {
      try {
        await API.delete(`/api/rooms/${id}`);
        fetchData();
      } catch (error) {
        alert('Decommissioning failed.');
      }
    }
  };

  const handleUploadGallery = async (e) => {
    e.preventDefault();
    if (galleryForm.images.length === 0) return alert('Select at least one visual asset.');
    if (!galleryForm.roomId) return alert('Select a room for integration.');
    
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(galleryForm.images).forEach(file => {
        formData.append('images', file);
      });
      formData.append('title', galleryForm.title);
      formData.append('category', galleryForm.category);
      formData.append('roomId', galleryForm.roomId);

      await API.post('/api/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setShowGalleryModal(false);
      setGalleryForm({ title: '', category: 'Architecture', roomId: '', images: [] });
      fetchData();
    } catch (error) {
      alert('Asset integration failed. Protocol termination.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (window.confirm('Decommission this visual record?')) {
      try {
        await API.delete(`/api/gallery/${id}`);
        fetchData();
      } catch (error) {
        alert('Decommissioning failed.');
      }
    }
  };

  if (loading && bookings.length === 0 && rooms.length === 0) return (
    <div className="flex flex-col gap-6 justify-center items-center h-screen bg-slate-50">
       <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
       <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Accessing Secure Records</span>
    </div>
  );

  const filteredData = activeTab === 'bookings' 
    ? bookings.filter(b => b.roomId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || b.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    : activeTab === 'rooms' 
    ? rooms.filter(r => r.name?.toLowerCase().includes(searchTerm.toLowerCase()) || r.location?.toLowerCase().includes(searchTerm.toLowerCase()))
    : gallery.filter(g => g.title?.toLowerCase().includes(searchTerm.toLowerCase()) || g.category?.toLowerCase().includes(searchTerm.toLowerCase()));

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
                <h4 className="text-primary-400 font-black uppercase tracking-[0.3em] text-[10px]">Identity Integrated</h4>
                <h1 className="text-5xl font-black text-white tracking-tighter leading-none">{user.name}</h1>
                <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
                   <span className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest"><Mail size={14} className="text-primary-600" /> {user.email}</span>
                   <span className="w-1.5 h-1.5 bg-slate-700 rounded-full hidden md:block" />
                   <span className="bg-white/10 backdrop-blur-sm border border-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{user.role} ACCESS</span>
                </div>
              </div>
           </div>

           <div className="relative z-10 w-full md:w-fit bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col items-center md:items-end gap-2 text-white">
              <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Archive Total</span>
              <span className="text-6xl font-black">{activeTab === 'bookings' ? bookings.length : activeTab === 'rooms' ? rooms.length : gallery.length}</span>
           </div>
        </div>

        {/* Navigation Tabs (Admin Only) */}
        {user.role === 'admin' && (
          <div className="flex gap-4 mb-12 p-3 bg-white w-fit rounded-[2rem] shadow-xl border border-slate-100 mx-auto lg:mx-0">
             <button 
                onClick={() => setActiveTab('bookings')}
                className={cn("flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all", 
                activeTab === 'bookings' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}
             >
                <LayoutDashboard size={18} /> Bookings
             </button>
             <button 
                onClick={() => setActiveTab('rooms')}
                className={cn("flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all", 
                activeTab === 'rooms' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}
             >
                <Settings size={18} /> Rooms
             </button>
             <button 
                onClick={() => setActiveTab('gallery')}
                className={cn("flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all", 
                activeTab === 'gallery' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900")}
             >
                <ImageIcon size={18} /> Gallery
             </button>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-8">
           <div className="flex items-center gap-4">
              <div className="bg-slate-900 p-3 rounded-2xl text-white shadow-xl">
                 {activeTab === 'bookings' ? <Briefcase size={24} /> : activeTab === 'rooms' ? <BedDouble size={24} /> : <ImageIcon size={24} />}
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">Central <span className="text-primary-600">{activeTab === 'bookings' ? 'Archive' : activeTab === 'rooms' ? 'Inventory' : 'Assets'}</span></h2>
           </div>

           <div className="flex items-center gap-6 w-full lg:w-fit">
              <div className="relative w-full lg:w-96 group">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={20} />
                 <input 
                   type="text" 
                   placeholder={activeTab === 'bookings' ? "Search archives..." : "Search inventory..."}
                   className="w-full pl-16 pr-6 py-5 rounded-full border border-white bg-white shadow-2xl shadow-slate-100 outline-none focus:ring-4 focus:ring-primary-600/10 transition-all font-bold text-slate-900 placeholder-slate-300"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              {activeTab === 'rooms' && (
                <button 
                  onClick={() => setShowRoomModal(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white p-5 rounded-full shadow-2xl shadow-primary-900/40 hover:-translate-y-2 transition-all active:scale-95"
                >
                   <Plus size={24} strokeWidth={3} />
                </button>
              )}
              {activeTab === 'gallery' && (
                <button 
                  onClick={() => setShowGalleryModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-5 rounded-full shadow-2xl shadow-indigo-900/40 hover:-translate-y-2 transition-all active:scale-95"
                >
                   <Plus size={24} strokeWidth={3} />
                </button>
              )}
           </div>
        </div>

        {/* Data Display */}
        <div className="bg-white rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
           {activeTab === 'bookings' ? (
              <BookingTable data={filteredData} user={user} />
           ) : activeTab === 'rooms' ? (
              <RoomTable data={filteredData} onDelete={handleDeleteRoom} />
           ) : (
              <GalleryTable data={filteredData} onDelete={handleDeleteGallery} />
           )}
        </div>
      </div>

      {/* Room Creation Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setShowRoomModal(false)} />
           <div className="bg-white w-full max-w-4xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-10 lg:p-16 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Initialize <span className="text-primary-600">Asset</span></h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 text-center lg:text-left">New Inventory Protocol</p>
                 </div>
                 <button onClick={() => setShowRoomModal(false)} className="p-4 bg-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-slate-900">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="p-10 lg:p-16 overflow-y-auto">
                 <form onSubmit={handleAddRoom} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <InputField label="Asset Designation / Name" placeholder="e.g. Presidential Suite" value={roomForm.name} onChange={(v) => setRoomForm({...roomForm, name: v})} />
                    <InputField label="Financial Valuation / Price" placeholder="99.00" type="number" value={roomForm.price} onChange={(v) => setRoomForm({...roomForm, price: v})} />
                    <SelectField label="Classification" options={['AC', 'Non-AC', 'Single', 'Double', 'Suite', 'Deluxe']} value={roomForm.type} onChange={(v) => setRoomForm({...roomForm, type: v})} />
                    <InputField label="Deployment Area / Location" placeholder="South Wing, Floor 12" value={roomForm.location} onChange={(v) => setRoomForm({...roomForm, location: v})} />
                    <InputField label="Max Capacity" type="number" value={roomForm.capacity} onChange={(v) => setRoomForm({...roomForm, capacity: v})} />
                    <InputField label="Bed Configuration" placeholder="2x California King" value={roomForm.bedType} onChange={(v) => setRoomForm({...roomForm, bedType: v})} />
                    <div className="md:col-span-2">
                       <TextAreaField label="Architectural Description" placeholder="Full details..." value={roomForm.description} onChange={(v) => setRoomForm({...roomForm, description: v})} />
                    </div>
                    <InputField label="Amenities (Comma Separated)" placeholder="WiFi, Private Pool, Smart AC" value={roomForm.amenities} onChange={(v) => setRoomForm({...roomForm, amenities: v})} />
                    <InputField label="Neural Link Images (URLs separated by comma)" placeholder="http://..." value={roomForm.images} onChange={(v) => setRoomForm({...roomForm, images: v})} />
                    
                    <div className="md:col-span-2 pt-10">
                       <button type="submit" className="w-full py-8 bg-slate-900 text-white rounded-3xl font-black text-xl uppercase tracking-widest shadow-2xl hover:bg-primary-600 transition-all hover:-translate-y-2 active:scale-95">
                          Establish Entry
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}

      {/* Gallery Upload Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setShowGalleryModal(false)} />
           <div className="bg-white w-full max-w-xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden flex flex-col">
              <div className="p-10 lg:p-16 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Capture <span className="text-indigo-600">Asset</span></h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Visual Integration</p>
                 </div>
                 <button onClick={() => setShowGalleryModal(false)} className="p-4 bg-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-slate-900">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="p-10 lg:p-16">
                 <form onSubmit={handleUploadGallery} className="space-y-10">
                    <InputField label="Visual Label / Title" placeholder="e.g. Sunset Terrace" value={galleryForm.title} onChange={(v) => setGalleryForm({...galleryForm, title: v})} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                       <SelectField label="Asset Classification" options={['Architecture', 'Interior', 'Leisure', 'Culinary', 'Business']} value={galleryForm.category} onChange={(v) => setGalleryForm({...galleryForm, category: v})} />
                       <div className="space-y-3">
                          <label className="block text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Target Hotel / Room</label>
                          <select 
                            value={galleryForm.roomId}
                            onChange={(e) => setGalleryForm({...galleryForm, roomId: e.target.value})}
                            className="w-full px-8 py-5 border border-slate-100 bg-white shadow-sm rounded-2xl outline-none focus:ring-4 focus:ring-primary-600/10 transition-all font-black text-slate-900 uppercase tracking-widest text-xs"
                          >
                            <option value="">Select Target...</option>
                            {rooms.map(room => (
                              <option key={room._id} value={room._id}>{room.name} ({room.location})</option>
                            ))}
                          </select>
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <label className="block text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Source Binaries / Images (Max 10)</label>
                       <input 
                         type="file" 
                         multiple
                         accept="image/*"
                         onChange={(e) => setGalleryForm({...galleryForm, images: e.target.files})}
                         className="w-full px-8 py-5 border border-slate-100 bg-slate-50 shadow-sm rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-slate-400 text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                       />
                       {galleryForm.images?.length > 0 && (
                         <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest px-4">{galleryForm.images.length} Assets Selected</div>
                       )}
                    </div>

                    <button 
                      type="submit" 
                      disabled={uploading}
                      className={cn("w-full py-8 text-white rounded-3xl font-black text-xl uppercase tracking-widest shadow-2xl transition-all hover:-translate-y-2 active:scale-95", uploading ? "bg-slate-300 animate-pulse" : "bg-indigo-600 hover:bg-slate-900")}
                    >
                       {uploading ? 'Processing Protocol...' : 'Establish Visual Records'}
                    </button>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const BookingTable = ({ data, user }) => (
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
        {data.map((booking) => (
          <tr key={booking._id} className="group hover:bg-slate-50/50 transition-all duration-300">
            <td className="px-12 py-10">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <img src={booking.roomId?.images[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=150'} alt="Room" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <div className="font-black text-slate-900 text-xl tracking-tighter uppercase group-hover:text-primary-600 transition-colors">{booking.roomId?.name}</div>
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                     <MapPin size={10} className="text-primary-600" />
                     {user.role === 'admin' ? booking.userId?.name : (booking.roomId?.location || 'Secured Perimeter')}
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
               <div className="text-3xl font-black text-slate-900 tracking-tighter"><span className="text-base mr-0.5">₹</span>{booking.totalAmount}</div>
            </td>
            <td className="px-12 py-10">
               <StatusBadge status={booking.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {data.length === 0 && <EmptyState />}
  </div>
);

const RoomTable = ({ data, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
          <th className="px-12 py-8">Asset / Intelligence</th>
          <th className="px-12 py-8">Specifications</th>
          <th className="px-12 py-8">Pricing</th>
          <th className="px-12 py-8">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {data.map((room) => (
          <tr key={room._id} className="group hover:bg-slate-50/50 transition-all duration-300">
            <td className="px-12 py-10">
               <div className="flex items-center gap-8">
                  <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white flex-shrink-0 group-hover:rotate-3 transition-transform duration-500">
                     <img src={room.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <div className="font-black text-slate-900 text-xl tracking-tighter uppercase mb-1">{room.name}</div>
                     <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <MapPin size={10} className="text-primary-600" /> {room.location}
                     </div>
                  </div>
               </div>
            </td>
            <td className="px-12 py-10">
               <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200">{room.type}</span>
                  <span className="bg-primary-50 text-primary-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary-100 flex items-center gap-1"><Users size={10} /> {room.capacity} GUESTS</span>
                  <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-1"><BedDouble size={10} /> {room.bedType}</span>
               </div>
            </td>
            <td className="px-12 py-10">
               <div className="text-3xl font-black text-slate-900 tracking-tighter"><span className="text-base mr-0.5">₹</span>{room.price}</div>
               <span className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Rate Per Night</span>
            </td>
            <td className="px-12 py-10">
               <button onClick={() => onDelete(room._id)} className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95">
                  <Trash2 size={20} />
               </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {data.length === 0 && <EmptyState />}
  </div>
);

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-3 group">
    <label className="block text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] group-focus-within:text-primary-600 transition-colors">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-8 py-5 border border-slate-100 bg-white shadow-sm rounded-2xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-bold text-slate-900 placeholder-slate-200"
      />
    </div>
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-3 group">
    <label className="block text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] group-focus-within:text-primary-600 transition-colors">{label}</label>
    <textarea 
      rows="4"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-8 py-5 border border-slate-100 bg-white shadow-sm rounded-2xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-bold text-slate-900 placeholder-slate-200 resize-none"
    />
  </div>
);

const SelectField = ({ label, options, value, onChange }) => (
  <div className="space-y-3 group">
    <label className="block text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] group-focus-within:text-primary-600 transition-colors">{label}</label>
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-8 py-5 border border-slate-100 bg-white shadow-sm rounded-2xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-black text-slate-900 uppercase tracking-widest text-xs"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const GalleryTable = ({ data, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
          <th className="px-12 py-8">Visual Asset / Metadata</th>
          <th className="px-12 py-8">Classification</th>
          <th className="px-12 py-8">Temporal ID</th>
          <th className="px-12 py-8">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {data.map((img) => (
          <tr key={img._id} className="group hover:bg-slate-50/50 transition-all duration-300">
            <td className="px-12 py-10">
               <div className="flex items-center gap-8">
                  <div className="w-32 h-20 rounded-3xl overflow-hidden shadow-xl border border-white flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                     <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <div className="font-black text-slate-900 text-xl tracking-tighter uppercase mb-1">{img.title}</div>
                     <div className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{img.public_id}</div>
                  </div>
               </div>
            </td>
            <td className="px-12 py-10">
               <span className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100">{img.category}</span>
            </td>
            <td className="px-12 py-10">
               <div className="text-slate-900 font-bold text-sm tracking-tight">{new Date(img.createdAt).toLocaleDateString()}</div>
               <span className="text-slate-400 font-black uppercase tracking-widest text-[9px]">Entry Date</span>
            </td>
            <td className="px-12 py-10">
               <button onClick={() => onDelete(img._id)} className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                  <Trash2 size={20} />
               </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {data.length === 0 && <EmptyState />}
  </div>
);

const StatusBadge = ({ status }) => (
  <div className={cn(
    "px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] w-fit shadow-md border",
    status === 'booked' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
    status === 'cancelled' ? "bg-red-50 text-red-700 border-red-100" : "bg-slate-100 text-slate-700 border-slate-100"
  )}>
    {status} System
  </div>
);

const EmptyState = () => (
  <div className="text-center py-40 flex flex-col items-center bg-white">
    <div className="p-10 bg-slate-50 rounded-full mb-8 animate-pulse">
      <Search size={64} className="text-slate-200" />
    </div>
    <p className="text-3xl text-slate-900 font-black uppercase tracking-tighter mb-4">No Archives Found</p>
    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Modify your parameters to locate neural data.</p>
  </div>
);

export default Dashboard;
