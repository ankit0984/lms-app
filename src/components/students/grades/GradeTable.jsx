import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const semesterAssignments = [
    {
        semester: "Sem 1",
        assignments: [
            {
                id: 1,
                assignment: "Binary Search Trees",
                subject: "Data Structures",
                status: "Submitted",
                submissionDate: "2025-05-20",
                marks: "27/30",
            },
            {
                id: 2,
                assignment: "Sorting Algorithms",
                subject: "Data Structures",
                status: "Submitted",
                submissionDate: "2025-05-15",
                marks: "26/30",
            },
            {
                id: 3,
                assignment: "Database Normalization",
                subject: "Database Management",
                status: "Submitted",
                submissionDate: "2025-05-18",
                marks: "25/30",
            },
            {
                id: 4,
                assignment: "ER Diagrams",
                subject: "Database Management",
                status: "Pending",
                submissionDate: "2025-05-22",
                marks: null,
            },
            {
                id: 5,
                assignment: "Stacks and Queues",
                subject: "Data Structures",
                status: "Late",
                submissionDate: "2025-05-19",
                marks: "19/30",
            },
        ],
    },
    {
        semester: "Sem 2",
        assignments: [
            {
                id: 6,
                assignment: "React Component Lifecycle",
                subject: "Web Development",
                status: "Pending",
                submissionDate: "2025-05-25",
                marks: null,
            },
            {
                id: 7,
                assignment: "JavaScript ES6 Features",
                subject: "Web Development",
                status: "Submitted",
                submissionDate: "2025-05-18",
                marks: "28/30",
            },
            {
                id: 8,
                assignment: "REST API Design",
                subject: "Web Development",
                status: "Submitted",
                submissionDate: "2025-05-20",
                marks: "26/30",
            },
            {
                id: 9,
                assignment: "Operating System Scheduling",
                subject: "Operating Systems",
                status: "Late",
                submissionDate: "2025-05-21",
                marks: "20/30",
            },
            {
                id: 10,
                assignment: "Memory Management",
                subject: "Operating Systems",
                status: "Submitted",
                submissionDate: "2025-05-23",
                marks: "24/30",
            },
        ],
    },
    {
        semester: "Sem 3",
        assignments: [
            {
                id: 11,
                assignment: "Machine Learning Basics",
                subject: "Artificial Intelligence",
                status: "Submitted",
                submissionDate: "2025-05-19",
                marks: "29/30",
            },
            {
                id: 12,
                assignment: "Supervised vs Unsupervised Learning",
                subject: "Artificial Intelligence",
                status: "Submitted",
                submissionDate: "2025-05-17",
                marks: "27/30",
            },
            {
                id: 13,
                assignment: "Python for ML",
                subject: "Artificial Intelligence",
                status: "Pending",
                submissionDate: "2025-05-27",
                marks: null,
            },
            {
                id: 14,
                assignment: "Cloud Fundamentals",
                subject: "Cloud Computing",
                status: "Submitted",
                submissionDate: "2025-05-16",
                marks: "25/30",
            },
            {
                id: 15,
                assignment: "AWS EC2 Setup",
                subject: "Cloud Computing",
                status: "Late",
                submissionDate: "2025-05-24",
                marks: "22/30",
            },
        ],
    },
];


export const GradeTable = ({ selectedSemester }) => {
    const selectedData = semesterAssignments.find(
        (s) => s.semester === selectedSemester
    )?.assignments || []

    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Assignment</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Subject Code</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Submission Date</TableHead>
                            <TableHead>Marks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedData.map((a) => (
                            <TableRow key={a.id}>
                                <TableCell>{a.id}</TableCell>
                                <TableCell>{a.assignment}</TableCell>
                                <TableCell>{a.subject}</TableCell>
                                <TableCell>{a.status}</TableCell>
                                <TableCell>{a.submissionDate}</TableCell>
                                <TableCell>{a.marks || "Not graded"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}