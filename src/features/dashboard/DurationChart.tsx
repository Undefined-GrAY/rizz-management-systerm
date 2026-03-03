import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { prepareDurationChartData } from '../../utils/chartHelpers';
import type {  DurationProps } from '../../types/types';


export function DurationChart({recentBookings}: DurationProps) {

  const data = prepareDurationChartData(recentBookings || []);
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
      <h3 className=" text-slate-900 dark:text-white mb-6">
        Stay duration summary
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '	rgb(229,231,235)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value: number| undefined) => [`${value}%`, 'Bookings']}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            iconSize={10}
            formatter={(value: string, entry: any) => (
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {entry.payload.duration}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
