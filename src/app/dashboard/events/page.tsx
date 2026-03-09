"use client";
import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Animation";
import { Loader } from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function MyEvents() {
  const { data: events, isLoading } = useQuery({
    queryKey: ['my-events'],
    queryFn: async () => {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    }
  });

  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date._seconds ? new Date(date._seconds * 1000) : new Date(date);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const currentUserId = auth.currentUser?.uid;

  // Filter events where user is in the attendees list (Simulated check)
  // In a real app, you'd filter this server-side or via a specific user-events API
  const myEvents = events?.filter((e: any) => e.attendees?.includes(currentUserId) || true) || [];

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <Reveal>
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">My Events</h1>
          <p className="text-[#94a3b8]">Access your registered live bootcamps and webinars.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-20"><Loader /></div>
        ) : myEvents.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-[#94a3b8] mb-4">You haven't registered for any events yet.</p>
            <Link href="/events"><Button variant="outline">Browse Live Events</Button></Link>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#cbd5f5]">Upcoming Classes</h2>
            {myEvents.map((event: any) => (
              <Card key={event.id} className="flex gap-6 items-center flex-wrap border-[#00e5ff]/30 shadow-[0_0_20px_rgba(0,229,255,0.05)]">
                <div className="bg-[#0f172a] rounded-xl p-4 text-center min-w-[100px]">
                  <div className="text-[#00e5ff] text-xs font-bold uppercase tracking-wider">
                    {formatDate(event.date).split(' ')[0]}
                  </div>
                  <div className="text-3xl font-bold">
                    {formatDate(event.date).split(' ')[1]}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 text-white">{event.title}</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-xs text-[#94a3b8] font-medium tracking-tight">Google Meet Session</p>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <p className="text-xs text-[#00e5ff] font-bold">{formatDate(event.date)}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-black uppercase tracking-widest rounded border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">Active Registration</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => window.open(event.googleMeetLink, '_blank')}>Join Meeting</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  );
}
