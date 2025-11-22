import React from 'react';
import { Trophy, Star, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Impact = () => {
  const { user } = useAuth();

  const timeline = [
    { date: 'Oct 2023', title: 'Joined Bridgepath', desc: 'Created profile and set initial goals.' },
    { date: 'Nov 2023', title: 'First Connection', desc: 'Collaborated with a researcher from MIT.' },
    { date: 'Jan 2024', title: 'Prototype V1', desc: 'Completed initial MVP for "EcoPlast".' },
    { date: 'Mar 2024', title: 'Scholarship Won', desc: 'Awarded the Future Innovators Grant ($5k).' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Badges Column */}
            <div className="lg:col-span-1">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-24">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Trophy className="text-yellow-500" /> Achievements
                    </h3>
                    <div className="space-y-4">
                        {user?.badges.map(badge => (
                            <div key={badge.id} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                <div className="text-2xl">{badge.icon}</div>
                                <div>
                                    <div className="font-bold text-white text-sm">{badge.name}</div>
                                    <div className="text-xs text-slate-400">{badge.description}</div>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center gap-4 p-3 border border-dashed border-slate-700 rounded-lg opacity-50">
                             <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500"><Star size={16} /></div>
                             <div>
                                <div className="font-bold text-slate-300 text-sm">Next: Fundraiser</div>
                                <div className="text-xs text-slate-500">Secure first angel check</div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Column */}
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-white mb-8">Impact Journey</h2>
                <div className="relative border-l-2 border-slate-800 ml-4 space-y-12">
                    {timeline.map((item, idx) => (
                        <div key={idx} className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-950"></div>
                            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/30 transition-colors">
                                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wide mb-1">
                                    <Calendar size={12} /> {item.date}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                    
                    <div className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700 border-4 border-slate-950"></div>
                        <button className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-500 hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center justify-center gap-2 font-medium">
                            <CheckCircle size={18} /> Add New Milestone
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};