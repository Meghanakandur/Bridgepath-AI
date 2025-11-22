import React, { useState, useRef, useEffect } from 'react';
import { User } from '../types';
import { MessageSquare, Plus, Search, Check, X, Send, Loader2 } from 'lucide-react';

// Mock Data
const MOCK_USERS: User[] = [
  { id: '2', name: 'Sarah Chen', email: 'sarah@mit.edu', role: 'researcher', skills: ['Biotech', 'Python', 'Data Analysis'], gpa: 3.9, badges: [] },
  { id: '3', name: 'David Okafor', email: 'david@lagos.edu', role: 'student', skills: ['Frontend', 'React', 'UI/UX'], gpa: 3.7, badges: [] },
  { id: '4', name: 'Elena Rodriguez', email: 'elena@tech.start', role: 'mentor', skills: ['Venture Capital', 'Marketing'], gpa: 0, badges: [] },
  { id: '5', name: 'Wei Zhang', email: 'wei@ai.lab', role: 'researcher', skills: ['NLP', 'TensorFlow', 'Cloud'], gpa: 4.0, badges: [] },
];

interface DirectMessage {
  id: string;
  senderId: string; // 'me' or user.id
  text: string;
  timestamp: Date;
}

export const CollabHub = () => {
  const [filter, setFilter] = useState('');
  // State to track connection status (Set of IDs)
  const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set());
  
  // Chat State
  const [activeChatUser, setActiveChatUser] = useState<User | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, DirectMessage[]>>({});
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredUsers = MOCK_USERS.filter(u => 
    u.skills.some(skill => skill.toLowerCase().includes(filter.toLowerCase())) ||
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, activeChatUser, isTyping]);

  const handleConnect = (userId: string) => {
    setConnectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleOpenChat = (user: User) => {
    setActiveChatUser(user);
    // Initialize history if empty
    if (!chatHistory[user.id]) {
      setChatHistory(prev => ({
        ...prev,
        [user.id]: []
      }));
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activeChatUser) return;

    const newMessage: DirectMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: messageInput,
      timestamp: new Date()
    };

    // Update UI immediately
    setChatHistory(prev => ({
      ...prev,
      [activeChatUser.id]: [...(prev[activeChatUser.id] || []), newMessage]
    }));
    setMessageInput('');

    // Simulate "Other User" Reply
    setIsTyping(true);
    setTimeout(() => {
      const reply: DirectMessage = {
        id: (Date.now() + 1).toString(),
        senderId: activeChatUser.id,
        text: `Hey! Thanks for reaching out. I'd love to collaborate on a project involving ${activeChatUser.skills[0]}.`,
        timestamp: new Date()
      };

      setChatHistory(prev => ({
        ...prev,
        [activeChatUser.id]: [...(prev[activeChatUser.id] || []), reply]
      }));
      setIsTyping(false);
    }, 2000); // 2 second delay
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Collaboration Hub</h2>
          <p className="text-slate-400 mt-1">Find co-founders, mentors, and skilled peers.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search skills (e.g., Python)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const isConnected = connectedUsers.has(user.id);
          return (
            <div key={user.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{user.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user.role === 'mentor' ? 'bg-yellow-900/30 text-yellow-400' : 
                      user.role === 'researcher' ? 'bg-blue-900/30 text-blue-400' : 
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-slate-500 text-sm mb-2">Top Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleConnect(user.id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    isConnected 
                      ? 'bg-green-900/30 text-green-400 border border-green-900' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isConnected ? <><Check size={16} /> Request Sent</> : <><Plus size={16} /> Connect</>}
                </button>
                <button 
                  onClick={() => handleOpenChat(user)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors hover:text-white"
                >
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Message Modal */}
      {activeChatUser && (
        <div className="fixed bottom-0 right-80 w-80 h-96 bg-slate-900 border border-slate-700 rounded-t-xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-800 p-3 rounded-t-xl border-b border-slate-700 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-bold text-white text-sm">{activeChatUser.name}</span>
             </div>
             <button onClick={() => setActiveChatUser(null)} className="text-slate-400 hover:text-white">
               <X size={16} />
             </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-900 scrollbar-thin scrollbar-thumb-slate-700">
             {chatHistory[activeChatUser.id]?.length === 0 && (
                <div className="text-center text-xs text-slate-500 mt-4">
                  Start a conversation with {activeChatUser.name}
                </div>
             )}
             {chatHistory[activeChatUser.id]?.map(msg => (
                <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-2 px-3 rounded-xl text-sm ${
                     msg.senderId === 'me' 
                       ? 'bg-indigo-600 text-white rounded-br-none' 
                       : 'bg-slate-800 text-slate-300 rounded-bl-none'
                   }`}>
                      {msg.text}
                   </div>
                </div>
             ))}
             {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-2 px-3 rounded-xl rounded-bl-none">
                    <Loader2 size={12} className="animate-spin text-slate-400" />
                  </div>
                </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-700 bg-slate-800/50">
            <div className="relative">
               <input 
                 className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                 placeholder="Type a message..."
                 value={messageInput}
                 onChange={(e) => setMessageInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
               />
               <button 
                 onClick={handleSendMessage}
                 disabled={!messageInput.trim()}
                 className="absolute right-2 top-1.5 text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
               >
                 <Send size={16} />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
