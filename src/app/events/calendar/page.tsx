"use client";
import PageWrapper from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/Animation";
import { SectionHeading, GradientText, Paragraph } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function EventsCalendarPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-[100px] max-w-[1200px] mx-auto text-center">
        <Reveal>
          <SectionHeading>Event <GradientText>Calendar</GradientText></SectionHeading>
          <Paragraph className="max-w-[600px] mx-auto mt-4">Plan your learning journey with our monthly schedule of bootcamps, masterclasses, and webinars.</Paragraph>
        </Reveal>
      </section>
      
      <section className="px-5 pb-[140px] max-w-[1200px] mx-auto">
        <Reveal>
          <Card className="!p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">March 2026</h3>
              <div className="flex gap-2">
                <Button variant="outline">&lt;</Button>
                <Button variant="outline">&gt;</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-4 mb-4 text-center text-[#94a3b8] text-sm font-semibold">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: 31 }).map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-xl p-2 flex flex-col items-center justify-center relative hover:bg-white/10 transition-colors cursor-pointer">
                  <span className={`text-sm ${i === 27 ? 'font-bold text-[#00e5ff]' : 'text-white'}`}>{i + 1}</span>
                  {i === 14 && <div className="absolute bottom-2 w-2 h-2 rounded-full bg-[#6366f1]"></div>}
                  {i === 27 && <div className="absolute bottom-2 w-2 h-2 rounded-full bg-[#00e5ff]"></div>}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex gap-6 text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#00e5ff]"></div> Bootcamp</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#6366f1]"></div> Webinar</div>
            </div>
          </Card>
        </Reveal>
      </section>
    </PageWrapper>
  );
}
