import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import MapPreview from "@/components/MapPreview";
import Cases from "@/components/Cases";
import Clients from "@/components/Clients";
import Timeline from "@/components/Timeline";
import News from "@/components/News";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";

export default function HomePage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <MapPreview />
        <Cases />
        <Clients />
        <Timeline />
        <News />
        <CTAForm />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
    </>
  );
}
