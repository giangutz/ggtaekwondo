"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function Overview({ data }: any) {
  let transformedData: any = [];
  if (data) {
    transformedData = Object.entries(data).map(([name, total]) => ({
      name,
      total,
    }));
  }
  
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={transformedData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₱${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
