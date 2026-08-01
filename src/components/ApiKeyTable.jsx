import { useState } from 'react';
import { Key, Trash2, Calendar, Edit3, X, Check, Copy, ShieldAlert, Sparkles, Layers, Lock } from 'lucide-react';

export default function ApiKeyTable({ keys, onDelete, onEdit }) {
  // Modal States
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTier, setEditTier] = useState('free');
  const [loading, setLoading] = useState(false);

  // Copy Action States
  const [copiedId, setCopiedId] = useState(null);
  const [revealKeyModal, setRevealKeyModal] = useState(null); // Exact key view modal for security confirmation

  // Open Edit Modal
  const handleStartEdit = (key) => {
    setEditingKey(key);
    setEditName(key.name || key.keyName || '');
    setEditTier(key.tier || 'free');
  };

  // Close Edit Modal
  const handleCloseEdit = () => {
    setEditingKey(null);
    setEditName('');
    setEditTier('free');
  };

  // Submit Edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;

    setLoading(true);
    const keyId = editingKey._id || editingKey.id;

    if (onEdit) {
      await onEdit(keyId, { name: editName, tier: editTier });
    }

    setLoading(false);
    handleCloseEdit();
  };

  // Quick Copy Handler (For truncated/prefix keys)
  const handleQuickCopy = (keyObj, id) => {
    const textToCopy = keyObj.truncatedKey || keyObj.prefix || keyObj.apiKey || keyObj.key || '';
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Exact Key Copy Handler
  const handleCopyExactKey = (keyObj) => {
    const exactKey = keyObj.apiKey || keyObj.secretKey || keyObj.key || 'sk-live-9f83a7c6e2b1409f83a7c6e2b1';
    navigator.clipboard.writeText(exactKey);
    setRevealKeyModal(null);
    setCopiedId(keyObj._id || keyObj.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!keys || keys.length === 0) {
    return (
      <div className="border border-slate-800/80 rounded-3xl p-12 text-center bg-slate-950/40 backdrop-blur-xl space-y-3 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mx-auto shadow-inner">
          <Key className="w-6 h-6" />
        </div>
        <h4 className="text-slate-200 font-bold text-base">No API Keys Provisioned</h4>
        <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
          Create your first secret proxy key above to begin routing secure LLM and backend requests.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border border-slate-800/80 rounded-3xl overflow-hidden bg-slate-900/40 backdrop-blur-xl shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800/80">
              <tr>
                <th className="px-6 py-4">Key Identifier</th>
                <th className="px-6 py-4">Token Preview</th>
                <th className="px-6 py-4">Assigned Tier</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {keys.map((key, index) => {
                const keyId = key._id || key.id || index;
                const name = key.name || key.keyName || 'Production Secret Key';
                const displayKey = key.truncatedKey || key.prefix || 'sk-live-••••••••••••';
                const status = key.status || 'active';
                const tier = key.tier || 'free';
                const isCopied = copiedId === keyId;

                return (
                  <tr key={keyId} className="hover:bg-slate-800/20 transition-all duration-200 group">
                    {/* Name */}
                    <td className="px-6 py-4 font-semibold text-slate-200 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                        <Key className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate max-w-[180px]">{name}</span>
                    </td>

                    {/* Token Preview */}
                    <td className="px-6 py-4 font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300">{displayKey}</span>
                        <button
                          onClick={() => handleQuickCopy(key, keyId)}
                          className="p-1.5 bg-slate-800/60 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition cursor-pointer"
                          title="Quick Copy Token"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-brand-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </td>

                    {/* Tier Badge */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] rounded-xl font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                        tier === 'enterprise' 
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : tier === 'pro'
                          ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                          : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                      }`}>
                        <Layers className="w-3 h-3" />
                        {tier}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-[10px] rounded-xl font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${
                        status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
                        {status}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                        {key.createdAt ? new Date(key.createdAt).toLocaleDateString() : 'Just now'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Copy Exact Secret Key Feature Button */}
                        <button
                          onClick={() => setRevealKeyModal(key)}
                          className="bg-brand-600/10 hover:bg-brand-600/20 text-brand-400 border border-brand-500/20 px-2.5 py-1.5 rounded-xl transition font-semibold inline-flex items-center gap-1 cursor-pointer"
                          title="Copy Full Exact Key"
                        >
                          <Lock className="w-3 h-3" /> Copy Full Key
                        </button>

                        {/* Edit Button */}
                        {status === 'active' && (
                          <button
                            onClick={() => handleStartEdit(key)}
                            className="bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-2.5 py-1.5 rounded-xl transition inline-flex items-center gap-1 cursor-pointer"
                            title="Edit Key Name/Tier"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => onDelete && onDelete(keyId)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-xl transition inline-flex items-center gap-1 cursor-pointer"
                          title="Revoke Key Permanently"
                        >
                          <Trash2 className="w-3 h-3" /> Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exact Key Security Copy Modal */}
      {revealKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> Copy Full Secret Key
              </h3>
              <button
                onClick={() => setRevealKeyModal(null)}
                className="p-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              You are about to copy the full live token for <strong className="text-amber-300">{revealKeyModal.name || 'Secret Key'}</strong> to your clipboard. Ensure your environment remains secure.
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 font-mono text-xs text-brand-400 truncate shadow-inner select-all">
              {revealKeyModal.apiKey || revealKeyModal.secretKey || revealKeyModal.key || 'sk-live-9f83a7c6e2b1409f83a7c6e2b1'}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRevealKeyModal(null)}
                className="w-1/2 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleCopyExactKey(revealKeyModal)}
                className="w-1/2 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/25 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Confirm & Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-brand-400" />
                Configure API Key Parameters
              </h3>
              <button
                onClick={handleCloseEdit}
                className="p-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Key Display Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Production Microservice Worker"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-brand-500 transition"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Assigned Quota Tier
                </label>
                <select
                  value={editTier}
                  onChange={(e) => setEditTier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-brand-500 transition cursor-pointer"
                >
                  <option value="free">Free Tier (10k requests)</option>
                  <option value="pro">Pro Tier (250k requests)</option>
                  <option value="enterprise">Enterprise Tier (Unlimited)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-800 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-lg shadow-brand-600/25 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  {loading ? 'Saving...' : 'Save Configuration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}