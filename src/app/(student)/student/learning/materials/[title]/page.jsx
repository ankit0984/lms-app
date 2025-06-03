// 'use client';

// import { useParams } from 'next/navigation';
// import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
// import { Separator } from '@/components/ui/separator';
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import Link from 'next/link';
// import {Alert, AlertDescription} from "@/components/ui/alert";
// import {Button} from "react-day-picker";
// import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
// import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
// import {Avatar, AvatarFallback} from "@/components/ui/avatar";
// import {Badge} from "@/components/ui/badge";
// import {ArrowLeft, BookOpen, ExternalLink, Hash, User} from "lucide-react";
//
// const SubjectData = [
//     {
//         "course": "B.tech",
//         "branch": "CSE AIML",
//         "semester": 3,
//         "subjects": [
//             {
//                 "title": "Data Structures",
//                 "Subject_code": "ACSE0301",
//                 "Teacher": "Dr. Sudesh Verma",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction", "url":"http://localhost" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction", "url":"http://localhost" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction", "url":"http://localhost" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction", "url":"http://localhost" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction", "url":"http://localhost" }
//                 ]
//             },
//             {
//                 "title": "Statistics and Probability",
//                 "Subject_code": "AAS0303",
//                 "Teacher": "Dr. Manik Singh",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title": "Introduction to Artificial Intelligence",
//                 "Subject_code": "ACSAI0301",
//                 "Teacher": "Ms. Pranjali Singh",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title": "Object Oriented Techniques using Java",
//                 "Subject_code": "ACSE0302",
//                 "Teacher": "Ms. Yashika Vasisth",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title": "Logic Design and Computer Architecture",
//                 "Subject_code": "ACSE0302",
//                 "Teacher": "Ms. Swarnima",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title": "Discrete Structures",
//                 "Subject_code": "ACSE0306",
//                 "Teacher": "Ms. Anamika Tiwari",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title": "Environmental Science",
//                 "Subject_code": "ANC0302",
//                 "Teacher": "Ms. Pranjali Singh",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             }
//         ]
//     },
//     {
//         "course": "B.tech",
//         "branch":"CSE AIML",
//         "semester": 4,
//         "subjects":[
//             {
//                 "title":"Optimization and Numerical Techniques",
//                 "type":"view",
//                 "Subject_code":"AAS0404",
//                 "Teacher":"Dr. Robert",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Technical Communication",
//                 "type":"view",
//                 "Subject_code":"AASL0401",
//                 "Teacher":"Ms. Pranjali singh",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Operating Systems",
//                 "type":"view",
//                 "Subject_code":"ACSE0403A",
//                 "Teacher":"Ms. Anamika Tiwari",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Database Management Systems",
//                 "type":"view",
//                 "Subject_code":"ACSAI0402",
//                 "Teacher":"Ms. Shewata",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Machine Learning",
//                 "type":"view",
//                 "Subject_code":"ACSML0401N",
//                 "Teacher":"Mrs. Alisha sikri",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Theory of Automata and Formal Languages",
//                 "type":"view",
//                 "Subject_code":"ACSE0404",
//                 "Teacher":"Mrs. Neelam",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Cyber Security",
//                 "type":"view",
//                 "Subject_code":"ANC0401",
//                 "Teacher":"Ms. Anuradha",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             }
//         ]
//     },
//     {
//         "course": "B.tech",
//         "branch":"CSE AIML",
//         "semester": 5,
//         "subjects":[
//             {
//                 "title":"Design and Analysis of Algorithms",
//                 "type":"view",
//                 "Subject_code":"ACSE0501",
//                 "Teacher":"Mrs. Neelam",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Computer Networks",
//                 "type":"view",
//                 "Subject_code":"ACSE0502",
//                 "Teacher":"Dr. Prasanna Kumar Singh",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Design Thinking-II",
//                 "type":"view",
//                 "Subject_code":"ACSE0503",
//                 "Teacher":"Dr. Harsh Awasthi",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Web Technology",
//                 "type":"view",
//                 "Subject_code":"ACSE0505",
//                 "Teacher":"Ms. Oshin Misra",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Data Analytics",
//                 "type":"view",
//                 "Subject_code":"ACSAI0512",
//                 "Teacher":"Ms. Meghali Das",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Business Intelligence and Data Visualization",
//                 "type":"view",
//                 "Subject_code":"ACSAI0519",
//                 "Teacher":"Ms. Vatika",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Constitution of India, Law and Engineering",
//                 "type":"view",
//                 "Subject_code":"ANC0501",
//                 "Teacher":"Ms. Pranjali Singh",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             }
//         ]
//     },
//     {
//         "course": "B.tech",
//         "branch":"CSE AIML",
//         "semester": 6,
//         "subjects":[
//             {
//                 "title":"Deep Learning",
//                 "type":"view",
//                 "Subject_code":"ACSML0602",
//                 "Teacher":"Mr. Subhash Chandra",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Advanced Database Management Systems",
//                 "type":"view",
//                 "Subject_code":"ACSML0603",
//                 "Teacher":"Ms. Shewata",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Software Engineering",
//                 "type":"view",
//                 "Subject_code":"ACSE0603",
//                 "Teacher":"Ms. Pranjali Singh",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Programming for Data Analytics",
//                 "type":"view",
//                 "Subject_code":"ACSAI0617",
//                 "Teacher":"Ms. Meghali Das",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Social Media Analytics",
//                 "type":"view",
//                 "Subject_code":"ACSAI0622N",
//                 "Teacher":"Ms. Arushi Thusu",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Essence of Indian Traditional Knowledge",
//                 "type":"view",
//                 "Subject_code":"ANC0602",
//                 "Teacher":"Ms. Oshin Misra",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Digital Marketing",
//                 "type":"view",
//                 "Subject_code":"AOE0667",
//                 "Teacher":"Ms. Deepika",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             }
//         ]
//     },
//     {
//         "course": "B.tech",
//         "branch":"CSE AIML",
//         "semester": 7,
//         "subjects":[
//             {
//                 "title":"Computer Vision",
//                 "type":"view",
//                 "Subject_code":"ACSE0701",
//                 "Teacher":"Mr. Subhash Chandra",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Natural Language Processing",
//                 "type":"view",
//                 "Subject_code":"ACSAI0712",
//                 "Teacher":"Mrs. Arushi Thusu",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Project Management",
//                 "type":"view",
//                 "Subject_code":"AOE0761",
//                 "Teacher":"Mrs. Neelam",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//             {
//                 "title":"Entrepreneurship Development and IPR",
//                 "type":"view",
//                 "Subject_code":"AOE0771",
//                 "Teacher":"Mrs. Poornima",
//                 "resources": [
//                     { "id": 1, "Chapter": "Chapter 1 Introduction" },
//                     { "id": 2, "Chapter": "Chapter 2 Introduction" },
//                     { "id": 3, "Chapter": "Chapter 3 Introduction" },
//                     { "id": 4, "Chapter": "Chapter 4 Introduction" },
//                     { "id": 5, "Chapter": "Chapter 5 Introduction" }
//                 ]
//             },
//         ]
//     }
// ];

// export default function Page() {
//     const params = useParams();
//     const rawTitle = params.title;
//     const title = Array.isArray(rawTitle) ? rawTitle[0] : rawTitle;
//     const decodedTitle = decodeURIComponent(title || '');
//
//     // Function to find subject across all semesters
//     const findSubject = (searchTitle) => {
//         for (const semesterData of SubjectData) {
//             for (const subject of semesterData.subjects) {
//                 if (subject.title.toLowerCase() === searchTitle.toLowerCase()) {
//                     return subject;
//                 }
//             }
//         }
//         return null;
//     };
//
//     const subject = findSubject(decodedTitle);
//
//     return (
//         <SidebarInset>
//             <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
//                 <div className="flex items-center gap-2 px-4">
//                     <SidebarTrigger className="-ml-1" />
//                     <Separator orientation="vertical" className="mr-2 h-4" />
//                     <Breadcrumb>
//                         <BreadcrumbList>
//                             <BreadcrumbItem>
//                                 <Link href="/student/learning/materials">Resources</Link>
//                             </BreadcrumbItem>
//                             <BreadcrumbSeparator />
//                             <BreadcrumbItem>
//                                 <BreadcrumbPage>{decodedTitle}</BreadcrumbPage>
//                             </BreadcrumbItem>
//                         </BreadcrumbList>
//                     </Breadcrumb>
//                 </div>
//             </header>
//
//             <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//                 {subject ? (
//                     <div className="space-y-6">
//                         <div>
//                             <h1 className="text-3xl font-bold tracking-tight">{subject.title}</h1>
//                             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <p className="text-sm text-muted-foreground">Subject Code</p>
//                                     <p className="font-medium">{subject.Subject_code}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-muted-foreground">Teacher</p>
//                                     <p className="font-medium">{subject.Teacher}</p>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div>
//                             <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>
//                             <div className="grid gap-3">
//                                 {subject.resources.map((resource) => (
//                                     <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
//                                         <div>
//                                             <h3 className="font-medium">{resource.Chapter}</h3>
//                                             <p className="text-sm text-muted-foreground">Chapter {resource.id}</p>
//                                         </div>
//                                         {resource.url ? (
//                                             <Link
//                                                 href={resource.url}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
//                                             >
//                                                 View Resource
//                                             </Link>
//                                         ) : (
//                                             <span className="px-4 py-2 bg-muted text-muted-foreground rounded-md">
//                                                 Coming Soon
//                                             </span>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
//                         <h2 className="text-2xl font-semibold mb-2">Subject Not Found</h2>
//                         <p className="text-muted-foreground mb-4">
//                             No data found for subject titled "{decodedTitle}"
//                         </p>
//                         <Link
//                             href="/student/learning/materials"
//                             className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
//                         >
//                             Back to Resources
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </SidebarInset>
//     );
// }

'use client';

import { useParams } from 'next/navigation';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    BookOpen,
    User,
    Hash,
    ExternalLink,
    Clock,
    ArrowLeft,
    FileText,
    Download,
    Play,
    Eye
} from 'lucide-react';
import Link from 'next/link';

const SubjectData = [
    {
        "course": "B.tech",
        "branch": "CSE AIML",
        "semester": 3,
        "subjects": [
            {
                "title": "Data Structures",
                "Subject_code": "ACSE0301",
                "Teacher": "Dr. Sudesh Verma",
                "description": "Fundamental concepts of data organization and algorithms for efficient data manipulation.",
                "credits": 4,
                "resources": [
                    { "id": 1, "Chapter": "Introduction to Data Structures", "url":"http://localhost", "type": "pdf" },
                    { "id": 2, "Chapter": "Arrays and Linked Lists", "url":"http://localhost", "type": "video" },
                    { "id": 3, "Chapter": "Stacks and Queues", "url":"http://localhost", "type": "pdf" },
                    { "id": 4, "Chapter": "Trees and Graphs", "url":"http://localhost", "type": "interactive" },
                    { "id": 5, "Chapter": "Sorting and Searching", "url":"http://localhost", "type": "pdf" }
                ]
            },
            {
                "title": "Statistics and Probability",
                "Subject_code": "AAS0303",
                "Teacher": "Dr. Manik Singh",
                "description": "Mathematical foundations of statistics and probability theory for data analysis.",
                "credits": 3,
                "resources": [
                    { "id": 1, "Chapter": "Descriptive Statistics", "type": "pdf" },
                    { "id": 2, "Chapter": "Probability Distributions", "type": "video" },
                    { "id": 3, "Chapter": "Hypothesis Testing", "type": "pdf" },
                    { "id": 4, "Chapter": "Regression Analysis", "type": "interactive" },
                    { "id": 5, "Chapter": "Statistical Inference", "type": "pdf" }
                ]
            },
            {
                "title": "Introduction to Artificial Intelligence",
                "Subject_code": "ACSAI0301",
                "Teacher": "Ms. Pranjali Singh",
                "description": "Foundational concepts of AI including search algorithms, knowledge representation, and machine learning basics.",
                "credits": 4,
                "resources": [
                    { "id": 1, "Chapter": "AI Fundamentals", "type": "pdf" },
                    { "id": 2, "Chapter": "Search Algorithms", "type": "video" },
                    { "id": 3, "Chapter": "Knowledge Representation", "type": "pdf" },
                    { "id": 4, "Chapter": "Expert Systems", "type": "interactive" },
                    { "id": 5, "Chapter": "Introduction to ML", "type": "pdf" }
                ]
            },
            {
                "title": "Object Oriented Techniques using Java",
                "Subject_code": "ACSE0302",
                "Teacher": "Ms. Yashika Vasisth",
                "description": "Object-oriented programming concepts and their implementation using Java programming language.",
                "credits": 4,
                "resources": [
                    { "id": 1, "Chapter": "Java Basics", "type": "pdf" },
                    { "id": 2, "Chapter": "Classes and Objects", "type": "video" },
                    { "id": 3, "Chapter": "Inheritance and Polymorphism", "type": "pdf" },
                    { "id": 4, "Chapter": "Exception Handling", "type": "interactive" },
                    { "id": 5, "Chapter": "Collections Framework", "type": "pdf" }
                ]
            },
            {
                "title": "Logic Design and Computer Architecture",
                "Subject_code": "ACSE0302",
                "Teacher": "Ms. Swarnima",
                "description": "Digital logic design principles and computer system architecture fundamentals.",
                "credits": 4,
                "resources": [
                    { "id": 1, "Chapter": "Boolean Algebra", "type": "pdf" },
                    { "id": 2, "Chapter": "Combinational Circuits", "type": "video" },
                    { "id": 3, "Chapter": "Sequential Circuits", "type": "pdf" },
                    { "id": 4, "Chapter": "CPU Architecture", "type": "interactive" },
                    { "id": 5, "Chapter": "Memory Systems", "type": "pdf" }
                ]
            },
            {
                "title": "Discrete Structures",
                "Subject_code": "ACSE0306",
                "Teacher": "Ms. Anamika Tiwari",
                "description": "Mathematical structures and concepts essential for computer science applications.",
                "credits": 3,
                "resources": [
                    { "id": 1, "Chapter": "Set Theory", "type": "pdf" },
                    { "id": 2, "Chapter": "Relations and Functions", "type": "video" },
                    { "id": 3, "Chapter": "Graph Theory", "type": "pdf" },
                    { "id": 4, "Chapter": "Combinatorics", "type": "interactive" },
                    { "id": 5, "Chapter": "Mathematical Logic", "type": "pdf" }
                ]
            },
            {
                "title": "Environmental Science",
                "Subject_code": "ANC0302",
                "Teacher": "Ms. Pranjali Singh",
                "description": "Understanding environmental systems and their interaction with human activities.",
                "credits": 2,
                "resources": [
                    { "id": 1, "Chapter": "Ecosystem Dynamics", "type": "pdf" },
                    { "id": 2, "Chapter": "Environmental Pollution", "type": "video" },
                    { "id": 3, "Chapter": "Natural Resources", "type": "pdf" },
                    { "id": 4, "Chapter": "Climate Change", "type": "interactive" },
                    { "id": 5, "Chapter": "Sustainable Development", "type": "pdf" }
                ]
            }
        ]
    },
    // Continue with semesters 6 and 7...
];

const getResourceIcon = (type) => {
    switch (type) {
        case 'pdf':
            return <FileText className="h-4 w-4" />;
        case 'video':
            return <Play className="h-4 w-4" />;
        case 'interactive':
            return <Eye className="h-4 w-4" />;
        default:
            return <BookOpen className="h-4 w-4" />;
    }
};

const getResourceTypeColor = (type) => {
    switch (type) {
        case 'pdf':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        case 'video':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case 'interactive':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
};

const getTeacherInitials = (name) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export default function Page() {
    const params = useParams();
    const rawTitle = params.title;
    const title = Array.isArray(rawTitle) ? rawTitle[0] : rawTitle;
    const decodedTitle = decodeURIComponent(title || '');

    // Function to find subject across all semesters
    const findSubject = (searchTitle) => {
        for (const semesterData of SubjectData) {
            for (const subject of semesterData.subjects) {
                if (subject.title.toLowerCase() === searchTitle.toLowerCase()) {
                    return { ...subject, semester: semesterData.semester };
                }
            }
        }
        return null;
    };

    const subject = findSubject(decodedTitle);

    if (!subject) {
        return (
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/student/learning/materials">Resources</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{decodedTitle}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <div className="flex flex-1 flex-col items-center justify-center p-8">
                    <Card className="w-full max-w-lg text-center">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2">
                                <BookOpen className="h-6 w-6 text-muted-foreground" />
                                Subject Not Found
                            </CardTitle>
                            <CardDescription>
                                We couldn't find any subject matching "{decodedTitle}"
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/student/learning/materials">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Resources
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        );
    }

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href="/student/learning/materials" className="hover:text-foreground transition-colors">
                                Resources
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium">{subject.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>

            <div className="flex-1 p-6 space-y-8">
                {/* Subject Header */}
                <div className="space-y-6">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight">{subject.title}</h1>
                                <Badge variant="secondary" className="text-xs">
                                    Semester {subject.semester}
                                </Badge>
                            </div>
                            <p className="text-lg text-muted-foreground max-w-3xl">
                                {subject.description}
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/student/learning/materials">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Link>
                        </Button>
                    </div>

                    {/* Subject Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Hash className="h-4 w-4 text-muted-foreground" />
                                    Subject Code
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{subject.Subject_code}</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    Instructor
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs font-medium">
                                            {getTeacherInitials(subject.Teacher)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="font-semibold">{subject.Teacher}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    Credits
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold">{subject.credits || 'N/A'}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Learning Resources */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold tracking-tight">Learning Resources</h2>
                        <Badge variant="outline" className="text-sm">
                            {subject.resources.length} Resources Available
                        </Badge>
                    </div>

                    <div className='space-y-4 mt-6'>
                            <div className="grid gap-4">
                                {subject.resources.map((resource, index) => (
                                    <Card key={resource.id} className="hover:shadow-md transition-shadow duration-200">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        {getResourceIcon(resource.type)}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="font-semibold text-lg">{resource.Chapter}</h3>
                                                            <Badge
                                                                variant="secondary"
                                                                className={`text-xs ${getResourceTypeColor(resource.type)}`}
                                                            >
                                                                {resource.type?.toUpperCase() || 'RESOURCE'}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            Chapter {resource.id} • Learning Material
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {resource.url ? (
                                                        <Button asChild>
                                                            <Link
                                                                href={resource.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                Open Resource
                                                            </Link>
                                                        </Button>
                                                    ) : (
                                                        <Button variant="outline" disabled>
                                                            <Clock className="h-4 w-4 mr-2" />
                                                            Coming Soon
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                    </div>

                </div>

                {/* Additional Info Section */}
                <div className="space-y-4">
                    <Alert>
                        <BookOpen className="h-4 w-4" />
                        <AlertDescription>
                            Resources are regularly updated. If you notice any broken links or have suggestions for additional materials, please contact your instructor or the IT support team.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </SidebarInset>
    );
}
