"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Mail, Shield, Camera, Check } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Toast } from "@/components/ui/Toast";

export default function ProfilePage() {
    const { userData, user, loading } = useAuth();
    const [name, setName] = useState("");
    const [updating, setUpdating] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });

    useEffect(() => {
        if (userData) setName(userData.name);
    }, [userData]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setUpdating(true);
        try {
            // 1. Update Firebase Auth Profile
            await updateProfile(user, { displayName: name });

            // 2. Update Firestore Document
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { name });

            setToast({ show: true, message: "Profile updated successfully!", type: "success" });
        } catch (error: any) {
            setToast({ show: true, message: error.message || "Failed to update profile", type: "error" });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                <p className="text-[#94a3b8]">Manage your personal information and account identity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-start">
                {/* Avatar Card */}
                <Card className="text-center p-10 flex flex-col items-center">
                    <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#6366f1] p-1 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                            <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center overflow-hidden">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={64} className="text-[#00e5ff]" />
                                )}
                            </div>
                        </div>
                        <button className="absolute bottom-1 right-1 w-10 h-10 bg-[#00e5ff] rounded-full border-4 border-[#020617] flex items-center justify-center text-black hover:scale-110 transition-transform">
                            <Camera size={16} />
                        </button>
                    </div>
                    <h3 className="text-xl font-bold">{userData?.name || "Student"}</h3>
                    <p className="text-[#00e5ff] text-xs font-bold uppercase tracking-[0.2em] mt-1">{userData?.role || "Basic User"}</p>
                </Card>

                {/* Profile Form */}
                <Card className="!p-8">
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#475569] uppercase tracking-widest pl-1 flex items-center gap-2">
                                        <User size={12} /> Full Name
                                    </label>
                                    <Input
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                        placeholder="Your full name"
                                        className="bg-white/[0.02] border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#475569] uppercase tracking-widest pl-1 flex items-center gap-2">
                                        <Mail size={12} /> Email Address
                                    </label>
                                    <Input
                                        value={userData?.email || ""}
                                        disabled
                                        className="bg-white/[0.01] border-white/5 opacity-60 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 mt-6">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                    <Shield size={20} className="text-purple-400" />
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-white mb-0.5">Account Security</p>
                                        <p className="text-[10px] text-[#94a3b8]">Verified Account • Your data is protected with 256-bit encryption.</p>
                                    </div>
                                    <Check size={16} className="text-emerald-400" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={updating} className="min-w-[160px] shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                                {updating ? "Saving Changes..." : "Update Profile"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>

            <Toast
                isVisible={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
}
