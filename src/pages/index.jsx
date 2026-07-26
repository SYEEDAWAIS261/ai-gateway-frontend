import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Cpu, Zap, Shield, Code2 } from 'lucide-react';
import Footer from '../components/Footer';
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-500 px-4 py-1.5 rounded-full text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" /> High Performance OpenAI-Compatible Gateway
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-slate-100">
          Unify Your AI Infrastructure with <span className="text-brand-500">Custom Gateway</span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Manage developer API keys, track real-time analytics, enforce rate limits, and route requests to open-source LLMs seamlessly.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="bg-brand-600 hover:bg-brand-500 text-white font-medium px-6 py-3 rounded-xl transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/docs"
            className="border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium px-6 py-3 rounded-xl transition"
          >
            Developer Docs
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl space-y-2">
            <Code2 className="w-8 h-8 text-brand-500" />
            <h3 className="font-semibold text-lg text-slate-200">OpenAI Compatible</h3>
            <p className="text-sm text-slate-400">Use official OpenAI SDKs without changing a single line of client logic.</p>
          </div>

          <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl space-y-2">
            <Shield className="w-8 h-8 text-brand-500" />
            <h3 className="font-semibold text-lg text-slate-200">Rate Limiting & Auth</h3>
            <p className="text-sm text-slate-400">Redis-powered token buckets protect endpoints against unauthorized usage.</p>
          </div>

          <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl space-y-2">
            <Cpu className="w-8 h-8 text-brand-500" />
            <h3 className="font-semibold text-lg text-slate-200">Groq & Open Source LLMs</h3>
            <p className="text-sm text-slate-400">Low-latency model routing with full response streaming support.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}