'use client'
import {useState, useMemo} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {BookCheck, ClipboardList, FileClock} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import AssignmentCharts from "@/components/instructor/assignments/assignmentCharts";

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


export const AssignmentDashboard = () => {
    const [selectedBranch, setSelectedBranch] = useState("CSE")
    const [selectedSection, setSelectedSection] = useState("A")
    const [selectedSemester, setSelectedSemester] = useState("")

    const uniqueBranches = [...new Set(assignmentdata.map((d) => d.branch))]
    const uniqueSections = [...new Set(assignmentdata.map((d) => d.section))]
    const uniqueSemesters = [...new Set(assignmentdata.map((d) => d.semester.toString()))]

    const filteredData = useMemo(() => {
        return assignmentdata.filter((entry) => {
            return (
                (!selectedBranch || entry.branch === selectedBranch) &&
                (!selectedSection || entry.section === selectedSection) &&
                (!selectedSemester || entry.semester.toString() === selectedSemester)
            )
        })
    }, [selectedBranch, selectedSection, selectedSemester])

    const totalAssignments = filteredData.reduce((acc, d) => acc + d.total_assignment, 0)
    const totalSubmitted = filteredData.reduce((acc, d) => acc + d.submitted_assignment, 0)
    const totalPending = filteredData.reduce((acc, d) => acc + d.due_assignment, 0)
    return (
        <div className="flex flex-col space-y-6">
            {/* Heading */}
            <div className='flex flex-row justify-between'>
                <h2 className="text-2xl font-bold">Assignment Dashboard</h2>
                <div className="flex gap-2">
                    {/* Branch */}
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Branch" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Branch</SelectLabel>
                                {uniqueBranches.map((branch) => (
                                    <SelectItem key={branch} value={branch}>
                                        {branch}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Section */}
                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Section</SelectLabel>
                                {uniqueSections.map((section) => (
                                    <SelectItem key={section} value={section}>
                                        {section}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Semester */}
                    <Select onValueChange={setSelectedSemester}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Semester</SelectLabel>
                                {uniqueSemesters.map((sem) => (
                                    <SelectItem key={sem} value={sem}>
                                        {sem}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* Stats Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Assignments */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Assignments
                        </CardTitle>
                        <ClipboardList className="w-5 h-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAssignments}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">Total assignments created by you</CardFooter>
                </Card>

                {/* Submitted */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Submitted
                        </CardTitle>
                        <BookCheck className="w-5 h-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSubmitted}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">Total submitted assignments.</CardFooter>
                </Card>

                {/* Pending */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending
                        </CardTitle>
                        <FileClock className="w-5 h-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalPending}</div>
                    </CardContent>
                    <CardFooter className="text-sm font-medium text-muted-foreground">Total pending assignments</CardFooter>
                </Card>
            </div>
<AssignmentCharts/>
            <Card>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Subject Code</TableHead>
                                <TableHead>Assignment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Roll No.</TableHead>
                                <TableHead>Issue Date</TableHead>
                                <TableHead>Submission Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.flatMap((d) => d.assignments).map((assignment, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{assignment.subjectCode}</TableCell>
                                    <TableCell>{assignment.title}</TableCell>
                                    <TableCell className={`capitalize font-medium ${assignment.status === 'submitted' ? 'text-green-600' : 'text-yellow-600'}`}>
                                        {assignment.status}
                                    </TableCell>
                                    <TableCell>{assignment.rollNo ?? '__'}</TableCell>
                                    <TableCell>{assignment.dueDate}</TableCell>
                                    <TableCell>{assignment.submissionDate ?? '__'}</TableCell>
                                </TableRow>
                            ))}
                            {filteredData.flatMap((d) => d.assignments).length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground py-4">
                                        No assignments found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    )
}
