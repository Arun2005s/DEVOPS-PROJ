import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Hotel, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-600 flex items-center gap-2">
          <Hotel size={32} />
          <span>HotelEase</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/rooms" className="text-gray-600 hover:text-primary-500 font-medium transition duration-300">Rooms</Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-500 flex items-center gap-1 font-medium transition duration-300">
                <User size={20} />
                <span>{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition duration-300"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-primary-600 border border-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition duration-300">Login</Link>
              <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition duration-300 shadow-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
