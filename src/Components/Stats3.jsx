import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const ImpactDurationChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ["allchallenges"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allchallenges");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-white">
        Loading chart...
      </div>
    );
  }

  const data = challenges.map((item) => ({
    title: item.title,
    totalImpact: item.totalImpact || 0,
    duration: item.duration || 0,
  }));

  const COLORS = {
    impact: ["#22c55e", "#4B9444"],
    duration: ["#60a5fa", "#2563eb"],
  };

  // Custom tick for wrapping titles
  const CustomXAxisTick = ({ x, y, payload }) => {
    const words = payload.value.split(" ");
    return (
      <g transform={`translate(${x},${y + 10})`}>
        {words.map((word, index) => (
          <text
            key={index}
            x={0}
            y={index * 12}
            textAnchor="middle"
            fill="white"
            fontSize={10}
          >
            {word}
          </text>
        ))}
      </g>
    );
  };

  return (
    <div className="mx-2 sm:mx-4  lg:mx-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-2xl border border-white/20">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 text-center">
        Challenge Impact & Duration
      </h2>

      {/* Scrollable container on small devices */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px] sm:min-w-[1000px] lg:min-w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 100 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.2)"
              />

              <XAxis
                dataKey="title"
                stroke="white"
                interval={0}
                tick={<CustomXAxisTick />}
              />

              <YAxis stroke="white" tick={{ fill: "white", fontSize: 12 }} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#17483d",
                  borderRadius: "1px",
                  border: "none",
                  color: "white",
                  fontSize: "12px",
                }}
              />

              <Legend
                wrapperStyle={{ color: "white", fontSize: 12, bottom: 0 }}
                verticalAlign="bottom"
              />

              <Bar
                dataKey="totalImpact"
                name="Total Impact"
                fill="url(#impactGradient)"
                radius={[1, 1, 0, 0]}
                barSize={25}
              />
              <Bar
                dataKey="duration"
                name="Duration (days)"
                fill="url(#durationGradient)"
                radius={[1, 1, 0, 0]}
                barSize={25}
              />

              <defs>
                <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.impact[0]} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={COLORS.impact[1]} stopOpacity={0.6} />
                </linearGradient>

                <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.duration[0]} stopOpacity={0.9} />
                  <stop offset="100%" stopColor={COLORS.duration[1]} stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ImpactDurationChart;
