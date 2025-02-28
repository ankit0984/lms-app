"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Mock data for the chart
const generateMockData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months.map((month) => ({
    name: month,
    registrations: Math.floor(Math.random() * 50) + 10,
    logins: Math.floor(Math.random() * 200) + 50,
  }));
};

export function UserActivityChart() {
  const [data, setData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setData(generateMockData());
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="var(--border)"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            color: "var(--card-foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
          }}
        />
        <Bar
          dataKey="registrations"
          name="New Registrations"
          fill="var(--color-chart-1)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="logins"
          name="User Logins"
          fill="var(--color-chart-2)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
