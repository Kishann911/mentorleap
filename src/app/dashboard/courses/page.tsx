"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Animation";
import Link from "next/link";

export default function MyCourses() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Reveal>
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-[#94a3b8] mb-10">Access your purchased programs and continue learning.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="flex flex-col h-full !p-6" hoverable={false}>
            <div className="aspect-video bg-[#0f172a] rounded-lg mb-4 flex items-center justify-center text-4xl">📚</div>
            <h3 className="text-lg font-bold mb-2">Public Speaking Mastery</h3>
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden"><div className="h-full bg-[#00e5ff] w-[65%]"></div></div>
            <p className="text-xs text-[#94a3b8] mb-6">65% Complete</p>
            <div className="mt-auto">
              <Link href="/course-player/public-speaking"><Button fullWidth>Resume Course</Button></Link>
            </div>
          </Card>

          <Card className="flex flex-col h-full !p-6" hoverable={false}>
            <div className="aspect-video bg-[#0f172a] rounded-lg mb-4 flex items-center justify-center text-4xl">💡</div>
            <h3 className="text-lg font-bold mb-2">Founders Communication Masterclass</h3>
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-2 overflow-hidden"><div className="h-full bg-[#00e5ff] w-0"></div></div>
            <p className="text-xs text-[#94a3b8] mb-6">0% Complete</p>
            <div className="mt-auto">
              <Link href="/course-player/founder-comms"><Button fullWidth variant="secondary">Start Course</Button></Link>
            </div>
          </Card>

          <Card className="flex flex-col justify-center items-center h-full !p-6 text-center border-dashed" hoverable={false}>
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl mb-4">+</div>
            <h3 className="text-lg font-bold mb-2">Find More Courses</h3>
            <p className="text-xs text-[#94a3b8] mb-4">Browse our library of premium content.</p>
            <Link href="/courses" className="text-sm text-[#00e5ff] hover:underline font-bold">Explore Courses</Link>
          </Card>
        </div>
      </Reveal>
    </div>
  );
}
