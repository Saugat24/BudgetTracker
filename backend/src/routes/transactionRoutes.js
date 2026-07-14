import { Router } from "express";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";
import { validateTransaction } from "../validators/transactionValidator.js";

const router = Router();

router.get("/summary", getSummary);
router.get("/", getTransactions);
router.post("/", ...validateTransaction, createTransaction);
router.put("/:id", ...validateTransaction, updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
