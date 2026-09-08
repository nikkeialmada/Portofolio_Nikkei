import type { Config } from "tailwindcss";

/** Warna didefinisikan sebagai channel RGB di globals.css agar modifier
 *  opacity Tailwind (mis. `bg-bg/80`) tetap bekerja. */
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
    },
  },
  plugins: [],
} satisfies Config;
