import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DynamicBackground from "@/components/layout/DynamicBackground";
import AICloudBackground from "@/components/layout/AICloudBackground";
import CursorParticles from "@/components/layout/CursorParticles";
import FloatingChatbot from "@/components/layout/FloatingChatbot";
import Header from "@/components/layout/Header";
import OfferBanner from "@/components/layout/OfferBanner";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MentorLeap — AI-Powered Professional Development",
  description:
    "Transform your leadership communication and career clarity with MentorLeap and MISHA AI, founded by Mridu Bhandari.",
};

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
        {/* GLOBAL BACKGROUND LAYERS */}
        <AICloudBackground />
        <DynamicBackground />

        {/* CURSOR */}
        <CursorParticles />

         {/* OFFER BANNER — sits just below header */}
         <OfferBanner />

        {/* FIXED HEADER */}
        <Header />

       

        {/* PAGE CONTENT */}
        <main style={{ paddingTop: "70px" }}>
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

        {/* FLOATING CHATBOT */}
        <FloatingChatbot />
      </body>
    </html>
  );
}