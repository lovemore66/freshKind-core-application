import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();
const SECRET = process.env.JWT_SECRET!;

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword });
    res.json({ token: jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" }) });
  } catch (error) {
    res.status(400).json({ message: "User already exists" });
  }
});

// Login
router.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ token: jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" }) });
});

export default router;
