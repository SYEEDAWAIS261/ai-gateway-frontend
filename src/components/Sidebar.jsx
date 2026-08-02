import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Key, BookOpen, Home, Sparkles, Terminal, Activity, X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();

  const mainLinks = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'API Management', href: '/keys', icon: Key },
  ];

  const resourceLinks = [
    { name: 'API Docs & SDKs', href: '/docs', icon: BookOpen },
    { name: 'System Status', href: '/docs#status', icon: Activity },
  ];

  const portalLinks = [
    { name: 'Home Portal', href: '/', icon: Home },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static top-0 left-0 z-50 h-full lg:h-[calc(100vh-65px)]
        w-72 border-r border-slate-800/80 bg-slate-950 lg:bg-slate-950/60 backdrop-blur-xl p-5 
        flex flex-col justify-between select-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          
          {/* Mobile Close Button Header */}
          <div className="flex items-center justify-between lg:hidden pb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
              <Terminal className="w-4 h-4 text-brand-400" />
              <span>Navigation Menu</span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Workspace Mini Badge */}
          <div className="px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-xs shadow-inner">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200 leading-tight">Production Team</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">us-east-proxy-1</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Navigation Group 1: General */}
          <div className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Platform</p>
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const isActive = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-brand-600/10 text-brand-400 border border-brand-500/30 shadow-lg shadow-brand-500/5'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span>{link.name}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shadow-sm shadow-brand-400"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Navigation Group 2: Resources */}
          <div className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Resources</p>
            {resourceLinks.map((link) => {
              const Icon = link.icon;
              const isActive = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-brand-600/10 text-brand-400 border border-brand-500/30 shadow-lg shadow-brand-500/5'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span>{link.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Navigation Group 3: Navigation */}
          <div className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Quick Navigation</p>
            {portalLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform duration-200 group-hover:scale-110" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

        </div>

        {/* Bottom Pro Callout Card */}
        <div className="mt-8 p-3.5 rounded-2xl bg-gradient-to-br from-brand-950/40 via-slate-900/60 to-slate-900 border border-brand-500/20 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-brand-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-1.5 text-brand-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wide">Gateway Pro Tier</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            You are using 42% of your monthly high-speed LLM routing tokens.
          </p>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="block w-full py-2 bg-brand-600 hover:bg-brand-500 text-white text-center rounded-xl text-xs font-semibold transition shadow-md shadow-brand-600/20"
          >
            Manage Limits
          </Link>
        </div>
      </aside>
    </>
  );
}