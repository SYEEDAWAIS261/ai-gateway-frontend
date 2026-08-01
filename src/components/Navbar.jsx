import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Cpu, LogOut, User, Menu, X, LayoutDashboard, Sparkles, ChevronDown } from 'lucide-react';

export default function Navbar({ user }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add subtle shadow/border transition on window scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gateway_token');
    router.push('/login');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3 ${
      scrolled 
        ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-brand-500/5' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo with Beta Glow Tag */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-slate-100 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/30 text-brand-400 group-hover:scale-105 transition duration-300 shadow-lg shadow-brand-500/10">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <span className="tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">AI Gateway</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400">Pro</span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
            <Link href="/" className={`px-3 py-1 rounded-full text-xs font-medium transition ${router.pathname === '/' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>Home</Link>
            <Link href="/dashboard" className={`px-3 py-1 rounded-full text-xs font-medium transition ${router.pathname === '/dashboard' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>Dashboard</Link>
            <Link href="/docs" className={`px-3 py-1 rounded-full text-xs font-medium transition ${router.pathname === '/docs' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>Docs</Link>
            <Link href="/about" className={`px-3 py-1 rounded-full text-xs font-medium transition ${router.pathname === '/about' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>About</Link>
            <Link href="/contact" className={`px-3 py-1 rounded-full text-xs font-medium transition ${router.pathname === '/contact' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`}>Contact</Link>
          </nav>
        </div>
        
        {/* Right Actions: Conditional Rendering based on User Auth State */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 px-3.5 py-1.5 rounded-2xl transition duration-200 cursor-pointer group shadow-inner"
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md shadow-brand-500/20">
                  {(user.email || user.name || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-slate-200 max-w-[100px] truncate leading-tight">{user.name || user.email?.split('@')[0]}</p>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Active</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-800/80">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Signed in as</p>
                    <p className="text-xs font-medium text-slate-200 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-400" /> Gateway Dashboard
                    </Link>
                  </div>
                  <div className="p-1 border-t border-slate-800/80 mt-1">
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
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white transition px-4 py-2.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition shadow-lg shadow-brand-600/25 flex items-center gap-1.5"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 p-6 space-y-4 md:hidden shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-300 hover:text-brand-400 hover:bg-slate-900 px-3 py-2 rounded-xl transition">Home</Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-300 hover:text-brand-400 hover:bg-slate-900 px-3 py-2 rounded-xl transition">Dashboard</Link>
            <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-300 hover:text-brand-400 hover:bg-slate-900 px-3 py-2 rounded-xl transition">Docs</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-300 hover:text-brand-400 hover:bg-slate-900 px-3 py-2 rounded-xl transition">About Us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-slate-300 hover:text-brand-400 hover:bg-slate-900 px-3 py-2 rounded-xl transition">Contact Us</Link>
          </div>
          
          <div className="pt-4 border-t border-slate-800/80">
            {user ? (
              <div className="space-y-3">
                <div className="px-3 py-2 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Signed in as</p>
                  <p className="text-xs text-slate-200 truncate">{user.email}</p>
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
                  className="text-center bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs py-3 rounded-xl font-medium transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center bg-brand-600 hover:bg-brand-500 text-white text-xs py-3 rounded-xl font-medium shadow-lg shadow-brand-600/20"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}