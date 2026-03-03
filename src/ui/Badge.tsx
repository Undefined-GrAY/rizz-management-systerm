import type { BookingStatus, BadgeProps } from "../types/types";

const statusConfig: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  "checked-in": {
    label: "Checked In",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  "checked-out": {
    label: "Checked Out",
    className:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  },
  unconfirmed: {
    label: "Unconfirmed",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

const dashboardStatusConfig = {
    unconfirmed: {
    label: "Arriving",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
    
  "checked-in": {
    label: "departing",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  "checked-out": {
    label: "departed",
    className:
      "bg-white-400",
  },
};

export const Badge = ({ status, variant}: BadgeProps) => {
  
  if (variant){
     const dashboardconfig = dashboardStatusConfig[status] || { className: '', label: status };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${dashboardconfig.className}`}>
        {dashboardconfig.label}
      </span>
    );
  }
   

  const config = statusConfig[status] || { className: '', label: status };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${config.className}`}
    >
      {config.label}
    </span>
  );
};
