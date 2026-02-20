import { test, expect } from "@playwright/test";

test("home page loads and shows main content", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Vaulto|vaulto-site/i);
  await expect(page.getByRole("main")).toBeVisible();
});

test("services section is present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /platform & services/i })).toBeVisible();
});
