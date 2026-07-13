let transactions = [
  { id: 1, description: "Salary",         amount: 50000, type: "income",  category: "Salary",    date: "2025-06-01" },
  { id: 2, description: "Groceries",      amount: 2500,  type: "expense", category: "Food",      date: "2025-06-02" },
  { id: 3, description: "Freelance Work", amount: 12000, type: "income",  category: "Freelance", date: "2025-06-03" },
  { id: 4, description: "Electricity Bill", amount: 1800, type: "expense", category: "Utilities", date: "2025-06-04" },
  { id: 5, description: "Internet Bill",  amount: 1200,  type: "expense", category: "Utilities", date: "2025-06-05" },
];

let nextId = 6;

export const getAll = () => transactions;

export const create = ({ type, amount, category, description }) => {
  const t = { id: nextId++, type, amount: Number(amount), category, description, date: new Date().toISOString().slice(0, 10) };
  transactions.unshift(t);
  return t;
};

export const remove = (id) => {
  const idx = transactions.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const [deleted] = transactions.splice(idx, 1);
  return deleted;
};

export const getSummary = () => {
  const income  = transactions.filter((t) => t.type === "income") .reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const byCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {});
  return { income, expenses, balance: income - expenses, byCategory };
};
