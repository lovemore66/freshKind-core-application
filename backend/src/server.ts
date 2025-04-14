import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/productRoutes";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
