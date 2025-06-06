'use client'
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Filter, User} from "lucide-react";
import {Badge} from "@/components/ui/badge";

const CourseData = [
    {
        "course": "B.tech",
        "branch":"CSE AIML",
        "semester": 3,
        "subjects":[
            {
            "title":"Data Structures",
                "type":"Theory",
            "Subject_code":"ACSE0301",
            "Teacher":"Dr. Sudesh verma",
            },
            {
                "title":"Statistics and probability",
                "type":"Theory",
                "Subject_code":"AAS0303",
                "Teacher":"Dr. Manik singh",
            },
            {
                "title":"Introduction to Artificial Intelligence",
                "type":"Theory",
                "Subject_code":"ACSAI0301",
                "Teacher":"Ms. Pranjali Singh",
            },
            {
                "title":"Object Oriented Techniques using Java",
                "type":"Theory",
                "Subject_code":"ACSE0302",
                "Teacher":"Ms. Yashika Vasisth",
            },
            {
                "title":"Logic Design and Computer Architecture",
                "type":"Theory",
                "Subject_code":"ACSE0302",
                "Teacher":"Ms. Swarnima",
            },
            {
                "title":"Discrete Structures",
                "type":"Theory",
                "Subject_code":"ACSE0306",
                "Teacher":"Ms. Anamika Tiwari",
            },
            {
                "title":"Introduction to Artificial Intelligence Lab",
                "type":"Practical",
                "Subject_code":"ACAI0351",
                "Teacher":"Mrs. Ekta Singh",
            },
            {
                "title":"Object Oriented Techniques using Java Lab",
                "type":"Practical",
                "Subject_code":"ACAI0351",
                "Teacher":"Ms. Yashika Vasisth",
            },
            {
                "title":"Data Structures Lab",
                "type":"Practical",
                "Subject_code":"ACSE0351",
                "Teacher":"Ms. Pranjali Singh",
            },
            {
                "title":"Environmental Science",
                "type":"Theory",
                "Subject_code":"ANC0302",
                "Teacher":"Ms. Pranjali Singh",
            }
        ]
    },
    {
        "course": "B.tech",
        "branch":"CSE AIML",
        "semester": 4,
        "subjects":[
            {
            "title":"Optimization and Numerical Techniques",
                "type":"Theory",
            "Subject_code":"AAS0404",
            "Teacher":"Dr. Robert",
            },
            {
                "title":"Technical Communication",
                "type":"Theory",
                "Subject_code":"AASL0401",
                "Teacher":"Ms. Pranjali singh",
            },
            {
                "title":"Operating Systems",
                "type":"Theory",
                "Subject_code":"ACSE0403A",
                "Teacher":"Ms. Anamika Tiwari",
            },
            {
                "title":"Database Management Systems",
                "type":"Theory",
                "Subject_code":"ACSAI0402",
                "Teacher":"Ms. Shewata",
            },
            {
                "title":"Machine Learning",
                "type":"Theory",
                "Subject_code":"ACSML0401N",
                "Teacher":"Mrs. Alisha sikri",
            },
            {
                "title":"Theory of Automata and Formal Languages",
                "type":"Theory",
                "Subject_code":"ACSE0404",
                "Teacher":"Mrs. Neelam",
            },
            {
                "title":"Operating Systems Lab",
                "type":"Practical",
                "Subject_code":"ACSE0453A",
                "Teacher":"Ms. pranjali Singh",
            },
            {
                "title":"Database Management Systems Lab",
                "type":"Practical",
                "Subject_code":"ACSAI0452",
                "Teacher":"Ms. Yashika Vasisth",
            },
            {
                "title":"Machine Learning Lab",
                "type":"Practical",
                "Subject_code":"ACSML0451N",
                "Teacher":"Ms. Pranjali Singh",
            },
            {
                "title":"Mini Project using Open Technology",
                "type":"Practical",
                "Subject_code":"ACSE0459",
                "Teacher":"Ms. Oshin Misra",
            },
            {
                "title":"Cyber Security",
                "type":"Theory",
                "Subject_code":"ANC0401",
                "Teacher":"Ms. Anuradha",
            }
        ]
    },
    {
        "course": "B.tech",
        "branch":"CSE AIML",
        "semester": 5,
        "subjects":[
            {
            "title":"Design and Analysis of Algorithms",
                "type":"Theory",
            "Subject_code":"ACSE0501",
            "Teacher":"Mrs. Neelam",
            },
            {
                "title":"Computer Networks",
                "type":"Theory",
                "Subject_code":"ACSE0502",
                "Teacher":"Dr. Prasanna Kumar Singh",
            },
            {
                "title":"Design Thinking-II",
                "type":"Theory",
                "Subject_code":"ACSE0503",
                "Teacher":"Dr. Harsh Awasthi",
            },
            {
                "title":"Web Technology",
                "type":"Theory",
                "Subject_code":"ACSE0505",
                "Teacher":"Ms. Oshin Misra",
            },
            {
                "title":"Data Analytics",
                "type":"Theory",
                "Subject_code":"ACSAI0512",
                "Teacher":"Ms. Meghali Das",
            },
            {
                "title":"Business Intelligence and Data Visualization",
                "type":"Theory",
                "Subject_code":"ACSAI0519",
                "Teacher":"Ms. Vatika",
            },
            {
                "title":"Design and Analysis of Algorithms Lab",
                "type":"Practical",
                "Subject_code":"ACSE0551",
                "Teacher":"Mrs. Neelam",
            },
            {
                "title":"Computer Networks Lab",
                "type":"Practical",
                "Subject_code":"ACSE0552",
                "Teacher":"Dr. Prasanna Kumar Singh",
            },
            {
                "title":"Web Technology Lab",
                "type":"Practical",
                "Subject_code":"ACSE0555",
                "Teacher":"Ms. Oshin Misra",
            },
            {
                "title":"Internship Assessment–II",
                "type":"Practical",
                "Subject_code":"ACSE0459",
                "Teacher":"Mr. Subhash Chandra",
            },
            {
                "title":"Constitution of India, Law and Engineering",
                "type":"Theory",
                "Subject_code":"ANC0501",
                "Teacher":"Ms. Pranjali Singh",
            }
        ]
    },
    {
        "course": "B.tech",
        "branch":"CSE AIML",
        "semester": 6,
        "subjects":[
            {
                "title":"Deep Learning",
                "type":"Theory",
                "Subject_code":"ACSML0602",
                "Teacher":"Mr. Subhash Chandra",
            },
            {
                "title":"Advanced Database Management Systems",
                "type":"Theory",
                "Subject_code":"ACSML0603",
                "Teacher":"Ms. Shewata",
            },
            {
                "title":"Software Engineering",
                "type":"Theory",
                "Subject_code":"ACSE0603",
                "Teacher":"Ms. Pranjali Singh",
            },
            {
                "title":"Programming for Data Analytics",
                "type":"Theory",
                "Subject_code":"ACSAI0617",
                "Teacher":"Ms. Meghali Das",
            },
            {
                "title":"Social Media Analytics",
                "type":"Theory",
                "Subject_code":"ACSAI0622N",
                "Teacher":"Ms. Arushi Thusu",
            },
            {
                "title":"Deep Learning Lab",
                "type":"Practical",
                "Subject_code":"ACSML0652",
                "Teacher":"Mr. Subhash Chandra",
            },
            {
                "title":"Advanced Database Management Systems Lab",
                "type":"Practical",
                "Subject_code":"ACSML0653",
                "Teacher":"Ms. Shewata",
            },
            {
                "title":"Software Engineering Lab",
                "type":"Practical",
                "Subject_code":"ACSE0653",
                "Teacher":"Ms. Yashika Vasisth",
            },
            {
                "title":"Mini Project",
                "type":"Practical",
                "Subject_code":"ACSE0659",
                "Teacher":"Ms. Pranjali Singh",
            },
            {
                "title":"Essence of Indian Traditional Knowledge",
                "type":"Theory",
                "Subject_code":"ANC0602",
                "Teacher":"Ms. Oshin Misra",
            },
            {
                "title":"Digital Marketing",
                "type":"Theory",
                "Subject_code":"AOE0667",
                "Teacher":"Ms. Deepika",
            }
        ]
    },
    {
        "course": "B.tech",
        "branch":"CSE AIML",
        "semester": 7,
        "subjects":[
            {
                "title":"Computer Vision",
                "type":"Theory",
                "Subject_code":"ACSE0701",
                "Teacher":"Mr. Subhash Chandra",
            },
            {
                "title":"Natural Language Processing",
                "type":"Theory",
                "Subject_code":"ACSAI0712",
                "Teacher":"Mrs. Arushi Thusu",
            },
            {
                "title":"Project Management",
                "type":"Theory",
                "Subject_code":"AOE0761",
                "Teacher":"Mrs. Neelam",
            },
            {
                "title":"Entrepreneurship Development and IPR",
                "type":"Theory",
                "Subject_code":"AOE0771",
                "Teacher":"Mrs. Poornima",
            },
            {
                "title":"Computer Vision Lab",
                "type":"Practical",
                "Subject_code":"ACSE0751",
                "Teacher":"Mr. Subhash Chandra",
            },
            {
                "title":"Internship Assessment-III",
                "type":"Practical",
                "Subject_code":"ACSE0759",
                "Teacher":"Mr. Subhash Chandra",
            }
        ]
    }
]

export const Courses = () => {
    const semesters = CourseData.map((c) => c.semester);
    const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
    const [typeFilter, setTypeFilter] = useState("All");

    const currentData = CourseData.find((data) => data.semester === selectedSemester);
    const filteredSubjects = currentData?.subjects.filter(subject =>
        typeFilter === "All" || subject.type === typeFilter
    );

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold">Course Details</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    This course includes subjects tailored to the {currentData?.branch} curriculum, covering key areas to enhance academic understanding and practical skills.
                </p>
            </div>

            <Card>
                <CardHeader className="flex flex-col md:flex-row justify-between items-start gap-2">
                    <div>
                        <h2 className="text-xl font-semibold">Course</h2>
                        <p className="text-sm text-muted-foreground">
                            {currentData?.course} - {currentData?.branch} (Semester {currentData?.semester})
                        </p>
                    </div>
                    <div className="flex gap-2.5 w-full md:w-64">
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Types</SelectItem>
                                <SelectItem value="Theory">Theory</SelectItem>
                                <SelectItem value="Practical">Practical</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={selectedSemester.toString()}
                            onValueChange={(value) => setSelectedSemester(Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {CourseData.map((course) => (
                                    <SelectItem key={course.semester} value={course.semester.toString()}>
                                        Semester {course.semester}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Subjects</TableHead>
                                <TableHead>Subject Code</TableHead>
                                <TableHead>Faculty</TableHead>
                                <TableHead>Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSubjects?.map((subject, index) => (
                                <TableRow key={subject.Subject_code + index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{subject.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary"
                                               className="bg-blue-500 text-white dark:bg-blue-600">{subject.Subject_code}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">{subject.Teacher}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary"
                                        className={`font-semibold ${subject.type === "Theory"?"bg-green-100 text-green-800": "bg-blue-500 text-white dark:bg-blue-600"}`}
                                        >
                                            {subject.type}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}


