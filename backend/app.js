import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { protect } from "./src/middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ["http://localhost:5173", "https://yourdomain.com"].includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("CORS origin not allowed"));
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", protect, transactionRoutes);

connectDB().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));
