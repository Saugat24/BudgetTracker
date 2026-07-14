import Transaction from "../models/transactionModel.js";

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  res.json(transactions);
};

export const createTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  const t = await Transaction.create({ type, amount: Number(amount), category, description, date });
  res.status(201).json(t);
};

export const updateTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  const updated = await Transaction.findByIdAndUpdate(
    req.params.id,
    { type, amount: Number(amount), category, description, date },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ error: "Transaction not found" });
  res.json(updated);
};

export const deleteTransaction = async (req, res) => {
  const deleted = await Transaction.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Transaction not found" });
  res.json(deleted);
};

export const getSummary = async (req, res) => {
  const transactions = await Transaction.find();
  const income   = transactions.filter((t) => t.type === "income") .reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const byCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {});
  res.json({ income, expenses, balance: income - expenses, byCategory });
};
