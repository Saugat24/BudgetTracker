import "dotenv/config";
import express from "express";
import cors from "cors";
import transactionRoutes from "./src/routes/transactionRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
