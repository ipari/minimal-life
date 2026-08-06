import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://leaflette.com",
  output: "static",
  build: {
    format: "directory",
  },
});
