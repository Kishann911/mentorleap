import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      <Header />
      <main className="flex-1 pt-[80px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
