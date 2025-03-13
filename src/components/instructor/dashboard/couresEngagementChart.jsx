"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"

// Mock data for course engagement
const generateMockData = () => {
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"]

    return weeks.map((week) => {
        return {
            week,
            CS101: Math.floor(Math.random() * 20) + 70,
            CS201: Math.floor(Math.random() * 20) + 60,
            CS301: Math.floor(Math.random() * 20) + 80,
        }
    })
}

export function CourseEngagementChart() {
    const [isMounted, setIsMounted] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setIsMounted(true)
        setData(generateMockData())
    }, [])

    if (!isMounted) {
        return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
    }

    return (
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="CS101" stroke="#4f46e5" name="Intro to CS" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="CS201" stroke="#10b981" name="Data Structures" />
                    <Line type="monotone" dataKey="CS301" stroke="#f59e0b" name="Database Systems" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

