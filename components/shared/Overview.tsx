"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  console.log(percent);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {percent !== 0 && `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
        <p className="label">{`${label} : ₱${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

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
      <Tooltip content={<CustomTooltip />} />
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
