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
        // Главный фирменный — из обновлённого брендбука (#6F395D).
        // Тёплый бордово-фиолетовый. Предыдущие #3D2E91/#3949AB/#7B1FA2/#550082 устарели.
        brand: {
          DEFAULT: "#6F395D",
          hover: "#5E2F4F",
          active: "#4F2542",
          dark: "#4F2542",
          light: "#F1E7ED",
          50: "#F1E7ED",
          100: "#E3CFDA",
          200: "#C79FB5",
          300: "#AB7090",
          400: "#8F516F",
          500: "#6F395D",
          600: "#5E2F4F",
          700: "#4F2542",
          800: "#3F1D34",
          900: "#2F1626",
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
