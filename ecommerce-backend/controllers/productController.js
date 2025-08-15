import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = await Product.create({ name, description, price, image });
    res.status(201).json(product);
  } catch (err) {
    console.error("Failed to create product:", err);
    res.status(500).json({ message: "Failed to create product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Failed to fetch products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.error("Failed to fetch product:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};
