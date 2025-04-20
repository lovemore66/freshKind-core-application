import React, { useEffect, useState } from 'react';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddReviewMutation,
} from '../../productApi/productAPI';
import { Product } from '../../types/product';

const ProductPage = () => {
  const { data } = useGetProductsQuery();
  const products = data?.products || [];
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addReview] = useAddReviewMutation();

  useEffect(() => {
    console.log(products)
    }, [products])

  const [newProduct, setNewProduct] = useState<Product>({
    title: '',
    price: 0,
    imageUrl: '',
    description: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    createProduct(newProduct);
    setNewProduct({ title: '', price: 0, imageUrl: '', description: '', category: '' });
  };

  const handleDelete = (id: string) => deleteProduct(id);

  //if (isLoading) return <p>Loading...</p>;



  return (
    <div>
      <h2>🛍 Products</h2>

      <input name="title" placeholder="Title" value={newProduct.title} onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" value={newProduct.price} onChange={handleChange} />
      <input name="imageUrl" placeholder="Image URL" value={newProduct.imageUrl} onChange={handleChange} />
      <button onClick={handleCreate}>Create Product</button>

      <ul>
      {/* {products?.map((product: any) => (
          <li key={product._id}>
            <img src={product.imageUrl} width={50} />
            <b>{product.title}</b> - ${product.price}
            <button onClick={() => handleDelete(product._id!)}>❌ Delete</button>
          </li>
        ))}  */}
      </ul>
    </div>
  );
};

export default ProductPage;
