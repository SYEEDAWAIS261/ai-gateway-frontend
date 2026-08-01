import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Cpu, LogOut, LayoutDashboard, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { authAPI } from '../services/api';

export default function Navbar({ user: propUser }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authUser, setAuthUser] = useState(propUser);

  useEffect(() => {
    if (propUser) {
      setAuthUser(propUser);
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('gateway_token') : null;
    if (token) {
      authAPI.getProfile()
        .then((res) => {
          setAuthUser(res.data?.data || res.data);
        })
        .catch(() => {
          localStorage.removeItem('gateway_token');
          setAuthUser(null);
        });
    }
  }, [propUser]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gateway_token');
    setAuthUser(null);
    router.push('/login');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Docs', href: '/docs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
<header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 transition-all duration-300">
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 shadow-2xl shadow-indigo-500/10' 
          : 'bg-slate-900/40 backdrop-blur-md border border-slate-800/50 shadow-lg'
      }`}>
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 text-indigo-400 group-hover:scale-105 transition duration-300 shadow-inner">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-slate-100">AI Gateway</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">Pro</span>
          </div>
        </Link>
        
        {/* Center: Desktop Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 border border-slate-800/80 px-2 py-1 rounded-full shadow-inner">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Right: User Profile or Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {authUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/60 px-3 py-1.5 rounded-xl transition duration-200 cursor-pointer group shadow-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-500/20">
                  {(authUser.email || authUser.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-slate-200 max-w-[110px] truncate leading-tight">{authUser.name || authUser.email?.split('@')[0]}</p>
                  <p className="text-[9px] text-emerald-400 flex items-center gap-1 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Active</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-800">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Signed in as</p>
                    <p className="text-xs font-medium text-slate-200 truncate mt-0.5">{authUser.email}</p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-400" /> Gateway Dashboard
                    </Link>
                  </div>
                  <div className="p-1 border-t border-slate-800 mt-1">
                    <button
                      onClick={() => { setDropdownOpen(false); handleLogout(); }}
                      className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="text-xs font-medium text-slate-300 hover:text-white transition px-4 py-2 rounded-xl hover:bg-slate-800/50"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-600/25 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-2xl p-5 space-y-4 md:hidden shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium px-3 py-2 rounded-xl transition ${
                  router.pathname === link.href ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="pt-4 border-t border-slate-800">
            {authUser ? (
              <div className="space-y-3">
                <div className="px-3 py-2 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Signed in as</p>
                  <p className="text-xs text-slate-200 truncate">{authUser.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs py-2.5 rounded-xl font-medium transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}