import { Request, Response } from 'express';
import Product from '../models/product.model';
import { success, error } from '../utils/apiResponse';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(success(product));
  } catch (err: any) {
    res.status(400).json(error(err.message));
  }
};

export const getProducts = async (_: any, res: any) => {
  try {
    const products = await Product.find();
    res.json(success(products));
  } catch {
    res.status(500).json(error('Failed to fetch products'));
  }
};

export const getProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json(error('Product not found'));
    res.json(success(product));
  } catch {
    res.status(400).json(error('Invalid product ID'));
  }
};

export const updateProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json(error('Product not found'));
    res.json(success(product));
  } catch {
    res.status(400).json(error('Failed to update product'));
  }
};

export const deleteProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json(error('Product not found'));
    res.json(success('Product deleted'));
  } catch {
    res.status(400).json(error('Failed to delete product'));
  }
};

export const addReview = async (req: any, res: any) => {
  try {
    const { message, rating } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json(error('Product not found'));

    product.reviews.push({ message, rating });
    await product.save();

    res.status(201).json(success(product));
  } catch (err: any) {
    res.status(400).json(error(err.message));
  }
};
