import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

/** Reuse the actual dev server when present: a fresh production build cannot detect its stale CSS. */
export default defineConfig({
  ...baseConfig,
  outputDir: "./test-results/dev-styles",
  testMatch: ["**/styles.spec.ts", "**/profile-styles.spec.ts"],
  projects: baseConfig.projects?.filter(
    (project) => project.name === "desktop",
  ),
  use: { ...baseConfig.use, baseURL: "http://localhost:3000" },
  webServer: {
    command: "npm run dev -- --port 3000",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
