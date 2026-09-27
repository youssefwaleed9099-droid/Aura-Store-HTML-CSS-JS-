const products = [
  {
    id: 1,
    name: "AURA Studio One Wireless",
    currentPrice: 349,
    oldPrice: 399,
    imageSource: "./images/product7.jpg",
    category: "audio",
    subcategory: "Wireless Audio",
    rating: 4.9,
    reviewsCount: 428,
    badges: [
      { text: "Staff Pick", variant: "dark" },
      { text: "Sale −12%", variant: "sale" },
    ],
    colors: [
      { name: "Matte Obsidian", hex: "#1A1A1A" },
      { name: "Nordic Silver", hex: "#C9C9C9" },
      { name: "Sand Dune", hex: "#B8A99A" },
    ],
    inStock: true,
  },

  {
    id: 2,
    name: "Horizon Solid Oak Shelf",
    currentPrice: 189,
    oldPrice: null,
    imageSource: "./images/product8.jpg",
    category: "workspace",
    subcategory: "Workspace",
    rating: 4.8,
    reviewsCount: 215,
    badges: [{ text: "Best Seller", variant: "light" }],
    colors: [
      { name: "Natural White Oak", hex: "#C8AC88" },
      { name: "Dark Walnut", hex: "#5D4037" },
    ],
    inStock: true,
  },

  {
    id: 3,
    name: "Lumina Arc Ambient Lamp",
    currentPrice: 145,
    oldPrice: null,
    imageSource: "./images/product9.jpg",
    category: "home",
    subcategory: "Lighting",
    rating: 5.0,
    reviewsCount: 89,
    badges: [{ text: "New Arrival", variant: "new" }],
    colors: [],
    tags: ["Dimmable 1800K–4000K"],
    inStock: true,
  },

  {
    id: 4,
    name: "Aeroform Wool Armchair",
    currentPrice: 780,
    oldPrice: null,
    imageSource: "./images/product10.jpg",
    category: "home",
    subcategory: "Home Living",
    rating: 4.9,
    reviewsCount: 164,
    badges: [{ text: "Only 3 Left", variant: "warning" }],
    colors: [],
    tags: ["Danish Kvadrat® Wool"],
    inStock: true,
  },
];

const categories = [
  {
    id: 1,
    name: "Precision Audio",
    imageSource: "./images/product1.jpg",
    productsCount: 18,
  },

  {
    id: 2,
    name: "Acoustic Studio",
    imageSource: "./images/product2.jpg",
    productsCount: 12,
  },

  {
    id: 3,
    name: "Minimal Desk",
    imageSource: "./images/product3.jpg",
    productsCount: 24,
  },

  {
    id: 4,
    name: "Ergonomics",
    imageSource: "./images/product4.jpg",
    productsCount: 9,
  },

  {
    id: 5,
    name: "Everyday Carry",
    imageSource: "./images/product5.jpg",
    productsCount: 31,
  },

  {
    id: 6,
    name: "Ambient Light",
    imageSource: "./images/product6.jpg",
    productsCount: 14,
  },
];
