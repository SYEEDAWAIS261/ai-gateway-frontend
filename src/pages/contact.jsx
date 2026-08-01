import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, MessageSquare, Send, CheckCircle2, User, Sparkles, Headphones, ShieldAlert, Globe, Clock, Zap } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Integration Support');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-brand-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-20 space-y-16 w-full relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-brand-400 text-xs font-mono tracking-wider uppercase backdrop-blur-xl shadow-xl">
            <Sparkles className="w-3.5 h-3.5" /> Enterprise & Developer Support Hub
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-slate-100">
            Let's Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-emerald-400">AI Infrastructure</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have questions about custom model routing, rate limits, or enterprise SLAs? Connect directly with our core engineering support team.
          </p>
        </div>

        {/* Grid Layout: Contact Info Cards + Contact Form */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Support Channels & Quick Info */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Direct Channel 1 */}
            <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl space-y-3 shadow-2xl hover:border-brand-500/40 transition duration-300">
              <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-200">Dedicated Engineering Desk</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct assistance for custom enterprise proxy integrations and high-throughput workloads.
              </p>
              <p className="text-xs font-mono text-brand-400 pt-1 font-semibold">support@gateway.ai</p>
            </div>

            {/* Direct Channel 2 */}
            <div className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl space-y-3 shadow-2xl hover:border-brand-500/40 transition duration-300">
              <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center border border-brand-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-200">Response SLA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We maintain active telemetry monitoring with standard replies under 2 hours for Pro and Enterprise tiers.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-mono text-emerald-400">All Systems Operational</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl rounded-3xl p-12 text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">Transmission Successful!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out. Our engineering support desk has logged your ticket and will respond via email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-5 py-2.5 rounded-2xl text-slate-200 transition border border-slate-700 cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl space-y-6 shadow-2xl relative">
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Your Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-brand-500 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Corporate Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@company.com"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-brand-500 transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Inquiry Subject Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Integration Support', 'Billing & Quotas', 'Enterprise SLA'].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setSubject(item)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                          subject === item
                            ? 'bg-brand-600/10 border-brand-500 text-brand-400 shadow-lg shadow-brand-500/10'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Detailed Message</label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your infrastructure setup or query..."
                      rows={5}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-brand-500 transition resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-brand-600/25 text-xs uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Transmitting Ticket...' : 'Dispatch Support Ticket'}
                </button>
              </form>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}