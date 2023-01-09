const { Product } = require("../models/product");

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

const seed = async () => {
  await Product.bulkCreate(allProducts);
};

module.exports = seed;