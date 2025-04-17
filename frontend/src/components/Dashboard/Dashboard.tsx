
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import ProductPage from "./productPage";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <ProductPage />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
