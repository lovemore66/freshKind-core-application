
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import ProductPage from "./productPage";
import { useToast } from "@chakra-ui/react";



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
      <ProductPage  />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
