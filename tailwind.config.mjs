/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        sage: "#6B8E6F",
        clay: "#B8724A",
        ink: "#14161A",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Inter",
          "sans-serif",
        ],
        serif: ["ui-serif", "Georgia", "Cambria", "serif"],
      },
      maxWidth: {
        prose: "65ch",
        container: "72rem",
      },
    },
  },
  plugins: [],
};
