import { useState } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../services/api';
import { Cpu, ArrowRight, Loader2, Lock, Mail, User, Sparkles } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (isRegister) {
        res = await authAPI.register({ name, email, password });
      } else {
        res = await authAPI.login({ email, password });
      }

      if (res.data.token) {
        localStorage.setItem('gateway_token', res.data.token);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden selection:bg-brand-500 selection:text-white">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-brand-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 blur-[130px] pointer-events-none rounded-full" />

      {/* Auth Container Card */}
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-2xl relative z-10 space-y-6">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20 mx-auto shadow-inner">
            <Cpu className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-brand-400 text-[10px] font-mono uppercase tracking-wider backdrop-blur-xl">
              <Sparkles className="w-3 h-3" /> Secure Authentication
            </div>
            <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              {isRegister ? 'Create Developer Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRegister ? 'Provision your gateway credentials and access tokens' : 'Sign in to manage your AI Gateway keys and telemetry'}
            </p>
          </div>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3.5 rounded-2xl text-center font-mono tracking-wide animate-shake">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                <input
                  type="text"
                  required
                  disabled={loading}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-200 focus:border-brand-500 outline-none disabled:opacity-50 transition shadow-inner"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              <input
                type="email"
                required
                disabled={loading}
                placeholder="developer@gateway.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-200 focus:border-brand-500 outline-none disabled:opacity-50 transition shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              <input
                type="password"
                required
                disabled={loading}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-200 focus:border-brand-500 outline-none disabled:opacity-50 transition shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-2xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-600/25 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isRegister ? 'Provisioning account...' : 'Authenticating...'}</span>
              </>
            ) : (
              <>
                <span>{isRegister ? 'Register Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="text-center pt-2">
          <p className="text-xs text-slate-400">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setError('');
                setIsRegister(!isRegister);
              }}
              className="text-brand-400 font-bold hover:underline disabled:opacity-50 cursor-pointer ml-1"
            >
              {isRegister ? 'Sign In' : 'Register Now'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}