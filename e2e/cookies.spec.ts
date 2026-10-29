import { test, expect } from "@playwright/test";

const KEY = "tc_consent_v1";
const stored = (page: import("@playwright/test").Page) =>
  page.evaluate((k) => JSON.parse(localStorage.getItem(k) ?? "null"), KEY);

test.describe("cookie consent", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("banner shows on first visit with three choices", async ({ page }) => {
    const banner = page.getByRole("region", { name: "Cookie notice" });
    await expect(banner).toBeVisible();
    for (const name of ["Reject all", "Customize", "Accept all"]) {
      await expect(banner.getByRole("button", { name })).toBeVisible();
    }
  });

  test("Accept all stores consent and persists across reload", async ({ page }) => {
    await page.getByRole("button", { name: "Accept all" }).click();
    await expect(page.getByRole("region", { name: "Cookie notice" })).toBeHidden();
    expect(await stored(page)).toEqual({ analytics: true, marketing: true });
    await page.reload();
    await expect(page.getByRole("region", { name: "Cookie notice" })).toBeHidden();
  });

  test("Reject all stores a denial", async ({ page }) => {
    await page.getByRole("button", { name: "Reject all" }).click();
    await expect(page.getByRole("region", { name: "Cookie notice" })).toBeHidden();
    expect(await stored(page)).toEqual({ analytics: false, marketing: false });
  });

  test("Customize saves granular preferences", async ({ page }) => {
    await page.getByRole("button", { name: "Customize" }).click();
    const dialog = page.getByRole("dialog", { name: "Cookie settings" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("switch", { name: "Essential" })).toBeDisabled();
    await expect(dialog.getByRole("switch", { name: "Analytics" })).not.toBeChecked();
    await dialog.getByRole("switch", { name: "Analytics" }).check();
    await dialog.getByRole("button", { name: "Save preferences" }).click();
    await expect(dialog).toBeHidden();
    expect(await stored(page)).toEqual({ analytics: true, marketing: false });
  });

  test("footer button reopens settings with saved choice and Escape closes", async ({ page }) => {
    await page.getByRole("button", { name: "Accept all" }).click();
    await page.locator("footer").getByRole("button", { name: /cookie/i }).click();
    const dialog = page.getByRole("dialog", { name: "Cookie settings" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("switch", { name: "Marketing" })).toBeChecked();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    expect(await stored(page)).toEqual({ analytics: true, marketing: true });
  });
});
