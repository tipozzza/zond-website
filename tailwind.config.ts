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
        // Главный фирменный фиолетовый (логотип)
        brand: {
          DEFAULT: "#3D2E91",
          dark: "#2A1F66",
          light: "#5E4FB8",
          50: "#f4f2fb",
          100: "#e9e6f6",
          200: "#d4cdee",
          300: "#b8aee2",
          400: "#9787d2",
          500: "#7866c1",
          600: "#6450b0",
          700: "#544299",
          800: "#3D2E91",
          900: "#2A1F66",
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
