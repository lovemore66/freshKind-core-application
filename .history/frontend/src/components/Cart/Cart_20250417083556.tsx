// components/Dashboard/Cart.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../../store/cartSlice/cartSlice';
import { Button } from '@chakra-ui/react';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();  // Initialize the router

  const handleCheckout = () => {
    router.push('/checkout'); // Navigate to checkout page
  }

  return (
    <div>
      <h2>🛒 Cart</h2>
      {cart.items.length === 0 && <p>Cart is empty.</p>}
      <ul>
        {cart.items.map((item) => (
          <li key={item._id}>
            <img src={item.imageUrl} width={40} alt={item.title} />
            <b>{item.title}</b> - ${item.price} x {item.quantity} = ${item.price * item.quantity}
            <div>
              <button onClick={() => dispatch(decreaseQuantity(item._id!))}>➖</button>
              <button onClick={() => dispatch(increaseQuantity(item._id!))}>➕</button>
              <button onClick={() => dispatch(removeFromCart(item._id!))}>🗑 Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${cart.total.toFixed(2)}</h3>
      <Button mt={4} colorScheme="teal" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Cart;
