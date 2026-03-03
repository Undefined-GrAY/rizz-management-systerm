// Table.tsx - Main compound component
import { Button } from "./Button";
import type { TablePaginationProps, TableProps } from "../types/types";

export function Table({ children }: TableProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm`}
    >
      {children}
    </div>
  );
}

// FilterBar sub-component
Table.FilterBar = function FilterBar({ children, className }: TableProps) {
  return (
    <div
      className={`p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/50 ${className}`}
    >
      {children}
    </div>
  );
};

// Body sub-component
Table.Body = function Body({ children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  );
};

// Header sub-component
Table.Header = function Header({ children }: TableProps) {
  return (
    <thead>
      <tr className="text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
        {children}
      </tr>
    </thead>
  );
};

// Column sub-component
Table.Column = function Column({ children, className = "" }: TableProps) {
  return <th className={`px-6 py-4 ${className}`}>{children}</th>;
};

// Rows container
Table.Rows = function Rows({ children }: TableProps) {
  return (
    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
      {children}
    </tbody>
  );
};

// Single Row
Table.Row = function Row({ children, className = "" }: TableProps) {
  return (
    <tr
      className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${className}`}
    >
      {children}
    </tr>
  );
};

// Cell
Table.Cell = function Cell({ children, className = "" }: TableProps) {
  return <td className={`xl:px-6 xl:py-4 ${className}`}>{children}</td>;
};

// Pagination
// Table.Pagination = function Pagination({ children }) {
//   return (
//     <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
//       {children}
//     </div>
//   );
// };

Table.Pagination = function Pagination({
  startIndex,
  endIndex,
  totalCount,
  onPrevious,
  onNext,
  disablePrevious,
 disableNext
}: TablePaginationProps) {
  // const endIndex = Math.min(currentPage * pageSize, totalCount);

  return (
    <div>
      <div className="flex flex-col px-4 md:px-6 py-4 bg-slate-50 dark:bg-slate-800/50 gap-y-3 md:flex-row md:gap-y-0 items-center justify-between  border-t border-slate-200 dark:border-slate-800">
        <p className="md:w-full  text-slate-500 dark:text-slate-400">
          Showing {startIndex} to {endIndex} of {totalCount} bookings
        </p>
        <div className="flex w-full justify-between md:justify-end  items-center gap-2">
          <Button
            variant="secondary"
            size="lg"
            disabled={disablePrevious}
            onClick={onPrevious}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            size="lg"
            disabled={disableNext}
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
