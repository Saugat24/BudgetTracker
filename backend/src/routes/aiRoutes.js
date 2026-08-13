import { Router } from "express";
import { analyseSpending } from "../controllers/aiController.js";

const router = Router();
router.post("/analyse", analyseSpending);
export default router;
