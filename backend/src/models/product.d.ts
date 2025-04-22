export interface Review {
  message: string;
  rating: number;
}

export interface Product {
  title: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
  userId: string | undefined;
  reviews: Review[];
}
