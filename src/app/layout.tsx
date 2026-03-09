"use client";

import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import DynamicBackground from "@/components/layout/DynamicBackground";
import AICloudBackground from "@/components/layout/AICloudBackground";
import CursorParticles from "@/components/layout/CursorParticles";
import FloatingChatbot from "@/components/layout/FloatingChatbot";
import Header from "@/components/layout/Header";
import OfferBanner from "@/components/layout/OfferBanner";
import Footer from "@/components/layout/Footer";
import AuthProvider, { useAuth } from "@/components/providers/AuthProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAdmin, loading, user } = useAuth();

  const isAuthPath = pathname === "/login" || pathname === "/signup";
  const isAdminPath = pathname.startsWith("/admin");
  const isDashboardPath = pathname.startsWith("/dashboard");
  const isAppPath = isAdminPath || isDashboardPath || isAuthPath;

  useEffect(() => {
    if (!loading && user && pathname === "/") {
      router.replace(isAdmin ? "/admin" : "/dashboard");
    }
  }, [user, isAdmin, loading, pathname, router]);

  // For App/Admin/Auth paths: Clean layout without landing page elements
  if (isAppPath) {
    return (
      <main className="min-h-screen bg-[#020617] relative">
        {children}
      </main>
    );
  }

  // Marketing/Landing Page Layout
  return (
    <>
      <AICloudBackground />
      <DynamicBackground />
      <CursorParticles />
      <OfferBanner />
      <Header />
      <main style={{ paddingTop: "70px" }}>
        {children}
      </main>
      <Footer />
      <FloatingChatbot />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          background: "#020617",
          overflowX: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <AuthProvider>
          <QueryProvider>
            <LayoutContent>{children}</LayoutContent>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}