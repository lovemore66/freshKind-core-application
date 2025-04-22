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
} from "../../store/cartSlice/cartSlice";
import Cart from "../Cart/Cart";
import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useAuth } from "../../auth/AuthContext";

const ProductPage = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addReview] = useAddReviewMutation();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [search, setSearch] = useState(""); // 🔍 Search state

  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    price: 0,
    imageUrl: "",
    description: "",
    category: "",
    userId: user?.uid,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };


  const handleDelete = (id: string) => deleteProduct(id);

  const handleAddToCart = (product: Product) => {
    const existing = cart.items.find((item) => item._id === product._id);
    if (!existing) {
      dispatch(addToCart(product));
    } else {
      dispatch(increaseQuantity(product._id!));
    }
  };

  // 🔍 Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>

      {/* 🔍 Search Input */}
   <Box padding={'10px'}>
   <Input
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={4}
        width="100%"
      />
   </Box>

      {/* Render filtered products */}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {filteredProducts.map((product) => (
          <Box
            key={product._id}
            borderRadius="md"
            boxShadow="md"
            bg="gray.100"
            overflow="hidden"
            p={4}
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              w="100%"
              h="200px"
              objectFit="cover"
              borderRadius="md"
              mb={3}
            />
            <Text fontSize="lg" fontWeight="bold" mb={1}>
              {product.title}
            </Text>
            <Text color="gray.600" fontSize="sm" mb={2}>
              {product.category}
            </Text>
            <Text fontWeight="bold" color="teal.500" mb={3}>
              ${product.price}
            </Text>
            <Flex gap={2}>
              <Button size="sm" colorScheme="blue" onClick={() => handleAddToCart(product)}>
                🛒 Add to Cart
              </Button>
              <Button size="sm" colorScheme="red" onClick={() => handleDelete(product._id!)}>
                ❌ Delete
              </Button>
              <Button size="sm" onClick={() => setEditingProduct(product)}>✏️</Button>
            </Flex>
          </Box>
        ))}
      </Grid>

      <Cart />
      <Button mt={4} onClick={() => dispatch(clearCart())}>🧹 Clear Cart</Button>

      {/* Update section */}
      {editingProduct && (
        <Box mt={6}>
          <h3>✏️ Edit Product</h3>
          <Input
            name="title"
            placeholder="Title"
            value={editingProduct.title}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, title: e.target.value })
            }
            mb={2}
          />
          <Input
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
            mb={2}
          />
          <Button
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
          </Button>
        </Box>
      )}
    </div>
  );
};

export default ProductPage;
