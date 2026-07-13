import { useState } from "react";
import Button from "./button";

const CATEGORIES = ["Food", "Salary", "Transport", "Utilities", "Freelance", "Entertainment", "Other"];

const empty = { type: "income", amount: "", category: "Food", description: "", date: "" };

function AddTransactionForm({ onAdd }) {
  const [form, setForm] = useState(empty);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  
  const field = "border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 space-y-3">
      <h2 className="text-2xl font-semibold mb-2">Add Transaction</h2>

      <div className="grid grid-cols-2 gap-3">
        <select name="type" value={form.type} onChange={handle} className={field}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select name="category" value={form.category} onChange={handle} className={field}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <input name="amount" type="number" min="0" placeholder="Amount" value={form.amount} onChange={handle} className={field} required />
      <input name="description" type="text" placeholder="Description" value={form.description} onChange={handle} className={field} />
      <input name="date" type="date" value={form.date} onChange={handle} className={field} required />

      <Button onAdd={onAdd} form={form} setForm={setForm} empty={empty} className="w-full">Add Transaction</Button>
    </div>
  );
}

export default AddTransactionForm;
