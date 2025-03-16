"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MoreHorizontal, FileText, Video, ImageIcon, LinkIcon, File, Upload, Download, Trash, Edit, Eye } from 'lucide-react'
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for materials
const mockMaterials = [
    {
        id: "mat-1",
        title: "Introduction to Computer Science",
        description: "Lecture slides covering the basics of computer science",
        type: "document",
        format: "pdf",
        size: "2.4 MB",
        course: "CS101",
        module: "Week 1",
        uploadDate: new Date(2023, 4, 15).toISOString(),
        downloads: 45,
        visibility: "visible",
    },
    {
        id: "mat-2",
        title: "Data Structures Tutorial",
        description: "Video tutorial explaining common data structures",
        type: "video",
        format: "mp4",
        size: "156 MB",
        course: "CS201",
        module: "Week 3",
        uploadDate: new Date(2023, 4, 20).toISOString(),
        downloads: 32,
        visibility: "visible",
    },
    {
        id: "mat-3",
        title: "Database Schema Diagram",
        description: "Visual representation of the database schema",
        type: "image",
        format: "png",
        size: "1.2 MB",
        course: "CS301",
        module: "Week 2",
        uploadDate: new Date(2023, 4, 18).toISOString(),
        downloads: 28,
        visibility: "visible",
    },
    {
        id: "mat-4",
        title: "Software Engineering Best Practices",
        description: "Document outlining software engineering best practices",
        type: "document",
        format: "docx",
        size: "1.8 MB",
        course: "CS401",
        module: "Week 4",
        uploadDate: new Date(2023, 4, 25).toISOString(),
        downloads: 19,
        visibility: "hidden",
    },
    {
        id: "mat-5",
        title: "AI Research Paper",
        description: "Recent research paper on artificial intelligence",
        type: "document",
        format: "pdf",
        size: "3.5 MB",
        course: "CS501",
        module: "Week 5",
        uploadDate: new Date(2023, 5, 1).toISOString(),
        downloads: 12,
        visibility: "visible",
    },
    {
        id: "mat-6",
        title: "Web Development Tutorial",
        description: "Step-by-step tutorial for web development",
        type: "link",
        format: "url",
        size: "N/A",
        course: "CS601",
        module: "Week 1",
        uploadDate: new Date(2023, 5, 5).toISOString(),
        downloads: 37,
        visibility: "visible",
    },
]

export default function MaterialsManager() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [courseFilter, setCourseFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [materials] = useState(mockMaterials)
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
    const [newMaterial, setNewMaterial] = useState({
        title: "",
        description: "",
        type: "document",
        course: "",
        module: "",
        file: null,
        link: "",
    })

    // Filter materials based on search, course, and type
    const filteredMaterials = materials.filter((material) => {
        const matchesSearch =
            material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            material.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCourse = courseFilter === "all" || material.course === courseFilter
        const matchesType = typeFilter === "all" || material.type === typeFilter

        return matchesSearch && matchesCourse && matchesType
    })

    const getTypeIcon = (type) => {
        switch (type) {
            case "document":
                return <FileText className="h-4 w-4 text-blue-500" />
            case "video":
                return <Video className="h-4 w-4 text-red-500" />
            case "image":
                return <ImageIcon className="h-4 w-4 text-green-500" />
            case "link":
                return <LinkIcon className="h-4 w-4 text-purple-500" />
            default:
                return <File className="h-4 w-4 text-gray-500" />
        }
    }

    const handleUpload = () => {
        // In a real app, this would upload the file to a storage service
        console.log("New material:", newMaterial)
        setIsUploadDialogOpen(false)
        // Reset form
        setNewMaterial({
            title: "",
            description: "",
            type: "document",
            course: "",
            module: "",
            file: null,
            link: "",
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex flex-1 items-center space-x-2">
                    <div className="relative flex-1 md:max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search materials..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by course" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            <SelectItem value="CS101">CS101</SelectItem>
                            <SelectItem value="CS201">CS201</SelectItem>
                            <SelectItem value="CS301">CS301</SelectItem>
                            <SelectItem value="CS401">CS401</SelectItem>
                            <SelectItem value="CS501">CS501</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="document">Documents</SelectItem>
                            <SelectItem value="video">Videos</SelectItem>
                            <SelectItem value="image">Images</SelectItem>
                            <SelectItem value="link">Links</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Material
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Upload Course Material</DialogTitle>
                            <DialogDescription>
                                Upload a new material for your course
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={newMaterial.title}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                                    placeholder="e.g., Introduction to Computer Science"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={newMaterial.description}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                                    placeholder="Brief description of the material"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="type">Material Type</Label>
                                    <Select
                                        value={newMaterial.type}
                                        onValueChange={(value) => setNewMaterial({ ...newMaterial, type: value })}
                                    >
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="document">Document</SelectItem>
                                            <SelectItem value="video">Video</SelectItem>
                                            <SelectItem value="image">Image</SelectItem>
                                            <SelectItem value="link">External Link</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="course">Course</Label>
                                    <Select
                                        value={newMaterial.course}
                                        onValueChange={(value) => setNewMaterial({ ...newMaterial, course: value })}
                                    >
                                        <SelectTrigger id="course">
                                            <SelectValue placeholder="Select course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CS101">CS101</SelectItem>
                                            <SelectItem value="CS201">CS201</SelectItem>
                                            <SelectItem value="CS301">CS301</SelectItem>
                                            <SelectItem value="CS401">CS401</SelectItem>
                                            <SelectItem value="CS501">CS501</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="module">Module/Week</Label>
                                <Input
                                    id="module"
                                    value={newMaterial.module}
                                    onChange={(e) => setNewMaterial({ ...newMaterial, module: e.target.value })}
                                    placeholder="e.g., Week 1"
                                />
                            </div>
                            {newMaterial.type === "link" ? (
                                <div className="grid gap-2">
                                    <Label htmlFor="link">External Link</Label>
                                    <Input
                                        id="link"
                                        value={newMaterial.link}
                                        onChange={(e) => setNewMaterial({ ...newMaterial, link: e.target.value })}
                                        placeholder="https://example.com/resource"
                                    />
                                </div>
                            ) : (
                                <div className="grid gap-2">
                                    <Label htmlFor="file">File Upload</Label>
                                    <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                                        <div className="text-center">
                                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Drag and drop your file here, or click to browse
                                            </p>
                                            <Input
                                                id="file"
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setNewMaterial({ ...newMaterial, file: e.target.files?.[0] || null })}
                                            />
                                            <Button variant="outline" size="sm" className="mt-2" onClick={() => document.getElementById("file")?.click()}>
                                                Browse Files
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUpload}>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Material
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Materials</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="links">Links</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Material</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Module</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Uploaded</TableHead>
                                        <TableHead>Downloads</TableHead>
                                        <TableHead>Visibility</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMaterials.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="h-24 text-center">
                                                No materials found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredMaterials.map((material) => (
                                            <TableRow key={material.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {getTypeIcon(material.type)}
                                                        <div>
                                                            <div className="font-medium">{material.title}</div>
                                                            <div className="text-xs text-muted-foreground">{material.description}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{material.format}</Badge>
                                                </TableCell>
                                                <TableCell>{material.course}</TableCell>
                                                <TableCell>{material.module}</TableCell>
                                                <TableCell>{material.size}</TableCell>
                                                <TableCell>{format(new Date(material.uploadDate), "MMM d, yyyy")}</TableCell>
                                                <TableCell>{material.downloads}</TableCell>
                                                <TableCell>
                                                    <Badge variant={material.visibility === "visible" ? "success" : "secondary"}>
                                                        {material.visibility}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Preview
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Download className="mr-2 h-4 w-4" />
                                                                Download
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive">
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Material</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Module</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Uploaded</TableHead>
                                        <TableHead>Downloads</TableHead>
                                        <TableHead>Visibility</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMaterials.filter(m => m.type === "document").length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="h-24 text-center">
                                                No documents found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredMaterials.filter(m => m.type === "document").map((material) => (
                                            <TableRow key={material.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {getTypeIcon(material.type)}
                                                        <div>
                                                            <div className="font-medium">{material.title}</div>
                                                            <div className="text-xs text-muted-foreground">{material.description}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{material.format}</Badge>
                                                </TableCell>
                                                <TableCell>{material.course}</TableCell>
                                                <TableCell>{material.module}</TableCell>
                                                <TableCell>{material.size}</TableCell>
                                                <TableCell>{format(new Date(material.uploadDate), "MMM d, yyyy")}</TableCell>
                                                <TableCell>{material.downloads}</TableCell>
                                                <TableCell>
                                                    <Badge variant={material.visibility === "visible" ? "success" : "secondary"}>
                                                        {material.visibility}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Preview
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Download className="mr-2 h-4 w-4" />
                                                                Download
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive">
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="media" className="space-y-4">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Material</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Module</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Uploaded</TableHead>
                                        <TableHead>Downloads</TableHead>
                                        <TableHead>Visibility</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMaterials.filter(m => m.type === "video" || m.type === "image").length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="h-24 text-center">
                                                No media found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredMaterials.filter(m => m.type === "video" || m.type === "image").map((material) => (
                                            <TableRow key={material.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {getTypeIcon(material.type)}
                                                        <div>
                                                            <div className="font-medium">{material.title}</div>
                                                            <div className="text-xs text-muted-foreground">{material.description}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{material.format}</Badge>
                                                </TableCell>
                                                <TableCell>{material.course}</TableCell>
                                                <TableCell>{material.module}</TableCell>
                                                <TableCell>{material.size}</TableCell>
                                                <TableCell>{format(new Date(material.uploadDate), "MMM d, yyyy")}</TableCell>
                                                <TableCell>{material.downloads}</TableCell>
                                                <TableCell>
                                                    <Badge variant={material.visibility === "visible" ? "success" : "secondary"}>
                                                        {material.visibility}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Preview
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Download className="mr-2 h-4 w-4" />
                                                                Download
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive">
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="links" className="space-y-4">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Material</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Module</TableHead>
                                        <TableHead>Size</TableHead>
                                        <TableHead>Uploaded</TableHead>
                                        <TableHead>Downloads</TableHead>
                                        <TableHead>Visibility</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMaterials.filter(m => m.type === "link").length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="h-24 text-center">
                                                No links found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredMaterials.filter(m => m.type === "link").map((material) => (
                                            <TableRow key={material.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {getTypeIcon(material.type)}
                                                        <div>
                                                            <div className="font-medium">{material.title}</div>
                                                            <div className="text-xs text-muted-foreground">{material.description}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{material.format}</Badge>
                                                </TableCell>
                                                <TableCell>{material.course}</TableCell>
                                                <TableCell>{material.module}</TableCell>
                                                <TableCell>{material.size}</TableCell>
                                                <TableCell>{format(new Date(material.uploadDate), "MMM d, yyyy")}</TableCell>
                                                <TableCell>{material.downloads}</TableCell>
                                                <TableCell>
                                                    <Badge variant={material.visibility === "visible" ? "success" : "secondary"}>
                                                        {material.visibility}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Visit Link
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive">
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
