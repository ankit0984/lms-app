"use client";

import React from "react";
import { GradeProgressChart } from "@/components/students/dashboard/Gradechart";
import {Overview} from "@/components/students/dashboard/Overview";
import {Stats} from "@/components/students/dashboard/Stats";

export default function StudentDashboard() {
	return (
		<div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
			{/* Stats */}
			<Stats/>
			{/* Grade Progress */}
			<GradeProgressChart />
			{/* Recent Activities */}
			<Overview/>
		</div>
	);
}
