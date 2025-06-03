// components/students/assignments/assignmentCharts.jsx
"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell,
    LineChart, Line,
    ResponsiveContainer
} from 'recharts';

// No hardcoded data - will receive data via props

const COLORS = ["#00C49F", "#FF8042", "#8884d8", "#ffc658"];
const GRADE_COLORS = {
    "A+": "#4CAF50",
    "A": "#8BC34A",
    "A-": "#CDDC39",
    "B+": "#FFEB3B",
    "B": "#FFC107",
    "B-": "#FF9800",
    "C+": "#FF5722",
    "C": "#F44336",
    "F": "#9E9E9E"
};

const StudentAssignmentCharts = ({ assignments, totalSubmitted, totalPending }) => {
    // 1. Pie: Overall Status
    const overallStatusData = [
        { name: "Submitted", value: totalSubmitted },
        { name: "Pending", value: totalPending }
    ];

    // 2. Line: Submissions Over Time
    const timelineData = {};
    assignments.forEach(assignment => {
        if (assignment.submissionDate) {
            timelineData[assignment.submissionDate] = (timelineData[assignment.submissionDate] || 0) + 1;
        }
    });
    const timelineChartData = Object.entries(timelineData)
        .map(([date, count]) => ({
            date,
            Submissions: count
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // 3. Bar: Assignments by Subject
    const subjectCountMap = {};
    assignments.forEach(assignment => {
        const subject = assignment.subjectCode;
        subjectCountMap[subject] = (subjectCountMap[subject] || 0) + 1;
    });
    const subjectChartData = Object.entries(subjectCountMap).map(([subject, count]) => ({
        subject,
        Assignments: count
    }));

    // 4. Bar: Grade Distribution
    const gradeDistribution = {};
    assignments.forEach(assignment => {
        if (assignment.grade) {
            gradeDistribution[assignment.grade] = (gradeDistribution[assignment.grade] || 0) + 1;
        }
    });
    const gradeChartData = Object.entries(gradeDistribution)
        .map(([grade, count]) => ({
            grade,
            Count: count
        }))
        .sort((a, b) => {
            const gradeOrder = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "F"];
            return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
        });

    // 5. Upcoming Deadlines
    const now = new Date();
    const upcomingDeadlines = assignments
        .filter(assignment => assignment.status === "pending")
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .map(assignment => ({
            title: assignment.title,
            dueDate: assignment.dueDate,
            daysLeft: Math.ceil((new Date(assignment.dueDate) - now) / (1000 * 60 * 60 * 24))
        }));

    return (
        <>
            <h2 className="px-6 font-bold text-2xl">Your Assignment Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
                {/* Overall Status Pie Chart */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-lg font-bold mb-4">Assignment Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={overallStatusData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {overallStatusData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Submissions Over Time */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-lg font-bold mb-4">Your Submission Timeline</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={timelineChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Submissions" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Assignments by Subject */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-lg font-bold mb-4">Assignments per Subject</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={subjectChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Assignments" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Grade Distribution */}
                <div className="bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-lg font-bold mb-4">Your Grade Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={gradeChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="grade" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Count">
                                {gradeChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={GRADE_COLORS[entry.grade] || "#8884d8"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default StudentAssignmentCharts;
