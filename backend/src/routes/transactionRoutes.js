import { Router } from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";

const router = Router();

router.get("/summary", getSummary);
router.get("/", getTransactions);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;
