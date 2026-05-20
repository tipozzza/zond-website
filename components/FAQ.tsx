"use client";

import { useState } from "react";

type Item = { question: string; answer: string };

export default function FAQ({
  items,
  title = "Часто задаваемые вопросы",
}: {
  items: Item[];
  title?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };

  return (
    <section className="py-16 bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{title}</h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-slate-50"
              >
                <span className="font-semibold pr-4">{item.question}</span>
                <span className="text-2xl text-slate-400">{openIdx === i ? "−" : "+"}</span>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-slate-700 leading-relaxed">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
