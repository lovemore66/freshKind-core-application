import Product from '../models/product';
import { Request, Response } from 'express';

export const createProduct = async (req: any, res: Response) => {
  try {
    const { title, description, price, category } = req.body;
    const imageUrl = req.file?.path;

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      imageUrl
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err });
  }
};
export const getProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find({}); // Fetch all products from MongoDB

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found in the database' });
    }

    console.log(`✅ Found ${products.length} products`);
    res.status(200).json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
};

export const getProductById = async (req: any, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err });
  }
};

export const updateProduct = async (req: any, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.imageUrl = req.file ? req.file.path : product.imageUrl;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err });
  }
};

export const deleteProduct = async (req: any, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
};
