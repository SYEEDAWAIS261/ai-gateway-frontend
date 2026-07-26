import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const dummyData = [
  { time: '00:00', requests: 12 },
  { time: '04:00', requests: 4 },
  { time: '08:00', requests: 45 },
  { time: '12:00', requests: 90 },
  { time: '16:00', requests: 75 },
  { time: '20:00', requests: 30 },
];

export default function UsageChart({ data = dummyData }) {
  return (
    <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
      <h3 className="text-md font-semibold text-slate-200">24-Hour API Request Activity</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
            />
            <Area type="monotone" dataKey="requests" stroke="#22c55e" fillOpacity={1} fill="url(#colorReq)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}