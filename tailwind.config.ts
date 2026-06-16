import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17130f",
        espresso: "#143a3f",
        parchment: "#fbf3e4",
        sand: "#ead8ba",
        oat: "#f6ead7",
        olive: "#6f816e",
        bronze: "#bf8f3b",
        clay: "#c97c5d",
        wine: "#8a4b45",
        marigold: "#d8a84f",
        terracotta: "#c97352",
        sage: "#8aa394",
        teal: "#143a3f",
        navy: "#203747"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(20, 58, 63, 0.12)",
        card: "0 18px 45px rgba(20, 58, 63, 0.10)"
      },
      borderRadius: {
        xl2: "1.5rem"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
};

export default config;
