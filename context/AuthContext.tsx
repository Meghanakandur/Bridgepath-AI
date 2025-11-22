import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // Simulating an API login response
    setUser({
      id: 'u123',
      name: 'Alex Researcher',
      email,
      role: 'student',
      gpa: 3.8,
      skills: ['React', 'AI/ML', 'Biotech'],
      badges: [
        { id: 'b1', name: 'Early Adopter', icon: '🚀', description: 'Joined Bridgepath Alpha', dateEarned: '2023-10-01' },
        { id: 'b2', name: 'Code Wizard', icon: '💻', description: 'Completed 5 coding challenges', dateEarned: '2023-11-15' }
      ]
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};