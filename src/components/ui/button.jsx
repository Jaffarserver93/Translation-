export function Button({ children, onClick, className = '', variant = 'default', disabled }) {
  const base = "rounded-xl px-4 py-2 font-medium transition active:scale-95";
  const styles = variant === "outline"
    ? "border border-white text-white bg-transparent hover:bg-white hover:text-black"
    : "bg-white text-black hover:bg-gray-300";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
