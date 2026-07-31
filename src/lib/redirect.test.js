import { describe, it, expect } from "vitest";
import { isAllowedRedirectTarget } from "./redirect";

describe("isAllowedRedirectTarget", () => {
  it("allows an exact allowlisted domain", () => {
    expect(isAllowedRedirectTarget("https://www.curseforge.com/inzoi/build-mode/x")).toBe(true);
    expect(isAllowedRedirectTarget("https://www.patreon.com/MOOSTYLES")).toBe(true);
    expect(isAllowedRedirectTarget("https://moostyles.com/mods/moca-cafe-brand")).toBe(true);
  });

  it("allows a subdomain of an allowlisted domain", () => {
    expect(isAllowedRedirectTarget("https://cdn.moostyles.com/uploads/x.png")).toBe(true);
  });

  it("rejects a domain not on the allowlist", () => {
    expect(isAllowedRedirectTarget("https://evil-example.com/phish")).toBe(false);
  });

  it("rejects a lookalike domain that merely contains an allowlisted name", () => {
    expect(isAllowedRedirectTarget("https://patreon.com.evil.example/x")).toBe(false);
    expect(isAllowedRedirectTarget("https://notpatreon.com/x")).toBe(false);
  });

  it("rejects a non-http(s) protocol", () => {
    expect(isAllowedRedirectTarget("javascript:alert(1)")).toBe(false);
  });

  it("rejects a missing or malformed url", () => {
    expect(isAllowedRedirectTarget(null)).toBe(false);
    expect(isAllowedRedirectTarget("")).toBe(false);
    expect(isAllowedRedirectTarget("not a url")).toBe(false);
  });
});
