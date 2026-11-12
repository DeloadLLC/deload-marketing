import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { HIDDEN_PATHS } from "./src/config.ts";

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 4321;
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const base = process.env.BASE_PATH ?? "/";
// src/config.ts reads PUBLIC_SIGNUP_MODE through import.meta.env, which isn't
// filled in while this file loads, so the open-mode extra (/beta only
// forwards to sign-up) is added here from the process environment.
const hiddenPaths = [
  ...HIDDEN_PATHS,
  ...(process.env.PUBLIC_SIGNUP_MODE?.trim() === "open" ? ["/beta"] : []),
];
const site = process.env.PUBLIC_SITE_URL ?? "https://deloadapp.io";

export default defineConfig({
  site,
  base,
  trailingSlash: "ignore",
  server: { port, host: "0.0.0.0", allowedHosts: true },
  integrations: [
    tailwind({ applyBaseStyles: true }),
    // Forwarding pages (legal lives in the app), the ad landing page and the
    // pages that aren't live yet (HIDDEN_PATHS in src/config.ts) stay out of
    // the sitemap.
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/+$/, "") || "/";
        if (/\/(privacy|terms|landing-page)$/.test(path)) return false;
        return !hiddenPaths.some((p) => path === p || path.endsWith(p));
      },
    }),
    mdx(),
  ],
  vite: {
    server: { allowedHosts: true },
    preview: { allowedHosts: true },
  },
});
