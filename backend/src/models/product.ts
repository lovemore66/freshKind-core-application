import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  reviews: mongoose.Types.ObjectId[];
}

const productSchema = new Schema<IProduct>({
  title: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

export default mongoose.model<IProduct>('Product', productSchema);
