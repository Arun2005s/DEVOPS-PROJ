import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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
      setError(err.response?.data?.message || 'Unauthorized: Double check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary-600/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse" />
         <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[100px] -ml-40 -mb-40 animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="bg-white/95 backdrop-blur-3xl p-12 lg:p-20 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white flex flex-col items-center">
          
          <Link to="/" className="mb-12 group">
             <div className="bg-primary-600 p-4 rounded-3xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
               <LogIn size={42} strokeWidth={2.5} />
             </div>
          </Link>
          
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter text-center leading-none uppercase">Authentication</h1>
          <p className="text-slate-400 font-bold mb-12 tracking-widest text-xs uppercase">Welcome back to the collection</p>
          
          {error && (
            <div className="w-full bg-red-50 text-red-600 p-5 rounded-3xl flex items-center gap-4 border border-red-100 mb-8 animate-shake">
              <AlertCircle size={24} className="flex-shrink-0" />
              <p className="font-extrabold text-sm uppercase tracking-tight">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-10">
            <div className="group">
              <label className="block text-slate-400 font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Email Protocol</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  className="w-full pl-16 pr-6 py-6 border border-slate-100 bg-slate-50/50 rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-black text-slate-900 text-lg placeholder-slate-200"
                  placeholder="name@protocol.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="group">
              <label className="block text-slate-400 font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Access Core / Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  className="w-full pl-16 pr-6 py-6 border border-slate-100 bg-slate-50/50 rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-black text-slate-900 text-lg placeholder-slate-200"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={cn(
                "w-full py-6 rounded-3xl font-black text-xl text-white shadow-2xl transition-all duration-500 transform flex items-center justify-center gap-4 active:scale-95 group",
                loading ? "bg-slate-400 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-700 hover:-translate-y-2"
              )}
            >
              {loading ? 'Validating...' : 'Unlock Account'}
              {!loading && <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />}
            </button>
          </form>

          <p className="mt-16 text-slate-400 font-black text-xs uppercase tracking-widest">
            Identity missing? <Link to="/register" className="text-primary-600 hover:text-primary-700 underline underline-offset-[12px] decoration-primary-200 decoration-4 hover:decoration-primary-600 transition-all">Establish Credentials</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
