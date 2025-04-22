import React, { useState } from "react";
import { Box, Flex, Button, Input, useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useCreateProductMutation } from "../../productApi/productAPI";
import { Product } from "../../types/product";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon, HamburgerIcon } from '@chakra-ui/icons'


const NavBar = ({ setSearch }: { setSearch: (value: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
    const [createProduct] = useCreateProductMutation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value); // Set search term for filtering products
  };

  const handleNavigate = (path: string) => navigate(path);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    price: 0,
    imageUrl: "",
    description: "",
    category: "",
    userId: user?.uid,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      userId: user?.uid,
    });
  };

  return (
    <Box bg="blue.600" p={4} color="white">
      <Flex justify="space-between" align="center">
        <Box cursor={'pointer'} fontWeight="bold" fontSize="xl"onClick={() => handleNavigate("/dashboard")}>
        <HamburgerIcon />
        </Box>

        <Flex align="center">
        <Box onClick={onOpen}>Create Product</Box>
          <Box onClick={() => handleNavigate("/profile")}>Profile</Box>
          <Box onClick={() => handleNavigate("/orders")}>Orders</Box>
          <Box onClick={() => handleNavigate("/settings")}>Settings</Box>

          <Link to="/my-products">
            <Button colorScheme="teal" variant="ghost">
              My Products
            </Button>
          </Link>
        </Flex>
      </Flex>
    
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             {/* Create product inputs */}
                  <Input
                    name="title"
                    placeholder="Title"
                    value={newProduct.title}
                    onChange={handleChange}
                    mb={2}
                  />
                  <Input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleChange}
                    mb={2}
                  />
                  <Input
                    name="imageUrl"
                    placeholder="Image URL"
                    value={newProduct.imageUrl}
                    onChange={handleChange}
                    mb={2}
                  />
                  <Button onClick={handleCreate} mb={4}>Create Product</Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NavBar;
