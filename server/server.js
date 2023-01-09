//! Server Homebase

//Imports
require("dotenv").config();
const { db } = require("./util/database");
const { PORT } = process.env; //5555
const seed = require("./util/seed");
const express = require("express");
const cors = require("cors"); // Client and Server can run on different ports and still share resources across 'origins'
const { CartItem } = require("./models/cartItem");
const { Photo } = require("./models/photo");
const { Product } = require("./models/product");
const { User } = require("./models/user");

// Stores express in variable
const server = express();

// Imports middleware functions
const { login, register } = require("./controllers/auth");
const {
  getProducts,
  getOneProduct,
  addToCart,
  getUserCart,
} = require("./controllers/shop");

// Middleware to run on every endpoint
server.use(express.json()); // Parse requests into JSON
server.use(cors()); // Client & Server can run on seperate ports

//! Associations (relations). Join tables. DB will use this to create connections in CartItem table and Photo table.
// Users and Products
User.hasMany(CartItem);
CartItem.belongsTo(User);
Product.hasMany(CartItem);
CartItem.belongsTo(Product);
// Products and photos
Product.hasMany(Photo);
Photo.hasOne(Product);

// Endpoints
server.post("/register", register);
server.post("/login", login);
server.get("/products", getProducts);
server.get("/products/:id", getOneProduct);
server.get("/cart/:userId", getUserCart);
server.post("/cart/:id", addToCart);

// Listening
// Sync models/associations to DB and have server listen. This will sync DB before server starts up
// Can use force to DROP tables while building app / making changes
// db.sync({ force: true }).then(() => seed())
db.sync()
  // .then(() => seed())
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  });
