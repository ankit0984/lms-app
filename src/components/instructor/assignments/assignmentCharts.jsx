// components/AssignmentCharts.tsx
"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell,
    LineChart, Line,
    ResponsiveContainer
} from 'recharts';

const assignmentdata = [
    {
        branch: "CSE",
        section: "A",
        semester: 4,
        total_assignment: 5,
        submitted_assignment: 4,
        due_assignment: 1,
        assignments: [
            {
                title: "Database Design",
                subjectCode: "CS401",
                description: "Design an ER diagram for a university database.",
                dueDate: "2025-06-05",
                submissionDate: "2025-06-04",
                rollNo: "2021050",
                status: "submitted"
            },
            {
                title: "Computer Networks Assignment",
                subjectCode: "CS402",
                description: "Explain TCP/IP model with real-world examples.",
                dueDate: "2025-06-08",
                submissionDate: "2025-06-07",
                rollNo: "2021052",
                status: "submitted"
            },
            {
                title: "Operating Systems Project",
                subjectCode: "CS403",
                description: "Simulate CPU scheduling algorithms in C++.",
                dueDate: "2025-06-12",
                submissionDate: "2025-06-11",
                rollNo: "2021053",
                status: "submitted"
            },
            {
                title: "Software Engineering",
                subjectCode: "CS404",
                description: "Prepare a software requirements specification document.",
                dueDate: "2025-06-15",
                submissionDate: "2025-06-14",
                rollNo: "2021054",
                status: "submitted"
            },
            {
                title: "Java Lab Assignment",
                subjectCode: "CS405",
                description: "Build a small Java GUI application using Swing.",
                dueDate: "2025-06-20",
                submissionDate: null,
                rollNo: "2021054",
                status: "pending"
            }
        ]
    },
    {
        branch: "CSDS",
        section: "B",
        semester: 6,
        total_assignment: 5,
        submitted_assignment: 5,
        due_assignment: 0,
        assignments: [
            {
                title: "Machine Learning Assignment 1",
                subjectCode: "DS601",
                description: "Implement linear regression using Python and sklearn.",
                dueDate: "2025-06-10",
                submissionDate: "2025-06-09",
                rollNo: "2021098",
                status: "submitted"
            },
            {
                title: "Data Visualization Project",
                subjectCode: "DS602",
                description: "Create an interactive dashboard using Plotly.",
                dueDate: "2025-06-12",
                submissionDate: "2025-06-11",
                rollNo: "2021098",
                status: "submitted"
            },
            {
                title: "Deep Learning Basics",
                subjectCode: "DS603",
                description: "Explain CNN architectures with examples.",
                dueDate: "2025-06-14",
                submissionDate: "2025-06-13",
                rollNo: "2021100",
                status: "submitted"
            },
            {
                title: "Big Data Analytics",
                subjectCode: "DS604",
                description: "Use Apache Spark to process a dataset.",
                dueDate: "2025-06-16",
                submissionDate: "2025-06-15",
                rollNo: "2021101",
                status: "submitted"
            },
            {
                title: "NLP Task",
                subjectCode: "DS605",
                description: "Perform sentiment analysis on Twitter data.",
                dueDate: "2025-06-18",
                submissionDate: "2025-06-17",
                rollNo: "2021099",
                status: "submitted"
            }
        ]
    },
    {
        branch: "CSE",
        section: "C",
        semester: 2,
        total_assignment: 4,
        submitted_assignment: 3,
        due_assignment: 1,
        assignments: [
            {
                title: "Introduction to Programming",
                subjectCode: "CS201",
                description: "Write a program to manage a student record system in C.",
                dueDate: "2025-06-04",
                submissionDate: "2025-06-03",
                rollNo: "2021103",
                status: "submitted"
            },
            {
                title: "Mathematics Assignment",
                subjectCode: "MA201",
                description: "Solve problems on probability and statistics.",
                dueDate: "2025-06-02",
                submissionDate: "2025-06-01",
                rollNo: "20210982",
                status: "submitted"
            },
            {
                title: "Digital Logic Design",
                subjectCode: "EC201",
                description: "Design combinational circuits using K-maps.",
                dueDate: "2025-06-06",
                submissionDate: "2025-06-05",
                rollNo: "2021104",
                status: "submitted"
            },
            {
                title: "Environmental Science",
                subjectCode: "EVS201",
                description: "Write a report on sustainable energy practices.",
                dueDate: "2025-06-09",
                submissionDate: null,
                rollNo: null,
                status: "pending"
            }
        ]
    }
];

const COLORS = ["#00C49F", "#FF8042"];

const AssignmentCharts = () => {
    // 1. Bar: Submitted vs Due per section
    const submissionStats = assignmentdata.map((group) => ({
        name: `${group.branch}-${group.section}`,
        Submitted: group.submitted_assignment,
        Due: group.due_assignment,
    }));

    // 2. Pie: Overall Status
    let submitted = 0, pending = 0;
    assignmentdata.forEach(group => {
        group.assignments.forEach(assignment => {
            if (assignment.status === "submitted") submitted++;
            if (assignment.status === "pending") pending++;
        });
    });
    const overallStatusData = [
        { name: "Submitted", value: submitted },
        { name: "Pending", value: pending }
    ];

    // 3. Line: Submissions Over Time
    const timelineData = {};
    assignmentdata.forEach(group => {
        group.assignments.forEach(assignment => {
            if (assignment.submissionDate) {
                timelineData[assignment.submissionDate] = (timelineData[assignment.submissionDate] || 0) + 1;
            }
        });
    });
    const timelineChartData = Object.entries(timelineData).map(([date, count]) => ({
        date,
        Submissions: count
    }));

    // 4. Bar: Assignments by Subject
    const subjectCountMap = {};
    assignmentdata.forEach(group => {
        group.assignments.forEach(assignment => {
            const subject = assignment.subjectCode;
            subjectCountMap[subject] = (subjectCountMap[subject] || 0) + 1;
        });
    });
    const subjectChartData = Object.entries(subjectCountMap).map(([subject, count]) => ({
        subject,
        Assignments: count
    }));

    return (
        <>
            <h2 className=" px-6 font-bold text-2xl">overall overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
            {/* Submitted vs Due */}
            <div className="bg-white rounded-xl shadow-md p-4">
                <h2 className="text-lg font-bold mb-4">Submitted vs Due Assignments</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={submissionStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Submitted" fill="#00C49F" />
                        <Bar dataKey="Due" fill="#FF8042" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-md p-4">
                <h2 className="text-lg font-bold mb-4">Overall Assignment Status</h2>
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

            {/* Line Chart */}
            <div className="bg-white rounded-xl shadow-md p-4">
                <h2 className="text-lg font-bold mb-4">Submissions Over Time</h2>
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
        </div>
            </>
    );
};

export default AssignmentCharts;

