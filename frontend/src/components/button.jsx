import api from "../api/axios";

function Button({ children, onClick, type = "button", className = "", onAdd, form, setForm, empty }) {
  const handleClick = async () => {
    if (onAdd && form) {
      if (!form.amount || !form.date) return;
      const { data } = await api.post("/transactions", { ...form, amount: parseFloat(form.amount) });
      onAdd(data);
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
