// tests/url.test.ts
import { describe, expect, it } from "vitest";
import { buildSignupUrl } from "../app/lib/url";

describe("buildSignupUrl", () => {
  it("returns # when base is empty", () => {
    expect(buildSignupUrl("")).toBe("#");
  });

  it("returns # when base looks like a placeholder", () => {
    expect(buildSignupUrl("[Sign-up URL]")).toBe("#");
  });

  it("appends role to relative base", () => {
    expect(buildSignupUrl("/signup", "software")).toBe("/signup?role=software");
  });

  it("returns base when role is not provided", () => {
    expect(buildSignupUrl("/signup")).toBe("/signup");
  });

  it("appends role to absolute URL", () => {
    expect(buildSignupUrl("https://example.com/signup", "data-analyst"))
      .toBe("https://example.com/signup?role=data-analyst");
  });
});
