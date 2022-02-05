import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
  res.json(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const slug = req.params.slug;
  const product = data.products.find((x) => x.slug === slug);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});
app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const product = data.products.find((x) => x._id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
