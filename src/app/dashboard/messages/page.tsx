"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Sparkles } from "lucide-react";

export default function AIMessages() {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hello! I am MISHA AI, your communication and leadership assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            // Direct call to our AI API
            const res = await fetch("/api/ai", {
                method: "POST",
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();

            setMessages(prev => [...prev, { role: 'assistant', text: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I am having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col bg-[#020617]/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#6366f1] flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">MISHA AI</h2>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs text-[#94a3b8] font-medium">Online & Ready</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-[#6366f1]' : 'bg-[#00e5ff]/20'}`}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-[#00e5ff]" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-[#6366f1] text-white shadow-lg'
                                    : 'bg-white/5 border border-white/10 text-[#cbd5f5]'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-1">
                            <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5">
                <div className="relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask MISHA AI anything about leadership, coaching, or your courses..."
                        className="w-full bg-[#0a0f21] border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00e5ff]/50 transition-all shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#00e5ff] rounded-xl flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <p className="text-[10px] text-center text-[#475569] mt-3 font-medium uppercase tracking-widest">Powered by MentorLeap Intelligence Engine</p>
            </div>
        </div>
    );
}
