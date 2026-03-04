import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { recentBooking } from "../../types/types";
import { prepareSalesData } from "../../utils/prepareSalesData";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";


interface SalesChartProps {
  startDate?: string;
  endDate?: string;
  recentBookings: recentBooking;
}

export function SalesChart({
  recentBookings,
}: SalesChartProps) {
   const [searchParams] = useSearchParams();
  
    // FILTER
    const filterValue = Number(searchParams.get("last")) || 7;
  const chartData = useMemo(
    () => prepareSalesData(recentBookings, filterValue),
    [recentBookings, filterValue],
  );
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-2 lg:p-6">
      <h3 className=" font-bold text-slate-900 dark:text-white mb-6">
        Sales from {chartData.at(0)?.date} — {chartData.at(-1)?.date}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="totalSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="extrasSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
            labelStyle={{ color: "#cbd5e1", marginBottom: "8px" }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#818cf8"
            strokeWidth={2}
            fill="url(#totalSales)"
            name="Total sales"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#extrasSales)"
            name="Extras sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
