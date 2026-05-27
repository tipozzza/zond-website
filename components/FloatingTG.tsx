// Имя файла оставлено как FloatingTG для обратной совместимости импортов.
// По факту это плавающая группа мессенджеров: Telegram + MAX.

import MaxLink from "./MaxLink";

export default function FloatingTG() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a
        href="https://t.me/zond_reklama"
        target="_blank"
        rel="noopener"
        className="w-14 h-14 rounded-full bg-[#229ED9] text-white flex items-center justify-center text-2xl shadow-[0_12px_30px_rgba(34,158,217,0.4)] hover:scale-110 transition-transform"
        title="Написать в Telegram"
        aria-label="Написать в Telegram"
      >
        ✈️
      </a>
      <MaxLink
        className="w-14 h-14 rounded-full bg-[#7B61FF] text-white flex items-center justify-center text-xl font-extrabold shadow-[0_12px_30px_rgba(123,97,255,0.4)] hover:scale-110 transition-transform"
        title="Написать в MAX (+7 923 400-97-05)"
        ariaLabel="Написать в MAX"
      >
        M
      </MaxLink>
    </div>
  );
}
