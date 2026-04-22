import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["var(--font-tajawal)", "Tajawal", "Cairo", "sans-serif"],
        english: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        maad: {
          50: "#fbf9f2",
          100: "#f5f0de",
          200: "#eadbb6",
          300: "#e0c58a",
          400: "#d6b05d",
          500: "#c79a31",
          600: "#b08325",
          700: "#8e671d",
          800: "#72511a",
          900: "#5f4218",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rtl": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up": "accordion-up 0.22s ease-out",
        shimmer: "shimmer 2.4s linear infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-rtl": "marquee-rtl 40s linear infinite",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(120deg, #b08325 0%, #e0c58a 50%, #c79a31 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent, rgba(199,154,49,0.25), transparent)",
      },
    },
  },
  plugins: [],
};
export default config;
