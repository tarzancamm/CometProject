require("dotenv").config();
const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Photo } = require("../models/photo");
const { CartItem } = require("../models/cartItem");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [Photo],
      });
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      console.log("Problem retrieving products");
      res.sendStatus(400);
    }
  },

  getOneProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id: id },
        include: [Photo],
      });
      res.status(200).send(product);
    } catch (err) {
      console.log(err);
      console.log("Problem retrieving single product");
      res.sendStatus(400);
    }
  },

  addToCart: async (req, res) => {
    try {
      const { userId } = req.body;
      const productId = req.params.id;
      await CartItem.create({
        userId,
        productId,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      console.log("Problem adding to cart");
      res.sendStatus(400);
    }
  },

  deleteFromCart: async (req, res) => {
    try {
      const { cartItemId } = req.params;
      console.log(cartItemId);
      await CartItem.destroy({ where: { id: cartItemId } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      console.log("Error deleting item from cart");
      res.sendStatus(400);
    }
  },

  getUserCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await CartItem.findAll({
        where: { userId: userId },
        include: [
          {
            model: User,
            attributes: ["username"], // List of attributes I want to select from model
            required: true,
          },
          Product,
        ],
      });
      res.status(200).send(cart);
    } catch (err) {
      console.log(err);
      console.log("Problem retrieving user cart");
      res.sendStatus(400);
    }
  },
};
