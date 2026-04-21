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
          50: "#FBF6E8",
          100: "#F5E9C4",
          200: "#EBD38A",
          300: "#DFBC56",
          400: "#D1A838",
          500: "#CAA048",
          600: "#B0862F",
          700: "#8A6823",
          800: "#5F4717",
          900: "#3A2B0D",
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
          "linear-gradient(120deg, #CAA048 0%, #E8C874 50%, #CAA048 100%)",
        "gold-shimmer":
          "linear-gradient(90deg, transparent, rgba(202,160,72,0.25), transparent)",
      },
    },
  },
  plugins: [],
};
export default config;
