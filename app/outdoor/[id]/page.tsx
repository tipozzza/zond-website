import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import sidesJson from "@/public/data/sides.json";
import type { Side } from "@/lib/types";

const SIDES = (Array.isArray(sidesJson) ? sidesJson : ((sidesJson as { sides?: Side[] }).sides ?? [])) as Side[];
const slug = (s: string) =>
  decodeURIComponent(s).trim().toUpperCase().replace(/А/g, "A").replace(/В/g, "B");
function findSide(id: string) {
  const t = slug(id);
  // 1) Exact match by (now unique) id — enables per-side links like /outdoor/118B.
  const exact = SIDES.find((s) => s.id && slug(s.id) === t);
  if (exact) return exact;
  // 2) Backward-compat fallback for legacy bare links like /outdoor/118:
  //    match by construction number, returning the first side (side A), as before.
  return SIDES.find((s) => s.construction && slug(s.construction) === t);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const side = findSide(id);
  if (!side) return { title: "Конструкция не найдена — Зонд-Реклама", robots: { index: false, follow: false } };
  const title = `Конструкция №${side.construction} сторона ${side.side} — Зонд-Реклама`;
  const img = side.photo_filename ? `/images/constructions/${side.photo_filename}` : undefined;
  return { title, description: `${side.address}. Формат ${side.format}. Рекламная конструкция в Томске.`, robots: { index: false, follow: false }, openGraph: { title, images: img ? [img] : [] } };
}

export default async function ConstructionPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const side = findSide(id);
  if (!side) notFound();
  const photo = side.photo_filename ? `/images/constructions/${side.photo_filename}` : null;
  return (
    <>
      <Header />
      <main className="max-w-[1000px] mx-auto px-4 py-10">
        <Link href="/outdoor#map" className="text-brand text-sm font-semibold">← Все конструкции на карте</Link>
        <h1 className="text-2xl md:text-3xl font-bold mt-3 mb-5">Конструкция №{side.construction} · сторона {side.side}</h1>
        {photo ? (
          <img src={photo} alt={`Рекламная конструкция №${side.construction} ${side.side} в Томске — ZOND`} className="w-full rounded-2xl shadow-lg mb-6" />
        ) : <p className="text-slate-500 mb-6">Фото не загружено.</p>}
        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <div><dt className="text-slate-500">Адрес</dt><dd className="font-medium">{side.address}</dd></div>
          <div><dt className="text-slate-500">Формат</dt><dd className="font-medium">{side.format}</dd></div>
          <div><dt className="text-slate-500">Тип</dt><dd className="font-medium">{side.type}</dd></div>
          <div><dt className="text-slate-500">Подсветка</dt><dd className="font-medium">{side.illuminated ? "есть" : "нет"}</dd></div>
        </dl>
        <Link href="/outdoor#map" className="inline-block mt-8 bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-xl font-semibold">Забронировать / открыть на карте</Link>
      </main>
      <Footer />
    </>
  );
}
