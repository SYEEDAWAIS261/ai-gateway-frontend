import { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Key, Plus, Copy, Trash2, CheckCircle2, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { authAPI } from '../services/api';

export default function ApiKeysPage() {
  const [user, setUser] = useState(null);
  const [keys, setKeys] = useState([
    { id: 1, name: 'Production Gateway Key', key: 'gw_live_9x8f7d6c5b4a3z2y1', created: '2026-05-12', requests: '14,250' },
    { id: 2, name: 'Staging / Testing Proxy', key: 'gw_test_3a2b1c4d5e6f7g8h9', created: '2026-06-01', requests: '840' },
  ]);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  
  useEffect(() => {
    authAPI?.getProfile?.().then(res => setUser(res.data?.data || res.data)).catch(() => {});
  }, []);

  const handleCopy = (keyString, id) => {
    navigator.clipboard.writeText(keyString);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const generated = `gw_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setKeys([...keys, { id: Date.now(), name: newKeyName, key: generated, created: new Date().toISOString().split('T')[0], requests: '0' }]);
    setNewKeyName('');
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Head><title>API Management - AI Gateway Pro</title></Head>
      <Navbar user={user} />
      
      <div className="flex flex-1 pt-20">
        <Sidebar />
        <main className="flex-1 p-8 max-w-6xl mx-auto space-y-8">
          <Navbar user={user} />
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <Key className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Security & Authentication</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-100">API Gateway Keys</h1>
              <p className="text-sm text-slate-400 mt-1">Manage secret keys used to authenticate your application requests to the AI proxy cluster.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-lg shadow-indigo-600/25 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create New Key
            </button>
          </div>

          {/* Keys Table List */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-md">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-200">Active Access Tokens ({keys.length})</h2>
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Proxy Secure</span>
            </div>
            <div className="divide-y divide-slate-800/80">
              {keys.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-900/60 transition">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-200">{item.name}</p>
                    <div className="flex items-center gap-3">
                      <code className="bg-slate-950 px-3 py-1 rounded-lg text-xs font-mono text-indigo-300 border border-slate-800">
                        {item.key.substring(0, 10)}••••••••••••
                      </code>
                      <span className="text-xs text-slate-500">Created: {item.created}</span>
                      <span className="text-xs text-slate-400 font-mono">({item.requests} reqs)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.key, item.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedId === item.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === item.id ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition cursor-pointer border border-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal for Creating Key */}
          {showModal && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <h3 className="text-lg font-bold text-slate-100">Create New API Key</h3>
                <form onSubmit={handleCreateKey} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Key Identifier / Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Mobile App Backend"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-lg shadow-indigo-600/20"
                    >
                      Generate Key
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}