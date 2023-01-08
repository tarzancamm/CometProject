require("dotenv").config();

const { Product } = require("../models/product");
const { Photo } = require("../models/photo");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      console.log("Problem retrieving products");
      res.sendStatus(400);
    }
  },
};
