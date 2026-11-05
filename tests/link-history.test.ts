import { describe, expect, test } from "bun:test";
import {
  clearSavedLinks,
  LINK_HISTORY_KEY,
  MAX_SAVED_LINKS,
  parseLinkHistory,
  removeSavedLink,
  saveCreatedLink,
} from "../apps/web/lib/link-history";
function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
  };
}
const first = { id: "link-first01", createdAt: "2026-11-06T00:00:00.000Z" };
const second = { id: "link-second02", createdAt: "2026-11-06T01:00:00.000Z" };
describe("local link history", () => {
  test("persists generated links across reads, newest first, without duplicating refreshes", () => {
    const storage = memoryStorage();
    saveCreatedLink(storage, first);
    saveCreatedLink(storage, second);
    saveCreatedLink(storage, first);
    expect(parseLinkHistory(storage.getItem(LINK_HISTORY_KEY))).toEqual([
      second,
      first,
    ]);
  });
  test("ignores corrupted JSON, incompatible versions and unsafe identifiers", () => {
    expect(parseLinkHistory("not JSON")).toEqual([]);
    expect(
      parseLinkHistory(JSON.stringify({ version: 2, links: [first] })),
    ).toEqual([]);
    expect(
      parseLinkHistory(
        JSON.stringify({
          version: 1,
          links: [
            null,
            {},
            { ...first, id: "../api/cron" },
            { ...first, id: "javascript:alert(1)" },
            { ...first, createdAt: "invalid" },
            first,
            first,
          ],
        }),
      ),
    ).toEqual([first]);
  });
  test("retains only the latest 50 and persists no coordinate fields", () => {
    const storage = memoryStorage();
    for (let i = 0; i < 60; i++)
      saveCreatedLink(storage, {
        id: `link-${String(i).padStart(4, "0")}`,
        createdAt: new Date(i * 1000).toISOString(),
      });
    const saved = parseLinkHistory(storage.getItem(LINK_HISTORY_KEY));
    expect(saved).toHaveLength(MAX_SAVED_LINKS);
    expect(saved[0]?.id).toBe("link-0059");
    expect(saved.at(-1)?.id).toBe("link-0010");
    expect(
      parseLinkHistory(
        JSON.stringify({ version: 1, links: [{ ...first, latitude: 37 }] }),
      ),
    ).toEqual([first]);
  });
  test("does not persist unexpected location fields supplied by a caller", () => {
    const storage = memoryStorage();
    const input = { ...first, latitude: 37, longitude: 127 };
    saveCreatedLink(storage, input);
    expect(storage.getItem(LINK_HISTORY_KEY)).not.toContain("latitude");
    expect(storage.getItem(LINK_HISTORY_KEY)).not.toContain("longitude");
  });
  test("reads fresh storage for every operation and removes only its own records", () => {
    const storage = memoryStorage();
    storage.setItem("unrelated", "keep");
    saveCreatedLink(storage, first);
    saveCreatedLink(storage, second);
    removeSavedLink(storage, first.id);
    expect(parseLinkHistory(storage.getItem(LINK_HISTORY_KEY))).toEqual([
      second,
    ]);
    clearSavedLinks(storage);
    expect(storage.getItem(LINK_HISTORY_KEY)).toBeNull();
    expect(storage.getItem("unrelated")).toBe("keep");
  });
  test("storage denial and quota errors propagate so the UI can report failure", () => {
    const denied = {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {},
      removeItem: () => {
        throw new Error("denied");
      },
    };
    expect(() => saveCreatedLink(denied, first)).toThrow("denied");
    expect(() => clearSavedLinks(denied)).toThrow("denied");
    const quota = {
      ...memoryStorage(),
      setItem: () => {
        throw new Error("quota");
      },
    };
    expect(() => saveCreatedLink(quota, first)).toThrow("quota");
  });
});
