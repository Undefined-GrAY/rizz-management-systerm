import type { ButtonProps } from "../types/types";

export function Button({
  variant = "primary",
  size = "md",
  icon,
   disabled,
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-primary hover:bg-primary-dark text-white shadow-sm disabled:bg-primary/50",
    secondary:
      "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700",
    ghost:
      "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
    danger:
      "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white shadow-sm disabled:opacity-50",
  };

  // Responsive sizes - automatically scale down on mobile
  const sizes = {
    sm: "px-3 py-1.5 text-xs sm:text-sm", // Mobile: 12px, Desktop: 14px
    md: "px-4 py-2 text-sm sm:text-base", // Mobile: 14px, Desktop: 16px
    lg: "px-5 py-2.5 text-sm sm:text-base md:text-lg", // Mobile: 14px, Tablet: 16px, Desktop: 18px
  };

  return (
    <button
      className={`
      inline-flex items-center justify-center gap-2 
        rounded-lg font-medium
        transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled}
      {...props}
    
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
