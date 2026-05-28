import { describe, expect, it } from "vitest";

describe("@sava/ui", () => {
  it("package is importable", async () => {
    const mod = await import("../index");
    expect(mod).toBeDefined();
  });
});
