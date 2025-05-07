import React, { useState } from "react";
import {
  Box, Flex, Button, Input, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Select, useToast, Progress,
  useColorModeValue, Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useCreateProductMutation } from "../../productApi/productAPI";
import { Product } from "../../types/product";
import { HamburgerIcon, } from "@chakra-ui/icons";
import { storage } from "../../configs/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { LogInIcon, ShoppingBasket, User } from "lucide-react";
import Cart from "../Cart/Cart";


const NavBar = ({ setSearch }: { setSearch: (value: string) => void; }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [createProduct] = useCreateProductMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  // Add state
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Example cart items
  const cartItems = [
    { id: 1, name: "Item 1", price: 20 },
    { id: 2, name: "Item 2", price: 40 },
  ];


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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setUploadProgress(0);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        toast({
          title: "Upload failed",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setNewProduct(prev => ({ ...prev, imageUrl: downloadURL }));
        setUploading(false);
        toast({
          title: "Image uploaded",
          description: "Image successfully uploaded.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    );
  };

  const handleCreate = async () => {
    if (!newProduct.title || !newProduct.imageUrl) {
      toast({
        title: "Missing data",
        description: "Please fill in all required fields and upload an image.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      await createProduct(newProduct);
      toast({
        title: "Product created",
        description: `${newProduct.title} was successfully added.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setNewProduct({
        title: "",
        price: 0,
        imageUrl: "",
        description: "",
        category: "",
        userId: user?.uid,
      });
      setUploadProgress(0);
      onClose();
    } catch (error) {
      toast({
        title: "Product creation failed",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="blue.600" p={4} color="white">
      <Flex justify="space-between" align="center">
        <Box cursor="pointer" fontWeight="bold" fontSize="xl" onClick={() => navigate("/dashboard")}>
          <HamburgerIcon />
        </Box>

        <Flex align="center" gap={4} >
          <Button
            onClick={() => navigate("/login")}
            leftIcon={<LogInIcon />}
            justifyContent="flex-start"
            variant="ghost"
            _hover={{ bg: hoverBg }}
            fontWeight="sm"
            fontSize="sm"
            color={'#ffffff'}
            height={'40px'}
            borderRadius="sm"
          >
            <Text>Sign In</Text>
          </Button>
          <Flex align="center" gap={4} position="relative">
            {/* Cart Button and Menu */}
            <Box
              position="relative"
              onMouseEnter={() => setCartOpen(true)}
              onMouseLeave={() => setCartOpen(false)}
            >
              <Button
                leftIcon={<ShoppingBasket />}
                variant="ghost"
                fontWeight="sm"
                fontSize="sm"
                color="#ffffff"
                borderRadius="sm"
                height="40px"
              />
              {cartOpen && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  mt={0}
                  bg="white"
                  color="black"
                  boxShadow="sm"
                  p={4}
                  borderRadius="sm"
                  zIndex={10}
                  minW="200px"
                  onMouseEnter={() => setCartOpen(true)}
                  onMouseLeave={() => setCartOpen(false)}
                >
                  <Cart />
                </Box>
              )}
            </Box>

            {/* My Account Button and Menu */}
            <Box
              position="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <Button
                leftIcon={<User />}
                variant="ghost"
                fontWeight="sm"
                fontSize="sm"
                color="#ffffff"
                height="40px"
                borderRadius="sm"
              >
                My Account
              </Button>
              {accountOpen && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  mt={0}
                  bg="white"
                  color="black"
                  boxShadow="sm"
                  p={3}
                  borderRadius="sm"
                  zIndex={10}
                  minW="150px"
                  onMouseEnter={() => setAccountOpen(true)}
                  onMouseLeave={() => setAccountOpen(false)}
                >
                  <Text cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => navigate("/profile")}>
                    Profile
                  </Text>
                  <Text cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => navigate("/orders")}>
                    Orders
                  </Text>
                  <Text cursor="pointer" _hover={{ textDecoration: "underline" }} onClick={() => navigate("/settings")}>
                    Settings
                  </Text>
                </Box>
              )}
            </Box>
          </Flex>

        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
              name="description"
              placeholder="Description"
              value={newProduct.description}
              onChange={handleChange}
              mb={2}
            />
            <Select
              name="category"
              placeholder="Select category"
              value={newProduct.category}
              onChange={handleChange}
              mb={2}
            >
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              <option value="sports">Sports</option>
              <option value="home">Home</option>
            </Select>

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              mb={2}
            />

            {uploading && (
              <Progress value={uploadProgress} size="sm" colorScheme="blue" mb={2} />
            )}

            <Button
              onClick={handleCreate}
              borderRadius="sm"
              colorScheme="teal"
              mb={4}
              isDisabled={uploading}
            >
              Create Product
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button borderRadius="sm" colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default NavBar;
