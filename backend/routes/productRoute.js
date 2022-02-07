import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default productRouter;
