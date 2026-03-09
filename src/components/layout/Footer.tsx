"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Executive Coaching", href: "/coaching" },
  { label: "Live Events", href: "/events" },
  { label: "Resource Library", href: "/resources" },
  { label: "MentorLeap Studio", href: "/studio" },
  { label: "Hire Mridu", href: "/hire-anchor" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#020617" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <>
      <style>{`
        .footer-nav-link {
          position: relative;
          color: #94a3b8;
          font-size: 13px;
          text-decoration: none;
          transition: color 0.3s ease;
          white-space: nowrap;
        }
        .footer-nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #00e5ff, #6366f1);
          transition: width 0.3s ease;
        }
        .footer-nav-link:hover { color: #00e5ff; }
        .footer-nav-link:hover::after { width: 100%; }

        .footer-social-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
          font-size: 13px;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid transparent;
          transition: color 0.25s ease, border-color 0.25s ease,
                      background 0.25s ease, transform 0.25s ease;
        }
        .footer-social-link:hover {
          color: #00e5ff;
          border-color: rgba(0,229,255,0.25);
          background: rgba(0,229,255,0.06);
          transform: translateY(-2px);
        }

        .footer-shimmer {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0,229,255,0.3),
            rgba(99,102,241,0.3),
            transparent
          );
        }

        .footer-copyright-text {
          transition: color 0.3s ease;
        }
        .footer-copyright-text:hover {
          color: #94a3b8;
        }

        @media (max-width: 900px) {
          .footer-inner {
            flex-direction: column !important;
            gap: 16px !important;
            text-align: center;
          }
          .footer-nav-links {
            flex-wrap: wrap;
            justify-content: center !important;
          }
          .footer-social-links {
            justify-content: center !important;
          }
        }
      `}</style>

      <footer
        style={{
          width: "100%",
          background: "#020617",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* SHIMMER TOP LINE */}
        <div className="footer-shimmer" />

        {/* MAIN ROW */}
        <div
          className="footer-inner"
          style={{
            maxWidth: "1350px",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
          }}
        >
          {/* LOGO + NAV */}
          <div
            className="footer-nav-links"
            style={{ display: "flex", alignItems: "center", gap: "24px" }}
          >
            {/* LOGO MARK */}
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="https://marktaleevents.com/mentorleap/wp-content/uploads/2026/03/WhatsApp-Image-2026-02-26-at-6.16.25-AM.jpeg"
                alt="MentorLeap"
                width={80}
                height={28}
                style={{ height: "28px", width: "auto", objectFit: "contain", opacity: 0.8 }}
              />
            </Link>

            {/* DIVIDER */}
            <div
              style={{
                width: "1px",
                height: "18px",
                background: "rgba(255,255,255,0.1)",
              }}
            />

            {/* NAV LINKS */}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="footer-nav-link"
                onMouseEnter={() => setHoveredNav(link.label)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* SOCIAL */}
          <div
            className="footer-social-links"
            style={{ display: "flex", gap: "6px", alignItems: "center" }}
          >
            {socialLinks.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="footer-social-link"
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <p
            className="footer-copyright-text"
            style={{ fontSize: "12px", color: "#64748b", textAlign: "center" }}
          >
            © 2026 MentorLeap AI · All rights reserved · Built with{" "}
            <span style={{ color: "rgba(0,229,255,0.5)" }}>MISHA AI</span>
          </p>
        </div>
      </footer>
    </>
  );
}