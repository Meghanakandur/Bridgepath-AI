import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Target } from 'lucide-react';

const DATA = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 58 },
  { month: 'Apr', score: 65 },
  { month: 'May', score: 70 },
  { month: 'Jun', score: 82 },
];

export const Readiness = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Venture Readiness Score</h2>
        <p className="text-slate-400">AI-calculated metric combining your GPA, prototype milestones, and pitch quality.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-900/30 rounded-lg text-emerald-400"><TrendingUp size={20} /></div>
                <span className="text-slate-400 font-medium">Current Score</span>
            </div>
            <div className="text-4xl font-bold text-white">82<span className="text-lg text-slate-500 font-normal">/100</span></div>
            <p className="text-emerald-400 text-sm mt-2">+12% from last month</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400"><Award size={20} /></div>
                <span className="text-slate-400 font-medium">Academic Standing</span>
            </div>
            <div className="text-4xl font-bold text-white">3.8<span className="text-lg text-slate-500 font-normal"> GPA</span></div>
            <p className="text-slate-500 text-sm mt-2">Top 10% of class</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-900/30 rounded-lg text-purple-400"><Target size={20} /></div>
                <span className="text-slate-400 font-medium">Milestones</span>
            </div>
            <div className="text-4xl font-bold text-white">5<span className="text-lg text-slate-500 font-normal">/8</span></div>
            <p className="text-slate-500 text-sm mt-2">Next: Validate Prototype</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-96">
        <h3 className="text-xl font-bold text-white mb-6">Growth Trajectory</h3>
        <ResponsiveContainer width="100%" height="80%">
            <LineChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: '#f8fafc' }}
                />
                <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};