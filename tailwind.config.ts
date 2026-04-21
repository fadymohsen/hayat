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
          50: "#F5F5EC",
          100: "#EAEAD3",
          200: "#D4D4A8",
          300: "#BABA7D",
          400: "#A2A25A",
          500: "#8B8B3E",
          600: "#747432",
          700: "#5D5D28",
          800: "#46461E",
          900: "#2F2F14",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up": "accordion-up 0.22s ease-out",
        shimmer: "shimmer 2.4s linear infinite",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(120deg, #8B8B3E 0%, #BABA7D 50%, #8B8B3E 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent, rgba(139,139,62,0.25), transparent)",
      },
    },
  },
  plugins: [],
};
export default config;
