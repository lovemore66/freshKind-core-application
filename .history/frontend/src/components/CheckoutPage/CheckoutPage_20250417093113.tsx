import {
    Box,
    Button,
    Input,
    VStack,
    Heading,
    Text,
  } from "@chakra-ui/react"
  import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from '@chakra-ui/table';
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
    const cart = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const toast = useToast();
  
    const [formData, setFormData] = useState({
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: ""
    });
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleOrderSubmit = async () => {
      try {
        const order = {
          items: cart.items,
          total: cart.total,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          payment: {
            cardNumber: formData.cardNumber,
            cardHolder: formData.cardHolder,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv
          }
        };
        await axios.post("http://localhost:5000/api/orders", order);
        toast({ title: "Order placed successfully!", status: "success", duration: 3000 });
      } catch (error) {
        toast({ title: "Failed to place order.", status: "error", duration: 3000 });
      }
    };
  
    return (
      <Box maxW="4xl" mx="auto" mt={10} p={5} boxShadow="md" borderRadius="md">
        <Heading size="lg" mb={6}>Checkout</Heading>
  
        <TableContainer mb={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th>Quantity</Th>
                <Th>Price</Th>
                <Th>Remove</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.items.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.title}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>${(item.price * item.quantity).toFixed(2)}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => dispatch(removeFromCart(item._id!))}>
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
  
        <VStack align="stretch">
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input name="address" value={formData.address} onChange={handleInputChange} />
          </FormControl>
  
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input name="city" value={formData.city} onChange={handleInputChange} />
          </FormControl>
  
          <FormControl>
            <FormLabel>Postal Code</FormLabel>
            <Input name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
          </FormControl>
  
          <FormControl>
            <FormLabel>Card Number</FormLabel>
            <Input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
          </FormControl>
  
          <FormControl>
            <FormLabel>Card Holder</FormLabel>
            <Input name="cardHolder" value={formData.cardHolder} onChange={handleInputChange} />
          </FormControl>
  
          <FormControl>
            <FormLabel>Expiry Date</FormLabel>
            <Input name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} />
          </FormControl>
  
          <FormControl>
            <FormLabel>CVV</FormLabel>
            <Input name="cvv" value={formData.cvv} onChange={handleInputChange} />
          </FormControl>
  
          <Button colorScheme="teal" onClick={handleOrderSubmit}>Place Order</Button>
        </VStack>
      </Box>
    );
  };
  
  export default CheckoutPage;
  