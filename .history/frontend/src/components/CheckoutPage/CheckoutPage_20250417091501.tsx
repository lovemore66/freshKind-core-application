import {
    Box,
    Button,
    Input,
    VStack,
    Heading,
    Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  } from "@chakra-ui/react"
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormErrorIcon,
  } from "@chakra-ui/form-control"
  import { useToast } from '@chakra-ui/toast'
  import { useState } from "react"
  import axios from "axios"
  import { useSelector, useDispatch } from "react-redux"
  import { RootState } from "../../store/store"
  import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../../store/cartSlice/cartSlice"
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks/hooks";
  
  const CheckoutPage = () => {
    const [address, setAddress] = useState('');
    const [bankDetails, setBankDetails] = useState('');
    const cart = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleOrderSubmit = async () => {
      try {
        await axios.post('/api/orders', {
          items: cart.items,
          total: cart.total,
          address,
          bankDetails,
        });
  
        toast({
          title: 'Order placed!',
          description: 'Your order has been successfully submitted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
  
        navigate('/');
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to place order.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Box maxW="800px" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
        <Heading mb={6}>Checkout</Heading>
  
        {/* Cart Items Table */}
        <Box overflowX="auto" mb={8}>
          <Table variant="striped" size="md">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.items.map((item) => (
                <Tr key={item._id}>
                  <Td>
                    <Text fontWeight="bold">{item.title}</Text>
                  </Td>
                  <Td>${item.price.toFixed(2)}</Td>
                  <Td>
                    <Button
                      size="xs"
                      onClick={() => dispatch(decreaseQuantity(item._id!))}
                      mr={1}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      size="xs"
                      onClick={() => dispatch(increaseQuantity(item._id!))}
                      ml={1}
                    >
                      +
                    </Button>
                  </Td>
                  <Td>${(item.price * item.quantity).toFixed(2)}</Td>
                  <Td>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => dispatch(removeFromCart(item._id!))}
                    >
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Text mt={4} fontWeight="bold" fontSize="lg">
            Total: ${cart.total.toFixed(2)}
          </Text>
        </Box>
  
        {/* Address & Bank Form */}
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            placeholder="Bank Details"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleOrderSubmit}>
            Place Order
          </Button>
        </VStack>
      </Box>
    );
  };
  
  export default CheckoutPage;