import { body, validationResult } from "express-validator";

export const validateTransaction = [
  body("type")
    .isIn(["income", "expense"])
    .withMessage("type must be 'income' or 'expense'"),

  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("amount must be a positive number"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("category is required"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("date must be a valid date"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
