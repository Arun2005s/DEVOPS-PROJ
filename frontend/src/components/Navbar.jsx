import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Hotel, User, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isNotHome = location.pathname !== '/';
  const shouldShowBg = isScrolled || isNotHome;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      shouldShowBg ? "py-3 bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50" : "py-6 bg-transparent"
    )}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform duration-300">
            <Hotel size={28} />
          </div>
          <span className={cn(
            "text-2xl font-black tracking-tighter transition-colors",
            shouldShowBg ? "text-gray-900" : "text-white"
          )}>
            Hotel<span className="text-primary-600">Ease</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={cn(
                  "font-bold text-sm uppercase tracking-widest hover:text-primary-600 transition-all relative group",
                  shouldShowBg ? "text-gray-600" : "text-white/90",
                  location.pathname === link.path && "text-primary-600"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 h-0.5 bg-primary-600 transition-all duration-300",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200/30" />

          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className={cn(
                "flex items-center gap-2 font-bold text-sm tracking-wide group",
                shouldShowBg ? "text-gray-700" : "text-white"
              )}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white shadow-md group-hover:ring-4 ring-primary-100 transition-all">
                  <User size={20} />
                </div>
                <span>{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="bg-white/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 backdrop-blur-sm transition-all"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all border",
                shouldShowBg 
                  ? "text-gray-700 border-gray-200 hover:bg-gray-50" 
                  : "text-white border-white/20 hover:bg-white/10 backdrop-blur-sm"
              )}>
                Login
              </Link>
              <Link to="/register" className="bg-primary-600 text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all">
                Registry
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "lg:hidden p-2 rounded-xl transition-colors",
            isScrolled ? "text-gray-900 bg-gray-100" : "text-white bg-white/10"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-40 bg-white p-10 flex flex-col gap-8 transition-transform duration-500 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-8">
           <span className="text-3xl font-black text-gray-900">Menu</span>
           <button onClick={() => setMobileMenuOpen(false)} className="bg-gray-100 p-3 rounded-full"><X /></button>
        </div>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-extrabold text-gray-900 flex justify-between items-center group"
          >
            {link.name}
            <ChevronRight className="text-primary-600 group-hover:translate-x-2 transition-transform" />
          </Link>
        ))}
        <div className="mt-auto flex flex-col gap-4">
          {user ? (
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full bg-primary-50 py-5 px-8 rounded-3xl flex items-center gap-4">
               <User className="text-primary-600" />
               <span className="font-bold text-xl">{user.name}</span>
            </Link>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full bg-primary-600 py-5 px-8 rounded-3xl text-center text-white font-bold text-xl">Sign in</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
