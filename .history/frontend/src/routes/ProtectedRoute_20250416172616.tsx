import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
