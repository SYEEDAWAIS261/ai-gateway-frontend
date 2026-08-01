import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, TrendingUp, Calendar, Zap } from 'lucide-react';

const dummyDatasets = {
  '24h': [
    { time: '00:00', requests: 120 },
    { time: '04:00', requests: 45 },
    { time: '08:00', requests: 450 },
    { time: '12:00', requests: 920 },
    { time: '16:00', requests: 750 },
    { time: '20:00', requests: 340 },
  ],
  '7d': [
    { time: 'Mon', requests: 3400 },
    { time: 'Tue', requests: 4200 },
    { time: 'Wed', requests: 3800 },
    { time: 'Thu', requests: 5100 },
    { time: 'Fri', requests: 6400 },
    { time: 'Sat', requests: 2900 },
    { time: 'Sun', requests: 3100 },
  ],
  '30d': [
    { time: 'Week 1', requests: 24000 },
    { time: 'Week 2', requests: 28500 },
    { time: 'Week 3', requests: 32000 },
    { time: 'Week 4', requests: 39400 },
  ]
};

// Custom Tooltip Component for advanced look
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 backdrop-blur-xl border border-slate-800 p-3.5 rounded-2xl shadow-2xl text-xs space-y-1">
        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">{label}</p>
        <p className="text-brand-400 font-bold text-sm flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          {payload[0].value.toLocaleString()} <span className="text-[11px] font-normal text-slate-400">API Requests</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function UsageChart({ datasets = dummyDatasets }) {
  const [timeRange, setTimeRange] = useState('24h');
  const currentData = datasets[timeRange] || dummyDatasets['24h'];

  // Calculate dynamic total requests for the active period
  const totalRequests = currentData.reduce((acc, curr) => acc + curr.requests, 0);

  return (
    <div className="relative border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 space-y-6 overflow-hidden shadow-2xl">
      {/* Ambient Glow background effect */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section with Time Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold mb-1">
            <Activity className="w-4 h-4" />
            <span>Real-time Proxy Traffic</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 tracking-tight">API Request Analytics</h3>
          <p className="text-xs text-slate-400 mt-0.5">Total: <strong className="text-slate-200">{totalRequests.toLocaleString()} requests</strong> recorded in this window.</p>
        </div>

        {/* Dynamic Range Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800/80 p-1 rounded-2xl backdrop-blur-md self-start sm:self-auto">
          {['24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition duration-200 cursor-pointer ${
                timeRange === range
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-72 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReqDynamic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="requests" 
              stroke="#22c55e" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorReqDynamic)" 
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Summary Pill Bar */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Gateway routing latency avg: <strong className="text-slate-200 font-mono">42ms</strong></span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14.2% activity compared to previous cycle</span>
        </div>
      </div>
    </div>
  );
}