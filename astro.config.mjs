// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import serviceWorker from "astrojs-service-worker";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    serviceWorker({
      workbox: {
        swDest: "dist/sw.js", // <- rename here
      },
    }),
  ],
  output: "static",
});
