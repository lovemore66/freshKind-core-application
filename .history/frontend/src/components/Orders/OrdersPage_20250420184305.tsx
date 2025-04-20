// pages/OrdersPage.tsx
import {
    Box, Heading, Spinner, Text,
  } from '@chakra-ui/react';

    import {
      TableContainer,
      Table,
      Thead,
      Tbody,
      Tr,
      Th,
      Td,
    } from '@chakra-ui/table';
    
  import { useGetOrdersQuery } from '../orderApi/orderApi';
  
  const OrdersPage = () => {
    const { data: orders, isLoading, isError } = useGetOrdersQuery();
  
    if (isLoading) return <Spinner />;
    if (isError) return <Text color="red.500">Failed to load orders.</Text>;
  
    return (
      <Box p={6}>
        <Heading mb={4}>My Orders</Heading>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Total</Th>
              <Th>Address</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order: any) => (
              <Tr key={order._id}>
                <Td>{order._id}</Td>
                <Td>${order.total.toFixed(2)}</Td>
                <Td>{order.address}, {order.city}</Td>
                <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };
  
  export default OrdersPage;
  