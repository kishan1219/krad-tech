import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050814",
        surface: {
          DEFAULT: "#0B1120",
          light: "#111A2E",
          card: "rgba(11, 17, 32, 0.8)",
          glass: "rgba(10, 15, 29, 0.65)",
        },
        brand: {
          cyan: "#00D2FE",
          cyanHover: "#38BDF8",
          blue: "#2563EB",
          indigo: "#6366F1",
          violet: "#8B5CF6",
          darkNavy: "#050814",
          slate: "#0F172A",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          cyanGlow: "rgba(0, 210, 254, 0.3)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-cyan-indigo": "linear-gradient(135deg, #00D2FE 0%, #6366F1 100%)",
        "gradient-dark-glow": "radial-gradient(circle at 50% 0%, rgba(0, 210, 254, 0.12) 0%, transparent 65%)",
      },
      boxShadow: {
        "cyan-glow": "0 0 25px -5px rgba(0, 210, 254, 0.3)",
        "cyan-lg": "0 0 50px -10px rgba(0, 210, 254, 0.35)",
        "card-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
