require("dotenv").config();
const { Product } = require("../models/product");
const { Photo } = require("../models/photo");

module.exports = {
    getOneProduct: async (req, res) => {
        try {
            const {id} = req.params
            const product = Product.findOne({where: {id: id}})
            res.status(200).send(product)
        } catch {
            console.log(err);
            console.log("Problem retrieving single product");
            res.sendStatus(400);
        }
    }
}