
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: "Hello! I'm Majestic AI. How can I help you with your business registration or legal compliance today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Corrected: Always use { apiKey: process.env.API_KEY } directly.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are Majestic AI, a friendly and professional business consultant for Majestic Groups. 
          Your goal is to help users find the right services (Business Registration, Tax, Legal, IP, etc.). 
          Keep answers concise and professional. Refer to Majestic Groups as "we" or "us". 
          If you don't know something for sure, suggest they "Talk to an Expert" on our contact page.
          Always maintain a helpful tone. Focus on Indian business laws (MCA, GST, Trademark).`
        }
      });

      // Corrected: response.text is a property, not a method.
      const botText = response.text || "I'm sorry, I couldn't process that. Could you please rephrase?";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Service temporarily unavailable. Please try again later or contact our support team." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const PROMPT_CHIPS = [
    "How to register a Pvt Ltd?",
    "GST vs Composition Scheme",
    "Trademark my logo",
    "Low cost startup compliance"
  ];

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-80 sm:w-[400px] flex flex-col border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-500 origin-bottom-right">
          {/* AI Header */}
          <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-600/40">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight">Majestic Strategist</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Always Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow h-[450px] overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-50/50">
            {messages.map((m, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${m.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20'
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                  }`}>
                  {m.text}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none flex items-center gap-3 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Analyzing Requirements...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="px-6 py-2 bg-slate-50/50 flex gap-2 overflow-x-auto no-scrollbar pb-4">
            {PROMPT_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => setInput(chip)}
                className="whitespace-nowrap bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe your business idea..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-5 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-4 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-4 font-medium uppercase tracking-tighter">Powered by Majestic Intelligence • Professional Guidance</p>
          </div>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 border-4 border-white text-white w-20 h-20 rounded-[2rem] shadow-3xl hover:bg-indigo-600 transition-all flex items-center justify-center group relative overflow-hidden"
        >
          <Bot className="w-8 h-8 relative z-10" />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-indigo-600 transition-opacity"
          />
        </motion.button>
      )}
    </div>
  );
};

export default AIAssistant;
