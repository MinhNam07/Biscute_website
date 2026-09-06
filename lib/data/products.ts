import type {
  BiscuteProduct,
  Collection,
  ProductFilters,
  ProductMetafields,
} from "@/lib/types";

const img = (id: string, color: string) =>
  `https://placehold.co/600x750/${color}/4A3535.png?text=${encodeURIComponent(id)}`;

function meta(
  material: { vi: string; en: string },
  dimensions: string,
  origin: { vi: string; en: string },
  care: { vi: string; en: string },
  artwork: { vi: string; en: string },
  opts: {
    easyToPack?: boolean;
    lightweight?: boolean;
    giftReady?: boolean;
  } = {}
): ProductMetafields {
  return {
    material,
    dimensions,
    origin,
    careInstructions: care,
    easyToPack: opts.easyToPack ?? true,
    lightweight: opts.lightweight ?? true,
    giftReady: opts.giftReady ?? false,
    artworkStory: artwork,
  };
}

export const products: BiscuteProduct[] = [
  {
    id: "BV-001",
    handle: "pho-tote-bag",
    title: { vi: "Túi Tote Phở Bò", en: "Pho Beef Tote Bag" },
    description: {
      vi: "Túi tote canvas in hình bát phở dễ thương — quà lưu niệm hoàn hảo từ Hà Nội.",
      en: "Canvas tote printed with an adorable pho bowl — the perfect souvenir from Hanoi.",
    },
    price: 189000,
    compareAtPrice: 229000,
    images: [
      {
        url: img("ITEM 001", "FD9DAA"),
        alt: { vi: "Túi tote phở màu hồng", en: "Pink pho tote bag" },
      },
      {
        url: img("BV-001-2", "FCF5D4"),
        alt: { vi: "Túi tote phở màu kem", en: "Cream pho tote bag" },
      },
    ],
    badges: ["best-seller"],
    variants: [
      { id: "BV-001-PK", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 189000 },
      { id: "BV-001-CR", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 189000 },
      { id: "BV-001-SB", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: false, price: 189000 },
    ],
    collections: ["hanoi", "food-icons", "best-sellers"],
    tags: ["tote", "pho", "hanoi", "food", "souvenir"],
    category: "souvenirs",
    characterIds: ["char-bunny"],
    metafields: {
      ...meta(
        { vi: "Canvas cotton 12oz", en: "12oz cotton canvas" },
        "38 × 42 cm",
        { vi: "Thiết kế tại Việt Nam, sản xuất tại TP.HCM", en: "Designed in Vietnam, made in Ho Chi Minh City" },
        { vi: "Giặt tay, phơi trong bóng râm", en: "Hand wash, dry in shade" },
        {
          vi: "Lấy cảm hứng từ góc phố phở sáng sớm ở Hà Nội — nơi hương thảo quả và nước dùng ấm áp đánh thức thành phố.",
          en: "Inspired by early-morning pho stalls in Hanoi — where star anise aroma and warm broth wake up the city.",
        },
        { giftReady: true }
      ),
      stats: { lightweight: 4, cuteness: 5, vietnamLevel: 5 },
    },
  },
  {
    id: "BV-002",
    handle: "banh-mi-magnet-set",
    title: { vi: "Bộ Nam Châm Bánh Mì", en: "Bánh Mì Magnet Set" },
    description: {
      vi: "Bộ 4 nam châm bánh mì với nhân đa dạng — pate, chả lụa, thịt nướng và trứng.",
      en: "Set of 4 bánh mì magnets with assorted fillings — pate, cha lua, grilled pork, and egg.",
    },
    price: 99000,
    images: [
      {
        url: img("ITEM 002", "FCF5D4"),
        alt: { vi: "Bộ nam châm bánh mì", en: "Bánh mì magnet set" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-002-OS", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 99000 },
    ],
    collections: ["food-icons"],
    tags: ["magnet", "banh-mi", "food", "kitchen"],
    category: "souvenirs",
    characterIds: ["char-bunny"],
    metafields: meta(
      { vi: "Nhựa acrylic + nam châm", en: "Acrylic + magnet backing" },
      "4 × 5 cm mỗi miếng",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Lau khô bằng vải mềm", en: "Wipe clean with soft cloth" },
      {
        vi: "Mỗi chiếc bánh mì kể một câu chuyện về đường phố Sài Gòn — giòn tan, đầy ắp nhân.",
        en: "Each sandwich tells a story of Saigon streets — crispy, stuffed, and full of character.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-003",
    handle: "cute-cat-keychain",
    title: { vi: "Móc Khóa Mèo Con", en: "Cute Cat Keychain" },
    description: {
      vi: "Móc khóa mèo mặc áo dài Việt Nam — nhỏ xinh, dễ mang theo khắp nơi.",
      en: "Keychain of a cat wearing a Vietnamese áo dài — tiny, adorable, and travel-friendly.",
    },
    price: 79000,
    images: [
      {
        url: img("ITEM 003", "FD9DAA"),
        alt: { vi: "Móc khóa mèo hồng", en: "Pink cat keychain" },
      },
    ],
    badges: ["new"],
    variants: [
      { id: "BV-003-PK", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 79000 },
      { id: "BV-003-SB", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: true, price: 79000 },
    ],
    collections: ["cute-animals", "new-arrivals"],
    tags: ["keychain", "cat", "cute", "gift"],
    category: "gifts",
    characterIds: ["char-duck", "char-cat"],
    metafields: meta(
      { vi: "Nhựa PVC mềm", en: "Soft PVC" },
      "5 × 3 cm",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Tránh nhiệt độ cao", en: "Avoid high heat" },
      {
        vi: "Chú mèo BISCUTE yêu thích lang thang phố cổ và ngắm hoa ban mỗi mùa xuân.",
        en: "BISCUTE's cat loves wandering the Old Quarter and admiring ban blossoms each spring.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-004",
    handle: "dragon-bridge-magnet",
    title: { vi: "Nam Châm Cầu Rồng", en: "Dragon Bridge Magnet" },
    description: {
      vi: "Nam châm tủ lạnh Cầu Rồng Đà Nẵng — biểu tượng thành phố biển.",
      en: "Dragon Bridge fridge magnet — an icon of Vietnam's coastal city, Da Nang.",
    },
    price: 89000,
    images: [
      {
        url: img("ITEM 004", "C9366B"),
        alt: { vi: "Nam châm Cầu Rồng", en: "Dragon Bridge magnet" },
      },
    ],
    badges: ["best-seller"],
    variants: [
      { id: "BV-004-OS", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: true, price: 89000 },
    ],
    collections: ["vietnam-culture", "best-sellers"],
    tags: ["magnet", "danang", "bridge", "landmark"],
    category: "souvenirs",
    characterIds: ["char-cat"],
    metafields: meta(
      { vi: "Epoxy resin + nam châm", en: "Epoxy resin + magnet" },
      "8 × 4 cm",
      { vi: "Sản xuất tại Đà Nẵng", en: "Made in Da Nang" },
      { vi: "Lau khô, tránh va đập mạnh", en: "Wipe dry, avoid hard impacts" },
      {
        vi: "Cầu Rồng phun lửa mỗi cuối tuần — khoảnh khắc kỳ diệu mà du khách không bao giờ quên.",
        en: "The Dragon Bridge breathes fire on weekends — a magical moment tourists never forget.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-005",
    handle: "ao-dai-tee",
    title: { vi: "Áo Thun Họa Tiết Áo Dài", en: "Áo Dài Pattern Tee" },
    description: {
      vi: "Áo thun cotton mềm in họa tiết áo dài hiện đại — thoải mái cho mọi chuyến du lịch.",
      en: "Soft cotton tee with a modern áo dài print — comfortable for every adventure.",
    },
    price: 389000,
    compareAtPrice: 449000,
    images: [
      {
        url: img("ITEM 005", "FD9DAA"),
        alt: { vi: "Áo thun áo dài màu hồng", en: "Pink áo dài pattern tee" },
      },
      {
        url: img("BV-005-2", "FCF5D4"),
        alt: { vi: "Áo thun áo dài màu kem", en: "Cream áo dài pattern tee" },
      },
    ],
    badges: ["best-seller"],
    variants: [
      { id: "BV-005-PK-S", color: "Pink", colorHex: "#FD9DAA", size: "S", available: true, price: 389000 },
      { id: "BV-005-PK-M", color: "Pink", colorHex: "#FD9DAA", size: "M", available: true, price: 389000 },
      { id: "BV-005-PK-L", color: "Pink", colorHex: "#FD9DAA", size: "L", available: false, price: 389000 },
      { id: "BV-005-CR-M", color: "Cream", colorHex: "#FCF5D4", size: "M", available: true, price: 389000 },
      { id: "BV-005-CR-L", color: "Cream", colorHex: "#FCF5D4", size: "L", available: true, price: 389000 },
    ],
    collections: ["vietnam-culture", "best-sellers"],
    tags: ["apparel", "ao-dai", "tee", "culture"],
    category: "apparel",
    characterIds: ["char-bear"],
    metafields: {
      ...meta(
        { vi: "100% cotton combed", en: "100% combed cotton" },
        "Unisex fit",
        { vi: "Dệt và may tại Việt Nam", en: "Woven and sewn in Vietnam" },
        { vi: "Giặt máy 30°C, không tẩy", en: "Machine wash 30°C, do not bleach" },
        {
          vi: "Áo dài — trang phục biểu tượng của vẻ đẹp và duyên dáng Việt Nam qua từng thế hệ.",
          en: "The áo dài — iconic attire embodying Vietnamese grace across generations.",
        },
        { lightweight: true, giftReady: true }
      ),
      stats: { lightweight: 4, cuteness: 5, vietnamLevel: 5 },
    },
  },
  {
    id: "BV-006",
    handle: "lotus-gift-box",
    title: { vi: "Hộp Quà Sen", en: "Lotus Gift Box" },
    description: {
      vi: "Hộp quà giấy in hoa sen kèm ruy băng — sẵn sàng tặng ngay khi mua.",
      en: "Lotus-printed gift box with ribbon — ready to give straight from the shop.",
    },
    price: 249000,
    images: [
      {
        url: img("ITEM 006", "FD9DAA"),
        alt: { vi: "Hộp quà hoa sen", en: "Lotus gift box" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-006-PK", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 249000 },
      { id: "BV-006-CR", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 249000 },
    ],
    collections: ["vietnam-culture", "gifts-under-500k"],
    tags: ["gift-box", "lotus", "present", "culture"],
    category: "gifts",
    characterIds: ["char-bear"],
    metafields: meta(
      { vi: "Giấy kraft + in offset", en: "Kraft paper + offset print" },
      "20 × 15 × 8 cm",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Giữ khô ráo, tránh ẩm mốc", en: "Keep dry, avoid moisture" },
      {
        vi: "Hoa sen tượng trưng cho sự thanh cao — món quà ý nghĩa cho người thân yêu.",
        en: "The lotus symbolizes purity — a meaningful gift for loved ones.",
      },
      { giftReady: true }
    ),
  },
  {
    id: "BV-007",
    handle: "egg-coffee-pin",
    title: { vi: "Ghim Cà Phê Trứng", en: "Egg Coffee Enamel Pin" },
    description: {
      vi: "Ghim enamel cà phê trứng Hà Nội — món đồ sưu tầm nhỏ bé đầy hương vị.",
      en: "Hanoi egg coffee enamel pin — a tiny collectible full of local flavor.",
    },
    price: 69000,
    images: [
      {
        url: img("ITEM 007", "FCF5D4"),
        alt: { vi: "Ghim cà phê trứng", en: "Egg coffee enamel pin" },
      },
    ],
    badges: ["new"],
    variants: [
      { id: "BV-007-OS", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 69000 },
    ],
    collections: ["hanoi", "food-icons", "new-arrivals"],
    tags: ["pin", "coffee", "hanoi", "food"],
    category: "souvenirs",
    characterIds: ["char-bunny"],
    metafields: meta(
      { vi: "Enamel + đồng mạ vàng", en: "Enamel + gold-plated brass" },
      "2.5 cm",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Giữ khô, tránh trầy xước", en: "Keep dry, avoid scratches" },
      {
        vi: "Cà phê trứng — phát minh độc đáo của Hà Nội, kết hợp đắng ngọt hoàn hảo.",
        en: "Egg coffee — a unique Hanoi invention blending bitter and sweet perfectly.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-008",
    handle: "non-la-tote",
    title: { vi: "Túi Tote Nón Lá", en: "Conical Hat Tote Bag" },
    description: {
      vi: "Túi tote in họa tiết nón lá truyền thống — mang theo nét văn hóa Việt mọi nơi.",
      en: "Tote bag featuring traditional conical hat motifs — carry Vietnamese culture everywhere.",
    },
    price: 279000,
    images: [
      {
        url: img("ITEM 008", "C9366B"),
        alt: { vi: "Túi tote nón lá", en: "Conical hat tote bag" },
      },
    ],
    badges: ["best-seller"],
    variants: [
      { id: "BV-008-SB", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: true, price: 279000 },
      { id: "BV-008-CR", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 279000 },
    ],
    collections: ["vietnam-culture", "best-sellers", "gifts-under-500k"],
    tags: ["tote", "non-la", "culture", "souvenir"],
    category: "souvenirs",
    characterIds: ["char-bear"],
    metafields: meta(
      { vi: "Canvas cotton tái chế", en: "Recycled cotton canvas" },
      "40 × 38 cm",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Giặt tay nhẹ nhàng", en: "Gentle hand wash" },
      {
        vi: "Chiếc nón lá che nắng mưa đồng quê — biểu tượng bình dị của người nông dân Việt.",
        en: "The conical hat shades countryside fields — a humble symbol of Vietnamese farmers.",
      },
      { giftReady: true }
    ),
  },
  {
    id: "BV-009",
    handle: "water-puppet-magnet",
    title: { vi: "Nam Châm Múa Rối Nước", en: "Water Puppet Magnet" },
    description: {
      vi: "Nam châm chú rối nước đánh trống — nghệ thuật dân gian đặc sắc của Hà Nội.",
      en: "Water puppet drummer magnet — a distinctive folk art treasure from Hanoi.",
    },
    price: 85000,
    images: [
      {
        url: img("ITEM 009", "FD9DAA"),
        alt: { vi: "Nam châm múa rối nước", en: "Water puppet magnet" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-009-OS", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 85000 },
    ],
    collections: ["hanoi", "vietnam-culture"],
    tags: ["magnet", "puppet", "hanoi", "folk-art"],
    category: "souvenirs",
    characterIds: ["char-cat"],
    metafields: meta(
      { vi: "Gỗ + sơn mài mini", en: "Wood + mini lacquer paint" },
      "6 × 5 cm",
      { vi: "Thủ công tại làng rối nước", en: "Handcrafted in puppet village" },
      { vi: "Lau khô, tránh nước", en: "Wipe dry, keep away from water" },
      {
        vi: "Múa rối nước ra đời từ đồng bằng sông Hồng — kịch nghệ độc đáo trên mặt nước.",
        en: "Water puppetry originated in the Red River Delta — unique theatre performed on water.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-010",
    handle: "pho-lover-hoodie",
    title: { vi: "Áo Hoodie Yêu Phở", en: "Pho Lover Hoodie" },
    description: {
      vi: "Hoodie ấm áp với logo phở thêu tay — dành cho những tín đồ món ăn quốc dân.",
      en: "Cozy hoodie with hand-embroidered pho logo — for devotees of Vietnam's national dish.",
    },
    price: 459000,
    images: [
      {
        url: img("ITEM 010", "C9366B"),
        alt: { vi: "Áo hoodie phở xanh", en: "Sky blue pho hoodie" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-010-SB-S", color: "Deep Pink", colorHex: "#C9366B", size: "S", available: true, price: 459000 },
      { id: "BV-010-SB-M", color: "Deep Pink", colorHex: "#C9366B", size: "M", available: true, price: 459000 },
      { id: "BV-010-SB-L", color: "Deep Pink", colorHex: "#C9366B", size: "L", available: true, price: 459000 },
      { id: "BV-010-CR-M", color: "Cream", colorHex: "#FCF5D4", size: "M", available: false, price: 459000 },
    ],
    collections: ["food-icons"],
    tags: ["hoodie", "pho", "apparel", "winter"],
    category: "apparel",
    metafields: meta(
      { vi: "Cotton French terry 320gsm", en: "320gsm French terry cotton" },
      "Unisex relaxed fit",
      { vi: "May tại Việt Nam", en: "Sewn in Vietnam" },
      { vi: "Giặt máy 30°C, sấy thấp", en: "Machine wash 30°C, tumble dry low" },
      {
        vi: "Một tô phở nóng hổi vào sáng sớm — niềm vui giản dị mà ai cũng nhớ khi rời Việt Nam.",
        en: "A steaming bowl of pho at dawn — simple joy everyone misses after leaving Vietnam.",
      },
      { giftReady: true }
    ),
  },
  {
    id: "BV-011",
    handle: "buffalo-keychain",
    title: { vi: "Móc Khóa Trâu Cày", en: "Plowing Buffalo Keychain" },
    description: {
      vi: "Móc khóa chú trâu cày ruộng dễ thương — hình ảnh làng quê Việt Nam.",
      en: "Adorable plowing buffalo keychain — a charming image of rural Vietnam.",
    },
    price: 75000,
    images: [
      {
        url: img("ITEM 011", "FCF5D4"),
        alt: { vi: "Móc khóa trâu", en: "Buffalo keychain" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-011-OS", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 75000 },
    ],
    collections: ["cute-animals", "vietnam-culture", "gifts-under-200k"],
    tags: ["keychain", "buffalo", "rural", "cute"],
    category: "souvenirs",
    characterIds: ["char-duck"],
    metafields: meta(
      { vi: "Silicone + kim loại", en: "Silicone + metal" },
      "4 × 4 cm",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Lau sạch bằng khăn ẩm", en: "Wipe with damp cloth" },
      {
        vi: "Con trâu — người bạn đồng hành của nông dân trên cánh đồng lúa xanh.",
        en: "The water buffalo — farmers' faithful companion across green rice paddies.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-012",
    handle: "ha-long-postcards",
    title: { vi: "Bộ Bưu Thiếp Vịnh Hạ Long", en: "Ha Long Bay Postcard Set" },
    description: {
      vi: "Bộ 8 bưu thiếp in ảnh Vịnh Hạ Long — gửi lời chào từ di sản thiên nhiên thế giới.",
      en: "Set of 8 Ha Long Bay postcards — send greetings from a UNESCO World Heritage site.",
    },
    price: 129000,
    images: [
      {
        url: img("ITEM 012", "C9366B"),
        alt: { vi: "Bưu thiếp Vịnh Hạ Long", en: "Ha Long Bay postcards" },
      },
    ],
    badges: ["new"],
    variants: [
      { id: "BV-012-OS", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: true, price: 129000 },
    ],
    collections: ["vietnam-culture", "new-arrivals", "gifts-under-200k"],
    tags: ["postcard", "ha-long", "bay", "stationery"],
    category: "gifts",
    characterIds: ["char-cat"],
    metafields: meta(
      { vi: "Giấy art 300gsm", en: "300gsm art paper" },
      "A6, 8 tấm",
      { vi: "In tại Hạ Long, Việt Nam", en: "Printed in Ha Long, Vietnam" },
      { vi: "Bảo quản nơi khô ráo", en: "Store in a dry place" },
      {
        vi: "Hàng nghìn đảo đá vôi nhô lên từ làn nước ngọt ngào — kỳ quan thiên nhiên Việt Nam.",
        en: "Thousands of limestone islets rise from emerald waters — a Vietnamese natural wonder.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-013",
    handle: "sticky-rice-duck",
    title: { vi: "Vịt Xôi Bông", en: "Sticky Rice Duck Plush" },
    description: {
      vi: "Chú vịt bông mặc áo xôi xéo — nhân vật dễ thương lấy cảm hứng từ ẩm thực Bắc Bộ.",
      en: "Plush duck dressed as sticky rice — an adorable character inspired by Northern cuisine.",
    },
    price: 199000,
    images: [
      {
        url: img("ITEM 013", "FD9DAA"),
        alt: { vi: "Vịt xôi bông", en: "Sticky rice duck plush" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-013-PK", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 199000 },
      { id: "BV-013-CR", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 199000 },
    ],
    collections: ["cute-animals", "food-icons", "gifts-under-200k"],
    tags: ["plush", "duck", "food", "cute"],
    category: "gifts",
    characterIds: ["char-duck"],
    metafields: meta(
      { vi: "Polyester plush + nhồi bông", en: "Polyester plush + cotton fill" },
      "18 cm",
      { vi: "May thủ công tại Việt Nam", en: "Hand-sewn in Vietnam" },
      { vi: "Giặt bề mặt, phơi tự nhiên", en: "Surface wash, air dry" },
      {
        vi: "Xôi xéo Hà Nội — món ăn sáng yêu thích với xôi nếp vàng và đậu xanh.",
        en: "Hanoi's xoi xeo — a beloved breakfast of golden sticky rice and mung beans.",
      },
      { giftReady: true }
    ),
  },
  {
    id: "BV-014",
    handle: "hanoi-tram-pin",
    title: { vi: "Ghim Xe Điện Hà Nội", en: "Hanoi Tram Enamel Pin" },
    description: {
      vi: "Ghim enamel xe điện cổ Hà Nội — hoài niệm về phố phường xưa.",
      en: "Hanoi vintage tram enamel pin — nostalgia for the city's old streets.",
    },
    price: 65000,
    images: [
      {
        url: img("ITEM 014", "FD9DAA"),
        alt: { vi: "Ghim xe điện Hà Nội", en: "Hanoi tram enamel pin" },
      },
    ],
    badges: ["new"],
    variants: [
      { id: "BV-014-OS", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 65000 },
    ],
    collections: ["hanoi", "new-arrivals", "gifts-under-200k"],
    tags: ["pin", "tram", "hanoi", "vintage"],
    category: "souvenirs",
    characterIds: ["char-cat"],
    metafields: meta(
      { vi: "Enamel cứng + thép không gỉ", en: "Hard enamel + stainless steel" },
      "3 cm",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Giữ khô, tránh hóa chất", en: "Keep dry, avoid chemicals" },
      {
        vi: "Tiếng chuông xe điện vang vọng qua phố cổ — âm thanh của Hà Nội một thời.",
        en: "Tram bells echoing through the Old Quarter — the sound of old Hanoi.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-015",
    handle: "silk-scarf-lotus",
    title: { vi: "Khăn Lụa Hoa Sen", en: "Lotus Silk Scarf" },
    description: {
      vi: "Khăn lụa tơ tằm in hoa sen — phụ kiện thanh lịch mang hơi thở Việt Nam.",
      en: "Silk scarf with lotus print — an elegant accessory with a Vietnamese soul.",
    },
    price: 429000,
    compareAtPrice: 499000,
    images: [
      {
        url: img("ITEM 015", "FD9DAA"),
        alt: { vi: "Khăn lụa hoa sen hồng", en: "Pink lotus silk scarf" },
      },
      {
        url: img("BV-015-2", "C9366B"),
        alt: { vi: "Khăn lụa hoa sen xanh", en: "Sky blue lotus silk scarf" },
      },
    ],
    badges: ["limited"],
    variants: [
      { id: "BV-015-PK", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 429000 },
      { id: "BV-015-SB", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: true, price: 429000 },
    ],
    collections: ["vietnam-culture"],
    tags: ["scarf", "silk", "lotus", "accessory"],
    category: "apparel",
    characterIds: ["char-bear"],
    metafields: meta(
      { vi: "Lụa tơ tằm Bảo Lộc", en: "Bao Loc mulberry silk" },
      "90 × 90 cm",
      { vi: "Dệt và in tại làng lụa Hà Đông", en: "Woven and printed in Ha Dong silk village" },
      { vi: "Giặt khô hoặc giặt tay nhẹ", en: "Dry clean or gentle hand wash" },
      {
        vi: "Làng lụa Hà Đông — nơi nghệ nhân dệt lụa đã truyền nghề qua hàng trăm năm.",
        en: "Ha Dong silk village — where artisans have passed down weaving for centuries.",
      },
      { giftReady: true }
    ),
  },
  {
    id: "BV-016",
    handle: "saigon-cat-stickers",
    title: { vi: "Bộ Sticker Mèo Sài Gòn", en: "Saigon Cat Sticker Pack" },
    description: {
      vi: "Bộ 12 sticker vinyl mèo lang thang Sài Gòn — dán laptop, chai nước, sổ tay.",
      en: "Pack of 12 vinyl stickers of cats wandering Saigon — for laptops, bottles, and journals.",
    },
    price: 59000,
    images: [
      {
        url: img("ITEM 016", "FD9DAA"),
        alt: { vi: "Bộ sticker mèo Sài Gòn", en: "Saigon cat sticker pack" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-016-OS", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 59000 },
    ],
    collections: ["cute-animals", "gifts-under-200k"],
    tags: ["sticker", "cat", "saigon", "vinyl"],
    category: "gifts",
    characterIds: ["char-duck", "char-cat"],
    metafields: meta(
      { vi: "Vinyl chống nước", en: "Waterproof vinyl" },
      "3–6 cm, 12 miếng",
      { vi: "In tại TP.HCM", en: "Printed in Ho Chi Minh City" },
      { vi: "Dán trên bề mặt phẳng, khô ráo", en: "Apply to clean, dry flat surfaces" },
      {
        vi: "Mèo phố Sài Gòn — thỉnh thoảng nằm phơi nắng trên nóc xe máy và mái hiên.",
        en: "Saigon street cats — sometimes sunbathing on motorbike seats and awnings.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-017",
    handle: "vietnam-map-tote",
    title: { vi: "Túi Tote Bản Đồ Việt Nam", en: "Vietnam Map Tote Bag" },
    description: {
      vi: "Túi tote in bản đồ Việt Nam với các địa danh nổi tiếng — cho những người yêu du lịch.",
      en: "Tote printed with a Vietnam map and famous landmarks — for travel lovers.",
    },
    price: 299000,
    images: [
      {
        url: img("ITEM 017", "FCF5D4"),
        alt: { vi: "Túi tote bản đồ Việt Nam", en: "Vietnam map tote bag" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-017-CR", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 299000 },
      { id: "BV-017-SB", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: true, price: 299000 },
    ],
    collections: ["vietnam-culture", "gifts-under-500k"],
    tags: ["tote", "map", "travel", "landmarks"],
    category: "souvenirs",
    characterIds: ["char-cat"],
    metafields: meta(
      { vi: "Canvas organic cotton", en: "Organic cotton canvas" },
      "42 × 40 cm",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Giặt tay, không ủi trực tiếp hình in", en: "Hand wash, do not iron print directly" },
      {
        vi: "Từ Hà Giang đến Cà Mau — mỗi vùng miền là một câu chuyện trên bản đồ.",
        en: "From Ha Giang to Ca Mau — every region is a story on the map.",
      },
      { giftReady: true }
    ),
  },
  {
    id: "BV-018",
    handle: "spring-roll-magnet",
    title: { vi: "Nam Châm Gỏi Cuốn", en: "Spring Roll Magnet" },
    description: {
      vi: "Nam châm gỏi cuốn tươi với tôm và rau thơm — món ăn Việt được yêu thích toàn cầu.",
      en: "Fresh spring roll magnet with shrimp and herbs — a globally loved Vietnamese dish.",
    },
    price: 79000,
    images: [
      {
        url: img("ITEM 018", "C9366B"),
        alt: { vi: "Nam châm gỏi cuốn", en: "Spring roll magnet" },
      },
    ],
    badges: ["best-seller"],
    variants: [
      { id: "BV-018-OS", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: true, price: 79000 },
    ],
    collections: ["food-icons", "best-sellers", "gifts-under-200k"],
    tags: ["magnet", "spring-roll", "food", "fresh"],
    category: "souvenirs",
    characterIds: ["char-bunny"],
    metafields: meta(
      { vi: "Resin trong + nam châm", en: "Clear resin + magnet" },
      "5 × 5 cm",
      { vi: "Sản xuất tại Việt Nam", en: "Made in Vietnam" },
      { vi: "Lau khô bằng vải mềm", en: "Wipe with soft cloth" },
      {
        vi: "Gỏi cuốn — cuộn tươi mát, chấm nước mắm pha, hương vị thanh nhẹ mùa hè.",
        en: "Goi cuon — fresh rolls dipped in fish sauce, a light summer flavor.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-019",
    handle: "tet-envelope-set",
    title: { vi: "Bộ Lì Xì Tết", en: "Tet Red Envelope Set" },
    description: {
      vi: "Bộ 6 phong bì lì xì in họa tiết Tết — quà ý nghĩa dịp năm mới.",
      en: "Set of 6 Tet red envelopes with festive prints — a meaningful Lunar New Year gift.",
    },
    price: 149000,
    images: [
      {
        url: img("ITEM 019", "FD9DAA"),
        alt: { vi: "Bộ lì xì Tết", en: "Tet red envelope set" },
      },
    ],
    badges: [],
    variants: [
      { id: "BV-019-PK", color: "Pink", colorHex: "#FD9DAA", size: "One Size", available: true, price: 149000 },
      { id: "BV-019-CR", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 149000 },
    ],
    collections: ["vietnam-culture", "gifts-under-200k"],
    tags: ["tet", "envelope", "lunar-new-year", "gift"],
    category: "gifts",
    metafields: meta(
      { vi: "Giấy mỹ thuật + in foil", en: "Art paper + foil print" },
      "10 × 17 cm, 6 chiếc",
      { vi: "In tại Việt Nam", en: "Printed in Vietnam" },
      { vi: "Bảo quản phẳng, tránh gập", en: "Store flat, avoid creasing" },
      {
        vi: "Lì xì Tết — lời chúc may mắn và thịnh vượng gửi đến người thân yêu.",
        en: "Tet li xi — wishes of luck and prosperity for loved ones.",
      },
      { easyToPack: true, lightweight: true, giftReady: true }
    ),
  },
  {
    id: "BV-020",
    handle: "coconut-coffee-mug",
    title: { vi: "Cốc Sứ Cà Phê Dừa", en: "Coconut Coffee Mug" },
    description: {
      vi: "Cốc sứ in cà phê dừa Sài Gòn — mang hương vị nhiệt đới vào buổi sáng của bạn.",
      en: "Ceramic mug featuring Saigon coconut coffee — bring tropical flavor to your mornings.",
    },
    price: 179000,
    images: [
      {
        url: img("ITEM 020", "FCF5D4"),
        alt: { vi: "Cốc sứ cà phê dừa", en: "Coconut coffee mug" },
      },
    ],
    badges: ["new"],
    variants: [
      { id: "BV-020-CR", color: "Cream", colorHex: "#FCF5D4", size: "One Size", available: true, price: 179000 },
      { id: "BV-020-SB", color: "Deep Pink", colorHex: "#C9366B", size: "One Size", available: true, price: 179000 },
    ],
    collections: ["food-icons", "new-arrivals", "gifts-under-200k"],
    tags: ["mug", "coffee", "coconut", "kitchen"],
    category: "gifts",
    metafields: meta(
      { vi: "Sứ cao cấp", en: "Premium ceramic" },
      "350 ml",
      { vi: "Nung tại Bát Tràng, Việt Nam", en: "Fired in Bat Trang, Vietnam" },
      { vi: "Rửa tay hoặc máy rửa bát nhẹ", en: "Hand wash or gentle dishwasher cycle" },
      {
        vi: "Cà phê dừa — sáng tạo Sài Gòn kết hợp đắng đậm và ngọt béo của nước cốt dừa.",
        en: "Coconut coffee — a Saigon creation blending bold espresso with creamy coconut.",
      },
      { giftReady: true }
    ),
  },
];

function matchesCollection(product: BiscuteProduct, handle: string): boolean {
  switch (handle) {
    case "souvenirs":
      return product.category === "souvenirs";
    case "apparel":
      return product.category === "apparel";
    case "gifts":
      return product.category === "gifts";
    case "gifts-under-200k":
      return product.price <= 200_000;
    case "gifts-under-500k":
      return product.price <= 500_000;
    case "best-sellers":
      return product.badges.includes("best-seller");
    case "new-arrivals":
      return product.badges.includes("new");
    default:
      return product.collections.includes(handle);
  }
}

function countForCollection(handle: string): number {
  return products.filter((p) => matchesCollection(p, handle)).length;
}

export const collections: Collection[] = [
  {
    handle: "souvenirs",
    title: { vi: "Lưu Niệm", en: "Souvenirs" },
    description: {
      vi: "Quà lưu niệm độc đáo mang hơi thở Việt Nam — từ nam châm đến túi tote.",
      en: "Unique souvenirs with a Vietnamese soul — from magnets to tote bags.",
    },
    productCount: countForCollection("souvenirs"),
    image: img("souvenirs", "FD9DAA"),
  },
  {
    handle: "apparel",
    title: { vi: "Thời Trang", en: "Apparel" },
    description: {
      vi: "Áo thun, hoodie và phụ kiện thời trang in họa tiết Việt Nam.",
      en: "Tees, hoodies, and fashion accessories with Vietnamese-inspired prints.",
    },
    productCount: countForCollection("apparel"),
    image: img("apparel", "C9366B"),
  },
  {
    handle: "gifts",
    title: { vi: "Quà Tặng", en: "Gifts" },
    description: {
      vi: "Món quà ý nghĩa cho bạn bè và người thân — sẵn sàng tặng ngay.",
      en: "Thoughtful gifts for friends and family — ready to give.",
    },
    productCount: countForCollection("gifts"),
    image: img("gifts", "FCF5D4"),
  },
  {
    handle: "hanoi",
    title: { vi: "Hà Nội", en: "Hanoi" },
    description: {
      vi: "Sản phẩm lấy cảm hứng từ thủ đô nghìn năm văn hiến.",
      en: "Products inspired by the thousand-year-old capital.",
    },
    productCount: countForCollection("hanoi"),
    image: img("HANOI", "3EA9F5"),
    adventureTitle: { vi: "HÀ NỘI\nCHAOS", en: "HANOI\nCHAOS" },
    characterId: "char-cat",
    accentColor: "#3EA9F5",
  },
  {
    handle: "food-icons",
    title: { vi: "Ẩm Thực Việt", en: "Food Icons" },
    description: {
      vi: "Phở, bánh mì, gỏi cuốn và những món ăn biểu tượng của Việt Nam.",
      en: "Pho, bánh mì, spring rolls, and iconic Vietnamese dishes.",
    },
    productCount: countForCollection("food-icons"),
    image: img("FOOD", "EF4136"),
    adventureTitle: {
      vi: "ĂN DỌC\nVIỆT NAM",
      en: "EAT YOUR\nWAY THROUGH\nVIETNAM",
    },
    characterId: "char-bunny",
    accentColor: "#EF4136",
  },
  {
    handle: "cute-animals",
    title: { vi: "Thú Cưng Dễ Thương", en: "Cute Animals" },
    description: {
      vi: "Mèo, vịt, trâu và những nhân vật đáng yêu trong bộ sưu tập BISCUTE.",
      en: "Cats, ducks, buffaloes, and adorable characters from BISCUTE.",
    },
    productCount: countForCollection("cute-animals"),
    image: img("ANIMALS", "FFD940"),
    adventureTitle: {
      vi: "CHỈ CÓ\nTHÚ CƯNG",
      en: "CUTE\nANIMALS\nONLY",
    },
    characterId: "char-duck",
    accentColor: "#FFD940",
  },
  {
    handle: "vietnam-culture",
    title: { vi: "Văn Hóa Việt", en: "Vietnam Culture" },
    description: {
      vi: "Áo dài, nón lá, hoa sen và biểu tượng văn hóa truyền thống.",
      en: "Áo dài, conical hats, lotus flowers, and traditional cultural symbols.",
    },
    productCount: countForCollection("vietnam-culture"),
    image: img("CULTURE", "FF8FB3"),
    adventureTitle: {
      vi: "RẤT\nVIỆT NAM",
      en: "VERY\nVIETNAMESE\nTHINGS",
    },
    characterId: "char-bear",
    accentColor: "#FF8FB3",
  },
  {
    handle: "gifts-under-200k",
    title: { vi: "Quà Dưới 200K", en: "Gifts Under 200K" },
    description: {
      vi: "Món quà nhỏ xinh với mức giá dưới 200.000đ — phù hợp du khách.",
      en: "Charming gifts under 200,000 VND — perfect for travelers.",
    },
    productCount: countForCollection("gifts-under-200k"),
    image: img("gifts-under-200k", "FCF5D4"),
  },
  {
    handle: "gifts-under-500k",
    title: { vi: "Quà Dưới 500K", en: "Gifts Under 500K" },
    description: {
      vi: "Quà tặng chất lượng với mức giá dưới 500.000đ.",
      en: "Quality gifts under 500,000 VND.",
    },
    productCount: countForCollection("gifts-under-500k"),
    image: img("gifts-under-500k", "FD9DAA"),
  },
  {
    handle: "best-sellers",
    title: { vi: "Bán Chạy Nhất", en: "Best Sellers" },
    description: {
      vi: "Những sản phẩm được khách hàng yêu thích nhất tại BISCUTE.",
      en: "Our most loved products at BISCUTE.",
    },
    productCount: countForCollection("best-sellers"),
    image: img("best-sellers", "C9366B"),
  },
  {
    handle: "new-arrivals",
    title: { vi: "Hàng Mới Về", en: "New Arrivals" },
    description: {
      vi: "Sản phẩm mới nhất vừa cập bến tại cửa hàng BISCUTE.",
      en: "The latest products just arrived at BISCUTE.",
    },
    productCount: countForCollection("new-arrivals"),
    image: img("new-arrivals", "FCF5D4"),
  },
];

export function getProductByHandle(handle: string): BiscuteProduct | undefined {
  return products.find((p) => p.handle === handle);
}

export function getProductsByCollection(handle: string): BiscuteProduct[] {
  return products.filter((p) => matchesCollection(p, handle));
}

export function getBestSellers(): BiscuteProduct[] {
  return products.filter((p) => p.badges.includes("best-seller"));
}

export function getNewArrivals(): BiscuteProduct[] {
  return products.filter((p) => p.badges.includes("new"));
}

export function getGiftsUnderPrice(maxPrice: number): BiscuteProduct[] {
  return products.filter((p) => p.price <= maxPrice);
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

export function getCategoryCounts(): {
  souvenirs: number;
  apparel: number;
  gifts: number;
} {
  return {
    souvenirs: products.filter((p) => p.category === "souvenirs").length,
    apparel: products.filter((p) => p.category === "apparel").length,
    gifts: products.filter((p) => p.category === "gifts").length,
  };
}

export function searchProducts(query: string): BiscuteProduct[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  return products.filter((p) => {
    const haystack = [
      p.title.vi,
      p.title.en,
      p.description.vi,
      p.description.en,
      ...p.tags,
      p.handle,
      p.id,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function filterProducts(
  items: BiscuteProduct[],
  filters: ProductFilters
): BiscuteProduct[] {
  let result = [...items];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.color) {
    result = result.filter((p) =>
      p.variants.some((v) => v.color === filters.color)
    );
  }

  if (filters.size) {
    result = result.filter((p) =>
      p.variants.some((v) => v.size === filters.size)
    );
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.available !== undefined) {
    result = result.filter((p) =>
      p.variants.some((v) => v.available === filters.available)
    );
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort((a, b) => {
        const aNew = a.badges.includes("new") ? 1 : 0;
        const bNew = b.badges.includes("new") ? 1 : 0;
        return bNew - aNew;
      });
      break;
    case "best-selling":
      result.sort((a, b) => {
        const aBest = a.badges.includes("best-seller") ? 1 : 0;
        const bBest = b.badges.includes("best-seller") ? 1 : 0;
        return bBest - aBest;
      });
      break;
    case "featured":
    default:
      break;
  }

  return result;
}

export function getRelatedProducts(
  product: BiscuteProduct,
  limit = 4
): BiscuteProduct[] {
  const scored = products
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (product.characterIds?.length) {
        for (const id of product.characterIds) {
          if (p.characterIds?.includes(id)) score += 5;
        }
      }
      if (p.category === product.category) score += 2;
      for (const col of p.collections) {
        if (product.collections.includes(col)) score += 3;
      }
      for (const tag of p.tags) {
        if (product.tags.includes(tag)) score += 1;
      }
      return { product: p, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.product);
}
