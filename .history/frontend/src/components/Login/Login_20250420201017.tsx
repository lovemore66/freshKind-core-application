import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, facebookProvider, googleProvider, setupRecaptcha } from "../../configs/firebase";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 📌 Handle Email & Password Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
           const userCredential = await createUserWithEmailAndPassword(auth, email, password);
           const user = userCredential.user;
       
           // ✅ Create user profile in Firestore
           await createUserProfile(user);
      navigate("/dashboard");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  // 📌 Handle Email & Password Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  // 📌 Handle Google Sign-In/Sign-Up
  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  // 📌 Handle Facebook Sign-In/Sign-Up
  const handleFacebookAuth = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/dashboard");
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div>
      <h2>Login / Sign Up</h2>
      
      {/*  Email & Password Login */}
      <form onSubmit={handleEmailLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>

      {/*  Email & Password Sign-Up */}
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>

      {/*  Google & Facebook Authentication */}
      <button onClick={handleGoogleAuth}>Continue with Google</button>
      <button onClick={handleFacebookAuth}>Continue with Facebook</button>
    </div>
  );
};

export default Login;