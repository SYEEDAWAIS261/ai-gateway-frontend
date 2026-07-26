import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Terminal, Copy } from 'lucide-react';

export default function Docs() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 space-y-6 max-w-4xl">
          <h1 className="text-2xl font-bold text-slate-100">Integration Documentation</h1>
          <p className="text-slate-400 text-sm">
            Configure standard OpenAI Python/Node.js SDKs to point to your AI Gateway server.
          </p>

          <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-xl space-y-3">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-500" /> Environment Variables (.env)
            </h3>
            <pre className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-brand-500 border border-slate-800">
              OPENAI_BASE_URL="http://localhost:8080/v1"{'\n'}
              OPENAI_API_KEY="sk-live-your-generated-gateway-key"
            </pre>
          </div>

          <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-xl space-y-3">
            <h3 className="font-semibold text-slate-200">Node.js / JavaScript Integration</h3>
            <pre className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto">
{`import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'http://localhost:8080/v1',
  apiKey: 'sk-live-your-generated-gateway-key'
});

const response = await openai.chat.completions.create({
  model: 'llama3-8b-8192',
  messages: [{ role: 'user', content: 'Hello AI Gateway!' }]
});

console.log(response.choices[0].message.content);`}
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
}