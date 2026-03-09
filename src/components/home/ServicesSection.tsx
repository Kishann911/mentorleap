"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { fetchServices } from "@/lib/api";

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

export default function ServicesSection() {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then((data: any[]) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <style>{`
        .services-gradient-text {
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .service-card-link {
          color: #00e5ff;
          text-decoration: none;
          font-size: 13px;
          position: relative;
          display: inline-block;
          transition: letter-spacing 0.2s ease;
        }
        .service-card-link::after {
          content: " →";
          opacity: 0;
          transform: translateX(-4px);
          display: inline-block;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .service-card:hover .service-card-link::after {
          opacity: 1;
          transform: translateX(2px);
        }
        .service-card:hover .service-card-link {
          letter-spacing: 0.3px;
        }
        .service-icon-wrap {
          font-size: 42px;
          margin-bottom: 15px;
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .service-card:hover .service-icon-wrap {
          transform: scale(1.15) rotate(-4deg);
        }
      `}</style>

      <section
        ref={ref}
        className="w-full px-5 text-center"
        style={{ padding: "140px 20px" }}
      >
        <div className="mx-auto" style={{ maxWidth: "1200px" }} suppressHydrationWarning>

          {/* TITLE */}
          <h2
            className="text-white font-bold mb-3"
            style={{
              fontSize: "44px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            Explore{" "}
            <span className="services-gradient-text">MentorLeap Services</span>
          </h2>

          {/* SUBTITLE */}
          <p
            className="mb-16"
            style={{
              color: "#94a3b8",
              fontSize: "15px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-10px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            Programs designed to transform professionals into confident
            communicators and strategic leaders.
          </p>

          {/* GRID */}
          <div
            className="grid gap-8"
            suppressHydrationWarning
            style={{
              gridTemplateColumns: loading || services.length === 0 ? "1fr" : "repeat(3, 1fr)",
            }}
          >
            {loading ? (
               <div className="text-[#94a3b8] animate-pulse py-20 bg-white/5 rounded-3xl border border-white/10">Orchestrating service portfolio...</div>
            ) : services.length === 0 ? (
               <div className="text-[#94a3b8] italic py-20 bg-white/5 rounded-3xl border border-white/10">No specific services listed currently. Please contact us for custom inquiries.</div>
            ) : services.map((s, i) => (
              <div
                key={s.id || s.title}
                className="service-card rounded-2xl text-left"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "rgba(2,6,23,0.9)",
                  padding: "35px",
                  border: hovered === i
                    ? "1px solid #00e5ff"
                    : "1px solid rgba(255,255,255,0.05)",
                  transform: visible
                    ? hovered === i
                      ? "translateY(-10px)"
                      : "translateY(0)"
                    : "translateY(30px)",
                  boxShadow: hovered === i
                    ? "0 20px 50px rgba(0,229,255,0.2)"
                    : "none",
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.2 + i * 0.08}s, transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease`,
                }}
              >
                <div className="service-icon-wrap">{s.icon}</div>
                <h3
                  className="text-white font-semibold mb-2"
                  style={{ fontSize: "17px" }}
                >
                  {s.title}
                </h3>
                <p className="mb-4" style={{ color: "#94a3b8", fontSize: "14px" }}>
                  {s.description || s.desc}
                </p>
                <Link href={s.link || "/contact"} className="service-card-link">
                  {s.cta || "Learn More"}
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}