import React, { useState } from 'react';
import { Scholarship } from '../types';
import { GeminiService } from '../services/geminiService';
import { PenTool, Download, Loader2 } from 'lucide-react';

const MOCK_SCHOLARSHIPS: Scholarship[] = [
  { id: '1', title: 'Global Tech Innovator Grant', amount: '$10,000', deadline: '2024-05-15', description: 'For students building AI/ML solutions.', matchScore: 95 },
  { id: '2', title: 'Future Founders Fellowship', amount: '$5,000', deadline: '2024-06-01', description: 'Supporting early-stage student entrepreneurs.', matchScore: 88 },
  { id: '3', title: 'STEM Excellence Award', amount: '$2,500', deadline: '2024-04-30', description: 'Academic excellence in science and tech.', matchScore: 82 },
];

export const Scholarships = () => {
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [essay, setEssay] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateEssay = async (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setIsGenerating(true);
    setEssay('');
    
    // Mock User Details (Normally from AuthContext)
    const userProfile = "I am a Computer Science student with a 3.8 GPA. I built a startup called 'AgriTech' that uses drones to monitor crop health. I am passionate about solving world hunger through technology.";

    try {
      const result = await GeminiService.generateScholarshipEssay(scholarship.title, userProfile);
      setEssay(result);
    } catch (e) {
      setEssay("Error generating essay.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">Scholarship Matcher</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List */}
        <div className="lg:col-span-1 space-y-4">
          {MOCK_SCHOLARSHIPS.map(s => (
            <div 
              key={s.id} 
              onClick={() => setSelectedScholarship(s)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedScholarship?.id === s.id 
                  ? 'bg-indigo-900/20 border-indigo-500' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{s.title}</h3>
                <span className="text-green-400 text-sm font-bold">{s.matchScore}% Match</span>
              </div>
              <p className="text-slate-400 text-sm mb-3">{s.description}</p>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>{s.amount}</span>
                <span>Due: {s.deadline}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleGenerateEssay(s); }}
                className="mt-3 w-full py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 text-xs font-medium rounded-lg flex items-center justify-center gap-2"
              >
                <PenTool size={12} /> Auto-Write Essay
              </button>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col">
          {selectedScholarship ? (
            <>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white">Draft: {selectedScholarship.title}</h3>
                  <p className="text-slate-400 text-sm">AI-assisted draft based on your profile.</p>
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                  <Download size={20} />
                </button>
              </div>
              
              {isGenerating ? (
                 <div className="flex-grow flex flex-col items-center justify-center text-indigo-400">
                   <Loader2 size={40} className="animate-spin mb-4" />
                   <p>Crafting a persuasive essay...</p>
                 </div>
              ) : essay ? (
                <textarea 
                  className="flex-grow w-full bg-slate-950 text-slate-200 p-4 rounded-lg border border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none leading-relaxed resize-none"
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                />
              ) : (
                <div className="flex-grow flex items-center justify-center text-slate-500">
                  <p>Select "Auto-Write Essay" to start.</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-slate-500">
              <p>Select a scholarship to view details or generate an essay.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};