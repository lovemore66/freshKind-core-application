import mongoose from 'mongoose';

export const dummyReviews = [
  { _id: new mongoose.Types.ObjectId(), message: 'Great product!', rating: 5 },
  { _id: new mongoose.Types.ObjectId(), message: 'Not bad', rating: 4 },
  { _id: new mongoose.Types.ObjectId(), message: 'Could be better', rating: 3 },
  { _id: new mongoose.Types.ObjectId(), message: 'Loved it!', rating: 5 },
  { _id: new mongoose.Types.ObjectId(), message: 'Too expensive', rating: 2 },
  { _id: new mongoose.Types.ObjectId(), message: 'Excellent quality', rating: 5 },
  { _id: new mongoose.Types.ObjectId(), message: 'Would buy again', rating: 4 },
  { _id: new mongoose.Types.ObjectId(), message: 'Terrible experience', rating: 1 },
  { _id: new mongoose.Types.ObjectId(), message: 'Very comfortable', rating: 5 },
  { _id: new mongoose.Types.ObjectId(), message: 'Not what I expected', rating: 2 },
  { _id: new mongoose.Types.ObjectId(), message: 'Fast shipping', rating: 5 },
  { _id: new mongoose.Types.ObjectId(), message: 'Packaging was poor', rating: 3 },
  { _id: new mongoose.Types.ObjectId(), message: 'Super value!', rating: 5 },
  { _id: new mongoose.Types.ObjectId(), message: 'Cheap material', rating: 2 },
  { _id: new mongoose.Types.ObjectId(), message: 'Highly recommend', rating: 5 },
  { _id: new mongoose.Types.ObjectId(), message: 'Color faded quickly', rating: 2 },
  { _id: new mongoose.Types.ObjectId(), message: 'Great for daily use', rating: 4 },
  { _id: new mongoose.Types.ObjectId(), message: 'Just okay', rating: 3 },
  { _id: new mongoose.Types.ObjectId(), message: 'Very durable', rating: 5 },
  { _id: new mongoose.Types.ObjectId(), message: 'Love it!', rating: 5 },
];


export const dummyProducts = Array.from({ length: 20 }, (_, i) => ({
    title: `Product ${i + 1}`,
    description: `Description for Product ${i + 1}`,
    price: parseFloat((Math.random() * 90 + 10).toFixed(2)), // price between 10–100
    category: `Category ${((i % 5) + 1)}`,
    imageUrl: `https://picsum.photos/200/300?random=${i + 1}`,
    reviews: [
      dummyReviews[(i * 2) % dummyReviews.length]._id,
      dummyReviews[(i * 2 + 1) % dummyReviews.length]._id,
    ],
  }));
  