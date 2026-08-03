import { describe, it, expect } from "vitest";
import { formatReleaseDate, isPublicLocked } from "./downloadOptions";

describe("isPublicLocked", () => {
  const publicDate = "2026-08-01T00:00:00.000Z";

  it("is locked when now is before the public release date (UTC)", () => {
    const before = new Date("2026-07-31T23:59:59.999Z").getTime();
    expect(isPublicLocked(publicDate, before)).toBe(true);
  });

  it("is unlocked exactly at the public release date (UTC)", () => {
    const atBoundary = new Date("2026-08-01T00:00:00.000Z").getTime();
    expect(isPublicLocked(publicDate, atBoundary)).toBe(false);
  });

  it("is unlocked when now is after the public release date (UTC)", () => {
    const after = new Date("2026-08-01T00:00:00.001Z").getTime();
    expect(isPublicLocked(publicDate, after)).toBe(false);
  });

  it("is unlocked when no public date is tracked", () => {
    expect(isPublicLocked(null, Date.now())).toBe(false);
    expect(isPublicLocked(undefined, Date.now())).toBe(false);
  });

  it("compares in UTC regardless of local timezone offset", () => {
    const localOffsetInstant = new Date("2026-07-31T20:00:00-05:00").getTime();
    expect(isPublicLocked(publicDate, localOffsetInstant)).toBe(false);
  });
});

describe("formatReleaseDate", () => {
  it("formats as 'EEE, d MMMM yyyy' using UTC calendar fields", () => {
    expect(formatReleaseDate("2026-08-01T00:00:00.000Z")).toBe("Sat, 1 August 2026");
  });

  it("returns null for a missing date", () => {
    expect(formatReleaseDate(null)).toBeNull();
    expect(formatReleaseDate(undefined)).toBeNull();
  });
});
