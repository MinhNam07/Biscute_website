/**
 * Asset path helpers for BISCUTE Souvenir Club.
 * Prefer local files under /public; fall back to structured placehold.co labels.
 */

const hexNoHash = (hex: string) => hex.replace("#", "").toUpperCase();

/** Product image: local file first, else labeled placeholder (ITEM # / handle). */
export function productImageUrl(
  handle: string,
  index: number,
  opts: { label?: string; bg?: string; ink?: string } = {}
): string {
  const file = `/products/${handle}/${String(index + 1).padStart(2, "0")}.jpg`;
  // Runtime: Next/Image will 404 if missing — catalogue uses placeholders until assets land.
  // We always return placehold until files exist; swap by checking known assets list if needed.
  const label = opts.label ?? `ITEM ${handle.slice(0, 12).toUpperCase()}`;
  const bg = hexNoHash(opts.bg ?? "#FFF8E9");
  const ink = hexNoHash(opts.ink ?? "#25211E");
  return `https://placehold.co/600x750/${bg}/${ink}/png?text=${encodeURIComponent(label)}`;
}

/** Prefer local path string for when assets are delivered; used by Visit / UGC. */
export function localOrPlaceholder(
  localPath: string,
  placeholderLabel: string,
  bg = "FFF8E9",
  ink = "25211E",
  size = "800x600"
): { src: string; isPlaceholder: boolean } {
  // Catalogue phase: expose intended local path + placeholder for <img onError> or static use.
  // Components that need guaranteed display use placeholderSrc until assets ship.
  void localPath;
  return {
    src: `https://placehold.co/${size}/${bg}/${ink}/png?text=${encodeURIComponent(placeholderLabel)}`,
    isPlaceholder: true,
  };
}

export function characterPlaceholder(
  name: string,
  primary: string,
  size = "600x750"
): string {
  const bg = hexNoHash(primary);
  return `https://placehold.co/${size}/${bg}/FFFFFF/png?text=${encodeURIComponent(name.toUpperCase())}`;
}

export function collectionPlaceholder(
  label: string,
  accent = "3EA9F5"
): string {
  return `https://placehold.co/800x600/${hexNoHash(accent)}/25211E/png?text=${encodeURIComponent(label)}`;
}

/** Intended local paths (for asset intake + future resolver). */
export const ASSET_PATHS = {
  character: (slug: string, kind: "portrait" | "front" | "back" | "sticker") =>
    `/characters/${slug}/${kind}.png`,
  product: (handle: string, index: number) =>
    `/products/${handle}/${String(index + 1).padStart(2, "0")}.jpg`,
  store: {
    exterior: "/store/exterior.jpg",
    interior: "/store/interior.jpg",
  },
  ugc: (n: number) => `/ugc/${String(n).padStart(2, "0")}.jpg`,
} as const;
