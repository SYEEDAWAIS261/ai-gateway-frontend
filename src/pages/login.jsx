import { useState } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '../services/api';
import { Cpu, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ⚡ Loading State

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // ⚡ Start Loading

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
      setLoading(false); // ⚡ Stop Loading (Success or Failure)
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Cpu className="w-10 h-10 text-brand-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-100">
            {isRegister ? 'Create Developer Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-slate-400">Sign in to manage your AI Gateway keys</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-brand-500 outline-none disabled:opacity-50"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-brand-500 outline-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:border-brand-500 outline-none disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isRegister ? 'Creating account...' : 'Signing in...'}</span>
              </>
            ) : (
              <>
                <span>{isRegister ? 'Register' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setError('');
              setIsRegister(!isRegister);
            }}
            className="text-brand-500 font-medium hover:underline disabled:opacity-50"
          >
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}