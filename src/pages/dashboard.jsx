import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ApiKeyTable from '../components/ApiKeyTable';
import CreateKeyModal from '../components/CreateKeyModal';
import UsageChart from '../components/UsageChart';
import { keysAPI, authAPI } from '../services/api';
import { Plus, Loader2 } from 'lucide-react';

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
    if (!confirm('Are you sure you want to delete this secret key?')) return;
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-medium">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 space-y-8 max-w-6xl">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">API Gateway Keys</h1>
            <p className="text-sm text-slate-400">
              Create & manage active authorization credentials
            </p>
          </div>

          <form
            onSubmit={handleCreateKey}
            className="flex gap-3 bg-slate-900/40 p-4 border border-slate-800 rounded-xl"
          >
            <input
              type="text"
              placeholder="Key Name (e.g. Production Mobile App)"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 text-sm text-slate-200 outline-none focus:border-brand-500 transition"
            />
            <button
              type="submit"
              disabled={!keyName.trim() || creating}
              className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              {creating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Create Secret Key
            </button>
          </form>

          {/* Corrected keys prop binding */}
          <ApiKeyTable
            keys={apiKeys}
            onDelete={handleDeleteKey}
            onEdit={handleEditKey}
          />

          <UsageChart />
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