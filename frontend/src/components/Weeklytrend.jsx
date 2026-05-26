import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { BarChart3 } from "lucide-react";

const data = [
  { day: "Mon", emotion: 62 },
  { day: "Tue", emotion: 78 },
  { day: "Wed", emotion: 71 },
  { day: "Thu", emotion: 90 },
  { day: "Fri", emotion: 76 },
  { day: "Sat", emotion: 95 },
  { day: "Sun", emotion: 74 },
];

const WeeklyTrend = () => {
  return (
    <div className="bg-[#081028] border border-white/10 rounded-3xl p-6 md:p-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-2xl bg-[#A855F7]/10 flex items-center justify-center">
          <BarChart3 className="text-[#A855F7]" />
        </div>

        <div>
          <h2 className="text-white text-2xl font-semibold">
            Weekly Trends
          </h2>

          <p className="text-gray-400 text-sm">
            Average emotion confidence this week
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#0B122B] rounded-3xl p-4 md:p-6 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1E293B"
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#020817",
                border: "1px solid #1E293B",
                borderRadius: "16px",
                color: "white",
              }}
            />

            <Line
              type="monotone"
              dataKey="emotion"
              stroke="#5B8CFF"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#5B8CFF",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyTrend;