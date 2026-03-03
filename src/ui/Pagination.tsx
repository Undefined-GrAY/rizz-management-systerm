import React from "react";
import { Button } from "./Button";

export default function Pagination({startIndex, endIndex, totalCount }) {
  return (
    <div>
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Showing {startIndex} sto {endIndex} of {totalCount} bookings
        </p>
        <div className="flex item-center gap-2">
          <Button variant="secondary" size="sm" disabled>
            Previous
          </Button>
          <Button variant="secondary" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
