"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Animation";

export default function CertificatesPage() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Reveal>
        <h1 className="text-3xl font-bold mb-2">Certificates & Achievements</h1>
        <p className="text-[#94a3b8] mb-10">Download and share your completed program certificates.</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[1,2].map((i) => (
             <Card key={i} className="!p-6 flex flex-col justify-between" hoverable={false}>
               <div className="aspect-[4/3] bg-gradient-to-br from-[#0f172a] to-blue-900/20 rounded-lg border border-white/5 mb-6 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/10 rounded-full blur-3xl"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#6366f1]/10 rounded-full blur-3xl"></div>
                 <div className="text-4xl mb-4">📜</div>
                 <h4 className="text-[#00e5ff] text-xs font-bold tracking-widest uppercase mb-1">Certificate of Completion</h4>
                 <h3 className="font-serif text-2xl font-bold text-white mb-2">Executive Presence Masterclass</h3>
                 <p className="text-xs text-[#94a3b8]">Issued on Feb 12, 2026</p>
               </div>
               <div className="flex gap-4">
                 <Button fullWidth>Download PDF</Button>
                 <Button variant="secondary" fullWidth>Share on LinkedIn</Button>
               </div>
             </Card>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
