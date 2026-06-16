import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const rootPage = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");

describe("employer landing routes", () => {
  it("uses the employer pilot and employee auth CTAs", () => {
    expect(rootPage).toContain("Build real employee connection beyond Slack and happy hours.");
    expect(rootPage).toContain("/admin/request-access");
    expect(rootPage).toContain("/employee/login");
    expect(rootPage).toContain("/employee/signup");
  });
});
