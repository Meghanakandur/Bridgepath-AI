import React, { useState } from 'react';
import { Trophy, Flame, Target, Users, X, CheckCircle, Calendar, Award, ChevronRight, AlertCircle } from 'lucide-react';
import { Challenge } from '../types';

const MOCK_CHALLENGES: Challenge[] = [
  { id: '1', title: 'Sustainable Packaging Sprint', description: 'Design a biodegradable packaging solution using organic waste materials.', difficulty: 'Hard', points: 500, participants: 124, status: 'active' },
  { id: '2', title: 'AI for Accessibility', description: 'Build a tool that helps visually impaired students navigate campus.', difficulty: 'Medium', points: 300, participants: 85, status: 'active' },
  { id: '3', title: 'Clean Energy Pitch', description: 'Create a 3-minute video pitch for a renewable energy concept.', difficulty: 'Easy', points: 150, participants: 210, status: 'upcoming' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Sarah Chen', points: 2450, avatar: 'S' },
  { rank: 2, name: 'David Okafor', points: 2100, avatar: 'D' },
  { rank: 3, name: 'Wei Zhang', points: 1850, avatar: 'W' },
  { rank: 4, name: 'Alex Researcher', points: 1600, avatar: 'A' }, // Current User
  { rank: 5, name: 'Elena R.', points: 1200, avatar: 'E' },
];

export const Challenges = () => {
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const handleJoin = (id: string) => {
    setJoinedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
          <Trophy className="text-yellow-400" size={32} /> Global Innovation Challenges
        </h2>
        <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
          Compete in weekly problem-solving sprints, earn badges, and get noticed by top VC firms and research grants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Challenges List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Flame className="text-orange-500" size={20} /> Active Sprints
            </h3>
            <span className="text-sm text-indigo-400 font-medium cursor-pointer hover:text-indigo-300">View All</span>
          </div>

          {MOCK_CHALLENGES.map((challenge) => {
            const isJoined = joinedIds.has(challenge.id);
            return (
              <div key={challenge.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${
                        challenge.difficulty === 'Hard' ? 'bg-red-900/30 text-red-400 border-red-900' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-900' :
                        'bg-green-900/30 text-green-400 border-green-900'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Users size={12} /> {challenge.participants + (isJoined ? 1 : 0)} joined
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{challenge.title}</h4>
                  </div>
                  <div className="text-center bg-slate-800 p-2 rounded-lg min-w-[60px]">
                    <span className="block text-lg font-bold text-yellow-400">{challenge.points}</span>
                    <span className="text-[10px] text-slate-400 uppercase">PTS</span>
                  </div>
                </div>
                
                <p className="text-slate-400 mb-6 line-clamp-2">{challenge.description}</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleJoin(challenge.id)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2 ${
                      isJoined 
                      ? 'bg-green-900/30 text-green-400 border border-green-900' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isJoined ? <><CheckCircle size={16} /> Joined</> : 'Accept Challenge'}
                  </button>
                  <button 
                    onClick={() => setSelectedChallenge(challenge)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors text-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="text-emerald-400" size={20} /> Leaderboard
            </h3>
            
            <div className="space-y-4">
              {LEADERBOARD.map((user, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${user.rank === 4 ? 'bg-indigo-900/20 border border-indigo-500/30' : 'bg-slate-800/30'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
                      user.rank === 1 ? 'bg-yellow-500 text-slate-900' :
                      user.rank === 2 ? 'bg-slate-400 text-slate-900' :
                      user.rank === 3 ? 'bg-orange-700 text-white' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {user.rank}
                    </div>
                    <span className={`font-medium ${user.rank === 4 ? 'text-indigo-400' : 'text-white'}`}>
                      {user.name}
                      {user.rank === 4 && <span className="ml-2 text-[10px] uppercase bg-indigo-600 text-white px-1 rounded">You</span>}
                    </span>
                  </div>
                  <span className="font-mono text-slate-400">{user.points}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <p className="text-sm text-slate-500 mb-3">Next reward at 2000 pts</p>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Details Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200 scrollbar-thin scrollbar-thumb-slate-700">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-start z-10">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full border ${
                        selectedChallenge.difficulty === 'Hard' ? 'bg-red-900/30 text-red-400 border-red-900' :
                        selectedChallenge.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-900' :
                        'bg-green-900/30 text-green-400 border-green-900'
                      }`}>
                        {selectedChallenge.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: #{selectedChallenge.id}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedChallenge.title}</h2>
               </div>
               <button 
                 onClick={() => setSelectedChallenge(null)}
                 className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {/* Status Banner */}
              <div className="flex gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <div className="flex-1 text-center border-r border-slate-700">
                   <div className="text-sm text-slate-400 mb-1">Prize Pool</div>
                   <div className="text-xl font-bold text-yellow-400">{selectedChallenge.points * 5} XP</div>
                </div>
                <div className="flex-1 text-center border-r border-slate-700">
                   <div className="text-sm text-slate-400 mb-1">Deadline</div>
                   <div className="text-xl font-bold text-white">7 Days</div>
                </div>
                <div className="flex-1 text-center">
                   <div className="text-sm text-slate-400 mb-1">Participants</div>
                   <div className="text-xl font-bold text-white">{selectedChallenge.participants}</div>
                </div>
              </div>

              <div>
                 <h3 className="text-lg font-semibold text-white mb-2">Challenge Brief</h3>
                 <p className="text-slate-300 leading-relaxed">
                   {selectedChallenge.description} This challenge requires you to identify a key problem area, propose a scalable solution, and validate it with initial data or a prototype.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <h3 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                       <CheckCircle size={16} className="text-indigo-400" /> Evaluation Criteria
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                       <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1.5"></span> Innovation & Originality (30%)</li>
                       <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1.5"></span> Technical Feasibility (30%)</li>
                       <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1.5"></span> Impact Potential (20%)</li>
                       <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1.5"></span> Presentation Quality (20%)</li>
                    </ul>
                 </div>
                 <div>
                    <h3 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                       <Award size={16} className="text-yellow-400" /> Rewards
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                       <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1.5"></span> <strong>{selectedChallenge.points}</strong> Bridgepath Points</li>
                       <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1.5"></span> Exclusive "Innovator" Badge</li>
                       <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-1.5"></span> Chance to pitch to partnered VCs</li>
                    </ul>
                 </div>
              </div>

              <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg flex gap-3 items-start">
                 <AlertCircle className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                 <div>
                    <h4 className="text-indigo-300 font-bold text-sm mb-1">Submission Requirement</h4>
                    <p className="text-indigo-200/70 text-xs">
                       All submissions must be linked to a GitHub repository and include a 3-minute demo video. 
                       Teams must have at least 2 members.
                    </p>
                 </div>
              </div>

            </div>
            
            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-6 z-10">
               <button 
                 onClick={() => {
                    handleJoin(selectedChallenge.id);
                    setSelectedChallenge(null);
                 }}
                 className={`w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                    joinedIds.has(selectedChallenge.id)
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-900/20'
                 }`}
               >
                 {joinedIds.has(selectedChallenge.id) ? 'Challenge Accepted (View Dashboard)' : 'Accept Challenge Now'}
               </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};