import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Globe, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AppRoutes } from '../types';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">From Research to</span>
              <span className="block text-indigo-500">Real-World Impact</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Bridgepath AI connects academic brilliance with entrepreneurial execution. Validate your ideas, find global collaborators, and track your readiness for investment.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              {user ? (
                <Link
                  to={AppRoutes.STARTUP}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-indigo-900/50 transition-all"
                >
                  Go to Dashboard <ArrowRight className="ml-2" />
                </Link>
              ) : (
                <Link
                  to={AppRoutes.LOGIN}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-indigo-900/50 transition-all"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-colors">
              <div className="w-12 h-12 bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4 text-indigo-400">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Startup Converter</h3>
              <p className="text-slate-400">Instantly turn your thesis or project abstract into a structured business roadmap using Gemini 2.0.</p>
            </div>
            
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-colors">
              <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-400">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Collab Hub</h3>
              <p className="text-slate-400">Match with co-founders and mentors worldwide based on your skills and project needs.</p>
            </div>

            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500/50 transition-colors">
              <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 text-emerald-400">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Readiness Score</h3>
              <p className="text-slate-400">Track your GPA, milestones, and pitch quality to see when you're ready for funding.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};