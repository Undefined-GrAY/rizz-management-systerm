import React from "react";

const tabs = [
  { label: 'All', active: true },
  { label: 'Checked in', active: false },
  { label: 'Checked out', active: false },
  { label: 'Unconfirmed', active: false },
];

export default function HeaderTab() {
  return (
    <div className="flex border-b border-slate-100 dark:border-slate-800">
      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <a
            key={tab.label}
            href="#"
            className={
              tab.active
                ? "pb-3 border-b-2 border-primary text-primary text-sm font-bold"
                : "pb-3 border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-semibold"
            }
          >
            {tab.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
