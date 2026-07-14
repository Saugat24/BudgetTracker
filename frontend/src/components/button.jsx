const API = "http://localhost:3001/api/transactions";

function Button({ children, onClick, type = "button", className = "", onAdd, form, setForm, empty }) {
  const handleClick = async () => {
    if (onAdd && form) {
      if (!form.amount || !form.date) return;
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
      });
      const saved = await res.json();
      onAdd(saved);
      setForm(empty);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-2.5 px-4 rounded-xl transition-all text-sm ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
