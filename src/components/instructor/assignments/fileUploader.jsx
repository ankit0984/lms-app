"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function PDFUploader() {
	// State
	const [file, setFile] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [fileError, setFileError] = useState("");
	const [preview, setPreview] = useState(null);

	const fileInputRef = useRef(null);
	const router = useRouter();

	// Drag and drop handlers
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			handleFileChange(e.dataTransfer.files[0]);
		}
	};

	const handleFileChange = (selectedFile) => {
		setFileError("");

		// Validate file type - only PDF
		if (selectedFile.type !== "application/pdf") {
			setFileError("Please select a PDF file");
			toast.error("Only PDF files are accepted");
			return;
		}

		// Validate file size (max 10MB)
		const maxSize = 10 * 1024 * 1024; // 10MB in bytes
		if (selectedFile.size > maxSize) {
			setFileError("File too large (max 10MB)");
			toast.error("File size exceeds 10MB limit");
			return;
		}

		// Set file if all validations pass
		setFile(selectedFile);
		setPreview("/pdf-placeholder.png"); // Set a placeholder preview for PDF
		toast.success("PDF file selected successfully");
	};

	// Simulated upload progress
	const simulateUploadProgress = () => {
		let progress = 0;
		const interval = setInterval(() => {
			progress += Math.random() * 10;
			if (progress >= 100) {
				progress = 100;
				clearInterval(interval);
			}
			setUploadProgress(Math.min(Math.round(progress), 100));
		}, 300);

		return () => clearInterval(interval);
	};

	// Upload handler
	const handleUpload = async () => {
		if (!file) {
			toast.error("Please select a PDF file first");
			return;
		}

		setUploading(true);
		setUploadProgress(0);

		// Start simulated progress for demo purposes
		const clearProgressInterval = simulateUploadProgress();

		try {
			// Create FormData for file upload
			const formData = new FormData();
			formData.append("file", file);

			// Replace with your actual API endpoint
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Upload failed");
			}

			const data = await response.json();
			const fileId = data.pdf?._id;

			// Ensure progress shows 100% when complete
			setUploadProgress(100);
			toast.success("PDF uploaded successfully");

			// Redirect after successful upload with a slight delay
			setTimeout(() => {
				if (fileId) {
					router.push(`/dashboard/file/${fileId}`);
				} else {
					// If no fileId is returned, just reset the component
					clearFile();
				}
			}, 1500);
		} catch (error) {
			toast.error("Upload failed: " + error.message);
		} finally {
			clearProgressInterval();
			setUploading(false);
		}
	};

	// Remove selected file
	const clearFile = () => {
		setFile(null);
		setFileError("");
		setUploadProgress(0);
		setPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className='w-full max-w-3xl drop-shadow-md mx-auto'>
			{!file ? (
				<div
					className={cn(
						"flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors mt-4",
						"bg-gray-50 hover:bg-gray-100",
						"border-primary/70",
						isDragging && "border-blue-500 bg-blue-50",
						fileError && "border-red-500 bg-red-50"
					)}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					onClick={() => fileInputRef.current?.click()}
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							fileInputRef.current?.click();
						}
					}}
					aria-label='Upload PDF file'
				>
					<div className='flex flex-col items-center justify-center p-5 text-primary'>
						<Upload className='w-10 h-10 mb-2' />
						<p className='text-sm font-medium'>
							Drag and drop or click to upload a PDF
						</p>
						<p className='text-xs text-gray-500 mt-1'>
							Maximum file size: 10MB
						</p>
						{fileError && (
							<div className='flex items-center mt-3 text-sm text-red-500'>
								<AlertCircle className='w-4 h-4 mr-1' />
								{fileError}
							</div>
						)}
					</div>
					<Input
						ref={fileInputRef}
						id='dropzone-file'
						type='file'
						className='hidden'
						accept='.pdf,application/pdf'
						onChange={(e) =>
							e.target.files?.[0] && handleFileChange(e.target.files[0])
						}
					/>
				</div>
			) : (
				<div className='w-full space-y-6 mt-4'>
					{/* File Information Section */}
					<div className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
						<div className='flex items-center gap-4'>
							<div className='w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center'>
								<FileText className='w-8 h-8 text-primary' />
							</div>

							<div className='flex-1 min-w-0'>
								<p className='text-sm font-medium truncate'>{file.name}</p>
								<p className='text-xs text-zinc-500'>
									{(file.size / 1024 / 1024).toFixed(2)} MB
								</p>
							</div>
						</div>
						<Button
							variant='ghost'
							size='icon'
							onClick={(e) => {
								e.stopPropagation();
								clearFile();
							}}
							disabled={uploading}
							className='text-gray-500 hover:text-red-500'
						>
							<X className='w-5 h-5' />
						</Button>
					</div>

					{/* Upload Progress */}
					{uploadProgress > 0 && (
						<div className='w-full space-y-2'>
							<Progress value={uploadProgress} className='h-2' />
							<p className='text-xs text-center text-gray-500 dark:text-gray-400'>
								{uploadProgress < 100
									? `Uploading... ${uploadProgress}%`
									: "Processing..."}
							</p>
						</div>
					)}

					{/* Upload Button */}
					<Button
						className='w-full'
						onClick={handleUpload}
						disabled={uploading}
						variant={uploading ? "outline" : "default"}
					>
						<Upload className='w-4 h-4 mr-2' />
						{uploading ? "Uploading..." : "Upload PDF"}
					</Button>
				</div>
			)}
		</div>
	);
}
