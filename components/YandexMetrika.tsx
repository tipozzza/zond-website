"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "zond-cookie-consent";
const TTL_DAYS = 365;

function hasValidConsent(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;
    const { ts } = JSON.parse(saved);
    return Date.now() - ts < TTL_DAYS * 86400 * 1000;
  } catch {
    return false;
  }
}

export default function YandexMetrika() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = () => {
      if (hasValidConsent()) setAllowed(true);
    };
    check();
    window.addEventListener("cookie-consent-given", check);
    return () => window.removeEventListener("cookie-consent-given", check);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="lazyOnload">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=109305123", "ym");

          ym(109305123, "init", {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true
          });
        `}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://mc.yandex.ru/watch/109305123"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
