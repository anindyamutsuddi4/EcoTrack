import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DemoRemainingDaysPie = () => {
  const axiosSecure = useAxiosSecure();

  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ["allchallenges"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allchallenges");
      return res.data;
    },
  });

  const today = new Date();

  const data = challenges
    .map((item) => {
      if (!item?.endDate) return null;

      // ✅ FIX: normalize unicode hyphens
      const normalizedDate = item.endDate.replace(/[^\d]/g, "-");
      const end = new Date(normalizedDate + "T23:59:59");

      if (isNaN(end.getTime())) return null;

      const daysRemaining = Math.ceil(
        (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        name: item.title,
        value: Math.max(daysRemaining, 0),
      };
    })
    .filter(Boolean);

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#60a5fa",
    "#f97316",
    "#a78bfa",
  ];

  return (
    <div className="mx-auto w-full mb-5 max-w-[420px] bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-xl border border-white/20">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">
        Days Remaining
      </h2>

      {isLoading && (
        <p className="text-center text-white text-sm">Loading…</p>
      )}

      {!isLoading && data.length === 0 && (
        <p className="text-center text-white text-sm">
          No active challenges found
        </p>
      )}

      {data.length > 0 && (
        <div className="mx-auto aspect-square w-full max-w-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={3}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => `${value} days remaining`}
                contentStyle={{
                  backgroundColor: "#17483d",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DemoRemainingDaysPie;
