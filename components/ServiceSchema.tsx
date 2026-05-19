type Props = {
  serviceType: string;
  name: string;
  description: string;
  lowPrice: number;
  priceRange: string;
};

export default function ServiceSchema({
  serviceType,
  name,
  description,
  lowPrice,
  priceRange,
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    provider: { "@id": "https://zond-website.vercel.app/#organization" },
    areaServed: { "@type": "City", name: "Томск" },
    name,
    description,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      lowPrice,
      priceRange,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
