import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
