import mongoose from 'mongoose';
import Product from '../models/product';
import Review from '../models/review';

const MONGO_URI = 'mongodb://127.0.0.1:27017/products';

const sampleMessages = [
  'Excellent product!',
  'Could be better',
  'Very satisfied',
  'Did not meet expectations',
  'Would buy again',
  'Highly recommend',
  'Great quality!',
  'Not bad for the price',
  'Fast delivery',
  'Poor packaging',
];

// Create and save 1–3 reviews for a product
const generateDummyReviews = async () => {
  const reviewDocs = [];
  const count = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < count; i++) {
    const review = new Review({
      message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
      rating: Math.floor(Math.random() * 5) + 1,
    });
    await review.save();
    reviewDocs.push(review._id);
  }
  return reviewDocs;
};

// Generate 20 products with attached reviews
const generateDummyProducts = async () => {
  const products = [];
  for (let i = 1; i <= 20; i++) {
    const reviews = await generateDummyReviews();
    products.push({
      title: `Product ${i}`,
      description: `This is the description for Product ${i}`,
      price: parseFloat((Math.random() * 100 + 10).toFixed(2)), // $10 - $110
      category: `Category ${((i % 5) + 1)}`,
      imageUrl: `https://picsum.photos/200/300?random=${i}`,
      reviews,
    });
  }
  return products;
};

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany({});
    await Review.deleteMany({});

    const dummyProducts = await generateDummyProducts();
    await Product.insertMany(dummyProducts);

    console.log('✅ Successfully seeded products and reviews');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed products:', err);
    process.exit(1);
  }
};

seedProducts();
