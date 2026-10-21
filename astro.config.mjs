import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 4321;
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const base = process.env.BASE_PATH ?? "/";
const site = process.env.PUBLIC_SITE_URL ?? "https://deloadapp.io";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  server: { port, host: "0.0.0.0", allowedHosts: true },
  integrations: [
    tailwind({ applyBaseStyles: true }),
    // Forwarding pages (legal lives in the app) and the ad landing page stay
    // out of the sitemap.
    sitemap({ filter: (page) => !/\/(privacy|terms|landing-page)\/?$/.test(new URL(page).pathname) }),
    mdx(),
  ],
  vite: {
    server: { allowedHosts: true },
    preview: { allowedHosts: true },
  },
});
