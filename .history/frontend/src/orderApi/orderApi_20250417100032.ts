import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface OrderItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity: number;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  _id?: string;
  items: OrderItem[];
  total: number;
  address: string;
  city: string;
  postalCode: string;
  payment: PaymentInfo;
}

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/orders' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '/',
      transformResponse: (response: { success: boolean; data: Order[] }) => response.data,
      providesTags: ['Order'],
    }),
    createOrder: builder.mutation<Order, Omit<Order, '_id'>>({
      query: (order) => ({
        url: '/',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
} = orderApi;
