"use client";
import { useState } from "react";
import { Reveal } from "@/components/ui/Animation";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am MISHA, your AI career and communication mentor. How can I help you level up your professional presence today?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'That is a great question. In a boardroom setting, the most important communication element is brevity. Start with the core conclusion, then provide the supporting data. Would you like a framework for structuring this?' }]);
    }, 1000);
  };

  return (
    <div className="h-full max-h-screen p-10 max-w-4xl mx-auto flex flex-col">
      <Reveal>
        <h1 className="text-3xl font-bold mb-2">MISHA</h1>
        <p className="text-[#94a3b8] mb-6">Your personal AI Mentor. Ask about leadership, speaking, or career growth.</p>
      </Reveal>
      
      <div className="flex-1 bg-black/30 rounded-3xl border border-white/10 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl p-4 text-sm leading-relaxed ${m.role === 'user' ? 'bg-gradient-to-r from-[#00e5ff] to-[#6366f1] text-white rounded-br-none' : 'bg-[#0f172a] text-[#cbd5f5] rounded-tl-none border border-white/5'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-[#0a0f21] border-t border-white/10">
          <form onSubmit={handleSend} className="flex gap-4">
            <input 
              value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask MISHA a question..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-[#00e5ff] text-white placeholder-gray-500 transition-colors"
            />
            <button type="submit" className="w-[46px] h-[46px] rounded-full bg-gradient-to-r from-[#00e5ff] to-[#6366f1] flex items-center justify-center text-white hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.3)]">↑</button>
          </form>
        </div>
      </div>
    </div>
  );
}
