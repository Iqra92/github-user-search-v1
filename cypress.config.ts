import { defineConfig } from "cypress";

export default defineConfig({
  integration: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://github.com/Iqra92/github-user-search-v1",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
