import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:13579",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run start -- -p 13579",
    url: "http://127.0.0.1:13579",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
