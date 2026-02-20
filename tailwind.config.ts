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
        "vaulto-bg": "var(--vaulto-bg)",
        "vaulto-fg": "var(--vaulto-fg)",
        "vaulto-accent": "var(--vaulto-accent)",
        "vaulto-accent-dim": "var(--vaulto-accent-dim)",
        "vaulto-muted": "var(--vaulto-muted)",
        "vaulto-border": "var(--vaulto-border)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
