import Link from 'next/link';
import { useRouter } from 'next/router';
import { Cpu, LogOut, User } from 'lucide-react';

export default function Navbar({ user }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('gateway_token');
    router.push('/login');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-500">
        <Cpu className="w-6 h-6" />
        <span>AI Gateway</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 flex items-center gap-1.5">
              <User className="w-4 h-4" /> {user.email || user.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-brand-600 hover:bg-brand-500 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}