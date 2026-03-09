"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes heroPulse {
          0%   { transform: translate(-50%, -50%) scale(1); }
          50%  { transform: translate(-50%, -50%) scale(1.15); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        .hero-ai-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(0,229,255,0.25), transparent);
          border-radius: 50%;
          animation: heroPulse 6s ease-in-out infinite;
          z-index: 1;
        }
        .hero-gradient-text {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-primary {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          box-shadow: 0 6px 20px rgba(0,229,255,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 28px rgba(0,229,255,0.5);
        }
        .cta-primary:active { transform: scale(0.97); }

        .cta-secondary {
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.08) !important;
          transform: translateY(-2px);
        }

        .cta-outline {
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-outline:hover {
          background: rgba(0,229,255,0.1);
          box-shadow: 0 0 16px rgba(0,229,255,0.25);
          transform: translateY(-2px);
        }

        .hero-image {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .hero-image:hover {
          transform: scale(1.02) translateY(-4px);
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
      `}</style>

      <section
        ref={ref}
        className="w-full px-5"
        style={{ padding: "140px 20px" }}
      >
        <div
          className="mx-auto flex items-center gap-20 flex-wrap"
          style={{ maxWidth: "1300px" }}
          suppressHydrationWarning
        >
          {/* LEFT CONTENT */}
          <div
            className="flex flex-col"
            style={{
              width: "45%",
              minWidth: "300px",
              flex: "1",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            {/* HEADING */}
            <h1
              className="text-white font-bold mb-5"
              style={{ fontSize: "48px", lineHeight: "1.2" }}
            >
              The Future of Professional Growth{" "}
              <span className="hero-gradient-text">
                Starts with MentorLeap
              </span>
            </h1>

            {/* PARAGRAPH */}
            <p
              className="mb-6"
              style={{ color: "#cbd5f5", fontSize: "16px", lineHeight: "1.7" }}
            >
              MentorLeap is an AI-powered professional development platform
              founded by Mridu Bhandari. Learn leadership communication,
              confidence frameworks and career growth strategies supported by
              MISHA — your AI mentor.
            </p>

            {/* HIGHLIGHT */}
            <div
              className="mb-8 flex flex-col gap-1"
              style={{
                color: "#00e5ff",
                fontSize: "14px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
              }}
            >
              <span>🎓 Free Personality Development Course — 15 March</span>
              <span>🚀 Bootcamp Experience — 28–29 March</span>
            </div>

            {/* CTA BUTTONS */}
            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s",
              }}
            >
              <Link
                href="/auth/register"
                className="cta-primary text-white no-underline text-sm rounded-full px-6 py-3"
              >
                Join Free Course
              </Link>
              <Link
                href="/events"
                className="cta-secondary text-white no-underline text-sm rounded-full px-6 py-3"
                style={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                Bootcamp Details
              </Link>
              <Link
                href="/hire-anchor"
                className="cta-outline no-underline text-sm rounded-full px-6 py-3"
                style={{
                  border: "1px solid #00e5ff",
                  color: "#00e5ff",
                }}
              >
                Hire Mridu
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div
            className="relative flex justify-center items-center"
            style={{
              width: "55%",
              minWidth: "300px",
              flex: "1",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
          >
            <div className="hero-ai-glow" />
            <Image
              src="https://marktaleevents.com/mentorleap/wp-content/uploads/2026/03/MriduBhandari_ProfilePic.jpg"
              alt="Mridu Bhandari"
              width={420}
              height={520}
              className="hero-image rounded-2xl relative"
              style={{
                zIndex: 2,
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                objectFit: "cover",
              }}
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}