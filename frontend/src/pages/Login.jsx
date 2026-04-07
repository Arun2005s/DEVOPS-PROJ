import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white p-12 rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col items-center">
        <div className="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center text-primary-600 mb-8 shadow-inner shadow-primary-200">
          <LogIn size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 leading-tight">Welcome Back</h1>
        <p className="text-gray-400 font-medium mb-12 text-center leading-relaxed">Experience comfort and luxury with HotelEase.</p>
        
        {error && (
          <div className="w-full bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100 animate-shake mb-6">
            <AlertCircle size={20} />
            <p className="font-bold text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <div className="group">
            <label className="block text-gray-700 font-bold mb-3 transition-colors group-focus-within:text-primary-600 uppercase tracking-widest text-xs">Email Address</label>
            <div className="relative transform transition-all group-focus-within:scale-[1.01]">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input 
                type="email" 
                required
                className="w-full pl-14 pr-5 py-5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all font-medium bg-gray-50/30 group-hover:bg-white"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-gray-700 font-bold mb-3 transition-colors group-focus-within:text-primary-600 uppercase tracking-widest text-xs">Password</label>
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
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-2xl font-bold text-lg text-white shadow-2xl transition-all duration-300 transform flex items-center justify-center gap-3 active:scale-95 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 shadow-primary-200 hover:shadow-primary-300'}`}
          >
            {loading ? 'Authenticating...' : 'Sign In Now'}
            {!loading && <LogIn size={20} />}
          </button>
        </form>

        <p className="mt-12 text-gray-500 font-medium">
          New here? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold underline underline-offset-8 transition-all hover:underline-offset-4">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
