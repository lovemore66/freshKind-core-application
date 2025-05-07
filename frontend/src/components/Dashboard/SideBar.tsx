import React from "react";
import {
  Box,
  VStack,
  Button,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiUser,
  FiShoppingCart,
  FiSettings,
  FiBox,
  FiLogOut,
  FiActivity,
  FiSend,
  FiFilePlus,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type NavItem = {
  name: string;
  icon: any;
  path: string;
};

const navItems: NavItem[] = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },
  { name: "Profile", icon: FiUser, path: "/profile" },
  { name: "My Products", icon: FiBox, path: "/my-products" },
  { name: "Orders", icon: FiShoppingCart, path: "/orders" },
  { name: "Travel", icon: FiSend, path: "/travel" },
  { name: "Licences", icon: FiFileText , path: "/licences" },
  { name: "Experiences", icon: FiUser, path: "/experiences" },
  { name: "Tickets", icon: FiFilePlus, path: "/licences" },
  { name: "Electricity", icon: FiActivity , path: "/licences" },
  { name: "My Products", icon: FiBox, path: "/my-products" },
  { name: "Settings", icon: FiSettings, path: "/settings" },
  { name: "Logout", icon: FiLogOut, path: "/logout" },
];

const SideBar = () => {
  const navigate = useNavigate();
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      width="240px"
      height="100vh"
      bg={useColorModeValue("white", "gray.900")}
      boxShadow="md"
      p={4}
      position="fixed"
    >
      <VStack spacing={0} align="stretch">
        {navItems.map((item) => (
          <Button
          borderBottom={'1px solid #eee'}
            key={item.name}
            onClick={() => navigate(item.path)}
            leftIcon={<Icon color={'green'} as={item.icon} />}
            justifyContent="flex-start"
            variant="ghost"
            _hover={{ bg: hoverBg }}
            fontWeight="sm"
            fontSize="sm"
            height={'40px'}
            borderRadius={'0'}
            marginTop={'0'}
          >
            <Text>{item.name}</Text>
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default SideBar;
