import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    await Product.deleteMany({});
    const createdProducts = await Product.create(data.products);

    await User.deleteMany({});
    const createdUsers = await User.create(data.users);
    res.send({ createdProducts, createdUsers });
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
});




export default seedRouter;
