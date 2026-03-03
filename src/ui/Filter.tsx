import { useSearchParams } from "react-router-dom";
import type { FilterProps } from "../types/types";

export function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0]?.value;

  function handleChange(value: string) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <>
      {/* Mobile: Select dropdown */}
      <select
        value={currentFilter}
        onChange={(e) => handleChange(e.target.value)}
        className="lg:hidden px-4 py-2 text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Desktop: Button group */}
      <div className="hidden lg:inline-flex items-center gap-1 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleChange(option.value)}
            disabled={option.value === currentFilter}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md transition-all
              ${
                option.value === currentFilter
                  ? "bg-primary text-white shadow-sm cursor-default"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white disabled:cursor-not-allowed"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </>
  );
}
