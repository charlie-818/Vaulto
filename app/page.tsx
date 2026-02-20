import { BackgroundVideo } from "@/components/BackgroundVideo";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { BookConsultation } from "@/components/BookConsultation";
import { Footer } from "@/components/Footer";
import { ServicesCardProvider } from "@/contexts/ServicesCardContext";

export default function Home() {
  return (
    <ServicesCardProvider>
      <div className="relative z-10">
        <section className="relative min-h-screen flex items-start snap-start">
          <BackgroundVideo />
          <Hero />
        </section>
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div
          className="bg-white snap-start [--vaulto-bg:white] [--vaulto-fg:#0f172a] [--vaulto-muted:#64748b] [--vaulto-border:rgba(15,23,42,0.12)] [--vaulto-card:#f8fafc]"
        >
          <main className="bg-[var(--vaulto-bg)]">
            <Services />
            <BookConsultation />
          </main>
          <Footer />
        </div>
      </div>
    </ServicesCardProvider>
  );
}
