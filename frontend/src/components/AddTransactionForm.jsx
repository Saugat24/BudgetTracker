import { useState } from "react";
import Button from "./button";

const CATEGORIES = ["Food", "Salary", "Transport", "Utilities", "Freelance", "Entertainment", "Other"];
const empty = { type: "income", amount: "", category: "Food", description: "", date: "" };
const field = "border border-gray-200 bg-white rounded-xl px-4 py-2.5 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400";

function AddTransactionForm({ onAdd }) {
  const [form, setForm] = useState(empty);
  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Add Transaction</h2>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <select name="type" value={form.type} onChange={handle} className={field}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select name="category" value={form.category} onChange={handle} className={field}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <input name="amount" type="number" min="0" placeholder="Amount (Rs.)" value={form.amount} onChange={handle} className={field} required />
        <input name="date" type="date" value={form.date} onChange={handle} className={field} required />
      </div>

      <input name="description" type="text" placeholder="Description (optional)" value={form.description} onChange={handle} className={`${field} mb-4`} />

      <Button onAdd={onAdd} form={form} setForm={setForm} empty={empty} className="w-full">
        Add Transaction
      </Button>
    </div>
  );
}

export default AddTransactionForm;
