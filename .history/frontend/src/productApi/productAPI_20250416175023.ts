import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Review } from '../types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/products' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({

    getProducts: builder.query<Product[], void>({
      query: () => '/',
      transformResponse: (response: { products: Product[] }) => response.products,
      providesTags: ['Product'],
    }),
    
    getProduct: builder.query<Product, string>({
      query: (id) => `/${id}`,
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '/',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    
    addReview: builder.mutation<Product, { id: string; review: Review }>({
      query: ({ id, review }) => ({
        url: `/${id}/reviews`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddReviewMutation,
} = productApi;
