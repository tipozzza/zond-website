import type { Metadata } from "next";
import { SERVICES } from "@/lib/site-data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Production from "@/components/Production";
import MapPreview from "@/components/MapPreview";
import Team from "@/components/Team";
import NewsBlock from "@/components/NewsBlock";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import Timeline from "@/components/Timeline";
import CTAForm from "@/components/CTAForm";
import FloatingTG from "@/components/FloatingTG";

export const metadata: Metadata = {
  title: "Зонд-Реклама — рекламное агентство в Томске с 1992 года",
  description:
    "Изготовление вывесок, печать баннеров, наружная реклама, дизайн логотипов в Томске. Собственное производство, гарантия 12 месяцев. Звоните: 8 (3822) 97-97-05",
  keywords: [
    "рекламное агентство Томск",
    "вывески Томск",
    "печать Томск",
    "логотип Томск",
    "баннер Томск",
    "Зонд-Реклама",
  ],
};

const BASE_URL = "https://zond-website.vercel.app";

const SERVICES_ITEM_LIST = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${BASE_URL}${s.href}`,
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_ITEM_LIST) }}
      />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Cases />
        <Production />
        <MapPreview />
        <Team />
        <NewsBlock />
        <Testimonials />
        <Clients />
        <Timeline />
        <CTAForm />
      </main>
      <Footer />
      <FloatingTG />
    </>
  );
}
