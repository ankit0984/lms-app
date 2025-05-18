import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploader from "./fileUploader";
import RichEditor from "./richEditor";

export default function CreateAssignments() {
	return (
		<div className='flex flex-col gap-5 p-5 h-screen'>
			<div>
				<span>
					create assignments using file upload or using rich-text-Editor
				</span>
			</div>
			<Tabs defaultValue='File-Upload' className='w-full'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='File-Upload'>File-Upload</TabsTrigger>
					<TabsTrigger value='Text-Editor'>Text-Editor</TabsTrigger>
				</TabsList>
				<TabsContent value='File-Upload'>
					<Card>
						<CardHeader>
							<CardTitle>Upload Assignment</CardTitle>
							<CardDescription>
								Create Assignment using file uploads like (word file, pdf)
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							<FileUploader />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='Text-Editor'>
					<Card>
						<CardHeader>
							<CardTitle>Text-Editor</CardTitle>
							<CardDescription>
								Create Assignments With the help of Text-Editor.
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-2'>
							<RichEditor />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
