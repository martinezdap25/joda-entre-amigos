import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0a0a12",
          light: "#12121f",
          lighter: "#1a1a2e",
        },
        brand: {
          fire: "#FF6B35",
          pink: "#E040FB",
          cyan: "#00E5FF",
          yellow: "#FFEA00",
          red: "#FF1744",
          orange: "#FF9100",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-up-delay": "fadeUp 0.6s ease-out 0.15s forwards",
        "card-in": "cardIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        cardIn: {
          from: { opacity: "0", transform: "scale(0.92) translateY(30px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translate(0,0)" },
          "25%": { transform: "translate(15px,-25px)" },
          "50%": { transform: "translate(-10px,-50px)" },
          "75%": { transform: "translate(20px,-25px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
