"use client";

import { useEffect, useRef, useState } from "react";

const mediaLogos = ["BBC London", "CNBC-TV18", "Forbes India", "Moneycontrol", "Times Network"];
const awards = [
  "British Chevening Scholar",
  "Ramnath Goenka Award for Excellence in Journalism",
  "Dean’s Award – University College London"
];
const companies = [
  "Deloitte", "Wipro", "Accenture", "Microsoft", "Infosys", "IBM", 
  "EY", "PwC", "DataFlow", "HSBC Bank", "Sarita Handa", "Ratan Textiles", "360 One Wealth"
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function RecognitionSection() {
  const { ref, visible } = useInView();

  return (
    <section ref={ref} className="w-full px-5 py-20 bg-[#020617] text-center overflow-hidden">
      <div className="max-w-[1200px] mx-auto space-y-24">
        
        {/* FEATURED ON */}
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <h3 className="text-[#94a3b8] text-xs font-black uppercase tracking-[0.3em] mb-10">Featured On</h3>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {mediaLogos.map((logo) => (
              <span key={logo} className="text-white/40 font-bold text-lg md:text-xl hover:text-[#00e5ff] transition-colors cursor-default whitespace-nowrap">
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* AWARDS */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease 0.2s" }}>
          <h3 className="text-[#94a3b8] text-xs font-black uppercase tracking-[0.3em] mb-10">Awards & Recognition</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award) => (
              <div key={award} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00e5ff]/30 transition-all">
                <span className="text-3xl mb-4 block">🏆</span>
                <p className="text-white font-medium text-sm leading-relaxed">{award}</p>
              </div>
            ))}
          </div>
        </div>

        {/* WHERE LEARNERS WORK */}
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
          <h3 className="text-[#94a3b8] text-xs font-black uppercase tracking-[0.3em] mb-10">Where MentorLeap Learners Work</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
            {companies.map((company) => (
              <span key={company} className="text-white font-semibold text-sm md:text-base hover:text-white transition-colors cursor-default">
                {company}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
