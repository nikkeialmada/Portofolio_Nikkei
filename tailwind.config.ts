import type { Config } from "tailwindcss";

/** Colours live as RGB channels in globals.css so opacity modifiers keep working. */
const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        bg: withAlpha("--bg"),
        surface: withAlpha("--surface"),
        band: withAlpha("--band"),
        primary: {
          DEFAULT: withAlpha("--primary"),
          ink: withAlpha("--primary-ink"),
        },
        line: {
          DEFAULT: withAlpha("--line"),
          strong: withAlpha("--line-strong"),
        },
        ink: {
          DEFAULT: withAlpha("--text"),
          dim: withAlpha("--dim"),
          mute: withAlpha("--mute"),
        },
      },
      maxWidth: {
        content: "40rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px rgb(15 23 42 / 0.06)",
        "card-hover": "0 2px 4px rgb(15 23 42 / 0.06), 0 16px 40px rgb(15 23 42 / 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
