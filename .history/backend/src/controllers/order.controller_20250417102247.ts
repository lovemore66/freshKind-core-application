import { Request, Response } from 'express';
import Order from '../models/order.model';
import { success, error } from '../utils/apiResponse';

// POST /api/orders
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, total, address, city, postalCode, payment } = req.body;

    if (!items || !total || !address || !city || !postalCode || !payment) {
      return res.status(400).json(error('Missing required fields'));
    }

    const order = await Order.create({
      items,
      total,
      address,
      city,
      postalCode,
      payment,
    });

    res.status(201).json(success(order));
  } catch (err: any) {
    res.status(400).json(error(err.message));
  }
};

// GET /api/orders
export const getOrders = async (_: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(success(orders));
  } catch {
    res.status(500).json(error('Failed to fetch orders'));
  }
};
