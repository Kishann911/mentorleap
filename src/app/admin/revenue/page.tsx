"use client";
import { Card } from "@/components/ui/Card";

export default function AdminRevenue() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Revenue Reports</h1>
        <p className="text-[#94a3b8]">Monitor sales across all programs and resources.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="!p-6"><h3 className="text-sm text-[#94a3b8] mb-1">Total Revenue</h3><div className="text-4xl font-bold text-[#00e5ff]">$40,290</div></Card>
        <Card className="!p-6"><h3 className="text-sm text-[#94a3b8] mb-1">This Month</h3><div className="text-4xl font-bold text-white">$8,450</div></Card>
        <Card className="!p-6"><h3 className="text-sm text-[#94a3b8] mb-1">Projected MRR</h3><div className="text-4xl font-bold text-green-400">$10,200</div></Card>
      </div>
      <Card className="h-[400px] flex items-center justify-center text-[#94a3b8]">
        Revenue Graph Placeholder
      </Card>
    </div>
  );
}
