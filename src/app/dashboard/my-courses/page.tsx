"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import Link from "next/link";

export default function MyCoursesPage() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        // Fetch real dynamic enrolled courses
        setTimeout(() => {
            setCourses([]); // Replace with API call later if needed
            setLoading(false);
        }, 800);
    }, []);

    if (loading) return <div className="p-20 flex justify-center"><Loader /></div>;

    return (
        <div className="max-w-6xl mx-auto pb-20 p-10">
            <h1 className="text-3xl font-black mb-6 tracking-tight text-white">My Learning Path</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length === 0 ? (
                    <Card className="!p-8 bg-white/[0.03] border-white/10 col-span-full text-center">
                        <p className="text-[#94a3b8] mb-4">You have not enrolled in any courses yet.</p>
                        <Link href="/resources/courses/public-speaking">
                           <button className="px-6 py-2 bg-[#00e5ff] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white hover:text-black transition-colors">
                              Explore Courses
                           </button>
                        </Link>
                    </Card>
                ) : (
                    courses.map((course, i) => (
                        <Card key={i} className="!p-4 bg-white/[0.03] border-white/10">
                            {/* Course Item */}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
