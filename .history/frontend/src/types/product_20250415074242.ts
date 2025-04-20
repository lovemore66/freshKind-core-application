export interface Review {
    message: string;
    rating: number;
  }
  
  export interface Product {
    _id?: string;
    title: string;
    description?: string;
    price: number;
    category?: string;
    imageUrl?: string;
    reviews?: Review[];
  }
  