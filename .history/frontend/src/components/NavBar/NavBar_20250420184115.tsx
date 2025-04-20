// components/NavBar.tsx
import {
    Box,
    Flex,
    Menu,
    MenuButton,
    MenuList,
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
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="blue.500" _hover={{ bg: "blue.400" }}>
              <Flex align="center">
                <Avatar size="sm" name={user?.displayName || 'User'} src={user?.photoURL || ''} mr={2} />
                {user?.displayName || 'User'}
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={() => handleNavigate('/orders')}>Orders</MenuItem>
              <MenuItem onClick={() => handleNavigate('/settings')}>Settings</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    );
  };
  
  export default NavBar;
  