'use client'
import {useState} from "react";
import {GradeTable} from "@/components/students/grades/GradeTable";
import {GradeProgressChart} from "@/components/students/grades/Gradechart";

export const GradeLayout = () => {
    const [selectedSemester, setSelectedSemester] = useState("Sem 1")
    return (
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
            <GradeProgressChart
                selectedSemester={selectedSemester}
                setSelectedSemester={setSelectedSemester}
            />
            <GradeTable selectedSemester={selectedSemester}/>
        </div>
        )
}
