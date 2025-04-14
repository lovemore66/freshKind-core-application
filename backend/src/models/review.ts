import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  message: string;
  rating: number;
}

const reviewSchema = new Schema<IReview>({
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

export default mongoose.model<IReview>('Review', reviewSchema);
