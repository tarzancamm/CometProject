const { Product } = require("../models/product");
const { Photo } = require("../models/photo");

const allProducts = [
  {
    name: "Comet Shorts",
    price: 69.95,
    description: "Best for: Versatility",
  },
  {
    name: "Bolt Shorts",
    price: 55.95,
    description: "Best for: Conditioning, Stretching",
  },
  {
    name: "Sweatshorts",
    price: 49.95,
    description: "Best for: Lifting, Chilling",
  },
  {
    name: "Jupiter Shorts",
    price: 55.95,
    description: "Best for: Cross Training",
  },
  {
    name: "Banksi Shorts",
    price: 59.95,
    description: "Best for: Strength Training, Chilling",
  },
  {
    name: "Universe Shorts",
    price: 69.95,
    description: "Best for: Lifting, Tough Gym Days",
  },
  {
    name: "Pump Shorts",
    price: 59.95,
    description: "Best for: Powerlifting",
  },
  {
    name: "Galaxy Shorts",
    price: 49.95,
    description: "Best for: Chilling, Outdoor Adventures",
  },
];

let photos = [
  {
    productId: 1,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/YLA7.29.21-64_664x996.jpg?v=1653088619",
    primaryPhoto: true,
  },
  {
    productId: 2,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/Rudy_Nov_3-047_1200x1800.jpg?v=1653084244",
    primaryPhoto: true,
  },
  {
    productId: 3,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/YLA4.19.22Johnny-42_6642588d-1485-4f0d-a884-64457a7aa006_800x.jpg?v=1668735184",
    primaryPhoto: true,
  },
  {
    productId: 4,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/DSC02738_800x.jpg?v=1625186089",
    primaryPhoto: true,
  },
  {
    productId: 5,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/Jerdan-8.7.22-115_1206x1800.jpg?v=1660847550",
    primaryPhoto: true,
  },
  {
    productId: 6,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/Rudy_June_21497_800x.jpg?v=1655229346",
    primaryPhoto: true,
  },
  {
    productId: 7,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/YLA2.12.22-23_800x.jpg?v=1653077119",
    primaryPhoto: true,
  },
  {
    productId: 8,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/Rudy_Black_Friday-445_800x.jpg?v=1668198112",
    primaryPhoto: true,
  },
];

const seed = async () => {
  await Product.bulkCreate(allProducts);
  await Photo.bulkCreate(photos);
};

module.exports = seed;
