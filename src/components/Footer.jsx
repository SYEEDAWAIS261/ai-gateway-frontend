import Link from 'next/link';
import { Cpu, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/40 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-500">
            <Cpu className="w-5 h-5" />
            <span>AI Gateway</span>
          </Link>
          <p className="text-xs text-slate-400">
            High-performance, OpenAI-compatible proxy gateway for routing and managing open-source LLM traffic securely.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-300 tracking-wider mb-3">Product</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/dashboard" className="hover:text-slate-200 transition">Dashboard</Link></li>
            <li><Link href="/docs" className="hover:text-slate-200 transition">Documentation</Link></li>
            <li><Link href="/docs" className="hover:text-slate-200 transition">API Reference</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-300 tracking-wider mb-3">Company</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><Link href="/about" className="hover:text-slate-200 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-slate-200 transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase text-slate-300 tracking-wider mb-3">Connect</h4>
          <div className="flex items-center gap-3 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition p-1.5 bg-slate-800/60 rounded-lg">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition p-1.5 bg-slate-800/60 rounded-lg">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition p-1.5 bg-slate-800/60 rounded-lg">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} AI Gateway. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link href="/docs" className="hover:text-slate-400 transition">Privacy Policy</Link>
          <Link href="/docs" className="hover:text-slate-400 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}