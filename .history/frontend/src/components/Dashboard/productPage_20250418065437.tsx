import React, { useEffect, useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddReviewMutation,
} from "../../productApi/productAPI";
import { Product } from "../../types/product";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import {
  addToCart,
  clearCart,
  increaseQuantity,
  removeFromCart,
} from "../../store/cartSlice/cartSlice";
import Cart from "../Cart/Cart";
import { Box } from "@chakra-ui/react";

const ProductPage = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addReview] = useAddReviewMutation();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    console.log("Products:", products); // ✅ Will now show an array
  }, [products]);

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    price: 0,
    imageUrl: "",
    description: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    createProduct(newProduct);
    setNewProduct({
      title: "",
      price: 0,
      imageUrl: "",
      description: "",
      category: "",
    });
  };

  const handleDelete = (id: string) => deleteProduct(id);

  if (isLoading) return <p>Loading...</p>;

  const handleAddToCart = (product: Product) => {
    const existing = cart.items.find((item) => item._id === product._id);
    if (!existing) {
      dispatch(addToCart(product));
    } else {
      dispatch(increaseQuantity(product._id!));
    }
  };

  return (
    <div>
      <h2>🛍 Products</h2>

      <input
        name="title"
        placeholder="Title"
        value={newProduct.title}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleChange}
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={newProduct.imageUrl}
        onChange={handleChange}
      />
      <button onClick={handleCreate}>Create Product</button>

      {/* Render List of products */}
      <ul>
        {products?.map((product: any) => (
          <Box borderRadius="sm" boxShadow="sm" key={product._id}>
            <img src={product.imageUrl} width={50} />
            <b>{product.title}</b> - ${product.price}
            <button onClick={() => handleDelete(product._id!)}>
              ❌ Delete
            </button>
            <button onClick={() => setEditingProduct(product)}>✏️ Edit</button>
            <button onClick={() => handleAddToCart(product)}>
              🛒 Add to Cart
            </button>
          </Box>
        ))}
      </ul>


      {/* Cart */}
     <Cart />

      <button onClick={() => dispatch(clearCart())}>🧹 Clear Cart</button>



      {/* update */}
      {editingProduct && (
        <div>
          <h3>✏️ Edit Product</h3>
          <input
            name="title"
            placeholder="Title"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
          <button
            onClick={() => {
              if (editingProduct && editingProduct._id) {
                updateProduct({
                  id: editingProduct._id,
                  updatedProduct: {
                    title: editingProduct.title,
                    price: editingProduct.price,
                    description: editingProduct.description,
                    imageUrl: editingProduct.imageUrl,
                    category: editingProduct.category,
                  },
                });
                setEditingProduct(null);
              }
            }}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
