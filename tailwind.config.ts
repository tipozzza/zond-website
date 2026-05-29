import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Главный фирменный фиолетовый — из брендбука (#550082).
        // Все три старых варианта (#3D2E91, #3949AB, #7B1FA2) сведены сюда.
        brand: {
          DEFAULT: "#550082",
          hover: "#42006B",
          active: "#36005A",
          dark: "#36005A",
          light: "#F1E6F8",
          50: "#F1E6F8",
          100: "#E2CDF1",
          200: "#C59BE3",
          300: "#A678D1",
          400: "#8854B3",
          500: "#550082",
          600: "#42006B",
          700: "#36005A",
          800: "#2A0048",
          900: "#1F0030",
        },
        // 6 цветов направлений (из брендбука)
        section: {
          outdoor: "#E30613",      // Наружная реклама
          print: "#F39200",        // Широкоформатная печать
          production: "#FFD700",   // Производство
          exhibition: "#7AA02E",   // Выставочные экспозиции
          design: "#00AEEF",       // Дизайн и полиграфия
          led: "#6F2E91",          // Светодиодная продукция
        },
        // Акцент розовый (для градиентов и подсветки)
        accent: {
          pink: "#FF6BB4",
          yellow: "#FFD700",
        },
      },
      fontFamily: {
        sans: ["var(--font-rubik)", "system-ui", "sans-serif"],
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "zond-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in-soft": "zond-fade-in 0.6s ease-out both",
        "slide-in-left": "zond-slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "zond-scale-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "ken-burns": "zond-ken-burns 8s linear both",
      },
    },
  },
  plugins: [],
};

export default config;
