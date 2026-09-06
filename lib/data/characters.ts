import type { BiscuteCharacter, BiscuteProduct } from "@/lib/types";
import { ASSET_PATHS, characterPlaceholder } from "@/lib/assets/resolve";
import { products } from "./products";

export const characters: BiscuteCharacter[] = [
  {
    id: "char-bunny",
    slug: "bunny",
    name: { vi: "Bunny", en: "Bunny" },
    species: { vi: "Thỏ Hà Nội", en: "Hanoi Rabbit" },
    dob: "2019-03-08",
    mood: { vi: "Đói nhẹ", en: "Mildly hungry" },
    likes: { vi: "Bánh mì, nắng sớm", en: "Bánh mì, morning sun" },
    dislikes: { vi: "Thứ Hai, mưa dầm", en: "Mondays, endless rain" },
    level: 8,
    colors: {
      primary: "#3EA9F5",
      secondary: "#FFD940",
      accent: "#EF4136",
    },
    images: {
      portrait: characterPlaceholder("Bunny", "#3EA9F5"),
      front: characterPlaceholder("Bunny F", "#3EA9F5", "400x500"),
      back: characterPlaceholder("Bunny B", "#1857c8", "400x500"),
      sticker: characterPlaceholder("★", "#FFD940", "200x200"),
    },
    productHandles: [
      "pho-tote-bag",
      "banh-mi-magnet-set",
      "egg-coffee-pin",
      "spring-roll-magnet",
    ],
    collectionHandles: ["food-icons", "hanoi"],
  },
  {
    id: "char-bear",
    slug: "bear",
    name: { vi: "Bear", en: "Bear" },
    species: { vi: "Gấu Phố Cổ", en: "Old Quarter Bear" },
    dob: "2018-11-12",
    mood: { vi: "Lười dễ thương", en: "Cute & sleepy" },
    likes: { vi: "Cà phê trứng, khăn lụa", en: "Egg coffee, silk scarves" },
    dislikes: { vi: "Vội vàng", en: "Rushing" },
    level: 12,
    colors: {
      primary: "#FFD940",
      secondary: "#25211E",
      accent: "#3EA9F5",
    },
    images: {
      portrait: characterPlaceholder("Bear", "#FFD940"),
      front: characterPlaceholder("Bear F", "#FFD940", "400x500"),
      back: characterPlaceholder("Bear B", "#EF4136", "400x500"),
      sticker: characterPlaceholder("★", "#25211E", "200x200"),
    },
    productHandles: [
      "ao-dai-tee",
      "lotus-gift-box",
      "silk-scarf-lotus",
      "non-la-tote",
    ],
    collectionHandles: ["vietnam-culture", "apparel"],
  },
  {
    id: "char-duck",
    slug: "duck",
    name: { vi: "Duck", en: "Duck" },
    species: { vi: "Vịt Xôi", en: "Sticky-Rice Duck" },
    dob: "2020-06-01",
    mood: { vi: "Hype tối đa", en: "Maximum hype" },
    likes: { vi: "Xôi, sticker, bạn bè", en: "Sticky rice, stickers, friends" },
    dislikes: { vi: "Im lặng quá lâu", en: "Too much silence" },
    level: 6,
    colors: {
      primary: "#EF4136",
      secondary: "#FFD940",
      accent: "#3EA9F5",
    },
    images: {
      portrait: characterPlaceholder("Duck", "#EF4136"),
      front: characterPlaceholder("Duck F", "#EF4136", "400x500"),
      back: characterPlaceholder("Duck B", "#FFD940", "400x500"),
      sticker: characterPlaceholder("★", "#3EA9F5", "200x200"),
    },
    productHandles: [
      "sticky-rice-duck",
      "cute-cat-keychain",
      "saigon-cat-stickers",
      "buffalo-keychain",
    ],
    collectionHandles: ["cute-animals", "food-icons"],
  },
  {
    id: "char-cat",
    slug: "cat",
    name: { vi: "Cat", en: "Cat" },
    species: { vi: "Mèo Du Lịch", en: "Tourist Cat" },
    dob: "2021-01-20",
    mood: { vi: "Tò mò", en: "Curious" },
    likes: { vi: "Bản đồ, nam châm, phố cổ", en: "Maps, magnets, Old Quarter" },
    dislikes: { vi: "Đường một chiều bí ẩn", en: "Mysterious one-ways" },
    level: 9,
    colors: {
      primary: "#FF8FB3",
      secondary: "#3EA9F5",
      accent: "#72C85B",
    },
    images: {
      portrait: characterPlaceholder("Cat", "#FF8FB3"),
      front: characterPlaceholder("Cat F", "#FF8FB3", "400x500"),
      back: characterPlaceholder("Cat B", "#3EA9F5", "400x500"),
      sticker: characterPlaceholder("★", "#72C85B", "200x200"),
    },
    productHandles: [
      "hanoi-tram-pin",
      "dragon-bridge-magnet",
      "ha-long-postcards",
      "vietnam-map-tote",
      "water-puppet-magnet",
    ],
    collectionHandles: ["hanoi", "vietnam-culture"],
  },
];

/** Local paths ready for when real PNGs land. */
export function characterLocalPaths(slug: string) {
  return {
    portrait: ASSET_PATHS.character(slug, "portrait"),
    front: ASSET_PATHS.character(slug, "front"),
    back: ASSET_PATHS.character(slug, "back"),
    sticker: ASSET_PATHS.character(slug, "sticker"),
  };
}

export function getCharacters(): BiscuteCharacter[] {
  return characters;
}

export function getCharacterBySlug(
  slug: string
): BiscuteCharacter | undefined {
  return characters.find((c) => c.slug === slug);
}

export function getCharacterById(id: string): BiscuteCharacter | undefined {
  return characters.find((c) => c.id === id);
}

export function getProductsByCharacter(slug: string): BiscuteProduct[] {
  const character = getCharacterBySlug(slug);
  if (!character) return [];
  const byHandle = new Set(character.productHandles);
  return products.filter(
    (p) =>
      byHandle.has(p.handle) || p.characterIds?.includes(character.id)
  );
}
