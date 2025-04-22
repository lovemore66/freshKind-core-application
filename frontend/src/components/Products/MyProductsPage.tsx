import React, { useState, useMemo } from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  Input,
  Heading,
  Flex,
} from "@chakra-ui/react";
import {
  FormControl,
} from "@chakra-ui/form-control"
import { useGetProductsQuery, useDeleteProductMutation } from "../../productApi/productAPI";
import { useAppDispatch } from "../../store/hooks/hooks";
import { addToCart, increaseQuantity } from "../../store/cartSlice/cartSlice";
import { Product } from "../../types/product";
import { useAuth } from "../../auth/AuthContext";

const MyProductsPage = () => {
  const { user } = useAuth();
  const { data: allProducts = [], isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");

  const myProducts = useMemo(
    () =>
      allProducts.filter(
        (product: Product) =>
          product.userId === user?.uid &&
          product.title.toLowerCase().includes(search.toLowerCase())
      ),
    [allProducts, search, user?.uid]
  );

  const handleAddToCart = (product: Product) => {
    dispatch(product._id ? increaseQuantity(product._id) : addToCart(product));
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };


  return (
    <Box px={{ base: 4, md: 10 }} py={8}>
      <Heading mb={6}>🧍 My Products</Heading>

      <FormControl mb={6} maxW="400px">
        <Input
          placeholder="Search your products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg={"gray.800"}
          borderRadius="md"
        />
      </FormControl>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : myProducts.length === 0 ? (
        <Text>No products found.</Text>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {myProducts.map((product) => (
            <Box
              key={product._id}
              borderRadius="md"
              boxShadow="md"
              bg={'grey'}
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
              </Flex>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyProductsPage;
