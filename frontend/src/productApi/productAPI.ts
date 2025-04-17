import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Review } from '../types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/products' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({

getProducts: builder.query<Product[], void>({
  query: () => '/',
  transformResponse: (response: { success: boolean; data: Product[] }) => response.data,
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

    updateProduct: builder.mutation<void, { id: string; updatedProduct: Partial<Product> }>({
      query: ({ id, updatedProduct }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
      invalidatesTags: ['Product'], // ✅ match tagTypes
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
