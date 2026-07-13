function Button({ children, onClick, type = "button", className = "", onAdd, form, setForm, empty }) {
  const handleClick = () => {
    if (onAdd && form) {
      if (!form.amount || !form.date) return;
      onAdd({ ...form, amount: parseFloat(form.amount), id: Date.now() });
      setForm(empty);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
