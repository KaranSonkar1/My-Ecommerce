import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = await Product.create({ name, description, price, image });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const getProducts = async (req, res) => res.json(await Product.find());
export const getProductById = async (req, res) => res.json(await Product.findById(req.params.id));
