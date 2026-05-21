import { CLIENTS } from "@/lib/site-data";

export default function Clients() {
  return (
    <section className="py-14 bg-[#f6f5fa]">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-center text-xs text-gray-500 uppercase tracking-widest mb-9 font-semibold">Нам доверяют</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {CLIENTS.map((client) => (
            <div key={client} className="h-11 flex items-center justify-center text-lg font-extrabold text-gray-400 opacity-60 hover:opacity-100 hover:text-brand transition-all">
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
