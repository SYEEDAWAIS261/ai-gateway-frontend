import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Cpu, LogOut, User, Menu, X, LayoutDashboard, BookOpen, Info, Mail } from 'lucide-react';

export default function Navbar({ user }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('gateway_token');
    router.push('/login');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-500">
          <Cpu className="w-6 h-6" />
          <span>AI Gateway</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-brand-500 transition">Home</Link>
          <Link href="/dashboard" className="hover:text-brand-500 transition">Dashboard</Link>
          <Link href="/docs" className="hover:text-brand-500 transition">Docs</Link>
          <Link href="/about" className="hover:text-brand-500 transition">About Us</Link>
          <Link href="/contact" className="hover:text-brand-500 transition">Contact Us</Link>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-semibold text-xs border border-brand-500/30">
                {(user.email || user.name || 'U').charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-slate-300 max-w-[120px] truncate">{user.email || user.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50">
                <div className="px-4 py-2 border-b border-slate-800">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Signed in as</p>
                  <p className="text-xs text-slate-300 truncate">{user.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/70 transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-brand-500" /> Dashboard
                </Link>
                <button
                  onClick={() => { setDropdownOpen(false); handleLogout(); }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-slate-800/70 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-medium text-slate-300 hover:text-white transition px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs px-4 py-2 rounded-xl font-medium transition shadow-lg shadow-brand-600/20"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden text-slate-300 hover:text-white p-1"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-4 space-y-3 md:hidden shadow-2xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-brand-500 py-1">Home</Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-brand-500 py-1">Dashboard</Link>
          <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-brand-500 py-1">Docs</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-brand-500 py-1">About Us</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-brand-500 py-1">Contact Us</Link>
          <div className="pt-3 border-t border-slate-800">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout ({user.email})
              </button>
            ) : (
              <Link
                href="/login"
                className="block text-center bg-brand-600 text-white text-xs py-2.5 rounded-lg font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}