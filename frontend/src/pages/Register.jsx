import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, AlertCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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
      setError(err.response?.data?.message || 'Protocol failure during identity creation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-indigo-600/10 rounded-full blur-[120px] -mr-60 -mt-60 animate-pulse" />
         <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-emerald-600/10 rounded-full blur-[120px] -ml-60 -mb-60 animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="bg-white/95 backdrop-blur-3xl p-12 lg:p-20 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white flex flex-col lg:flex-row gap-20">
          
          {/* Info Side */}
          <div className="lg:w-1/2 flex flex-col justify-center">
             <div className="mb-12 group w-fit">
                <div className="bg-primary-600 p-4 rounded-3xl text-white shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <UserPlus size={42} strokeWidth={2.5} />
                </div>
             </div>
             
             <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tighter uppercase leading-[0.9]">Establish <br/> Your <span className="text-primary-600">Identity</span></h1>
             <p className="text-slate-500 font-bold mb-12 leading-relaxed text-lg uppercase tracking-tight">Join the most exclusive smart hotel network in the world. Exceptional service, digital perfection.</p>
             
             <ul className="space-y-6">
                <li className="flex items-center gap-4 text-slate-400 font-black text-xs uppercase tracking-widest"><ShieldCheck className="text-primary-600" /> Biometric-ready entry</li>
                <li className="flex items-center gap-4 text-slate-400 font-black text-xs uppercase tracking-widest"><Zap className="text-primary-600" /> Instant verification</li>
             </ul>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2">
            {error && (
              <div className="w-full bg-red-50 text-red-600 p-5 rounded-3xl flex items-center gap-4 border border-red-100 mb-8 animate-shake">
                <AlertCircle size={24} className="flex-shrink-0" />
                <p className="font-extrabold text-sm uppercase tracking-tight">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group">
                <label className="block text-slate-300 font-black mb-3 uppercase tracking-[0.2em] text-[10px]">Full Designation / Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-16 pr-6 py-5 border border-slate-100 bg-slate-50/70 rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-black text-slate-900 text-lg placeholder-slate-200"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-slate-300 font-black mb-3 uppercase tracking-[0.2em] text-[10px]">Communication Protocol / Email</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={20} />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-16 pr-6 py-5 border border-slate-100 bg-slate-50/70 rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-black text-slate-900 text-lg placeholder-slate-200"
                    placeholder="name@protocol.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-slate-300 font-black mb-3 uppercase tracking-[0.2em] text-[10px]">Access Core / Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-600 transition-colors" size={20} />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-16 pr-6 py-5 border border-slate-100 bg-slate-50/70 rounded-3xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all font-black text-slate-900 text-lg placeholder-slate-200"
                    placeholder="Minimal 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="group">
                <label className="block text-slate-300 font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Identity Level / Role</label>
                <div className="flex gap-4 p-2 bg-slate-50/80 rounded-[1.5rem] border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={cn(
                      "flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                      role === 'user' ? "bg-white text-primary-600 shadow-xl shadow-slate-100" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Guest
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={cn(
                      "flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                      role === 'admin' ? "bg-white text-red-600 shadow-xl shadow-slate-100" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Administrator
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={cn(
                    "w-full py-6 rounded-3xl font-black text-xl text-white shadow-2xl transition-all duration-500 transform flex items-center justify-center gap-4 active:scale-95 group",
                    loading ? "bg-slate-400 cursor-not-allowed" : "bg-primary-600 hover:bg-primary-700 hover:-translate-y-2 shadow-primary-200"
                  )}
                >
                  {loading ? 'Establish...' : 'Create Credentials'}
                  {!loading && <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />}
                </button>
              </div>
            </form>

            <p className="mt-16 text-slate-400 font-black text-xs uppercase tracking-widest text-center lg:text-left">
              Already Identified? <Link to="/login" className="text-primary-600 hover:text-primary-700 underline underline-offset-[12px] decoration-primary-200 decoration-4 hover:decoration-primary-600 transition-all ml-2">Access Portal</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
