export const LINK_HISTORY_KEY = "gujo:created-links:v1";
export const LINK_HISTORY_EVENT = "gujo:link-history-change";
export const MAX_SAVED_LINKS = 50;

export type SavedLink = { id: string; createdAt: string };
type HistoryStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function isSavedLink(value: unknown): value is SavedLink {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<SavedLink>;
  return (
    typeof item.id === "string" &&
    /^[A-Za-z0-9_-]{6,64}$/.test(item.id) &&
    typeof item.createdAt === "string" &&
    Number.isFinite(Date.parse(item.createdAt))
  );
}

export function parseLinkHistory(raw: string | null): SavedLink[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("version" in parsed) ||
      parsed.version !== 1 ||
      !("links" in parsed) ||
      !Array.isArray(parsed.links)
    )
      return [];
    const seen = new Set<string>();
    return parsed.links
      .filter(isSavedLink)
      .filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .map(({ id, createdAt }) => ({ id, createdAt }))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .slice(0, MAX_SAVED_LINKS);
  } catch {
    return [];
  }
}

export function saveCreatedLink(storage: HistoryStorage, link: SavedLink) {
  if (!isSavedLink(link)) throw new Error("Invalid link history entry");
  const links = parseLinkHistory(storage.getItem(LINK_HISTORY_KEY));
  const updated = [
    { id: link.id, createdAt: link.createdAt },
    ...links.filter((item) => item.id !== link.id),
  ]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, MAX_SAVED_LINKS);
  storage.setItem(
    LINK_HISTORY_KEY,
    JSON.stringify({ version: 1, links: updated }),
  );
}

export function removeSavedLink(storage: HistoryStorage, id: string) {
  const links = parseLinkHistory(storage.getItem(LINK_HISTORY_KEY)).filter(
    (item) => item.id !== id,
  );
  if (!links.length) storage.removeItem(LINK_HISTORY_KEY);
  else storage.setItem(LINK_HISTORY_KEY, JSON.stringify({ version: 1, links }));
}

export function clearSavedLinks(storage: HistoryStorage) {
  storage.removeItem(LINK_HISTORY_KEY);
}
