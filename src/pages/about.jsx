import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cpu, ShieldCheck, Zap, Globe2, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Empowering Developers with <span className="text-brand-500">Smart AI Routing</span>
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            AI Gateway is engineered to simplify how modern engineering teams connect, monitor, and scale their open-source and proprietary language models through a single standardized OpenAI-compatible endpoint.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-6">
          <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-200">Ultra Low Latency</h3>
            <p className="text-sm text-slate-400">Optimized request pipelines ensure minimum overhead when routing requests to high-speed inference providers.</p>
          </div>

          <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-200">Robust Security</h3>
            <p className="text-sm text-slate-400">Redis-powered rate limiting and encrypted secret key generation protect your backend infrastructure against abuse.</p>
          </div>

          <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center border border-brand-500/20">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-slate-200">Seamless Compatibility</h3>
            <p className="text-sm text-slate-400">Drop-in replacement for OpenAI SDKs. Switch models or providers without changing a single line of production code.</p>
          </div>
        </div>

        <div className="border border-slate-800 bg-slate-900/30 p-8 rounded-2xl space-y-4">
          <h3 className="text-xl font-bold text-slate-200">Our Mission</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            We believe building AI-powered software should be straightforward and unconstrained by vendor lock-in or complex infrastructure management. Our platform gives developers full control over their API keys, rate limits, and analytics dashboard.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}