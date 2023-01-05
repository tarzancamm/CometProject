const { Products } = require("../models/products");

const allProducts = [
  {
    name: "Cometkazi Shorts",
    price: 59.95,
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
    price: 59.95,
    description: "Wow these are great shorts",
  },
];

const seed = async () => {
  await Products.bulkCreate(allProducts);
};

module.exports = seed;