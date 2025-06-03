'use client'
import {BookMarked, Download, Eye, Target, TrendingUp, User,} from "lucide-react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";

const ResourceData = [
    {
        "course": "B.tech",
        "branch":"CSE AIML",
        "semester": 3,
        "subjects":[
            {
                "title":"Data Structures",
                "type": "view",
                "Subject_code":"ACSE0301",
                "Teacher":"Dr. Sudesh verma",
            },
            {
                "title":"Statistics and probability",
                "type":"view",
                "Subject_code":"AAS0303",
                "Teacher":"Dr. Manik singh",
            },
            {
                "title":"Introduction to Artificial Intelligence",
                "type":"view",
                "Subject_code":"ACSAI0301",
                "Teacher":"Ms. Pranjali Singh",
            },
            {
                "title":"Object Oriented Techniques using Java",
                "type":"view",
                "Subject_code":"ACSE0302",
                "Teacher":"Ms. Yashika Vasisth",
            },
            {
                "title":"Logic Design and Computer Architecture",
                "type":"view",
                "Subject_code":"ACSE0302",
                "Teacher":"Ms. Swarnima",
            },
            {
                "title":"Discrete Structures",
                "type":"view",
                "Subject_code":"ACSE0306",
                "Teacher":"Ms. Anamika Tiwari",
            },
            {
                "title":"Environmental Science",
                "type":"view",
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
                "type":"view",
                "Subject_code":"AAS0404",
                "Teacher":"Dr. Robert",
            },
            {
                "title":"Technical Communication",
                "type":"view",
                "Subject_code":"AASL0401",
                "Teacher":"Ms. Pranjali singh",
            },
            {
                "title":"Operating Systems",
                "type":"view",
                "Subject_code":"ACSE0403A",
                "Teacher":"Ms. Anamika Tiwari",
            },
            {
                "title":"Database Management Systems",
                "type":"view",
                "Subject_code":"ACSAI0402",
                "Teacher":"Ms. Shewata",
            },
            {
                "title":"Machine Learning",
                "type":"view",
                "Subject_code":"ACSML0401N",
                "Teacher":"Mrs. Alisha sikri",
            },
            {
                "title":"Theory of Automata and Formal Languages",
                "type":"view",
                "Subject_code":"ACSE0404",
                "Teacher":"Mrs. Neelam",
            },
            {
                "title":"Cyber Security",
                "type":"view",
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
                "type":"view",
                "Subject_code":"ACSE0501",
                "Teacher":"Mrs. Neelam",
            },
            {
                "title":"Computer Networks",
                "type":"view",
                "Subject_code":"ACSE0502",
                "Teacher":"Dr. Prasanna Kumar Singh",
            },
            {
                "title":"Design Thinking-II",
                "type":"view",
                "Subject_code":"ACSE0503",
                "Teacher":"Dr. Harsh Awasthi",
            },
            {
                "title":"Web Technology",
                "type":"view",
                "Subject_code":"ACSE0505",
                "Teacher":"Ms. Oshin Misra",
            },
            {
                "title":"Data Analytics",
                "type":"view",
                "Subject_code":"ACSAI0512",
                "Teacher":"Ms. Meghali Das",
            },
            {
                "title":"Business Intelligence and Data Visualization",
                "type":"view",
                "Subject_code":"ACSAI0519",
                "Teacher":"Ms. Vatika",
            },
            {
                "title":"Constitution of India, Law and Engineering",
                "type":"view",
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
                "type":"view",
                "Subject_code":"ACSML0602",
                "Teacher":"Mr. Subhash Chandra",
            },
            {
                "title":"Advanced Database Management Systems",
                "type":"view",
                "Subject_code":"ACSML0603",
                "Teacher":"Ms. Shewata",
            },
            {
                "title":"Software Engineering",
                "type":"view",
                "Subject_code":"ACSE0603",
                "Teacher":"Ms. Pranjali Singh",
            },
            {
                "title":"Programming for Data Analytics",
                "type":"view",
                "Subject_code":"ACSAI0617",
                "Teacher":"Ms. Meghali Das",
            },
            {
                "title":"Social Media Analytics",
                "type":"view",
                "Subject_code":"ACSAI0622N",
                "Teacher":"Ms. Arushi Thusu",
            },
            {
                "title":"Essence of Indian Traditional Knowledge",
                "type":"view",
                "Subject_code":"ANC0602",
                "Teacher":"Ms. Oshin Misra",
            },
            {
                "title":"Digital Marketing",
                "type":"view",
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
                "type":"view",
                "Subject_code":"ACSE0701",
                "Teacher":"Mr. Subhash Chandra",
            },
            {
                "title":"Natural Language Processing",
                "type":"view",
                "Subject_code":"ACSAI0712",
                "Teacher":"Mrs. Arushi Thusu",
            },
            {
                "title":"Project Management",
                "type":"view",
                "Subject_code":"AOE0761",
                "Teacher":"Mrs. Neelam",
            },
            {
                "title":"Entrepreneurship Development and IPR",
                "type":"view",
                "Subject_code":"AOE0771",
                "Teacher":"Mrs. Poornima",
            },
        ]
    }
]


export const AcademicResources = () => {
    const semesters = ResourceData.map((c) => c.semester);
    const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
    const currentData = ResourceData.find((data) => data.semester === selectedSemester);
    const filteredData = currentData?.subjects


    return (
        <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-4">
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
                                <p className="text-2xl font-bold text-blue-600">750+</p>
                            </div>
                            <BookMarked className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Subjects</p>
                                <p className="text-2xl font-bold text-green-600">7</p>
                            </div>
                            <Target className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total PPT</p>
                                <p className="text-2xl font-bold text-purple-600">15</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-purple-500" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">e-books & Pdf</p>
                                <p className="text-2xl font-bold text-orange-600">2.5k</p>
                            </div>
                            <BookMarked className="h-8 w-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* resources table */}
            <Card>
                <CardHeader className="flex flex-col md:flex-row justify-between items-start gap-2">
                    <div>
                        <h2 className="text-xl font-semibold">Course</h2>
                        <p className="text-sm text-muted-foreground">
                            {currentData?.course} - {currentData?.branch} (Semester {currentData?.semester})
                        </p>
                    </div>
                    <div className="flex gap-2.5 w-full md:w-64">
                        <Select
                            value={selectedSemester.toString()}
                            onValueChange={(value) => setSelectedSemester(Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {ResourceData.map((course) => (
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
                                <TableHead>View</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData?.map((subject, index) => (
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
                                        {/* download url */}
                                        <Link href={`/student/learning/materials/${subject.title}`}>
                                            {subject.type}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </>
    )
}
