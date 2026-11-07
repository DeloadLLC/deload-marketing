/** @type {import('tailwindcss').Config} */
// Palette A, Sage & clay (founder, 2026-11-06). Every colour is a CSS variable
// (src/styles/global.css) so light and dark come from one set of classes.
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        sunk: v("sunk"),
        ink: v("ink"),
        muted: v("muted"),
        faint: v("faint"),
        rule: v("rule"),
        sage: v("sage"),
        clay: v("clay"),
        warn: v("warn"),
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        logo: ["Space Grotesk", "Geist", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
        container: "78rem",
      },
    },
  },
  plugins: [],
};
