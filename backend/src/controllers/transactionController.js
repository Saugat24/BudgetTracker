import * as Transaction from "../models/transactionModel.js";

export const getTransactions = (req, res) => {
  res.json(Transaction.getAll());
};

export const createTransaction = (req, res) => {
  const { type, amount, category, description } = req.body;
  if (!type || !amount || !category) {
    return res.status(400).json({ error: "type, amount, and category are required" });
  }
  res.status(201).json(Transaction.create({ type, amount, category, description }));
};

export const deleteTransaction = (req, res) => {
  const deleted = Transaction.remove(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: "Transaction not found" });
  res.json(deleted);
};

export const getSummary = (req, res) => {
  res.json(Transaction.getSummary());
};
