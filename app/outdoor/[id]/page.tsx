import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import sidesJson from "@/public/data/sides.json";
import type { Side } from "@/lib/types";
import { buildCanonicalMap, foldSide } from "@/lib/side-url";

const SIDES = (Array.isArray(sidesJson) ? sidesJson : ((sidesJson as { sides?: Side[] }).sides ?? [])) as Side[];
// Карта id → canonical (под-панели с одинаковым фото схлопнуты в одну букву).
const CANON = buildCanonicalMap(SIDES);
const canonicalRef = (s: Side) => CANON.get(s.id) ?? `${parseInt(s.construction, 10)}${foldSide(s.side)}`;

// Разбор ссылки на число (без ведущих нулей) + суффикс стороны.
// "028А1"→{28,"A1"}, "009"→{9,""}, "28"→{28,""}, "118B"→{118,"B"}, "28A"→{28,"A"}.
function parseRef(raw: string): { num: number; side: string } | null {
  const m = foldSide(raw).match(/^0*(\d+)(.*)$/);
  if (!m) return null;
  return { num: parseInt(m[1], 10), side: m[2] };
}

// Поиск стороны по ЛЮБОМУ варианту ссылки (028, 28, 028А, 028А1, 28B, любой
// регистр). Голый номер без буквы и «буква без под-индекса» (28A) → первая
// сторона на эту букву (натуральный порядок), сторона A по умолчанию.
const firstByLetter = (cands: Side[], letter: string) =>
  cands
    .filter((s) => foldSide(s.side).startsWith(letter))
    .sort((a, b) => a.side.localeCompare(b.side, "ru", { numeric: true }))[0];

function findSide(raw: string) {
  const ref = parseRef(raw);
  if (!ref) return undefined;
  const cands = SIDES.filter((s) => parseInt(s.construction, 10) === ref.num);
  if (cands.length === 0) return undefined;
  if (ref.side) {
    const exact = cands.find((s) => foldSide(s.side) === ref.side);
    if (exact) return exact;
    // "28A" (буква без под-индекса) → первая сторона на эту букву.
    if (/^[A-Z]$/.test(ref.side)) return firstByLetter(cands, ref.side);
    return undefined;
  }
  // Номер без стороны → сторона A (первая), иначе первая доступная.
  return firstByLetter(cands, "A") ?? cands[0];
}

export const dynamicParams = true; // неканонические варианты резолвятся и редиректят

export function generateStaticParams() {
  // Только уникальные канонические ref (схлопнутые группы дают один URL).
  return [...new Set(SIDES.map((s) => canonicalRef(s)))].map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const side = findSide(id);
  if (!side) return { title: "Конструкция не найдена — Зонд-Реклама", robots: { index: false, follow: false } };
  const canonical = canonicalRef(side);
  const title = `Конструкция №${side.construction} сторона ${side.side} — Зонд-Реклама`;
  const img = side.photo_filename ? `/images/constructions/${side.photo_filename}` : undefined;
  return {
    title,
    description: `${side.address}. Формат ${side.format}. Рекламная конструкция в Томске.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/outdoor/${canonical}` },
    openGraph: { title, images: img ? [img] : [] },
  };
}

export default async function ConstructionPhotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const side = findSide(id);
  if (!side) notFound();
  // Все варианты → единый канонический URL (постоянный 308-редирект).
  const canonical = canonicalRef(side);
  if (decodeURIComponent(id).trim() !== canonical) permanentRedirect(`/outdoor/${canonical}`);
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
