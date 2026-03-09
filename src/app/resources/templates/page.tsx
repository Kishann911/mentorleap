"use client";
import PageWrapper from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/Animation";
import { SectionHeading, GradientText, Paragraph } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function TemplatesPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-[100px] max-w-[1200px] mx-auto text-center">
        <Reveal>
          <SectionHeading>PDFs & <GradientText>Templates</GradientText></SectionHeading>
          <Paragraph className="max-w-[600px] mx-auto mt-4">Download actionable frameworks and templates for your next big presentation or tough conversation.</Paragraph>
        </Reveal>
      </section>
      
      <section className="px-5 pb-[140px] max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Reveal key={i} delay={i * 0.1}>
            <Card className="flex flex-col h-full">
              <div className="aspect-[4/3] bg-[#0f172a] rounded-xl flex items-center justify-center text-5xl mb-6 border border-white/5">📄</div>
              <h3 className="text-xl font-bold mb-2">The Founder's Pitch Template</h3>
              <p className="text-[#94a3b8] text-sm mb-6">A slide-by-slide guide on structuring a compelling narrative for investors.</p>
              <div className="mt-auto">
                <Button fullWidth variant="secondary">Download PDF</Button>
              </div>
            </Card>
          </Reveal>
        ))}
      </section>
    </PageWrapper>
  );
}
