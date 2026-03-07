"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    icon: "🧠",
    title: "Executive Coaching",
    desc: "1:1 and group coaching for professionals and organizations.",
    link: "#",
    cta: "Learn More",
  },
  {
    icon: "🎤",
    title: "Live Events",
    desc: "Bootcamps, masterclasses and leadership learning experiences.",
    link: "#",
    cta: "Explore Events",
  },
  {
    icon: "📚",
    title: "Resource Library",
    desc: "Digital courses, leadership frameworks and learning resources.",
    link: "#",
    cta: "Browse Library",
  },
  {
    icon: "🧩",
    title: "MentorLeap Studio",
    desc: "Insights, blogs and thought leadership content.",
    link: "#",
    cta: "Read Insights",
  },
  {
    icon: "🏢",
    title: "Corporate Training",
    desc: "Professional communication training for organizations.",
    link: "#",
    cta: "Corporate Programs",
  },
  {
    icon: "🎙",
    title: "Hire Mridu",
    desc: "Leadership moderation and event anchoring services.",
    link: "#",
    cta: "Book Now",
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

export default function ServicesSection() {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

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
        <div className="mx-auto" style={{ maxWidth: "1200px" }}>

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
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {services.map((s, i) => (
              <div
                key={s.title}
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
                  {s.desc}
                </p>
                <Link href={s.link} className="service-card-link">
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}