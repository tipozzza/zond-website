import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Side } from "@/lib/types";

async function loadSides(): Promise<Side[]> {
  const raw = await fs.readFile(path.join(process.cwd(), "public", "data", "sides.json"), "utf-8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? data : (data.sides ?? []);
}
// транслит: кириллические А/В (и строчные) -> латинские A/B, плюс trim/upper/decode
const slug = (s: string) =>
  decodeURIComponent(s).trim().toUpperCase().replace(/А/g, "A").replace(/В/g, "B");

export async function generateStaticParams() {
  const sides = await loadSides();
  const seen = new Set<string>();
  const out: { id: string }[] = [];
  for (const s of sides) {
    if (!s.id) continue;
    const id = slug(s.id);
    if (!seen.has(id)) { seen.add(id); out.push({ id }); }
  }
  return out;
}
async function findSide(id: string) {
  const sides = await loadSides();
  const t = slug(id);
  return sides.find((s) => s.id && slug(s.id) === t);
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const side = await findSide(id);
  if (!side) return { title: "Конструкция не найдена — Зонд-Реклама", robots: { index: false, follow: false } };
  const title = `Конструкция №${side.construction} сторона ${side.side} — Зонд-Реклама`;
  const img = side.photo_filename ? `/images/constructions/${side.photo_filename}` : undefined;
  return {
    title,
    description: `${side.address}. Формат ${side.format}. Рекламная конструкция в Томске.`,
    robots: { index: false, follow: false },
    openGraph: { title, images: img ? [img] : [] },
  };
}

export default async function ConstructionPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const side = await findSide(id);
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
