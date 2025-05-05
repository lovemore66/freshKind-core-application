
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import ProductPage from "./productPage";
import { Box, GridItem, SimpleGrid, useToast } from "@chakra-ui/react";



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
      <h2>Welcome, {user?.displayName}</h2>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: "24px", md: "40px" }}>
    <GridItem colSpan={{ base: 1, md: 3 }}>
      <Box height="20">Column 1</Box>
    </GridItem>
    <GridItem background={'grey'}  colSpan={{ base: 1, md: 1 }}>
      <Box height="20">Column 2</Box>
    </GridItem>
  </SimpleGrid>
      <ProductPage  />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
