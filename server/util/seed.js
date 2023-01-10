const { Product } = require("../models/product");
const { Photo } = require("../models/photo");

const allProducts = [
  {
    name: "Comet Shorts",
    price: 69.95,
    description: "Wow these are great shorts",
  },
  {
    name: "UrMoms Shorts",
    price: 59.95,
    description: "Wow these are great shorts",
  },
  {
    name: "Booty Shorts",
    price: 59.95,
    description: "Wow these are great shorts",
  },
  {
    name: "Wowza Shorts",
    price: 59.95,
    description: "Wow these are great shorts",
  },
  {
    name: "Sick Shorts",
    price: 59.95,
    description: "Wow these are great shorts",
  },
  {
    name: "Chill Shorts",
    price: 59.95,
    description: "Wow these are great shorts",
  },
  {
    name: "IDK Shorts",
    price: 59.95,
    description: "Wow these are great shorts",
  },
  {
    name: "Pump Shorts",
    price: 49.95,
    description: "Wow these are great shorts",
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
    url: "https://cdn.shopify.com/s/files/1/0251/7377/products/Interval7_Black_Front_ef3413a6-9bd0-42d0-ba99-dbf2fd3b0d56_1296x.png?v=1656406941",
    primaryPhoto: true,
  },
  {
    productId: 4,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/DSC2322_1200x1800.jpg?v=1653082564",
    primaryPhoto: true,
  },
  {
    productId: 5,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/YLA7.29.21-64_664x996.jpg?v=1653088619",
    primaryPhoto: true,
  },
  {
    productId: 6,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/YLA7.29.21-64_664x996.jpg?v=1653088619",
    primaryPhoto: true,
  },
  {
    productId: 7,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/YLA7.29.21-64_664x996.jpg?v=1653088619",
    primaryPhoto: true,
  },
  {
    productId: 8,
    url: "https://cdn.shopify.com/s/files/1/1775/6429/products/YLA7.29.21-64_664x996.jpg?v=1653088619",
    primaryPhoto: true,
  },
];

const seed = async () => {
  await Product.bulkCreate(allProducts);
  await Photo.bulkCreate(photos);
};

module.exports = seed;
