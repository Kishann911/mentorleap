"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { useAuth } from "@/components/providers/AuthProvider";
import { updatePassword, deleteUser, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
    Bell,
    Moon,
    Smartphone,
    Globe,
    Lock,
    Eye,
    EyeOff,
    Mail,
    Zap,
    ShieldAlert
} from "lucide-react";

export default function SettingsPage() {
    const { user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [updating, setUpdating] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" as "success" | "error" });

    const handleUpdatePassword = async () => {
        if (!user || !newPassword) return;
        if (newPassword.length < 6) return setToast({ show: true, message: "Password must be at least 6 characters", type: "error" });

        setUpdating(true);
        try {
            await updatePassword(user, newPassword);
            setToast({ show: true, message: "Password updated successfully!", type: "success" });
            setNewPassword("");
        } catch (error: any) {
            setToast({ show: true, message: error.message || "Failed to update password. You may need to re-login.", type: "error" });
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        if (confirm("🚨 WARNING: This will permanently delete your MentorLeap account and all progress. This cannot be undone. Proceed?")) {
            try {
                // Delete from Firestore happens via a cleanup worker or simple API if needed, 
                // but primary account is deleted here.
                await deleteUser(user);
                await signOut(auth);
                window.location.href = "/";
            } catch (error: any) {
                setToast({ show: true, message: "Security sensitive action. Please re-login before deleting your account.", type: "error" });
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div>
                <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
                <p className="text-[#94a3b8]">Optimize your learning experience and privacy.</p>
            </div>

            <div className="space-y-6">
                {/* Preference Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="!p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center">
                                <Bell size={20} />
                            </div>
                            <h3 className="font-bold">Notifications</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <span className="text-sm text-[#cbd5f5]">Class Reminders</span>
                                <div className="w-10 h-5 bg-[#00e5ff] rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <span className="text-sm text-[#cbd5f5]">Email Marketing</span>
                                <div className="w-10 h-5 bg-white/10 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-3 h-3 bg-white/40 rounded-full"></div></div>
                            </div>
                        </div>
                    </Card>

                    <Card className="!p-8 border-[#6366f1]/20 bg-gradient-to-br from-[#6366f1]/5 to-transparent">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center">
                                <Zap size={20} />
                            </div>
                            <h3 className="font-bold">Preferences</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Moon size={16} className="text-[#94a3b8]" />
                                    <span className="text-sm text-[#cbd5f5]">Dark Mode</span>
                                </div>
                                <span className="text-[10px] font-bold text-[#00e5ff] uppercase">Always On</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Globe size={16} className="text-[#94a3b8]" />
                                    <span className="text-sm text-[#cbd5f5]">Language</span>
                                </div>
                                <span className="text-xs text-white font-medium">English (US)</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Security Section */}
                <Card className="!p-10 border-red-500/10 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/5 blur-3xl -z-10 rounded-full"></div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center text-xl">🛡️</div>
                        <h3 className="font-bold text-xl">Password & Security</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-[#475569] uppercase tracking-widest pl-1 flex items-center gap-2">
                                    <Lock size={12} /> New Password
                                </p>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3.5 px-5 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00e5ff]/50 transition-all font-medium"
                                    />
                                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white transition-colors">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <Button
                                    variant="outline"
                                    fullWidth
                                    disabled={updating || !newPassword}
                                    onClick={handleUpdatePassword}
                                >
                                    {updating ? "Saving..." : "Update Password"}
                                </Button>
                                <p className="text-[10px] text-[#475569] px-1 italic">Note: For security, you might be asked to log in again.</p>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-red-500/[0.02] border border-red-500/10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 text-red-500 mb-3">
                                    <ShieldAlert size={20} />
                                    <h4 className="font-bold text-sm">Danger Zone</h4>
                                </div>
                                <p className="text-xs text-[#94a3b8] leading-relaxed">
                                    Once you delete your account, there is no going back. All your course progress, certificates, and registrations will be permanently erased.
                                </p>
                            </div>
                            <button
                                onClick={handleDeleteAccount}
                                className="text-left text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-widest mt-6 hover:underline transition-all"
                            >
                                Deactivate My Account
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Support Section */}
                <div className="flex justify-center pt-8">
                    <div className="flex items-center gap-6 px-8 py-3 bg-white/[0.02] border border-white/5 rounded-full backdrop-blur-sm">
                        <span className="text-[10px] font-bold text-[#475569] uppercase tracking-[0.2em]">Quick Support</span>
                        <a href="mailto:support@mentorleap.com" className="flex items-center gap-2 text-xs text-[#00e5ff] hover:underline font-bold">
                            <Mail size={14} /> support@mentorleap.com
                        </a>
                        <div className="w-1 h-1 bg-[#475569] rounded-full"></div>
                        <a href="https://wa.me/91XXXXXXXXXX" target="_blank" className="flex items-center gap-2 text-xs text-[#cbd5f5] hover:underline font-bold">
                            <Smartphone size={14} /> WhatsApp Support
                        </a>
                    </div>
                </div>
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
