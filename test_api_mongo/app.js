const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Định dạng data
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  qty: Number,
});

//
const Product = mongoose.model("Product", productSchema);
app.use(bodyParser.json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//find by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//save
app.post("/api/products", async (req, res) => {
  const { name, price, qty } = req.body;
  try {
    const newProduct = new Product({ name, price, qty }); 
    const savedProduct = await newProduct.save(); 
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update
app.get("/api/products/:id", async (req, res) => {
  const { name, price, qty } = req.body;
  try {
    const UpdateProducts = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, qty },
      { new: true }
    );
    if (!UpdateProducts) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(UpdateProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//delete
app.get("/api/products/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(deleteProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is runing on http:localhost:${port}`);
});
