// components/NavBar.tsx
import {
    Box,
    Flex,
    Menu,
    MenuItem,
    Avatar,
    Button,
  } from '@chakra-ui/react';
  import { ChevronDownIcon } from '@chakra-ui/icons';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../../auth/AuthContext';
  
  const NavBar = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
  
    const handleNavigate = (path: string) => navigate(path);
  
    return (
      <Box bg="blue.600" p={4} color="white">
        <Flex justify="space-between" align="center">
          <Box fontWeight="bold" fontSize="xl">🛍 Shop</Box>
          <Flex>

              <Flex align="center">
                {/* <Avatar size="sm" name={user?.displayName || 'User'} src={user?.photoURL || ''} mr={2} /> */}
                {user?.displayName || 'User'}
              </Flex>

              <Box onClick={() => handleNavigate('/profile')}>Profile</Box>
              <Box onClick={() => handleNavigate('/orders')}>Orders</Box>
              <Box onClick={() => handleNavigate('/settings')}>Settings</Box>

          </Flex>
        </Flex>
      </Box>
    );
  };
  
  export default NavBar;
  