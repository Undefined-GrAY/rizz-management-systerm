import { Icon } from "../../ui/Icon";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 sm:mb-2">
            {title}
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white truncate">
            {value}
          </p>
        </div>
        <div
          className={`size-10 sm:size-12 rounded-xl ${iconBgColor} flex items-center justify-center shrink-0`}
        >
          <Icon
            name={icon}
            size={20}
            className={`${iconColor} sm:w-6 sm:h-6`}
          />
        </div>
      </div>
    </div>
  );
}
