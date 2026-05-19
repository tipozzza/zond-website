export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zond-website.vercel.app/#organization",
        name: "Зонд-Реклама",
        alternateName: "ГК Зонд-Реклама",
        legalName: "ООО Формат Сити",
        url: "https://zond-website.vercel.app",
        logo: "https://zond-website.vercel.app/logo-square-purple.png",
        foundingDate: "1992",
        sameAs: [
          "https://vk.com/zond.reklama",
          "https://t.me/zond_reklama",
          "https://2gis.ru/tomsk/firm/422740746045730",
          "https://lightovo.ru",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://zond-website.vercel.app/#localbusiness",
        name: "Зонд-Реклама",
        image: "https://zond-website.vercel.app/og-image.jpg",
        telephone: "+7-3822-97-97-05",
        email: "office@zondreklama.ru",
        url: "https://zond-website.vercel.app",
        address: {
          "@type": "PostalAddress",
          streetAddress: "пр. Фрунзе, 115",
          addressLocality: "Томск",
          postalCode: "634021",
          addressRegion: "Томская область",
          addressCountry: "RU",
        },
        geo: { "@type": "GeoCoordinates", latitude: 56.4847, longitude: 84.9756 },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "15:00",
          },
        ],
        priceRange: "₽₽",
        areaServed: [
          { "@type": "City", name: "Томск" },
          { "@type": "AdministrativeArea", name: "Томская область" },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
