// Простая iframe-обёртка над виджетом Яндекс.Карт.
// Преимущества над JS API: не требует ключа, не имеет проблем с геокодером,
// Yandex сам резолвит адрес-строку и ставит метку.

const ADDRESS_QUERY = encodeURIComponent("Россия, Томск, проспект Фрунзе, 115");

export default function OfficeMap() {
  return (
    <iframe
      title="Офис ZOND — пр. Фрунзе, 115, Томск"
      src={`https://yandex.ru/map-widget/v1/?text=${ADDRESS_QUERY}&z=17`}
      loading="lazy"
      allow="fullscreen"
      className="w-full h-[400px] md:h-[500px] rounded-2xl border-0 shadow-xl bg-slate-100"
    />
  );
}
