const Product = require("../models/Product");

// GET all active products (public)
exports.getProducts = async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
};

// GET single product by ID (public)
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || !product.isActive) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// CREATE product (admin)
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// UPDATE product (admin)
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// DELETE product (admin – soft delete)
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.sendStatus(204);
};
