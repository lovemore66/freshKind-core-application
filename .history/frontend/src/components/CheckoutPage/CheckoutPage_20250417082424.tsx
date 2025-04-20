import {
    Box,
    Button,
    Input,
    VStack,
    Heading,
  } from "@chakra-ui/react"
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormErrorIcon,
  } from "@chakra-ui/form-control"
  import useToast from "@chakra-ui/toast"
  import { useState } from "react"
  import axios from "axios"
  import { useSelector, useDispatch } from "react-redux"
  import { RootState } from "../../store/store"
  import { clearCart } from "../../store/cartSlice/cartSlice"
  
  export default function CheckoutPage() {
    const toast = useToast()
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
    const [form, setForm] = useState({
      fullName: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = async () => {
      if (cartItems.length === 0) {
        toast({ title: "Cart is empty", status: "warning" })
        return
      }
  
      try {
        await axios.post("/api/orders", {
          items: cartItems,
          address: {
            fullName: form.fullName,
            street: form.street,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
          payment: {
            cardNumber: form.cardNumber,
            expiryDate: form.expiryDate,
            cvv: form.cvv,
          },
          total,
        })
  
        dispatch(clearCart())
        toast({ title: "Order placed successfully!", status: "success" })
      } catch (error) {
        toast({ title: "Failed to place order", status: "error" })
      }
    }
  
    return (
      <Box maxW="600px" mx="auto" mt={10} p={4}>
        <Heading mb={6}>Checkout</Heading>
        <VStack  align="stretch">
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input name="fullName" value={form.fullName} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Street</FormLabel>
            <Input name="street" value={form.street} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input name="city" value={form.city} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Postal Code</FormLabel>
            <Input name="postalCode" value={form.postalCode} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <Input name="country" value={form.country} onChange={handleChange} />
          </FormControl>
  
          <Heading size="md" mt={6}>Payment</Heading>
          <FormControl isRequired>
            <FormLabel>Card Number</FormLabel>
            <Input name="cardNumber" value={form.cardNumber} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Expiry Date</FormLabel>
            <Input name="expiryDate" value={form.expiryDate} onChange={handleChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>CVV</FormLabel>
            <Input name="cvv" value={form.cvv} onChange={handleChange} />
          </FormControl>
  
          <Button colorScheme="teal" onClick={handleSubmit}>
            Place Order (${total.toFixed(2)})
          </Button>
        </VStack>
      </Box>
    )
  }
  