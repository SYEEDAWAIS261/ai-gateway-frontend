import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ApiKeyTable from '../components/ApiKeyTable';
import CreateKeyModal from '../components/CreateKeyModal';
import UsageChart from '../components/UsageChart';
import { keysAPI, authAPI } from '../services/api';
import { Plus, Loader2, Sparkles, Key, ShieldCheck, Activity, Cpu } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [keyName, setKeyName] = useState('');
  const [newKeyData, setNewKeyData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // Helper response parser matching Axios response
  const extractKeys = (res) => {
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    if (Array.isArray(res?.data?.keys)) return res.data.keys;
    return [];
  };

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const userRes = await authAPI.getProfile();
        if (isMounted) setUser(userRes.data?.data || userRes.data);

        const keysRes = await keysAPI.getKeys();
        if (isMounted) {
          const keys = extractKeys(keysRes);
          setApiKeys(keys);
        }
      } catch (err) {
        console.error("Dashboard Init Error:", err);
        router.push('/login');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleCreateKey = async (e) => {
    e.preventDefault();
    if (!keyName.trim() || creating) return;

    setCreating(true);
    try {
      const res = await keysAPI.createKey(keyName.trim());
      const createdKey = res.data?.data || res.data?.key || res.data;

      setNewKeyData(createdKey);
      setIsModalOpen(true);
      setKeyName('');

      // Refresh keys list
      const updatedKeys = await keysAPI.getKeys();
      setApiKeys(extractKeys(updatedKeys));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to generate API Key');
    } finally {
      setCreating(false);
    }
  };

  // Delete key handler
  const handleDeleteKey = async (id) => {
    if (!id) return;
    if (!confirm('Are you sure you want to revoke and delete this secret key?')) return;
    try {
      await keysAPI.deleteKey(id);
      setApiKeys((prevKeys) =>
        prevKeys.filter((k) => (k._id || k.id) !== id)
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete key');
    }
  };

  // Edit key handler
  const handleEditKey = async (id, updatedData) => {
    try {
      const res = await keysAPI.updateKey(id, updatedData);
      const updatedKeyObj = res.data?.data || res.data?.keyDetails || res.data;

      setApiKeys((prevKeys) =>
        prevKeys.map((k) =>
          (k._id || k.id) === id ? { ...k, ...updatedKeyObj, ...updatedData } : k
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update key');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-3">
        <Loader2 className="w-6 h-6 text-brand-500 animate-spin" />
        Initializing Secure Gateway Session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden selection:bg-brand-500 selection:text-white pt-28">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-brand-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-emerald-500/5 blur-[140px] pointer-events-none rounded-full" />

      <Navbar user={user} />
      
      <div className="flex relative z-10">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-10 space-y-8 max-w-7xl mx-auto">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-brand-400 text-[10px] font-mono uppercase tracking-wider backdrop-blur-xl">
                <Sparkles className="w-3 h-3" /> Command Center & Credentials
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">API Gateway Keys</h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Provision, monitor, and regulate high-performance authorization tokens in real time.
              </p>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-0.5">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Active Keys</p>
                <p className="text-sm font-bold text-slate-100 font-mono">{apiKeys.filter(k => (k.status || 'active') === 'active').length}</p>
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl space-y-0.5">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Gateway Status</p>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <p className="text-xs font-bold text-emerald-400 font-mono">Operational</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Key Input Box */}
          <form
            onSubmit={handleCreateKey}
            className="flex flex-col sm:flex-row gap-3 bg-slate-900/40 border border-slate-800/80 p-5 rounded-3xl backdrop-blur-xl shadow-2xl"
          >
            <div className="relative flex-1">
              <Key className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Key Identifier (e.g. Production Mobile Node Worker)"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-200 outline-none focus:border-brand-500 transition shadow-inner"
              />
            </div>
            <button
              type="submit"
              disabled={!keyName.trim() || creating}
              className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-brand-600/25 shrink-0"
            >
              {creating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {creating ? 'Provisioning...' : 'Provision Secret Key'}
            </button>
          </form>

          {/* API Keys Table */}
          <ApiKeyTable
            keys={apiKeys}
            onDelete={handleDeleteKey}
            onEdit={handleEditKey}
          />

          {/* Usage & Telemetry Chart */}
          <div className="pt-4">
            <UsageChart />
          </div>

        </main>
      </div>

      <CreateKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newKeyData={newKeyData}
      />
    </div>
  );
}