
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { StartupConverter } from './pages/StartupConverter';
import { CollabHub } from './pages/CollabHub';
import { Scholarships } from './pages/Scholarships';
import { Readiness } from './pages/Readiness';
import { Challenges } from './pages/Challenges';
import { Impact } from './pages/Impact';
import { Login } from './pages/Auth';
import { HackathonChatbot } from './components/HackathonChatbot';
import { AppRoutes } from './types';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to={AppRoutes.LOGIN} />;
};

const AppContent = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 relative">
      <Navbar />
      <Routes>
        <Route path={AppRoutes.HOME} element={<Home />} />
        <Route path={AppRoutes.LOGIN} element={<Login />} />
        
        <Route path={AppRoutes.STARTUP} element={
          <ProtectedRoute><StartupConverter /></ProtectedRoute>
        } />
        <Route path={AppRoutes.COLLAB} element={
          <ProtectedRoute><CollabHub /></ProtectedRoute>
        } />
        <Route path={AppRoutes.CHALLENGES} element={
          <ProtectedRoute><Challenges /></ProtectedRoute>
        } />
        <Route path={AppRoutes.SCHOLARSHIPS} element={
          <ProtectedRoute><Scholarships /></ProtectedRoute>
        } />
        <Route path={AppRoutes.READINESS} element={
          <ProtectedRoute><Readiness /></ProtectedRoute>
        } />
        <Route path={AppRoutes.IMPACT} element={
          <ProtectedRoute><Impact /></ProtectedRoute>
        } />
      </Routes>
      
      {/* Chatbot is available only when logged in */}
      {user && <HackathonChatbot />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
