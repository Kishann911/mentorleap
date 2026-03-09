"use client";
import PageWrapper from "@/components/layout/PageWrapper";
import { Reveal } from "@/components/ui/Animation";
import { SectionHeading, GradientText, Paragraph } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export default function BlogListingPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-[100px] max-w-[1200px] mx-auto text-center">
        <Reveal>
          <SectionHeading>Insights & <GradientText>Perspectives</GradientText></SectionHeading>
          <Paragraph className="max-w-[600px] mx-auto mt-4">Read our latest thoughts on leadership, communication, and executive growth.</Paragraph>
        </Reveal>
      </section>
      
      <section className="px-5 pb-[140px] max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Reveal key={i} delay={(i%3) * 0.1}>
            <Link href={`/blog/article-${i}`}>
              <Card className="h-full flex flex-col group p-0 overflow-hidden !rounded-2xl border border-white/5 hover:border-[#00e5ff]/50 transition-colors">
                <div className="aspect-video bg-[#0f172a] w-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500 text-3xl">📝</div>
                <div className="p-6">
                  <div className="text-[#00e5ff] text-xs font-bold uppercase tracking-wider mb-3">Leadership</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#00e5ff] transition-colors">How to Overcome Imposter Syndrome in the C-Suite</h3>
                  <p className="text-[#94a3b8] text-sm">Discover the strategic frameworks used by top Fortune 500 executives to navigate self-doubt and communicate with authority.</p>
                  <p className="text-xs text-[#cbd5f5] mt-6">March 12, 2026 • 5 Min Read</p>
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </section>
    </PageWrapper>
  );
}
