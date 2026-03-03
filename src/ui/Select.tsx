import type { SelectProps } from "../types/types";

export function Select({
  options,
  value,
  onChange,
  variant = "default",
  className = "",
  ...props
}: SelectProps) {
  const variants = {
    default: "border-slate-300 dark:border-slate-700",
    white: "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900",
  };

  return (
    <select
      value={value}
      onChange={onChange}
      className={`
        px-3 py-1.5 
        text-sm font-medium
        rounded-sm
        bg-slate-50 dark:bg-slate-900
        border  border-b-blue-400
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
        transition-all
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
