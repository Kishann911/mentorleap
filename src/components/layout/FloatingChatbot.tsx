"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";
import { Send, Bot, User, Sparkles, X } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const SUGGESTIONS = ["Live Events", "Premium Courses", "Executive Coaching", "Corporate Training"];

const BOT_REPLIES: Record<string, string> = {
  "live events":
    "🚀 Join our high-impact live learning experiences designed for rapid skill acquisition and networking. Check the 'Live Events' page for upcoming bootcamps.",
  "premium courses":
    "🎓 Explore our comprehensive library of elite communication, leadership, and personal branding programs. Visit the 'Explore Courses' section to begin.",
  "executive coaching":
    "👑 Master executive presence with 1-on-1 coaching from Mridu Bhandari. Perfect for leaders and founders looking to scale their influence.",
  "corporate training":
    "🏢 MentorLeap offers high-impact corporate leadership training for teams and executives. Reach out via the Contact section to book a session with Mridu.",
};

const GREETING: Message = {
  role: "bot",
  text: "Hello! I am MISHA, your personal AI Mentor at MentorLeap.\nHow can I help you accelerate your career today?",
};

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [greetingDone, setGreetingDone] = useState(false);
  const [typedGreeting, setTypedGreeting] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // greeting typewriter on first open
  useEffect(() => {
    if (!open || greetingDone) return;
    const full = GREETING.text;
    let i = 0;
    const t = setInterval(() => {
      if (i <= full.length) {
        setTypedGreeting(full.slice(0, i));
        i++;
      } else {
        clearInterval(t);
        setGreetingDone(true);
        setMessages([{ role: "bot", text: full }]);
      }
    }, 28);
    return () => clearInterval(t);
  }, [open, greetingDone]);

  // slide-in chat window
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setChatVisible(true));
      setTimeout(() => inputRef.current?.focus(), 400);
    } else {
      setChatVisible(false);
    }
  }, [open]);

  // auto-scroll
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typedGreeting]);

  const [isTyping, setIsTyping] = useState(false);

  const send = async (text: string) => {
    const val = text.trim();
    if (!val || isTyping) return;

    if (!user) {
      const userMsg: Message = { role: "user", text: val };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      
      setTimeout(() => {
        const isGeneralHelp = val.toLowerCase().includes("help") || 
                             val.toLowerCase().includes("what") || 
                             val.toLowerCase().includes("who") || 
                             val.toLowerCase().includes("mentorleap");

        if (isGeneralHelp) {
          setMessages((prev) => [
            ...prev,
            { 
              role: "bot", 
              text: "I can help with general info, but please login first to access the chatboard completely and get personalized advice." 
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { 
              role: "bot", 
              text: "Please login first to access the chatboard completely. I'd love to help you once you're signed in!" 
            },
          ]);
        }
        setIsTyping(false);
      }, 600);
      return;
    }

    const userMsg: Message = { role: "user", text: val };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ 
        role: m.role === "bot" ? "assistant" : "user", 
        content: m.text 
      }));
      history.push({ role: "user", content: val });

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, message: val }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply || "I encountered an error. Please try again." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm having a connection glitch. Can you check your connection?" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") send(input);
  };

  return (
    <>
      <style>{`
        @keyframes mishaPulse {
          0%   { box-shadow: 0 0 0 0   rgba(0,229,255,0.6); }
          70%  { box-shadow: 0 0 0 18px rgba(0,229,255,0);   }
          100% { box-shadow: 0 0 0 0   rgba(0,229,255,0);    }
        }
        .misha-float-icon {
          animation: mishaPulse 2s infinite;
          transition: transform 0.3s ease;
        }
        .misha-float-icon:hover {
          transform: scale(1.1);
        }
        .misha-chat-window {
          opacity: 0;
          transform: translateY(16px) scale(0.97);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
        }
        .misha-chat-window.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }
        .misha-body::-webkit-scrollbar { width: 4px; }
        .misha-body::-webkit-scrollbar-track { background: transparent; }
        .misha-body::-webkit-scrollbar-thumb {
          background: rgba(0,229,255,0.2);
          border-radius: 4px;
        }
        .misha-suggestion-btn {
          border: 1px solid rgba(0,229,255,0.2);
          background: #0f172a;
          color: #cbd5f5;
          padding: 5px 12px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .misha-suggestion-btn:hover {
          background: rgba(0,229,255,0.1);
          border-color: #00e5ff;
          color: white;
          transform: translateY(-2px);
        }
        .misha-send-btn {
          background: linear-gradient(135deg, #00e5ff, #6366f1);
          border: none;
          padding: 10px 16px;
          cursor: pointer;
          color: white;
          font-size: 16px;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .misha-send-btn:hover {
          opacity: 0.85;
          transform: scale(1.05);
        }
        .misha-input-field {
          flex: 1;
          padding: 10px 14px;
          background: #020617;
          border: none;
          color: white;
          font-size: 13px;
          outline: none;
        }
        .misha-input-field::placeholder { color: #475569; }
        @keyframes msgSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .misha-msg {
          animation: msgSlideIn 0.3s ease forwards;
        }
        .misha-close-btn {
          margin-left: auto;
          cursor: pointer;
          color: #94a3b8;
          transition: color 0.2s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
        }
        .misha-close-btn:hover {
          color: white;
          transform: rotate(90deg);
        }
        .misha-bot-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .misha-user-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      <div
        suppressHydrationWarning
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          zIndex: 9999,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* CHAT WINDOW */}
        <div
          className={`misha-chat-window ${chatVisible ? "visible" : ""}`}
          suppressHydrationWarning
          style={{
            width: "360px",
            background: "#020617",
            borderRadius: "20px",
            position: "absolute",
            bottom: "85px",
            right: "0",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            height: "520px",
          }}
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#00e5ff]/5 blur-[80px] rounded-full pointer-events-none"></div>

          {/* HEADER */}
          <div
            suppressHydrationWarning
            style={{
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
              zIndex: 20,
            }}
          >
            <div
              suppressHydrationWarning
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #00e5ff, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(0,229,255,0.3)",
              }}
            >
              <Sparkles size={20} className="text-white" />
            </div>
            <div suppressHydrationWarning>
              <div
                style={{ color: "white", fontWeight: 800, fontSize: "16px", letterSpacing: "-0.01em" }}
                suppressHydrationWarning
              >
                MISHA
              </div>
              <div
                suppressHydrationWarning
                style={{
                  fontSize: "10px",
                  color: "#00e5ff",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "1px"
                }}
              >
                AI Mentor Online
              </div>
            </div>
            <button
              className="misha-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* BODY */}
          <div
            ref={bodyRef}
            className="misha-body"
            suppressHydrationWarning
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "relative",
              zIndex: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`misha-msg flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                style={{ maxWidth: "100%" }}
              >
                <div className={m.role === "bot" ? "misha-bot-icon" : "misha-user-icon"}>
                  {m.role === "bot" ? <Bot size={16} className="text-[#00e5ff]" /> : <User size={16} className="text-[#cbd5f5]" />}
                </div>
                <div
                  className="p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
                  style={{
                    background: m.role === "bot" ? "rgba(255,255,255,0.03)" : "linear-gradient(135deg,#00e5ff,#6366f1)",
                    border: m.role === "bot" ? "1px solid rgba(255,255,255,0.05)" : "none",
                    color: m.role === "bot" ? "#cbd5f5" : "#020617",
                    fontWeight: m.role === "user" ? 600 : 400,
                    borderRadius: m.role === "bot" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
                    maxWidth: "80%",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="misha-msg flex gap-3">
                <div className="misha-bot-icon">
                  <Bot size={16} className="text-[#00e5ff]" />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-1.5 h-[52px]">
                    <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* SUGGESTIONS */}
          <div
            suppressHydrationWarning
            style={{
              display: "flex",
              gap: "8px",
              padding: "10px 16px",
              flexWrap: "nowrap",
              overflowX: "auto",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              flexShrink: 0,
              zIndex: 20,
            }}
            className="custom-scrollbar"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="misha-suggestion-btn"
                onClick={() => send(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div
            suppressHydrationWarning
            style={{
              padding: "16px",
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(12px)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
              zIndex: 20,
            }}
          >
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-4 pl-5 pr-12 text-sm text-white focus:outline-none focus:border-[#00e5ff]/50 transition-colors"
                placeholder="Ask MISHA anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={isTyping}
              />
              <button 
                className="absolute right-2 p-2 rounded-lg bg-[#00e5ff]/10 text-[#00e5ff] hover:bg-[#00e5ff]/20 disabled:opacity-50 transition-all"
                onClick={() => send(input)}
                disabled={!input.trim() || isTyping}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* FLOAT ICON */}
        <button
          className="misha-float-icon"
          onClick={() => {
            if (!user && !authLoading) {
              alert("You need to login to access the chatbot");
              return;
            }
            setOpen((p) => !p);
          }}
          aria-label="Open MISHA chat"
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "24px",
            background: "linear-gradient(135deg,#00e5ff,#6366f1)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 10px 40px rgba(0,229,255,0.3)",
          }}
        >
          <Sparkles size={32} className="text-white" />
        </button>
      </div>
    </>
  );
}