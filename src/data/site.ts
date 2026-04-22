import type { NavigationItem, Product, ProductMedia, ReviewMediaItem } from "@/types/site";

export const company = {
  name: "AmarToy",
  phone: "+1 840 841 25 69",
  secondaryPhone: "+1 840 841 25 70",
  email: "hello@amartoy.com",
  supportEmail: "support@amartoy.com",
  address: "785 15h Street, Office 478, Berlin, DE 81566",
  shortAddress: "785 15h Street, Office 478",
  city: "Berlin, DE 81566",
  website: "https://amartoy.com",
  developerName: "Abul Hayat",
  developerUrl: "https://facebook.com",
  mapEmbed:
    "https://www.google.com/maps?q=785%2015h%20Street%20Office%20478%20Berlin&output=embed",
};

export const navigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about/",
  },
  {
    label: "Shop",
    href: "/shop/",
  },
  {
    label: "Blog",
    href: "/blog/",
  },
  {
    label: "Contacts",
    href: "/contact/",
  },
];

export const heroSlides = [
  {
    id: 1,
    eyebrow: "Pick the best toy",
    title: "Pick the best toy for your kid",
    description:
      "We offer a premium service, whether you are shopping at one of our flagship stores or via our website!",
    cta: "Discover Now",
    image: "/images/home/hero-blue.svg",
    accent: "sky",
  },
  {
    id: 2,
    eyebrow: "Special offers",
    title: "Get a bonus after the first order!",
    description:
      "The best offers for regular customers, including free shipping on your childrens' birthdays!",
    cta: "Discover Now",
    image: "/images/home/hero-gold.svg",
    accent: "sun",
  },
  {
    id: 3,
    eyebrow: "New collection",
    title: "Playful moments for happy little heroes",
    description:
      "Explore joyful picks, colorful categories, and thoughtful toys arranged in a bright family-friendly storefront.",
    cta: "Explore Toys",
    image: "/images/home/hero-coral.svg",
    accent: "coral",
  },
];

export const categories = [
  {
    id: 1,
    name: "Bath Toys",
    href: "/shop/",
    image: "/images/real/kids-playroom.jpg",
    description: "Water-safe picks for splash-filled routines.",
  },
  {
    id: 2,
    name: "Figures Play",
    href: "/shop/",
    image: "/images/real/teddy-room.jpg",
    description: "Character sets and pretend-play worlds.",
  },
  {
    id: 3,
    name: "Learning",
    href: "/shop/",
    image: "/images/real/toy-blocks.jpg",
    description: "Building, sorting, and brain-boosting fun.",
  },
  {
    id: 4,
    name: "Musical",
    href: "/shop/",
    image: "/images/real/happy-outdoors.jpg",
    description: "Sound toys for rhythm, melody, and movement.",
  },
];

export const services = [
  {
    title: "Big Selection",
    text: "The widest toy range.",
    icon: "sparkles",
    color: "purple",
  },
  {
    title: "Online Store",
    text: "Easy and secure shopping.",
    icon: "shopping-bag",
    color: "yellow",
  },
  {
    title: "Delivery",
    text: "Fast and easy delivery.",
    icon: "truck",
    color: "blue",
  },
  {
    title: "Support",
    text: "Call our awesome team.",
    icon: "life-buoy",
    color: "green",
  },
];

export const features = [
  { title: "Best Prices", subtitle: "Affordable", icon: "badge-dollar-sign" },
  { title: "Fast Shipment", subtitle: "Express", icon: "package-check" },
  { title: "Buyers Protection", subtitle: "Guarantee", icon: "shield-check" },
  { title: "Live Support", subtitle: "Online", icon: "message-circle" },
];

export const brands = [
  "TinyOrbit",
  "PlayNest",
  "BlockBloom",
  "SproutLab",
  "Happy Trails",
  "Star Cub",
];

export const testimonials = [
  {
    id: 1,
    name: "Mandy Mathers",
    role: "CEO, Business Co.",
    quote:
      "What a great store for the entire family. My kids love this place because of the toys and the easy shopping flow.",
  },
  {
    id: 2,
    name: "Peter Bowman",
    role: "CEO, Business Co.",
    quote:
      "Not only do the toys make our children squeal with joy, but the sales team and checkout experience are awesome.",
  },
  {
    id: 3,
    name: "George Johnson",
    role: "Parent & Teacher",
    quote:
      "I was surprised at how attentive the team is to each little customer. Parents can actually relax and enjoy shopping here.",
  },
];

export const team = [
  {
    id: 1,
    name: "Wendy Williams",
    role: "Sales Manager",
    image: "/images/team/team-1.svg",
  },
  {
    id: 2,
    name: "Garry Freemont",
    role: "CEO",
    image: "/images/team/team-2.svg",
  },
  {
    id: 3,
    name: "Sandy Walker",
    role: "Creative Director",
    image: "/images/team/team-3.svg",
  },
  {
    id: 4,
    name: "Vicky Warmheart",
    role: "Community Lead",
    image: "/images/team/team-4.svg",
  },
];

export const blogPosts = [
  {
    id: 1,
    slug: "guide-to-working-at-summer-camps",
    title: "Guide to working at summer camps",
    category: "Toddlers",
    date: "Apr 21, 2026",
    image: "/images/real/happy-outdoors.jpg",
    excerpt:
      "Ideas for keeping kids active, social, and delightfully engaged through creative play.",
    author: "Cloe Brooks",
    authorImage: "/images/team/team-1.svg",
    intro:
      "Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat.",
    paragraphs: [
      "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
      "Ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
      "Aenean et egestas nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce gravida, ligula non molestie tristique, justo elit blandit risus, blandit maximus augue magna accumsan ante.",
      "Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies risus, vel rutrum erat commodo ut. Praesent finibus congue euismod. Nullam scelerisque massa vel augue placerat, a tempor sem egestas.",
    ],
    quote:
      "Curabitur varius eros et lacus rutrum consequat. Mauris sollicitudin enim condimentum, luctus justo non, molestie nisl.",
    detailImage: "/images/real/kids-playroom.jpg",
    tags: ["Article", "Featured", "Style 1"],
    likes: 1,
  },
  {
    id: 2,
    slug: "main-challenge-for-parents",
    title: "What’s the main challenge for parents?",
    category: "Parenting",
    date: "Apr 23, 2026",
    image: "/images/real/playroom-toys.jpg",
    excerpt:
      "How thoughtful product curation and store structure can lower decision fatigue for families.",
    author: "Cloe Brooks",
    authorImage: "/images/team/team-2.svg",
    intro:
      "Thoughtful layouts and clear buying cues can turn overwhelming shopping choices into a calmer family experience.",
    paragraphs: [
      "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
      "Curabitur eget leo at velit imperdiet varius. In eu ipsum vitae velit congue iaculis vitae at risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.",
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras dapibus. Vivamus elementum semper nisi.",
    ],
    quote:
      "Great family shopping experiences start when guidance is clear and every step feels less overwhelming.",
    detailImage: "/images/real/headphones-boy.jpg",
    tags: ["Article", "Parenting", "Guide"],
    likes: 1,
  },
  {
    id: 3,
    slug: "best-preschool-program",
    title: "How to choose the best preschool program",
    category: "Learning",
    date: "Apr 24, 2026",
    image: "/images/real/toy-blocks.jpg",
    excerpt:
      "A quick guide to balancing sensory play, social growth, and age-appropriate milestones.",
    author: "Cloe Brooks",
    authorImage: "/images/team/team-3.svg",
    intro:
      "Choosing the right preschool program means balancing learning structure, creativity, and emotional growth.",
    paragraphs: [
      "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
      "Praesent ac massa at ligula laoreet iaculis. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit.",
    ],
    quote:
      "A strong preschool fit supports curiosity, social confidence, and everyday joy in learning.",
    detailImage: "/images/real/toy-blocks.jpg",
    tags: ["Article", "Learning", "Featured"],
    likes: 1,
  },
  {
    id: 4,
    slug: "modern-toy-production",
    title: "Thinking out of the box: modern toys production",
    category: "Toys",
    date: "Apr 25, 2026",
    image: "/images/blog/blog-4.svg",
    excerpt:
      "Why premium materials, rounded forms, and color psychology matter in contemporary toy design.",
    author: "Cloe Brooks",
    authorImage: "/images/team/team-1.svg",
    intro:
      "Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget viverra egestas nisi in consequat. Fusce sodales augue a accumsan. Cras sollicitudin, ipsum eget blandit pulvinar. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.",
    paragraphs: [
      "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
      "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
      "Aenean et egestas nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce gravida, ligula non molestie tristique, justo elit blandit risus, blandit maximus augue magna accumsan ante. Duis id mi tristique, pulvinar neque at, lobortis tortor.",
      "Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies risus, vel rutrum erat commodo ut. Praesent finibus congue euismod. Nullam scelerisque massa vel augue placerat, a tempor sem egestas. Curabitur placerat finibus lacus.",
    ],
    quote:
      "Curabitur varius eros et lacus rutrum consequat. Mauris sollicitudin enim condimentum, luctus justo non, molestie nisl.",
    detailImage: "/images/real/kids-playroom.jpg",
    tags: ["Article", "Featured", "Style 1"],
    likes: 1,
  },
  {
    id: 5,
    slug: "holiday-gift-ideas",
    title: "The best holiday gifts ideas in 2026",
    category: "Toys",
    date: "Apr 26, 2026",
    image: "/images/blog/blog-5.svg",
    excerpt:
      "A playful selection of crowd-pleasers for birthdays, family visits, and surprise moments.",
    author: "Cloe Brooks",
    authorImage: "/images/team/team-4.svg",
    intro:
      "Holiday toy gifting works best when usefulness, delight, and age-fit come together in one thoughtful pick.",
    paragraphs: [
      "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
      "Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.",
      "Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero.",
      "Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.",
    ],
    quote:
      "The best gift ideas feel exciting at first glance and stay meaningful long after the wrapping comes off.",
    detailImage: "/images/real/baby-blocks.jpg",
    tags: ["Article", "Toys", "Guide"],
    likes: 1,
  },
  {
    id: 6,
    slug: "toy-safety-for-infants",
    title: "How to choose the right toy for an infant?",
    category: "Toys",
    date: "Apr 27, 2026",
    image: "/images/blog/blog-6.svg",
    excerpt:
      "A baby-safe buying checklist covering materials, scale, sensory feedback, and ease of cleaning.",
    author: "Cloe Brooks",
    authorImage: "/images/team/team-2.svg",
    intro:
      "Safe infant toy choices come down to soft edges, washable materials, sensory variety, and the right scale.",
    paragraphs: [
      "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
      "Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.",
      "Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.",
    ],
    quote:
      "A baby-safe toy should feel gentle, clean easily, and invite exploration without creating extra risk.",
    detailImage: "/images/real/baby-blocks.jpg",
    tags: ["Article", "Safety", "Featured"],
    likes: 1,
  },
];

export const stats = [
  { label: "Happy Kids", value: 5000 },
  { label: "Toy Collections", value: 120 },
  { label: "Cities Delivered", value: 24 },
];

export const tags = [
  "STEM",
  "Preschool",
  "Wooden",
  "Creative",
  "Family",
  "Montessori",
  "Pretend Play",
];

const buildDefaultMedia = (product: Product): ProductMedia[] =>
  Array.from({ length: 4 }, (_, index) => ({
    type: "image",
    src: product.image,
    alt: `${product.name} view ${index + 1}`,
  }));

const baseProducts: Product[] = [
  {
    id: 1,
    slug: "skywinder-toy",
    name: "Skywinder Toy",
    image: "/images/real/headphones-boy.jpg",
    media: [
      {
        type: "image",
        src: "/images/real/headphones-boy.jpg",
        alt: "Skywinder Toy front view",
      },
      {
        type: "image",
        src: "/images/real/playroom-toys.jpg",
        alt: "Skywinder Toy playroom angle",
      },
      {
        type: "image",
        src: "/images/real/kids-playroom.jpg",
        alt: "Skywinder Toy lifestyle setup",
      },
      {
        type: "image",
        src: "/images/real/toy-blocks.jpg",
        alt: "Skywinder Toy detail shot",
      },
    ],
    category: "Electronic",
    categorySlug: "electronic",
    price: 250,
    description:
      "A bright motion toy with tactile controls and a playful design language tailored to curious little hands.",
    shortDescription:
      "A playful motion toy with durable materials, safe edges, and all-day fun.",
    accent: "accent-peach",
    artwork: "plane",
    tags: ["Electronic", "Outdoor", "Best Seller"],
    saleLabel: null,
    rating: 5,
    stock: "In stock",
    sku: "AT-1001",
  },
  {
    id: 2,
    slug: "excavator-toy",
    name: "Excavator Toy",
    image: "/images/real/playroom-toys.jpg",
    category: "Figures Play",
    categorySlug: "figures-play",
    price: 122,
    description:
      "Construction-themed play made softer and friendlier, with oversized details and a collectible silhouette.",
    shortDescription: "A construction favorite with bold shapes and collectible styling.",
    accent: "accent-gold",
    artwork: "excavator",
    tags: ["Construction", "Roleplay", "Popular"],
    saleLabel: null,
    rating: 4,
    stock: "In stock",
    sku: "AT-1002",
  },
  {
    id: 3,
    slug: "dolls-trailer",
    name: "Dolls Trailer",
    image: "/images/real/kids-playroom.jpg",
    category: "Figures Play",
    categorySlug: "figures-play",
    price: 320,
    description:
      "A roomy pretend-play set with multiple levels, bright color-blocking, and premium rounded finishes.",
    shortDescription:
      "A premium pretend-play set designed for storytelling and imaginative routines.",
    accent: "accent-pink",
    artwork: "dollhouse",
    tags: ["Pretend Play", "Gift", "Indoor"],
    saleLabel: null,
    rating: 5,
    stock: "In stock",
    sku: "AT-1003",
  },
  {
    id: 4,
    slug: "cutie-girl-doll",
    name: "Cutie Girl Doll",
    image: "/images/real/happy-outdoors.jpg",
    category: "Bath Toys",
    categorySlug: "bath-toys",
    price: 150,
    description:
      "A soft-toned doll designed with approachable features, layered textures, and cuddle-first comfort.",
    shortDescription: "A soft and lovable doll with playful details and premium finishing.",
    accent: "accent-rose",
    artwork: "doll",
    tags: ["Soft", "Gift", "Classic"],
    saleLabel: null,
    rating: 4,
    stock: "In stock",
    sku: "AT-1004",
  },
  {
    id: 5,
    slug: "genius-walker",
    name: "Genius Walker",
    image: "/images/real/kids-blocks.jpg",
    category: "Learning",
    categorySlug: "learning",
    price: 180,
    description:
      "A color-rich push walker with engaging knobs, turning blocks, and toddler-friendly educational prompts.",
    shortDescription: "A bright learning walker packed with tactile mini activities.",
    accent: "accent-mint",
    artwork: "walker",
    tags: ["Learning", "Toddler", "Montessori"],
    saleLabel: "New",
    rating: 5,
    stock: "In stock",
    sku: "AT-1005",
  },
  {
    id: 6,
    slug: "doctor-doll",
    name: "Doctor Doll",
    image: "/images/real/baby-blocks.jpg",
    category: "Figures Play",
    categorySlug: "figures-play",
    price: 95,
    description:
      "A roleplay character built for empathy-rich games, medical storytelling, and imaginative confidence-building.",
    shortDescription: "A roleplay doll for care-driven pretend-play adventures.",
    accent: "accent-sunset",
    artwork: "doctor",
    tags: ["Roleplay", "Pretend Play", "Gift"],
    saleLabel: null,
    rating: 4,
    stock: "In stock",
    sku: "AT-1006",
  },
  {
    id: 7,
    slug: "frozen-kit",
    name: "Frozen Kit",
    image: "/images/real/kids-playroom.jpg",
    category: "Musical",
    categorySlug: "musical",
    price: 140,
    description:
      "A story-led adventure kit with frosty blue accents, sparkly trims, and keepsake-friendly styling.",
    shortDescription: "A themed adventure kit wrapped in icy blue charm.",
    accent: "accent-sky",
    artwork: "bag",
    tags: ["Theme", "Creative", "Popular"],
    saleLabel: null,
    rating: 4,
    stock: "In stock",
    sku: "AT-1007",
  },
  {
    id: 8,
    slug: "blocks-builder",
    name: "Blocks Builder",
    image: "/images/real/toy-blocks.jpg",
    category: "Learning",
    categorySlug: "learning",
    price: 110,
    description:
      "Large, easy-grip blocks for open-ended building, sorting, and collaborative family play.",
    shortDescription: "Large building blocks made for steady stacking and discovery.",
    accent: "accent-citrus",
    artwork: "blocks",
    tags: ["STEM", "Building", "Best Seller"],
    saleLabel: null,
    rating: 5,
    stock: "In stock",
    sku: "AT-1008",
  },
  {
    id: 9,
    slug: "construction-cup",
    name: "Construction Cup",
    image: "/images/real/kids-blocks.jpg",
    category: "Learning",
    categorySlug: "learning",
    price: 222,
    description:
      "An inventive modular mug-inspired construction set that turns pattern-making into hands-on fun.",
    shortDescription: "A modular build set with colorful engineering energy.",
    accent: "accent-ocean",
    artwork: "cup",
    tags: ["Creative", "Engineering", "Gift"],
    saleLabel: null,
    rating: 4,
    stock: "In stock",
    sku: "AT-1009",
  },
  {
    id: 10,
    slug: "teddy-bear-toy",
    name: "Teddy Bear Toy",
    image: "/images/real/teddy-room.jpg",
    category: "Bath Toys",
    categorySlug: "bath-toys",
    price: 70,
    description:
      "Soft texture, warm tones, and a timeless silhouette that gives the collection a comforting anchor.",
    shortDescription: "A classic plush friend with a warm, giftable feel.",
    accent: "accent-caramel",
    artwork: "bear",
    tags: ["Soft", "Classic", "Gift"],
    saleLabel: null,
    rating: 5,
    stock: "In stock",
    sku: "AT-1010",
  },
  {
    id: 11,
    slug: "emergency-truck",
    name: "Emergency Truck",
    image: "/images/real/playroom-toys.jpg",
    category: "Electronic",
    categorySlug: "electronic",
    price: 80,
    originalPrice: 100,
    description:
      "A rescue-themed truck with contrasting blocks, simple mechanics, and a reduced promotional price.",
    shortDescription: "A roleplay rescue truck offered with a cheerful sale badge.",
    accent: "accent-leaf",
    artwork: "truck",
    tags: ["Rescue", "Building", "Sale"],
    saleLabel: "-20%",
    rating: 4,
    stock: "In stock",
    sku: "AT-1011",
  },
  {
    id: 12,
    slug: "melody-rocket",
    name: "Melody Rocket",
    image: "/images/real/headphones-boy.jpg",
    media: [
      {
        type: "image",
        src: "/images/real/headphones-boy.jpg",
        alt: "Melody Rocket front view",
      },
      {
        type: "image",
        src: "/images/real/happy-outdoors.jpg",
        alt: "Melody Rocket outdoor angle",
      },
      {
        type: "image",
        src: "/images/real/kids-blocks.jpg",
        alt: "Melody Rocket activity scene",
      },
      {
        type: "image",
        src: "/images/real/baby-blocks.jpg",
        alt: "Melody Rocket close up",
      },
    ],
    category: "Musical",
    categorySlug: "musical",
    price: 190,
    description:
      "A colorful musical toy with playful rocket styling, built to make movement and rhythm feel exciting.",
    shortDescription: "A sound-forward rocket toy with bold motion and bright color.",
    accent: "accent-violet",
    artwork: "rocket",
    tags: ["Musical", "Interactive", "Gift"],
    saleLabel: "Hot",
    rating: 5,
    stock: "In stock",
    sku: "AT-1012",
  },
];

export const reviewMediaItems: ReviewMediaItem[] = [
  {
    id: 1,
    type: "image",
    src: "/images/real/happy-outdoors.jpg",
    title: "Outdoor play moments that feel joyful and free",
    description: "A bright customer story from families enjoying AmarToy picks during an outdoor afternoon.",
    author: "Rafiqul Islam",
  },
  {
    id: 2,
    type: "image",
    src: "/images/real/kids-playroom.jpg",
    title: "A playroom setup packed with imagination",
    description: "Parents shared how these toys helped create a calmer and more creative home play corner.",
    author: "Nusrat Jahan",
  },
  {
    id: 3,
    type: "image",
    src: "/images/real/toy-blocks.jpg",
    title: "Learning toys that keep children engaged longer",
    description: "Blocks, sorting, and hands-on discovery in one customer-favorite learning collection.",
    author: "Sadia Rahman",
  },
  {
    id: 4,
    type: "image",
    src: "/images/real/headphones-boy.jpg",
    title: "Interactive favorites that kids return to every day",
    description: "A review highlight showing how playful tech-inspired toys stay exciting over time.",
    author: "Mahin Ahmed",
  },
  {
    id: 5,
    type: "video",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "/images/real/playroom-toys.jpg",
    title: "Short customer video review",
    description: "Sample video-ready slide. Replace this URL with your own uploaded review video any time.",
    author: "Demo Review",
  },
];

export const products: Product[] = baseProducts.map((product) => ({
  ...product,
  media: (product.media && product.media.length ? product.media : buildDefaultMedia(product)).slice(0, 4),
}));

export const pageBanners = {
  services: {
    eyebrow: "Playful Support",
    title: "Our Services",
    description:
      "Friendly online shopping, curated collections, and premium support designed around families.",
  },
  about: {
    eyebrow: "Who We Are",
    title: "About Us",
    description:
      "A warm toy-store brand where playful design meets dependable online shopping.",
  },
  team: {
    eyebrow: "Shop AmarToy & Games",
    title: "Our Team",
    description:
      "Meet the creative, caring people behind our product curation, service, and customer experience.",
  },
  shop: {
    eyebrow: "Shop AmarToy & Games",
    title: "Shop",
    description:
      "Browse hand-picked toys, collections, and giftable favorites arranged in a premium storefront layout.",
  },
  blog: {
    eyebrow: "Our Blog",
    title: "Blog",
    description: "Toy tips, parenting insights, and playful inspiration from AmarToy.",
  },
  contact: {
    eyebrow: "Contact Us",
    title: "Have Questions? Get in touch!",
    description:
      "Reach out about orders, partnerships, support, or upcoming product launches.",
  },
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatCurrency(value: number): string {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `৳${formattedNumber}`;
}
