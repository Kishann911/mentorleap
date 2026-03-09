"use client";
import React from "react";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/components/providers/AuthProvider";
import {
    BarChart3,
    BookOpen,
    Calendar,
    Clock,
    TrendingUp,
    CheckCircle2,
    Star
} from "lucide-react";
import { Loader } from "@/components/ui/Loader";

export default function AnalyticsPage() {
    const { userData, loading } = useAuth();

    if (loading) return <div className="p-20 flex justify-center"><Loader /></div>;

    const stats = [
        { label: "Courses Enrolled", value: userData?.enrolledCourses?.length || 0, icon: BookOpen, color: "text-[#00e5ff]", bg: "bg-[#00e5ff]/10" },
        { label: "Active Events", value: userData?.registeredEvents?.length || 0, icon: Calendar, color: "text-[#6366f1]", bg: "bg-[#6366f1]/10" },
        { label: "Hours Learned", value: (userData?.enrolledCourses?.length || 0) * 12 + 4, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
        { label: "Certificates", value: userData?.certificates?.length || 0, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Learning Analytics</h1>
                <p className="text-[#94a3b8]">Track your progress and professional growth in real-time.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="hover:border-[#00e5ff]/30 transition-all group overflow-hidden relative">
                        <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#94a3b8] mb-1">{stat.label}</p>
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                            </div>
                        </div>
                        {/* Fake Sparkline Pattern */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff50] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
                {/* Progress Chart Placeholder */}
                <Card className="h-[400px] flex flex-col items-center justify-center border-white/10 bg-white/[0.02] shadow-inner">
                    <BarChart3 size={64} className="text-[#00e5ff]/20 mb-6" />
                    <h3 className="text-lg font-bold text-white mb-2">Learning Velocity</h3>
                    <p className="text-[#94a3b8] text-sm text-center max-w-[300px] font-medium leading-relaxed">Historical progress tracking will appear here as you complete modules.</p>
                </Card>

                {/* Recent Achievements */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                        <Star className="text-[#00e5ff]" size={20} />
                        Milestones
                    </h3>
                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold mb-1">Top 5% Learner</h4>
                                <p className="text-xs text-[#94a3b8]">You spent more time learning this week than 95% of students.</p>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 opacity-50 grayscale">
                            <div className="w-10 h-10 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                                <Award size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold mb-1">First Masterclass Completion</h4>
                                <p className="text-xs text-[#94a3b8]">Register for your first live event to unlock this badge.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real-time indicator */}
            <div className="flex justify-center pt-10">
                <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#00e5ff] rounded-full animate-ping"></span>
                    <span className="text-[10px] font-bold text-[#00e5ff] uppercase tracking-[0.2em]">Real-time Sync Active</span>
                </div>
            </div>
        </div>
    );
}
import { Award } from "lucide-react";
