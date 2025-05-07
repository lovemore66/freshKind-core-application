
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import ProductPage from "./productPage";
import { Box, Button, Flex, GridItem, SimpleGrid, useToast } from "@chakra-ui/react";
import SideBar from "./SideBar";



const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast()

  const handleLogout = async () => {
    await logout();
        toast({
            title: "Sign Out",
            description: "You are now loged out!",
            status: 'success',
          duration: 9000,
          isClosable: true,
          });
    navigate("/login");
  };

  return (
    <div>
      {/* <h2>Welcome, {user?.displayName}</h2> */}
      <Flex height="100vh" overflow="hidden">
      {/* Sidebar - fixed width */}
      <Box width="240px" flexShrink={0}>
        <SideBar />
      </Box>

      {/* Main Content - flexible */}
      <Box flex="1" overflowY="auto" p={4}>
        <ProductPage />
        <Button mt={4} onClick={handleLogout} colorScheme="red">
          Logout
        </Button>
      </Box>
    </Flex>
    </div>
  );
};

export default Dashboard;
