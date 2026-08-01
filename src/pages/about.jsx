import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cpu, ShieldCheck, Zap, Globe2, Layers, Terminal, ArrowUpRight, Activity, CpuIcon, Network } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 space-y-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-brand-400 text-xs font-mono tracking-wider uppercase backdrop-blur-xl shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Next-Gen Model Middleware Protocol
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-100 leading-[1.1]">
            Empowering Developers with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-emerald-400">Smart AI Routing</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            AI Gateway is engineered to radically simplify how high-velocity engineering teams connect, monitor, and scale open-source and proprietary language models through a single standardized, ultra-optimized endpoint.
          </p>
        </div>

        {/* Live Metrics Ticker Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
          {[
            { label: 'Global Edge Nodes', value: '42+' },
            { label: 'Avg Proxy Latency', value: '< 45ms' },
            { label: 'Uptime SLA Guarantee', value: '99.99%' },
            { label: 'Standardized API', value: 'OpenAI Spec' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1 p-3 rounded-2xl bg-slate-950/40 border border-slate-800/50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
              <p className="text-xl font-extrabold text-slate-100 font-mono tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Core Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold">Architectural Advantages</h2>
            <h3 className="text-2xl font-bold tracking-tight text-slate-100">Built for Production Scale</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-2">
            <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-7 rounded-3xl space-y-4 shadow-2xl hover:border-brand-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20 group-hover:scale-110 transition duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-200">Ultra-Low Latency Routing</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Optimized request pipelines and edge caching ensure absolute minimum overhead when load-balancing tokens across high-speed inference providers.
              </p>
            </div>

            <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-7 rounded-3xl space-y-4 shadow-2xl hover:border-brand-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20 group-hover:scale-110 transition duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-200">Enterprise Security</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Redis-powered granular rate limiting, multi-tier quotas, and encrypted secret key generation protect your backend infrastructure against spikes and abuse.
              </p>
            </div>

            <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-7 rounded-3xl space-y-4 shadow-2xl hover:border-brand-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20 group-hover:scale-110 transition duration-300">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-200">Drop-in Compatibility</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Full compatibility with OpenAI SDK standards. Switch LLM backends or providers dynamically without modifying a single line of production application code.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement Banner */}
        <div className="relative border border-slate-800/80 bg-gradient-to-br from-slate-900/60 to-slate-950/80 backdrop-blur-2xl p-10 rounded-3xl space-y-6 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 text-brand-400 text-xs font-mono uppercase tracking-wider">
            <Network className="w-4 h-4" />
            <span>Our Foundational Thesis</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Eliminating Vendor Lock-in & Complexity
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            We believe building modern AI-powered software should be straightforward and unconstrained by rigid infrastructure silos. Our platform grants engineering teams absolute sovereignty over their proxy tokens, usage tiers, and detailed real-time analytics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4 text-brand-400" /> Modular Architecture</span>
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-brand-400" /> Real-time Telemetry</span>
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-brand-400" /> Dynamic Tier Management</span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}