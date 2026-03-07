"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Message {
  role: "bot" | "user";
  text: string;
}

const SUGGESTIONS = ["Free Course", "Bootcamp", "Corporate Training"];

const BOT_REPLIES: Record<string, string> = {
  "free course":
    "🎓 The Free Personality Development Course by Mridu Bhandari launches on 15 March 2026. Worth ₹2999 — completely free! Click 'Enroll Free' to reserve your seat.",
  bootcamp:
    "🚀 The Professional Transformation Bootcamp runs 28–29 March 2026. Worth ₹7999. 10 lucky participants get FREE access and the next 50 get 50% off!",
  "corporate training":
    "🏢 MentorLeap offers high-impact corporate leadership training for teams and executives. Reach out via the Contact section to book a session with Mridu.",
};

const GREETING: Message = {
  role: "bot",
  text: "Hi, I'm MISHA 👋\nYour AI Mentor at MentorLeap.\nHow can I help you today?",
};

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [greetingDone, setGreetingDone] = useState(false);
  const [typedGreeting, setTypedGreeting] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
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

  const send = (text: string) => {
    const val = text.trim();
    if (!val) return;
    const userMsg: Message = { role: "user", text: val };
    const key = val.toLowerCase();
    const reply =
      BOT_REPLIES[key] ||
      "Thanks for reaching out! A MentorLeap expert will guide you shortly. 🙏";
    setMessages((prev) => [
      ...prev,
      userMsg,
      { role: "bot", text: reply },
    ]);
    setInput("");
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
          font-size: 20px;
          color: #94a3b8;
          line-height: 1;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .misha-close-btn:hover {
          color: white;
          transform: rotate(90deg);
        }
      `}</style>

      <div
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
          style={{
            width: "340px",
            background: "#020617",
            borderRadius: "16px",
            position: "absolute",
            bottom: "85px",
            right: "0",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.1)",
            display: "flex",
            flexDirection: "column",
            height: "480px",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              background: "linear-gradient(135deg, #0f172a, #1e1b4b)",
              borderBottom: "1px solid rgba(0,229,255,0.1)",
              padding: "12px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(0,229,255,0.4)",
                flexShrink: 0,
              }}
            >
              <Image
                src="https://marktaleevents.com/mentorleap/wp-content/uploads/2026/03/ChatGPT-Image-Mar-4-2026-06_28_34-PM.png"
                alt="MISHA"
                width={36}
                height={36}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div
                style={{ color: "white", fontWeight: 700, fontSize: "14px" }}
              >
                MISHA
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#00e5ff",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                Your AI Mentor · Online
              </div>
            </div>
            <button
              className="misha-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* BODY */}
          <div
            ref={bodyRef}
            className="misha-body"
            style={{
              flex: 1,
              padding: "14px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {/* GREETING typewriter or messages */}
            {!greetingDone ? (
              <div
                className="misha-msg"
                style={{
                  background: "#0f172a",
                  color: "#cbd5f5",
                  padding: "10px 14px",
                  borderRadius: "10px 10px 10px 2px",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-line",
                  maxWidth: "85%",
                }}
              >
                {typedGreeting}
                <span
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "13px",
                    background: "#00e5ff",
                    marginLeft: "2px",
                    verticalAlign: "middle",
                    animation: "mishaPulse 0.8s step-end infinite",
                  }}
                />
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className="misha-msg"
                  style={{
                    background: m.role === "bot" ? "#0f172a" : "linear-gradient(135deg,#00e5ff,#6366f1)",
                    color: m.role === "bot" ? "#cbd5f5" : "#020617",
                    padding: "10px 14px",
                    borderRadius: m.role === "bot"
                      ? "10px 10px 10px 2px"
                      : "10px 10px 2px 10px",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-line",
                    maxWidth: "85%",
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {m.text}
                </div>
              ))
            )}
          </div>

          {/* SUGGESTIONS */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "8px 12px",
              flexWrap: "wrap",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              flexShrink: 0,
            }}
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
            style={{
              display: "flex",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              className="misha-input-field"
              placeholder="Ask MISHA anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="misha-send-btn" onClick={() => send(input)}>
              ➤
            </button>
          </div>
        </div>

        {/* FLOAT ICON */}
        <button
          className="misha-float-icon"
          onClick={() => setOpen((p) => !p)}
          aria-label="Open MISHA chat"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#00e5ff,#6366f1)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Image
            src="https://marktaleevents.com/mentorleap/wp-content/uploads/2026/03/ChatGPT-Image-Mar-4-2026-06_28_34-PM.png"
            alt="MISHA"
            width={44}
            height={44}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </button>
      </div>
    </>
  );
}