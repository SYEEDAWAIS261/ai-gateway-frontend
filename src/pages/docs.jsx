import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Terminal, Copy, Check, Sparkles, Code2, Cpu, BookOpen, Layers, Activity, CheckCircle2, Server } from 'lucide-react';

export default function Docs() {
  const [activeTab, setActiveTab] = useState('node');
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopyCode = (code, sectionKey) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const codeSnippets = {
    node: `import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:8080/v1',
  apiKey: 'sk-live-your-generated-gateway-key'
});

const response = await openai.chat.completions.create({
  model: 'llama3-8b-8192',
  messages: [{ role: 'user', content: 'Hello AI Gateway!' }]
});

console.log(response.choices[0].message.content);`,

    python: `from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="sk-live-your-generated-gateway-key"
)

response = client.chat.completions.create(
    model="llama3-8b-8192",
    messages=[{"role": "user", "content": "Hello AI Gateway!"}]
)

print(response.choices[0].message.content)`,

    curl: `curl -X POST http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-live-your-generated-gateway-key" \\
  -d '{
    "model": "llama3-8b-8192",
    "messages": [{"role": "user", "content": "Hello AI Gateway!"}]
  }'`
  };

  const services = [
    { name: 'US-East Proxy Cluster', status: 'Operational', latency: '24ms', uptime: '99.99%' },
    { name: 'EU-Central LLM Gateway', status: 'Operational', latency: '41ms', uptime: '100%' },
    { name: 'Token Router & Load Balancer', status: 'Operational', latency: '12ms', uptime: '99.95%' },
    { name: 'Embedding Vector Engine', status: 'Operational', latency: '18ms', uptime: '99.98%' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      <Head><title>API Docs & System Status - AI Gateway Pro</title></Head>
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-indigo-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-emerald-500/5 blur-[130px] pointer-events-none rounded-full" />

      <Navbar />

      <div className="flex relative z-10 pt-20">
        <Sidebar />
        
        <main className="flex-1 p-6 sm:p-10 space-y-12 max-w-5xl mx-auto">
          
          {/* Header Banner */}
          <div className="space-y-3 border-b border-slate-800/80 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-indigo-400 text-[10px] font-mono uppercase tracking-wider backdrop-blur-xl">
              <Sparkles className="w-3 h-3" /> API Protocol & Integration Guide
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Integration Documentation</h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Configure standard OpenAI-compatible SDKs or raw HTTP clients to route your application traffic through your high-performance AI Gateway server.
            </p>
          </div>

          {/* Environment Variables Card */}
          <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-7 rounded-3xl space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" /> Environment Variables Configuration (.env)
              </h3>
              <button
                onClick={() => handleCopyCode(`OPENAI_BASE_URL="http://localhost:8080/v1"\nOPENAI_API_KEY="sk-live-your-generated-gateway-key"`, 'env')}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer border border-slate-700/80"
              >
                {copiedSection === 'env' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSection === 'env' ? 'Copied' : 'Copy Env'}
              </button>
            </div>
            <pre className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-indigo-300 border border-slate-800/80 shadow-inner select-all">
              {`OPENAI_BASE_URL="http://localhost:8080/v1"
OPENAI_API_KEY="sk-live-your-generated-gateway-key"`}
            </pre>
          </div>

          {/* Interactive Code Snippets Hub */}
          <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Tabs Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/60 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">SDK Integration Snippets</span>
              </div>

              {/* Language Switchers */}
              <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                {[
                  { id: 'node', label: 'Node.js' },
                  { id: 'python', label: 'Python' },
                  { id: 'curl', label: 'cURL' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code View Area */}
            <div className="relative p-6">
              <button
                onClick={() => handleCopyCode(codeSnippets[activeTab], activeTab)}
                className="absolute right-9 top-9 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer border border-slate-700/80 z-10"
              >
                {copiedSection === activeTab ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSection === activeTab ? 'Copied Snippet' : 'Copy Code'}
              </button>

              <pre className="bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-300 border border-slate-800/80 overflow-x-auto shadow-inner leading-relaxed">
                {codeSnippets[activeTab]}
              </pre>
            </div>
          </div>

          {/* Quick Technical Specs Info Box */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl space-y-3 shadow-2xl">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-200">Standardized Endpoints</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All requests point directly to <code className="text-indigo-400 font-mono">/v1/chat/completions</code> or model-specific proxy endpoints with standard response formatting.
              </p>
            </div>

            <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl space-y-3 shadow-2xl">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-200">Rate Limiting & Tiers</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quota consumption is tracked per request token. Ensure your assigned tier (Free, Pro, Enterprise) matches your production load requirements.
              </p>
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* System Status Section (Linked cleanly via #status anchor) */}
          <div id="status" className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Activity className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Live Infrastructure</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-100">System Status & Uptime</h2>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> All Systems Normal
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl backdrop-blur-md space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-200">{srv.name}</span>
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {srv.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/60">
                    <span>Latency: <strong className="text-slate-200">{srv.latency}</strong></span>
                    <span>Uptime: <strong className="text-emerald-400">{srv.uptime}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}