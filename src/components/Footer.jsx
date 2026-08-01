import Link from 'next/link';
import { Cpu, Github, Twitter, Linkedin, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950 text-slate-400 overflow-hidden mt-auto">
      {/* Background ambient glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 relative z-10">
        
        {/* Top Section: Brand & Newsletter Subscription */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-lg text-slate-100 group">
              <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 group-hover:bg-brand-500/20 transition">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="tracking-tight">AI Gateway <span className="text-brand-500 text-xs px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 ml-1 font-normal">v2.4</span></span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              An enterprise-grade, OpenAI-compatible proxy gateway designed for ultra-low latency LLM routing, token budgeting, and advanced traffic analytics.
            </p>
            
            {/* Live System Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All systems operational (99.98% uptime)</span>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" /> Platform
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="/dashboard" className="hover:text-slate-200 transition flex items-center gap-1">Live Dashboard</Link></li>
                <li><Link href="/docs" className="hover:text-slate-200 transition flex items-center gap-1">API Documentation <ArrowUpRight className="w-3 h-3 opacity-60" /></Link></li>
                <li><Link href="/docs#models" className="hover:text-slate-200 transition">Model Directory</Link></li>
                <li><Link href="/docs#pricing" className="hover:text-slate-200 transition">Pricing Tiers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="/about" className="hover:text-slate-200 transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-slate-200 transition">Contact & Support</Link></li>
                <li><Link href="/docs#security" className="hover:text-slate-200 transition flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-brand-500" /> Security</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase text-slate-200 tracking-wider mb-4">Connect</h4>
              <div className="flex items-center gap-2.5">
                <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} AI Gateway Inc. Built for high-scale engineering workflows.</p>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-slate-400 transition">Privacy Policy</Link>
            <Link href="/docs" className="hover:text-slate-400 transition">Terms of Service</Link>
            <Link href="/docs" className="hover:text-slate-400 transition">Cookie Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}