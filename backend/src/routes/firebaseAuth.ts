import express, { Request, Response } from "express";
import admin from "../config/firebase";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();
const SECRET = process.env.JWT_SECRET!;

router.post("/firebase-login", async (req: any, res: any) => {
  const { token } = req.body;

  console.log("Received Firebase token:", token); // Debugging log

  if (!token) {
    return res.status(400).json({ message: "Missing Firebase token" });
  }

  try {
    // Verify Firebase Token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded Firebase token:", decodedToken); // Debugging log

    // Check if the user already exists in MongoDB
    let user = await User.findOne({ firebaseId: decodedToken.uid });

    // Create a new user if not found
    if (!user) {
      user = await User.create({
        email: decodedToken.email,
        firebaseId: decodedToken.uid,
      });
      console.log("New user created:", user);
    }

    // Generate JWT Token for backend authentication
    const jwtToken = jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });

    return res.json({ token: jwtToken, user });
  } catch (error: any) {
    console.error("Firebase authentication error:", error.message);
    return res.status(401).json({ message: "Invalid Firebase token", error: error.message });
  }
});

router.get("/firebase-test", async (req: any, res: any) => {
    try {
      console.log("Fetching Firebase user...");
      const auth = admin.auth(); // ✅ Ensure auth() is called correctly
      const userRecord = await auth.getUserByEmail("sinkondeluvmo11@gmail.com");
  
      console.log("User found:", userRecord);
      return res.json({ message: "Firebase test successful", user: userRecord });
    } catch (error: any) {
      console.error("Error fetching user:", error.message);
      return res.status(500).json({ message: "Firebase test failed", error: error.message });
    }
  });
  

export default router;
