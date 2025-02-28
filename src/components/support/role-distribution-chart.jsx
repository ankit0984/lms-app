"use client";

import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export function RoleDistributionChart({ students, instructors, admins }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = [
    { name: "Students", value: students, color: "#4f46e5" },
    { name: "Instructors", value: instructors, color: "#10b981" },
    { name: "Admins", value: admins, color: "#f59e0b" },
  ];

  if (!isMounted) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} users`, "Count"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
