import mongoose, { Schema, Document } from 'mongoose';
import { Review, Product as ProductType } from '../models/product';

interface ProductDocument extends ProductType, Document {}

const reviewSchema = new Schema<Review>({
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    imageUrl: String,
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

export default mongoose.model<ProductDocument>('Product', productSchema);
