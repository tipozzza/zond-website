import newsJson from "./news.json";

export type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

type NewsWithExternal = { slug: string; externalUrl?: string };

const newsRedirects: RedirectRule[] = (newsJson as NewsWithExternal[])
  .filter((n) => n.externalUrl)
  .map((n) => {
    const path = new URL(n.externalUrl!).pathname;
    return { source: path, destination: `/news/${n.slug}`, permanent: true };
  });

const manualRedirects: RedirectRule[] = [
  // Главная и базовые
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/main", destination: "/", permanent: true },

  // Услуги — наружная реклама
  { source: "/outdoor-reklama", destination: "/outdoor", permanent: true },
  { source: "/naruzhnaya-reklama", destination: "/outdoor", permanent: true },
  { source: "/billboards", destination: "/outdoor", permanent: true },

  // Услуги — печать
  { source: "/shirokoformatnaya-pechat", destination: "/print", permanent: true },
  { source: "/pechat", destination: "/print", permanent: true },

  // Услуги — производство
  { source: "/proizvodstvo", destination: "/production", permanent: true },
  { source: "/vyveski", destination: "/production", permanent: true },

  // Услуги — дизайн
  { source: "/dizajn", destination: "/design", permanent: true },
  { source: "/design-polygraphy", destination: "/design", permanent: true },
  { source: "/poligrafiya", destination: "/design", permanent: true },

  // Услуги — выставки
  { source: "/vystavki", destination: "/exhibition", permanent: true },
  { source: "/exhibition-stands", destination: "/exhibition", permanent: true },

  // Услуги — LED / Лайтово
  { source: "/illumination", destination: "/led", permanent: true },
  { source: "/svetodiodnye-girlyandy", destination: "/led", permanent: true },
  { source: "/lightovo", destination: "/led", permanent: true },
  { source: "/girlyandy-tomsk", destination: "/led", permanent: true },

  // О компании
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/o-kompanii", destination: "/about", permanent: true },

  // Контакты
  { source: "/contact", destination: "/contacts", permanent: true },
  { source: "/kontakty", destination: "/contacts", permanent: true },

  // Корень раздела новостей старого сайта
  { source: "/about/news", destination: "/news", permanent: true },
  // Легаси-новости старого сайта (даты, вложенные и битые пути) — все на /news
  { source: "/about/news/:path*", destination: "/news", permanent: true },
  // Легаси-контакты старого сайта
  { source: "/about/contacts", destination: "/contacts", permanent: true },
  // Catch-all для остальных старых под-путей /about/* (в т.ч. битые %EF%BF%BD) → /about.
  // :path+ (одна и более), а не :path*, чтобы НЕ поймать саму /about (иначе редирект-петля).
  // ВАЖНО: специфичные правила /about/* выше по списку срабатывают раньше.
  { source: "/about/:path+", destination: "/about", permanent: true },
  // Легаси-страница оборудования печати → секция «Оборудование» на /print
  { source: "/print/equipment", destination: "/print#equipment", permanent: true },

  // Свёрнутые в карточки на /production (раньше были отдельными страницами).
  // Якорь сохраняем — браузер прокрутит к нужной карточке.
  { source: "/panel-kronshteyny", destination: "/production#panel-kronshteyny", permanent: true },
  { source: "/neon", destination: "/production#neon", permanent: true },
];

export const REDIRECTS: RedirectRule[] = [...newsRedirects, ...manualRedirects];
