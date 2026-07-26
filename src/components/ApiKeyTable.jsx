import { useState } from 'react';
import { Key, Trash2, Calendar, Edit3, X, Check, Copy } from 'lucide-react';

export default function ApiKeyTable({ keys, onDelete, onEdit }) {
  // Modal State for Editing
  const [editingKey, setEditingKey] = useState(null);
  const [editName, setEditName] = useState('');
  const [editTier, setEditTier] = useState('free');
  const [loading, setLoading] = useState(false);

  // Copy State (Key ID save karne ke liye jisey copy kiya gaya)
  const [copiedId, setCopiedId] = useState(null);

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

  // Copy Key Handler
  const handleCopy = (keyObj, id) => {
    const textToCopy =
      keyObj.apiKey || keyObj.key || keyObj.truncatedKey || keyObj.prefix || '';

    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (!keys || keys.length === 0) {
    return (
      <div className="border border-slate-800 rounded-xl p-8 text-center bg-slate-900/40">
        <Key className="w-10 h-10 text-slate-600 mx-auto mb-3" />
        <p className="text-slate-400 font-medium">No API keys generated yet.</p>
        <p className="text-slate-600 text-sm mt-1">
          Create your first secret key above to start making AI requests.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Key Name</th>
                <th className="px-6 py-3.5">Secret Key / Prefix</th>
                <th className="px-6 py-3.5">Tier</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Created Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {keys.map((key, index) => {
                const keyId = key._id || key.id || index;
                const name = key.name || key.keyName || 'Secret Key';
                const displayKey =
                  key.truncatedKey || key.prefix || key.apiKey || key.key || 'sk-live-••••••••';
                const status = key.status || 'active';
                const tier = key.tier || 'free';
                const isCopied = copiedId === keyId;

                return (
                  <tr key={keyId} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 font-medium text-slate-100 flex items-center gap-2">
                      <Key className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{name}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <span>{displayKey}</span>
                        <button
                          onClick={() => handleCopy(key, keyId)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300 transition cursor-pointer"
                          title="Copy Key"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-xs rounded font-medium bg-slate-800 text-slate-300 border border-slate-700/50 uppercase">
                        {tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {key.createdAt ? new Date(key.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Copy Action Button */}
                        <button
                          onClick={() => handleCopy(key, keyId)}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg transition inline-flex items-center gap-1 cursor-pointer"
                          title="Copy Key"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy
                            </>
                          )}
                        </button>

                        {/* Edit Button */}
                        {status === 'active' && (
                          <button
                            onClick={() => handleStartEdit(key)}
                            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg transition inline-flex items-center gap-1 cursor-pointer"
                            title="Edit Key Name/Tier"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => onDelete && onDelete(keyId)}
                          className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1 cursor-pointer"
                          title="Delete Key Permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
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

      {/* Edit Modal */}
      {editingKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-xl text-slate-100">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-500" />
                Edit API Key
              </h3>
              <button
                onClick={handleCloseEdit}
                className="text-slate-400 hover:text-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Key Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. My App Secret Key"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Tier
                </label>
                <select
                  value={editTier}
                  onChange={(e) => setEditTier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-xs font-medium bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg transition flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}