import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-xl mx-auto px-6 py-16 space-y-8 w-full">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Get in Touch</h1>
          <p className="text-slate-400 text-sm">Have questions about custom integrations or enterprise tiers? Drop us a message.</p>
        </div>

        {submitted ? (
          <div className="border border-emerald-500/30 bg-emerald-500/10 rounded-2xl p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-semibold text-slate-100">Message Sent Successfully!</h3>
            <p className="text-xs text-slate-400">Thank you for reaching out. Our support team will get back to you shortly.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 bg-slate-800 hover:bg-slate-700 text-xs px-4 py-2 rounded-lg text-slate-300 transition"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-slate-800 bg-slate-900/40 p-8 rounded-2xl space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-brand-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-brand-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Message</label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={4}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-brand-500 transition resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-600/20 text-sm"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}