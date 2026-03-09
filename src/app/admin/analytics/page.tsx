"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { BarChart, LineChart, PieChart, Activity, TrendingUp, Users, Calendar } from "lucide-react";

export default function AdminAnalytics() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) return <div className="h-full flex items-center justify-center p-20"><Loader /></div>;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="mb-12">
                <h1 className="text-3xl font-black mb-2 tracking-tight text-white">Platform Analytics</h1>
                <p className="text-[#94a3b8] font-bold text-[10px] uppercase tracking-[0.2em]">Real-time performance metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <MetricCard title="Sales Velocity" value="₹12.4k" change="+8.2%" icon={<TrendingUp size={20} />} />
                <MetricCard title="Enrollment Rate" value="64%" change="+14%" icon={<Activity size={20} />} />
                <MetricCard title="Waitlist Active" value="128" change="-4%" icon={<Users size={20} />} />
                <MetricCard title="Upcoming Sessions" value="8" change="Stable" icon={<Calendar size={20} />} />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">
                <Card className="!p-8 bg-white/[0.03] border-white/10 h-[400px]">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="font-bold text-white">Revenue Growth (30 Days)</h3>
                        <div className="flex gap-2 items-center">
                            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]"></span>
                            <span className="text-[10px] text-[#cbd5f5] font-black uppercase tracking-widest">Gross Income</span>
                        </div>
                    </div>
                    <div className="h-full flex items-end gap-3 pb-20 justify-between">
                        {[40, 60, 45, 90, 65, 80, 100, 70, 85, 95].map((h, i) => (
                            <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group transition-all hover:bg-[#00e5ff]/30" style={{ height: `${h}%` }}>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#00e5ff] text-black text-[10px] font-black py-1 px-2 rounded hidden group-hover:block whitespace-nowrap shadow-xl">₹{h * 100}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="!p-8 bg-white/[0.03] border-white/10 h-[400px]">
                    <h3 className="font-bold text-white mb-10">User Retention Strategy</h3>
                    <div className="space-y-7">
                        <RetentionRow label="Curriculum Engagement" value={85} color="bg-blue-500" />
                        <RetentionRow label="Community Participation" value={42} color="bg-purple-500" />
                        <RetentionRow label="Certificate Completion" value={28} color="bg-[#00e5ff]" />
                        <RetentionRow label="Resource Downloads" value={72} color="bg-emerald-500" />
                    </div>
                </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Card className="!p-0 overflow-hidden bg-white/[0.03] border-white/10">
                        <div className="p-6 border-b border-white/10 font-bold text-white bg-white/[0.02]">Top Performing Modules</div>
                        <div className="p-0">
                            <RankingRow name="Advanced Communications" enrollments={450} rating={4.9} />
                            <RankingRow name="Executive Leadership" enrollments={320} rating={4.8} />
                            <RankingRow name="Strategic Negotiation" enrollments={280} rating={4.7} />
                            <RankingRow name="Public Speaking Pro" enrollments={190} rating={4.9} />
                        </div>
                    </Card>
                </div>
                <Card className="!p-8 bg-[#00e5ff] text-black border-none shadow-[0_20px_60px_rgba(0,229,255,0.4)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                    <h3 className="font-black uppercase tracking-[0.2em] text-[10px] mb-8 opacity-70">System Health</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-black/10 pb-4">
                            <span className="text-sm font-black opacity-70">Uptime</span>
                            <span className="text-xl font-black tracking-tighter">99.98%</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-black/10 pb-4">
                            <span className="text-sm font-black opacity-70">API Latency</span>
                            <span className="text-xl font-black tracking-tighter">124ms</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-black opacity-70">DB Load</span>
                            <span className="text-xl font-black tracking-tighter">Low</span>
                        </div>
                    </div>
                    <div className="mt-12 p-4 bg-black/10 rounded-xl border border-black/10">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Last Deployment</p>
                        <p className="text-xs font-black">2 hours ago (v1.4.2)</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function MetricCard({ title, value, change, icon }: any) {
    return (
        <Card className="!p-6 bg-white/[0.03] border-white/10 hover:border-[#00e5ff]/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#cbd5f5]">{icon}</div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${change.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-amber-400 bg-amber-400/10'}`}>{change}</span>
            </div>
            <div className="text-[10px] text-[#94a3b8] font-black uppercase tracking-widest mb-1">{title}</div>
            <div className="text-3xl font-black tracking-tighter text-white">{value}</div>
        </Card>
    );
}

function RetentionRow({ label, value, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                <span className="text-[#cbd5f5]">{label}</span>
                <span className="text-white bg-white/5 px-2 py-0.5 rounded">{value}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className={`h-full ${color} transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.1)]`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}

function RankingRow({ name, enrollments, rating }: any) {
    return (
        <div className="px-8 py-5 border-b border-white/5 flex justify-between items-center hover:bg-white/[0.02] transition-all group">
            <div>
                <div className="font-bold text-sm mb-1 text-white group-hover:text-[#00e5ff] transition-colors">{name}</div>
                <div className="text-[10px] text-[#94a3b8] font-black uppercase tracking-widest">{enrollments} Students</div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#facc15]/10 text-[#facc15] px-3 py-1.5 rounded-xl border border-[#facc15]/20 shadow-lg shadow-[#facc15]/5">
                <span className="text-xs font-black">{rating}</span>
                <span className="text-[10px] mb-0.5">★</span>
            </div>
        </div>
    );
}
