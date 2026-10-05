import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("page load", () => {
  test("renders without console errors or failed requests", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()} ${r.url()}`));
    await page.reload({ waitUntil: "networkidle" });
    expect(errors).toEqual([]);
  });

  test("has title and all major sections", async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    for (const name of [
      /Questions before you automate/,
      /Simple plans that grow/,
      /Works with the tools/,
      /Everything you need to automate/,
      /From lead to follow-up/,
      /Every lead starts the right workflow/,
      /Build workflows that keep moving/,
      /Analyze performance/,
      /Powerful automation without/,
      /Your team wasn.t hired/,
    ]) {
      await expect(page.getByRole("heading", { name })).toHaveCount(1);
    }
  });

  test("has a single h1", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("all images load", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    // Scroll through to trigger lazy images.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    await page.waitForLoadState("networkidle");
    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src),
    );
    expect(broken).toEqual([]);
  });

  test("images have alt attributes", async ({ page }) => {
    const missing = await page.locator("img:not([alt])").count();
    expect(missing).toBe(0);
  });

  test("no horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("navigation", () => {
  test("desktop nav links point to anchors", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop only");
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    for (const [label, href] of [
      ["Product", "#products"],
      ["Solutions", "#solutions"],
      ["Integrations", "#integrations"],
      ["Pricing", "#pricing"],
      ["Resources", "#resources"],
    ]) {
      await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("href", href);
    }
    await expect(nav.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Book a Demo" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Get Early Access" })).toBeVisible();
  });

  test("Pricing link scrolls to pricing section", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop only");
    await page.getByRole("navigation").getByRole("link", { name: "Pricing", exact: true }).click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.locator("#pricing")).toBeInViewport();
  });

  test("Integrations and Product links scroll to their sections", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "desktop only");
    const nav = page.getByRole("navigation");
    await nav.getByRole("link", { name: "Integrations", exact: true }).click();
    await expect(page.locator("#integrations")).toBeInViewport();
    await nav.getByRole("link", { name: "Product", exact: true }).click();
    await expect(page.locator("#products")).toBeInViewport();
  });

  test("logo links home", async ({ page }) => {
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "TaskCurrent home" }),
    ).toHaveAttribute("href", "/");
  });

  test("mobile menu opens, lists links and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    const nav = page.getByRole("navigation");
    const toggle = nav.getByLabel("Toggle navigation menu");
    await expect(toggle).toBeVisible();
    await expect(nav.getByRole("link", { name: "Pricing", exact: true })).toBeHidden();
    await toggle.click();
    for (const label of ["Product", "Solutions", "Integrations", "Pricing", "Resources"]) {
      await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await toggle.click();
    await expect(nav.getByRole("link", { name: "Pricing", exact: true })).toBeHidden();
  });

  test("mobile menu link navigates to section", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    const nav = page.getByRole("navigation");
    await nav.getByLabel("Toggle navigation menu").click();
    await nav.getByRole("link", { name: "Pricing", exact: true }).click();
    await expect(page).toHaveURL(/#pricing$/);
    await expect(page.locator("#pricing")).toBeInViewport();
  });
});

test.describe("hero & CTAs", () => {
  test("hero heading and CTAs", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toContainText("busywork");
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: /early access/i }).first()).toHaveAttribute("href", "/early-access");
    await expect(main.getByRole("link", { name: /demo/i }).first()).toHaveAttribute("href", "/demo");
  });

  test("CTA anchors have matching targets", async ({ page }) => {
    // Every in-page #anchor link should resolve to an element id.
    const hrefs = await page.$$eval('a[href^="#"]', (as) =>
      [...new Set(as.map((a) => a.getAttribute("href")!))],
    );
    const missing = await page.evaluate(
      (list) => list.filter((h) => h.length > 1 && !document.getElementById(h.slice(1))),
      hrefs,
    );
    expect(missing, "anchors with no target element").toEqual([]);
  });
});

test.describe("pricing", () => {
  test("shows three plans at monthly prices", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await pricing.scrollIntoViewIfNeeded();
    for (const [plan, price] of [["Starter", "$29"], ["Growth", "$79"], ["Pro", "$149"]]) {
      await expect(pricing.getByText(plan, { exact: true })).toBeVisible();
      await expect(pricing.getByText(price, { exact: true })).toBeVisible();
    }
    await expect(pricing.getByText("Most Popular")).toBeVisible();
    await expect(pricing.getByRole("link", { name: "Get Early Access" })).toHaveCount(3);
    await expect(pricing.getByRole("link", { name: "Get Early Access" }).nth(1)).toHaveAttribute(
      "href",
      "/early-access?plan=growth&billing=monthly",
    );
  });

  test("billing toggle switches to annual (20% off) and back", async ({ page }) => {
    const pricing = page.locator("#pricing");
    const monthly = pricing.getByRole("radio", { name: "Monthly" });
    const annual = pricing.getByRole("radio", { name: /Annual/ });
    await expect(monthly).toHaveAttribute("aria-checked", "true");

    await annual.click();
    await expect(annual).toHaveAttribute("aria-checked", "true");
    await expect(monthly).toHaveAttribute("aria-checked", "false");
    for (const price of ["$23", "$63", "$119"]) {
      await expect(pricing.getByText(price, { exact: true })).toBeVisible();
    }
    await expect(pricing.getByText(/billed annually/)).toHaveCount(3);

    await monthly.click();
    for (const price of ["$29", "$79", "$149"]) {
      await expect(pricing.getByText(price, { exact: true })).toBeVisible();
    }
    await expect(pricing.getByText(/billed annually/)).toHaveCount(0);
  });

  test("feature lists render for each plan", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await expect(pricing.getByText("1,000 automation runs")).toBeVisible();
    await expect(pricing.getByText("10,000 automation runs")).toBeVisible();
    await expect(pricing.getByText("50,000 automation runs")).toBeVisible();
  });

  test("no duplicate 'What's included' labels per card", async ({ page }) => {
    const cards = page.locator("#pricing .grid > div");
    await expect(cards).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(cards.nth(i).getByText(/what.s included/i)).toHaveCount(1);
    }
  });
});

test.describe("FAQ accordion", () => {
  const buttons = (page: import("@playwright/test").Page) =>
    page.locator('button[id^="accordion-button-"]');

  test("renders 9 collapsed questions", async ({ page }) => {
    await expect(buttons(page)).toHaveCount(9);
    for (const b of await buttons(page).all()) {
      await expect(b).toHaveAttribute("aria-expanded", "false");
    }
  });

  test("opens a question, shows answer, and closes on second click", async ({ page }) => {
    const first = buttons(page).first();
    await first.scrollIntoViewIfNeeded();
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText(/workflow automation platform for small/)).toBeVisible();
    await first.click();
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText(/workflow automation platform for small/)).not.toBeInViewport();
  });

  test("only one item open at a time", async ({ page }) => {
    const b = buttons(page);
    await b.nth(0).scrollIntoViewIfNeeded();
    await b.nth(0).click();
    await b.nth(1).click();
    await expect(b.nth(0)).toHaveAttribute("aria-expanded", "false");
    await expect(b.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator('button[aria-expanded="true"]')).toHaveCount(1);
  });

  test("keyboard toggles an item", async ({ page }) => {
    const b = buttons(page).nth(2);
    await b.scrollIntoViewIfNeeded();
    await b.focus();
    await page.keyboard.press("Enter");
    await expect(b).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Space");
    await expect(b).toHaveAttribute("aria-expanded", "false");
  });

  test("aria-controls points to an existing region", async ({ page }) => {
    const b = buttons(page).first();
    const id = await b.getAttribute("aria-controls");
    await expect(page.locator(`#${id}`)).toHaveAttribute("role", "region");
  });
});

test.describe("footer", () => {
  test("newsletter form accepts email and validates", async ({ page }) => {
    const email = page.getByLabel("Email address");
    await email.scrollIntoViewIfNeeded();
    await expect(email).toHaveAttribute("type", "email");
    await email.fill("not-an-email");
    expect(await email.evaluate((el: HTMLInputElement) => el.validity.typeMismatch)).toBe(true);
    await email.fill("you@company.com");
    expect(await email.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(true);
    await expect(page.getByRole("button", { name: "Subscribe" })).toBeEnabled();
  });

  test("footer columns and copyright", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    for (const col of ["Product", "Solutions", "Resources", "Company"]) {
      await expect(footer.getByText(col, { exact: true })).toBeVisible();
    }
    await expect(footer).toContainText("2026 TaskCurrent");
  });

  test("footer logo links home", async ({ page }) => {
    await expect(
      page.getByRole("contentinfo").getByRole("link", { name: "TaskCurrent home" }),
    ).toHaveAttribute("href", "/");
  });
});

test.describe("integrations & logos", () => {
  test("integrations section visible", async ({ page }) => {
    const s = page.locator("#integrations");
    await s.scrollIntoViewIfNeeded();
    await expect(s).toBeVisible();
    await expect(s.getByRole("heading")).toContainText("Works with the tools you already use");
  });
});

test.describe("responsive layout", () => {
  for (const [name, width, height] of [
    ["mobile", 375, 800],
    ["tablet", 768, 1024],
    ["laptop", 1280, 800],
    ["desktop", 1440, 900],
  ] as const) {
    test(`no horizontal overflow at ${name} (${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test.describe("early access", () => {
  test("pricing card preserves plan and billing choice", async ({ page }) => {
    await page.locator("#pricing").getByRole("radio", { name: /Annual/ }).click();
    await page.locator("#pricing").getByRole("link", { name: "Get Early Access" }).nth(1).click();
    await expect(page).toHaveURL(/\/early-access\?plan=growth&billing=annual$/);
    await expect(page.getByText("You're interested in the Growth plan")).toBeVisible();
  });

  test("submits the form, fires analytics and shows the success state", async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { events: unknown[] }).events = [];
      window.gtag = (_c, name, params) => (window as unknown as { events: unknown[] }).events.push({ name, params });
    });
    await page.goto("/early-access?plan=growth&billing=annual");
    await page.getByLabel("Full name").fill("Sarah Mitchell");
    await page.getByLabel("Work email").fill("sarah@brightpath.com");
    await page.getByLabel("Company (optional)").fill("BrightPath");
    await page.getByLabel("Company size").selectOption("6-20");
    await page.getByLabel("What would you automate first?").selectOption("lead_followup");
    await page.getByRole("button", { name: "Join Early Access" }).click();
    await expect(page.getByRole("heading", { name: "You're on the list." })).toBeVisible();
    const events = await page.evaluate(() => (window as unknown as { events: { name: string; params: object }[] }).events);
    expect(events).toEqual([
      { name: "form_start", params: { form_name: "early_access" } },
      {
        name: "generate_lead",
        params: {
          lead_type: "early_access",
          company_size: "6-20",
          automation_need: "lead_followup",
          plan_interest: "growth",
          billing_interest: "annual",
        },
      },
    ]);
  });

  test("ignores unknown plan values and /signup redirects", async ({ page }) => {
    await page.goto("/early-access?plan=bogus");
    await expect(page.getByText(/You're interested in/)).toHaveCount(0);
    await page.goto("/signup");
    await expect(page).toHaveURL(/\/early-access$/);
  });
});
