"use client";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Animation";

export default function DashboardOverview() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Reveal>
        <h1 className="text-3xl font-bold mb-2">Welcome Back, Student!</h1>
        <p className="text-[#94a3b8] mb-10">Here's an overview of your progress and upcoming activities.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="!p-6 text-center">
            <div className="text-4xl font-bold text-[#00e5ff] mb-2">2</div>
            <div className="text-[#cbd5f5] text-sm">Active Courses</div>
          </Card>
          <Card className="!p-6 text-center">
            <div className="text-4xl font-bold text-[#6366f1] mb-2">1</div>
            <div className="text-[#cbd5f5] text-sm">Upcoming Events</div>
          </Card>
          <Card className="!p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">3</div>
            <div className="text-[#cbd5f5] text-sm">Certificates Earned</div>
          </Card>
        </div>

        <h2 className="text-xl font-bold mb-6">Continue Learning</h2>
        <Card className="flex gap-6 items-center flex-wrap">
          <div className="w-32 h-20 bg-white/10 rounded-lg flex items-center justify-center text-2xl">📈</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">Public Speaking Masterclass</h3>
            <div className="mt-2 w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-[#00e5ff] h-full w-[65%]"></div>
            </div>
            <p className="text-xs text-[#94a3b8] mt-2">65% Complete</p>
          </div>
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Resume</button>
        </Card>
      </Reveal>
    </div>
  );
}
