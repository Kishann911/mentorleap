"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const programs = [
  {
    badge: "FREE",
    badgeStyle: "free",
    title: "1 Hour Personality Development Course",
    host: "By Mridu Bhandari",
    desc: "A powerful introduction to communication, confidence and leadership mindset designed to help professionals unlock their potential.",
    features: [
      "Improve professional confidence",
      "Leadership communication insights",
      "Career growth frameworks",
      "Live session with Mridu Bhandari",
    ],
    date: "Launch Event — 15 March 2026",
    price: "Worth ₹2999",
    priceHighlight: "FREE",
    offer: null,
    cta: "Enroll Free",
    premium: false,
  },
  {
    badge: "BOOTCAMP",
    badgeStyle: "premium",
    title: "Professional Transformation Bootcamp",
    host: "By Mridu Bhandari",
    desc: "An intensive 2-day transformation program designed to elevate your professional presence, leadership confidence and career clarity.",
    features: [
      "Deep communication training",
      "Leadership positioning",
      "Career growth blueprint",
      "Interactive transformation sessions",
    ],
    date: "28 – 29 March 2026",
    price: "₹7999",
    priceHighlight: null,
    offer: "10 Lucky Participants — FREE Access\nNext 50 Participants — 50% Discount",
    cta: "Reserve Seat",
    premium: true,
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function ProgramsSection() {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <style>{`
        .programs-gradient-text {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .program-btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 30px;
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          color: white;
          text-decoration: none;
          font-size: 14px;
          box-shadow: 0 6px 20px rgba(0,229,255,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .program-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 28px rgba(0,229,255,0.45);
        }
        .program-btn:active { transform: scale(0.97); }

        .program-li::before {
          content: "✦";
          color: #00e5ff;
          margin-right: 8px;
          font-size: 10px;
        }

        @keyframes premiumGlow {
          0%   { box-shadow: 0 0 20px rgba(99,102,241,0.2); }
          50%  { box-shadow: 0 0 40px rgba(99,102,241,0.4); }
          100% { box-shadow: 0 0 20px rgba(99,102,241,0.2); }
        }
        .premium-card-glow {
          animation: premiumGlow 3s ease-in-out infinite;
        }

        @keyframes badgePop {
          0%   { transform: scale(0.8); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
        .badge-pop {
          animation: badgePop 0.4s ease forwards;
        }

        .offer-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          font-size: 13px;
          color: #facc15;
        }
        .offer-line::before {
          content: "★";
          font-size: 11px;
        }
      `}</style>

      <section
        ref={ref}
        className="w-full px-5 text-center"
        style={{ padding: "120px 20px" }}
      >
        {/* TITLE */}
        <h2
          className="text-white font-bold mb-16"
          style={{
            fontSize: "42px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Upcoming{" "}
          <span className="programs-gradient-text">MentorLeap Programs</span>
        </h2>

        {/* GRID */}
        <div
          className="mx-auto grid gap-10"
          style={{
            maxWidth: "1200px",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {programs.map((p, i) => (
            <div
              key={p.title}
              className={`relative rounded-2xl text-left ${p.premium ? "premium-card-glow" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#020617",
                padding: "40px",
                border: p.premium
                  ? "1px solid #6366f1"
                  : hovered === i
                    ? "1px solid #00e5ff"
                    : "1px solid rgba(255,255,255,0.08)",
                transform: visible
                  ? hovered === i
                    ? "translateY(-10px)"
                    : "translateY(0)"
                  : "translateY(40px)",
                boxShadow: hovered === i
                  ? "0 25px 60px rgba(0,229,255,0.15)"
                  : "none",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.6s ease ${0.2 + i * 0.15}s, transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease`,
              }}
            >
              {/* BADGE */}
              {visible && (
                <div
                  className="badge-pop absolute"
                  style={{
                    top: "-12px",
                    left: "20px",
                    background: p.badgeStyle === "free" ? "#00e5ff" : "#6366f1",
                    color: p.badgeStyle === "free" ? "#020617" : "white",
                    fontSize: "11px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  {p.badge}
                </div>
              )}

              {/* TITLE */}
              <h3
                className="text-white font-bold mb-2"
                style={{ fontSize: "22px", marginTop: "8px" }}
              >
                {p.title}
              </h3>

              {/* HOST */}
              <p
                className="mb-4"
                style={{ color: "#00e5ff", fontSize: "14px" }}
              >
                {p.host}
              </p>

              {/* DESC */}
              <p
                className="mb-5"
                style={{ color: "#94a3b8", lineHeight: "1.6", fontSize: "14px" }}
              >
                {p.desc}
              </p>

              {/* FEATURES */}
              <ul className="mb-5" style={{ listStyle: "none", padding: 0 }}>
                {p.features.map((f, fi) => (
                  <li
                    key={f}
                    className="program-li mb-2"
                    style={{
                      color: "#cbd5f5",
                      fontSize: "14px",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-10px)",
                      transition: `opacity 0.4s ease ${0.4 + i * 0.1 + fi * 0.07}s, transform 0.4s ease ${0.4 + i * 0.1 + fi * 0.07}s`,
                    }}
                  >
                    {f}
                  </li>
                ))}
              </ul>

              {/* DIVIDER */}
              <div
                className="mb-4"
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.06)",
                }}
              />

              {/* DATE */}
              <p
                className="font-semibold mb-3"
                style={{ color: "#00e5ff", fontSize: "14px" }}
              >
                📅 {p.date}
              </p>

              {/* PRICE */}
              <p
                className="font-bold mb-3"
                style={{ color: "white", fontSize: "20px" }}
              >
                {p.price}{" "}
                {p.priceHighlight && (
                  <span style={{ color: "#00e5ff" }}>{p.priceHighlight}</span>
                )}
              </p>

              {/* OFFER */}
              {p.offer && (
                <div className="mb-5">
                  {p.offer.split("\n").map((line) => (
                    <p key={line} className="offer-line">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {/* CTA */}
              <Link href="/events" className="program-btn">
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}