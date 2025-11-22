import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Users, GraduationCap, LayoutDashboard, Trophy, LogOut, Activity, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AppRoutes } from '../types';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Converter', path: AppRoutes.STARTUP, icon: <Rocket size={18} /> },
    { name: 'Collaborate', path: AppRoutes.COLLAB, icon: <Users size={18} /> },
    { name: 'Challenges', path: AppRoutes.CHALLENGES, icon: <Target size={18} /> },
    { name: 'Scholarships', path: AppRoutes.SCHOLARSHIPS, icon: <GraduationCap size={18} /> },
    { name: 'Readiness', path: AppRoutes.READINESS, icon: <Activity size={18} /> },
    { name: 'Impact', path: AppRoutes.IMPACT, icon: <Trophy size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <LayoutDashboard size={24} className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Bridgepath<span className="text-indigo-400">AI</span></span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user && navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{user.role}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign In
                </Link>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user && navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            {!user && (
               <Link
               to="/login"
               onClick={() => setIsOpen(false)}
               className="block px-3 py-3 rounded-md text-base font-medium text-white bg-indigo-600"
             >
               Sign In
             </Link>
            )}
            {user && (
              <button
                onClick={() => { logout(); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-400 hover:bg-slate-800 hover:text-red-300"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};