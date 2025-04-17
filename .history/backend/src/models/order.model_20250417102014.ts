import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        description: String,
        price: Number,
        category: String,
        imageUrl: String,
        reviews: Array,
        quantity: Number,
      },
    ],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    payment: {
      cardNumber: String,
      cardHolder: String,
      expiryDate: String,
      cvv: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
