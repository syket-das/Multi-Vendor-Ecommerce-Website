import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ', err.message);
  });

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
