import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import OrdersPage from "./components/Orders/OrdersPage";
import ProfilePage from "./components/Profile/ProfilePage";
import SettingsPage from "./components/settings/SettingsPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <AuthProvider>
            <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
