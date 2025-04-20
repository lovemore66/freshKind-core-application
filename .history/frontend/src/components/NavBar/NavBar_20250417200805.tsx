import {
    Box,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    Spacer,
  } from '@chakra-ui/react';
  import { HamburgerIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons';
  import { useNavigate } from 'react-router-dom';
  import { useAuthState } from 'react-firebase-hooks/auth';
  import { getAuth, signOut } from 'firebase/auth';
  
  const Navbar = () => {
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
  
    const handleSignOut = async () => {
      await signOut(auth);
      navigate('/login');
    };
  
    return (
      <Box bg={useColorModeValue('blue.600', 'gray.900')} px={4} py={2} boxShadow="md">
        <Flex alignItems="center">
          {/* Left Menu Icon */}
          <IconButton
            icon={<HamburgerIcon />}
            colorScheme="whiteAlpha"
            variant="ghost"
            aria-label="Open Menu"
          />
  
          {/* Centered Search */}
          <InputGroup mx={6} flex={1} maxW="600px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search for products"
              bg="white"
              borderRadius="md"
            />
          </InputGroup>
  
          <Spacer />
  
          {/* Right Avatar & Dropdown */}
          <Menu>
            <MenuButton>
              <Avatar size="sm" name={user?.displayName || 'Profile'} src={user?.photoURL || ''} />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<SettingsIcon />} onClick={() => navigate('/settings')}>
                Settings
              </MenuItem>
              <MenuItem onClick={() => navigate('/orders')}>
                My Orders
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    );
  };
  
  export default Navbar;
  