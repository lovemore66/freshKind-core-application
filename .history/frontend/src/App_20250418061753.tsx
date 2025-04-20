import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./components/Theme/Theme";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider value={system}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
