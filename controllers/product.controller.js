import Product from "../models/product.model.js";

export const createProduct = async (req, res, next) => {
  try {
    let product = req.body;

    let result = await Product.create(product);
    return res.status(201).json({
      message: "product created",
      result,
    });
  } catch (err) {
    next(err);
  }
};
