import { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Key, Eye, EyeOff, Zap, Layers } from 'lucide-react';

export default function CreateKeyModal({ isOpen, onClose, newKeyData }) {
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [selectedTier, setSelectedTier] = useState('pro');

  if (!isOpen) return null;

  const rawKey = newKeyData?.apiKey || newKeyData?.key || 'sk-live-9f83a7c6e2b1409f83a7c6e2b1';

  const handleCopy = () => {
    navigator.clipboard.writeText(rawKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to mask the key for enhanced privacy toggle
  const maskedKey = showKey ? rawKey : `${rawKey.substring(0, 10)}••••••••••••••••••••••••`;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Subtle background ambient light */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">API Key Generated</h3>
              <p className="text-xs text-slate-400">Configure your gateway proxy limits</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Warning Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 relative z-10">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/90 leading-relaxed">
            Please copy your secret key now. For security reasons, <strong className="text-amber-300 font-semibold">it will never be displayed again</strong> in your dashboard.
          </p>
        </div>

        {/* Tier Selector Section */}
        <div className="space-y-2.5 relative z-10">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-brand-400" /> Assign Key Tier & Rate Limit
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'free', name: 'Free Tier', limit: '10k Req/mo' },
              { id: 'pro', name: 'Pro Tier', limit: '250k Req/mo' },
              { id: 'enterprise', name: 'Enterprise', limit: 'Unlimited' },
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  selectedTier === tier.id
                    ? 'bg-brand-600/10 border-brand-500 text-slate-100 shadow-lg shadow-brand-500/10'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <p className="text-xs font-bold text-slate-200">{tier.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{tier.limit}</p>
              </button>
            ))}
          </div>
        </div>

        {/* API Key Box with Masking & Copy Actions */}
        <div className="space-y-2 relative z-10">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Secret Token String</label>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center justify-between font-mono text-xs shadow-inner">
            <span className="text-brand-400 truncate mr-2 select-all tracking-tight">
              {maskedKey}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setShowKey(!showKey)}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition cursor-pointer"
                title={showKey ? "Hide key" : "Reveal key"}
              >
                {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleCopy}
                className="bg-brand-600 hover:bg-brand-500 text-white px-3.5 py-2 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition shadow-md shadow-brand-600/20 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Key'}
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3 rounded-2xl transition duration-200 border border-slate-700 shadow-xl cursor-pointer relative z-10 text-xs uppercase tracking-wider"
        >
          Done, I have safely stored it
        </button>
      </div>
    </div>
  );
}