import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark palette
        ink: {
          900: "#222831",
          800: "#393E46",
          accent: "#00ADB5",
          paper: "#EEEEEE",
        },
        // Light palette
        mist: {
          50: "#E3FDFD",
          100: "#CBF1F5",
          200: "#A6E3E9",
          300: "#71C9CE",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 10vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-l": ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-m": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        meta: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        micro: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
