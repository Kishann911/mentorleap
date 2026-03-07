"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    initial: "A",
    name: "Aman Verma",
    location: "Delhi",
    stars: 5,
    text: "The personality development session completely changed how I communicate in professional meetings. Mridu Bhandari explains leadership communication in a very practical way.",
  },
  {
    initial: "R",
    name: "Ritika Sharma",
    location: "Mumbai",
    stars: 5,
    text: "The bootcamp helped me build confidence for leadership presentations. The frameworks shared are extremely powerful.",
  },
  {
    initial: "S",
    name: "Sachin Gupta",
    location: "Gurgaon",
    stars: 5,
    text: "Mridu's experience in moderating global leadership forums reflects in the way she trains professionals.",
  },
  {
    initial: "P",
    name: "Pooja Mehta",
    location: "Bangalore",
    stars: 5,
    text: "I attended a leadership masterclass and it gave me clarity on personal branding and executive communication.",
  },
  {
    initial: "K",
    name: "Karan Malhotra",
    location: "Chandigarh",
    stars: 5,
    text: "MentorLeap combines real leadership experience with structured frameworks. Highly recommended for professionals.",
  },
  {
    initial: "N",
    name: "Neha Kapoor",
    location: "Hyderabad",
    stars: 4,
    text: "Very practical learning experience. The session on professional confidence was extremely valuable.",
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

function Stars({ count }: { count: number }) {
  return (
    <div style={{ color: "#facc15", fontSize: "15px", marginBottom: "10px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{
            opacity: s <= count ? 1 : 0.25,
            display: "inline-block",
            transition: `opacity 0.3s ease ${s * 0.05}s`,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// rolling big number counter
function RatingCounter({ visible }: { visible: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const target = 4.9;
    const steps = 40;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setVal(target); clearInterval(timer); }
      else setVal(parseFloat(current.toFixed(1)));
    }, 30);
    return () => clearInterval(timer);
  }, [visible]);
  return <>{val.toFixed(1)}</>;
}

export default function ReviewsSection() {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  // avatar gradient colours cycling
  const avatarColors = [
    "#00e5ff", "#6366f1", "#00e5ff", "#6366f1", "#00e5ff", "#6366f1",
  ];

  return (
    <>
      <style>{`
        .reviews-gradient-text {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .review-card {
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .review-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0,229,255,0.35) !important;
          box-shadow: 0 20px 50px rgba(0,229,255,0.1);
        }
        .review-avatar {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .review-card:hover .review-avatar {
          transform: scale(1.1);
          box-shadow: 0 0 16px rgba(0,229,255,0.5);
        }
        .review-quote {
          position: absolute;
          top: 16px;
          right: 20px;
          font-size: 48px;
          line-height: 1;
          color: rgba(0,229,255,0.08);
          font-family: Georgia, serif;
          pointer-events: none;
          transition: color 0.3s ease;
        }
        .review-card:hover .review-quote {
          color: rgba(0,229,255,0.15);
        }
        @keyframes ratingPulse {
          0%   { text-shadow: 0 0 20px rgba(0,229,255,0.4); }
          50%  { text-shadow: 0 0 40px rgba(0,229,255,0.8); }
          100% { text-shadow: 0 0 20px rgba(0,229,255,0.4); }
        }
        .rating-number {
          animation: ratingPulse 3s ease-in-out infinite;
        }
        @keyframes summaryFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .summary-animate {
          animation: summaryFadeUp 0.7s ease 0.3s both;
        }
      `}</style>

      <section
        ref={ref}
        className="w-full px-5 text-center"
        style={{ padding: "120px 20px" }}
      >
        {/* TITLE */}
        <h2
          className="text-white font-bold mb-10"
          style={{
            fontSize: "42px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          What Professionals Say About{" "}
          <span className="reviews-gradient-text">MentorLeap</span>
        </h2>

        {/* RATING SUMMARY */}
        {visible && (
          <div className="summary-animate mb-14">
            <h3
              className="rating-number font-bold mb-2"
              style={{ fontSize: "56px", color: "#00e5ff" }}
            >
              <RatingCounter visible={visible} />
            </h3>
            <div style={{ color: "#facc15", fontSize: "22px", marginBottom: "8px" }}>
              ★★★★★
            </div>
            <p style={{ color: "#94a3b8", fontSize: "14px" }}>
              Based on 20+ professional reviews across India
            </p>
          </div>
        )}

        {/* GRID */}
        <div
          className="mx-auto grid gap-8"
          style={{
            maxWidth: "1200px",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="review-card relative rounded-xl text-left"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: "#020617",
                padding: "25px",
                border: "1px solid rgba(255,255,255,0.08)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.5s ease ${0.3 + i * 0.08}s, transform 0.5s ease ${0.3 + i * 0.08}s`,
              }}
            >
              {/* BIG QUOTE */}
              <div className="review-quote">"</div>

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="review-avatar flex items-center justify-center rounded-full font-bold flex-shrink-0"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: `linear-gradient(135deg, ${avatarColors[i]}, #020617)`,
                    border: `2px solid ${avatarColors[i]}`,
                    color: avatarColors[i],
                    fontSize: "16px",
                  }}
                >
                  {r.initial}
                </div>
                <div>
                  <h4 className="text-white font-semibold" style={{ fontSize: "15px" }}>
                    {r.name}
                  </h4>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                    📍 {r.location}
                  </span>
                </div>
              </div>

              {/* STARS */}
              <Stars count={r.stars} />

              {/* TEXT */}
              <p style={{ color: "#cbd5f5", fontSize: "14px", lineHeight: "1.6" }}>
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}