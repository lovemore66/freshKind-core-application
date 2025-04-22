"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,

  Heading,
  Input,
  Stack,
  useToast,
  VStack,

} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormErrorIcon,
} from "@chakra-ui/form-control"
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import {
  auth,
  facebookProvider,
  googleProvider,
} from "../../configs/firebase";
import { createUserProfile } from "../../utils/firebaseHelpers";
import { Toast } from "@chakra-ui/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   const toast = useToast()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserProfile(userCredential.user);
      Toast({
        title: "Account created",
        description: "Welcome to the platform!",
        status: "success",
        duration: 4000,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
      });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
        status: "success",
        duration: 4000,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
      });
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await createUserProfile(userCredential.user);
      toast({
        title: "Google Sign-In",
        description: "You are now logged in!",
        status: "success",
        duration: 4000,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Google Sign-In Failed",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
      });
    }
  };

  const handleFacebookAuth = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      toast({
        title: "Facebook Sign-In",
        description: "Login successful!",
        status: "success",
        duration: 4000,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Facebook Sign-In Failed",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <Container maxW="md" py={10}>
      <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <VStack align="stretch">
          <Heading textAlign="center">Login / Sign Up</Heading>

          {/* Login */}
          <form onSubmit={handleEmailLogin}>
            <VStack >
              <FormControl width={'100%'}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl  width={'100%'}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full">
                Login
              </Button>
            </VStack>
          </form>



          {/* Sign-Up */}
          <form onSubmit={handleSignup}>
            <VStack >
              <FormControl  width={'100%'}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl  width={'100%'}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Button type="submit" colorScheme="green" width="full">
                Sign Up
              </Button>
            </VStack>
          </form>



          {/* Social Logins */}
          <Stack >
            <Button
              variant="outline"
     
              onClick={handleGoogleAuth}
            >
              Continue with Google
            </Button>
            <Button
              onClick={handleFacebookAuth}
            >
              Continue with Facebook
            </Button>
          </Stack>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
