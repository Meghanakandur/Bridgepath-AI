import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { StartupPlan } from '../types';
import { Loader2, Zap, CheckCircle } from 'lucide-react';

export const StartupConverter = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<StartupPlan | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const result = await GeminiService.convertResearchToStartup(input);
      setPlan(result);
    } catch (error) {
      alert('Failed to generate plan. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Zap className="text-yellow-400" fill="currentColor" />
          Research to Startup
        </h2>
        <p className="text-slate-400 mt-2">
          Paste your abstract, thesis summary, or rough idea below. Gemini AI will convert it into a structured business plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800">
            <textarea
              className="w-full h-64 p-4 bg-slate-950 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="e.g. We have developed a novel biodegradable plastic using algae..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !input}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> Analyzing...
              </>
            ) : (
              'Generate Blueprint'
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[400px]">
          {!plan ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <div className="w-16 h-16 border-2 border-dashed border-slate-700 rounded-full flex items-center justify-center">
                <Zap size={24} />
              </div>
              <p>Result will appear here</p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-700 pb-4">
                <h3 className="text-2xl font-bold text-white">{plan.startupName}</h3>
                <p className="text-indigo-400 text-sm font-medium mt-1 uppercase tracking-wide">{plan.tagline}</p>
              </div>

              <div>
                <h4 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Value Proposition</h4>
                <p className="text-slate-200 leading-relaxed bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  {plan.valueProposition}
                </p>
              </div>

              <div>
                <h4 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Target Audience</h4>
                <p className="text-slate-200">{plan.targetAudience}</p>
              </div>

              <div>
                <h4 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Execution Roadmap</h4>
                <div className="space-y-3">
                  {plan.roadmap.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px] text-indigo-500">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <span className="text-white font-medium block">{step.phase}</span>
                        <span className="text-slate-400 text-sm">{step.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};