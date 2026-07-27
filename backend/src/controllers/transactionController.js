import Transaction from "../models/transactionModel.js";

export const getTransactions = async (req, res) => {
  try {
    const filter = { userId: req.user.id };
    if (req.query.month) {
      const [year, month] = req.query.month.split("-").map(Number);
      filter.date = {
        $gte: new Date(year, month - 1, 1),
        $lt:  new Date(year, month, 1),
      };
    }
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    const t = await Transaction.create({ type, amount: Number(amount), category, description, date, userId: req.user.id });
    res.status(201).json(t);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { type, amount: Number(amount), category, description, date },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Transaction not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ error: "Transaction not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSummary = async (req, res) => {
  try {
    const filter = { userId: req.user.id };
    if (req.query.month) {
      const [year, month] = req.query.month.split("-").map(Number);
      filter.date = {
        $gte: new Date(year, month - 1, 1),
        $lt:  new Date(year, month, 1),
      };
    }

    const [totals, byCategory] = await Promise.all([
      Transaction.aggregate([
        { $match: filter },
        { $group: { _id: "$type", total: { $sum: "$amount" } } },
      ]),
      Transaction.aggregate([
        { $match: { ...filter, type: "expense" } },
        { $group: { _id: "$category", amount: { $sum: "$amount" } } },
        { $project: { _id: 0, category: "$_id", amount: 1 } },
      ]),
    ]);

    const income   = totals.find((t) => t._id === "income")?.total  ?? 0;
    const expenses = totals.find((t) => t._id === "expense")?.total ?? 0;

    res.json({ income, expenses, balance: income - expenses, byCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
