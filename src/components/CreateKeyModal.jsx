import { useState } from 'react';
import { X, Copy, Check, ShieldCheck } from 'lucide-react';

export default function CreateKeyModal({ isOpen, onClose, newKeyData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(newKeyData?.apiKey || newKeyData?.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-500" /> Save Your Secret API Key
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-400">
  Please copy your API key now. <span className="text-yellow-400 font-medium">For security reasons, the full secret key will not be shown again!</span>
</p>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between font-mono text-sm">
          <span className="text-brand-500 truncate mr-2">
            {newKeyData?.apiKey || newKeyData?.key || 'sk-live-xxxxxxxxxxxxxx'}
          </span>
          <button
            onClick={handleCopy}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-sans flex items-center gap-1 shrink-0 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-brand-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-2.5 rounded-xl transition mt-2"
        >
         Done, I've saved it
        </button>
      </div>
    </div>
  );
}