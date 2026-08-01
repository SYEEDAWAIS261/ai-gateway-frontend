import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cpu, Zap, Shield, Code2, Terminal, ArrowRight, Sparkles, Activity, Layers, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-emerald-500/5 blur-[130px] pointer-events-none rounded-full" />

      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 text-center space-y-16 relative z-10">
        
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 text-brand-400 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase backdrop-blur-xl shadow-xl">
          <Zap className="w-3.5 h-3.5 text-brand-400 animate-pulse" /> High Performance OpenAI-Compatible Gateway Protocol
        </div>

        {/* Main Headline */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-100 leading-[1.1]">
            Unify Your AI Infrastructure with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-emerald-400">Custom Gateway</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Provision developer API keys, track real-time telemetry analytics, enforce strict Redis rate limits, and route requests across open-source and proprietary LLMs seamlessly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/dashboard"
            className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-2xl transition shadow-xl shadow-brand-600/25 flex items-center gap-2"
          >
            Go to Command Center <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/docs"
            className="border border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-xl text-slate-300 text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-2xl transition flex items-center gap-2"
          >
            Developer Docs
          </Link>
        </div>

        {/* Interactive Terminal Code Preview Showcase */}
        <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-6 text-left shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-mono font-bold text-slate-300">Live SDK Proxy Request</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
          </div>

          <pre className="font-mono text-xs text-brand-400 overflow-x-auto bg-slate-950 p-5 rounded-2xl border border-slate-800/80 shadow-inner leading-relaxed select-all">
{`import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:8080/v1',
  apiKey: 'sk-live-gateway-secure-token'
});

const response = await openai.chat.completions.create({
  model: 'llama3-8b-8192',
  messages: [{ role: 'user', content: 'Route this prompt through gateway middleware' }]
});`}
          </pre>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-6 pt-6 text-left">
          <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-7 rounded-3xl space-y-3 shadow-2xl hover:border-brand-500/50 transition duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20 group-hover:scale-110 transition">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-200">OpenAI Compatible</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Drop-in replacement for standard OpenAI SDKs without altering a single line of client application logic.
            </p>
          </div>

          <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-7 rounded-3xl space-y-3 shadow-2xl hover:border-brand-500/50 transition duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20 group-hover:scale-110 transition">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-200">Rate Limiting & Auth</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Redis-powered token buckets and encrypted proxy key generation protect endpoints against unauthorized usage and traffic spikes.
            </p>
          </div>

          <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-7 rounded-3xl space-y-3 shadow-2xl hover:border-brand-500/50 transition duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20 group-hover:scale-110 transition">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-200">Groq & Open Source LLMs</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Ultra-low latency model routing with complete response streaming support across multiple inference backends.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}