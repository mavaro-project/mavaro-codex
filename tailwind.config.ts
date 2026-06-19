import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        espresso: "#1E293B",
        parchment: "#FAFAF8",
        sand: "#F1EBE2",
        oat: "#F7F3EE",
        olive: "#64748B",
        bronze: "#D97706",
        clay: "#C44B3A",
        wine: "#DC2626",
        marigold: "#F59E0B",
        terracotta: "#E8604C",
        sage: "#6BA088",
        teal: "#0D9488",
        navy: "#1E3A5F",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0, 0, 0, 0.07)",
        card: "0 2px 16px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
