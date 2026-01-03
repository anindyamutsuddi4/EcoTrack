import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../useAxiosSecure";

const DemoChallengeGraph = () => {
  const axiosSecure = useAxiosSecure();
  const { data = [] } = useQuery({
    queryKey: ["allchallenges"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allchallenges");
      return res.data;
    },
  });


  const CustomXAxisTick = ({ x, y, payload }) => {
    const words = payload.value.split(" ");
    return (
      <g transform={`translate(${x},${y + 8})`}>
        {words.map((word, index) => (
          <text
            key={index}
            x={0}
            y={index * 10}
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


  const getBarSize = () => {
    if (window.innerWidth < 640) return 15;
    if (window.innerWidth < 1024) return 25; 
    return 50; 
  };

  return (
    <div className="mx-2 sm:px-0 lg:px-12 py-4">
    
      <div className="overflow-x-auto">
        <div className="inline-block min-w-[600px] md:min-w-full bg-white/10 backdrop-blur-lg rounded-md p-2 md:p-6 shadow-2xl border border-white/20 h-[350px] md:h-[450px] lg:h-[500px]">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4 text-center">
            Challenge Participants
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 70,
              }}
              barGap={20}
              barCategoryGap="25%"
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
              <YAxis stroke="white" tick={{ fill: "white", fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#17483d",
                  borderRadius: "2px",
                  border: "none",
                  color: "white",
                }}
                itemStyle={{ color: "white", fontSize: "12px" }}
              />
              <Bar
                dataKey="participants"
                fill="url(#colorParticipants)"
                radius={[2, 2, 0, 0]}
                barSize={getBarSize()} 
              />
              <defs>
                <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A2F0A2" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#4B9444" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DemoChallengeGraph;
