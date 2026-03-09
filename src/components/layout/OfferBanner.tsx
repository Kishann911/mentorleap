"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const offerText =
  "FREE Personality Development Course by Mridu Bhandari — Launching 15 March 2026 (Worth ₹2999)  •  Bootcamp 28–29 March (Worth ₹7999)  •  10 Lucky Participants Get Bootcamp FREE  •  Next 50 Participants Get 50% Discount";

export default function OfferBanner() {
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes scrollOffer {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ml-offer-track {
          display: flex;
          gap: 60px;
          white-space: nowrap;
          animation: scrollOffer 22s linear infinite;
          color: white;
          font-size: 14px;
        }

        .ml-offer-track.paused {
          animation-play-state: paused;
        }

        .ml-offer-track span {
          display: inline-flex;
          align-items: center;
          gap: 0;
        }

        /* highlight keywords */
        .ml-offer-track .highlight {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600;
        }

        .ml-offer-btn1 {
          padding: 8px 18px;
          border-radius: 20px;
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          color: white;
          text-decoration: none;
          font-size: 13px;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0,229,255,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: inline-block;
        }
        .ml-offer-btn1:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 22px rgba(0,229,255,0.45);
        }
        .ml-offer-btn1:active { transform: scale(0.97); }

        .ml-offer-btn2 {
          padding: 8px 18px;
          border-radius: 20px;
          background: rgba(255,255,255,0.08);
          color: white;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 13px;
          white-space: nowrap;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .ml-offer-btn2:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-2px);
        }
        .ml-offer-btn2:active { transform: scale(0.97); }

        @keyframes bannerFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ml-banner-animate {
          animation: bannerFadeIn 0.5s ease 0.6s both;
        }

        @media (max-width: 768px) {
          .ml-offer-actions {
            flex-direction: row;
            justify-content: center;
            width: 100%;
          }
          .ml-banner-inner {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }
      `}</style>

      <div
        className="ml-banner-animate"
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          position: "relative",
          // sits just below the fixed header
          marginTop: "70px",
        }}
      >
        {/* subtle gradient shimmer line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: "linear-gradient(90deg, transparent, #00e5ff55, #6366f155, transparent)",
          }}
        />

        <div
          className="ml-banner-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
          }}
        >
          {/* SCROLLING TEXT */}
          <div
            style={{ flex: 1, overflow: "hidden", cursor: "pointer" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            title="Hover to pause"
          >
            <div className={`ml-offer-track ${paused ? "paused" : ""}`}>
              {[0, 1].map((i) => (
                <span key={i}>
                  <span style={{ color: "#94a3b8" }}>FREE </span>
                  <span className="highlight">Personality Development Course</span>
                  <span style={{ color: "#e2e8f0" }}> by Mridu Bhandari — </span>
                  <span style={{ color: "#00e5ff" }}>Launching 15 March 2026</span>
                  <span style={{ color: "#94a3b8" }}> (Worth ₹2999)  •  </span>
                  <span style={{ color: "#e2e8f0" }}>Bootcamp </span>
                  <span style={{ color: "#00e5ff" }}>28–29 March</span>
                  <span style={{ color: "#94a3b8" }}> (Worth ₹7999)  •  </span>
                  <span className="highlight">10 Lucky Participants</span>
                  <span style={{ color: "#94a3b8" }}> Get Bootcamp FREE  •  </span>
                  <span style={{ color: "#e2e8f0" }}>Next </span>
                  <span className="highlight">50 Participants</span>
                  <span style={{ color: "#e2e8f0" }}> Get </span>
                  <span style={{ color: "#00e5ff" }}>50% Discount</span>
                  <span style={{ color: "#94a3b8", marginLeft: "60px" }}>{"  "}</span>
                </span>
              ))}
            </div>
          </div>

          {/* BUTTONS */}
          <div
            className="ml-offer-actions"
            style={{
              display: "flex",
              gap: "10px",
              marginLeft: "24px",
              flexShrink: 0,
            }}
          >
            <Link href="/signup" className="ml-offer-btn1">
              Enroll Free Course
            </Link>
            <Link href="/events" className="ml-offer-btn2">
              Bootcamp Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}