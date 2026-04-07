import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-lg bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col items-center">
        <div className="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center text-primary-600 mb-8 shadow-inner shadow-primary-200">
          <UserPlus size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 leading-tight">Join HotelEase</h1>
        <p className="text-gray-400 font-medium mb-12 text-center leading-relaxed">Join thousands of travelers enjoying smart stays.</p>
        
        {error && (
          <div className="w-full bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100 mb-6">
            <AlertCircle size={20} />
            <p className="font-bold text-sm tracking-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-7">
          <div className="group">
            <label className="block text-gray-700 font-bold mb-3 transition-colors group-focus-within:text-primary-600 uppercase tracking-widest text-xs">Full Name</label>
            <div className="relative transform transition-all group-focus-within:scale-[1.01]">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input 
                type="text" 
                required
                className="w-full pl-14 pr-5 py-5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all font-medium bg-gray-50/30 group-hover:bg-white"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-gray-700 font-bold mb-3 transition-colors group-focus-within:text-primary-600 uppercase tracking-widest text-xs">Email Address</label>
            <div className="relative transform transition-all group-focus-within:scale-[1.01]">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input 
                type="email" 
                required
                className="w-full pl-14 pr-5 py-5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all font-medium bg-gray-50/30 group-hover:bg-white"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-gray-700 font-bold mb-3 transition-colors group-focus-within:text-primary-600 uppercase tracking-widest text-xs">Security PIN/Password</label>
            <div className="relative transform transition-all group-focus-within:scale-[1.01]">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input 
                type="password" 
                required
                className="w-full pl-14 pr-5 py-5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all font-medium bg-gray-50/30 group-hover:bg-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="group">
            <label className="block text-gray-700 font-bold mb-4 uppercase tracking-widest text-xs">Account Role</label>
            <div className="flex gap-4 p-2 bg-gray-100/50 rounded-[1.5rem] border border-gray-200">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 ${role === 'user' ? 'bg-white text-primary-600 shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Standard User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all duration-300 ${role === 'admin' ? 'bg-white text-red-600 shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Administrator
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-bold text-lg text-white shadow-2xl transition-all duration-300 transform flex items-center justify-center gap-3 active:scale-95 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 shadow-primary-200 hover:shadow-primary-300'}`}
          >
            {loading ? 'Processing...' : 'Create Account'}
            {!loading && <UserPlus size={20} />}
          </button>
        </form>

        <p className="mt-12 text-gray-500 font-medium">
          Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold underline underline-offset-8 transition-all hover:underline-offset-4">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
