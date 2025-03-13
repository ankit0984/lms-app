import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server"
import dotenv from "dotenv"

dotenv.config()

const API_KEY = process.env.GEMINI_API_KEY || ``; // Use env variable for security
const genAI = new GoogleGenerativeAI(API_KEY);

// This would be replaced with actual Gemini API integration
// For now, we'll simulate responses
export async function POST(request) {
    try {
        const { prompt, context } = await request.json()

        // Simulate a delay to mimic API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Use Gemini Pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        let response = ""

        // Generate contextual responses based on the prompt and context
        if (prompt.toLowerCase().includes("description") || prompt.toLowerCase().includes("instruction")) {
            response = generateAssignmentDescription(context)
        } else if (prompt.toLowerCase().includes("rubric")) {
            response = generateRubricSuggestion(context)
        } else {
            response = generateGeneralSuggestion(context)
        }

        return NextResponse.json({ text: response })
    } catch (error) {
        console.error("Error in Gemini API:", error)
        return NextResponse.json({ error: "Failed to generate content" }, )
    }
}

// Helper functions to generate contextual responses
function generateAssignmentDescription(context) {
    const { assignmentType, courseName } = context

    if (assignmentType === "written") {
        return `In this ${courseName} assignment, students will analyze and evaluate a real-world problem using concepts learned in class. They will identify key issues, develop a solution strategy, and present their findings in a well-organized report.\n\nThe assignment should demonstrate critical thinking, application of theoretical knowledge, and effective communication skills. Students should include relevant data, cite sources properly, and provide a well-reasoned conclusion.\n\nSpecific requirements:\n- 1500-2000 words\n- Minimum of 5 scholarly sources\n- APA format for citations\n- Include an executive summary`
    } else if (assignmentType === "coding") {
        return `For this ${courseName} programming assignment, students will develop a solution to a practical problem using the programming concepts covered in the course.\n\nStudents will:\n1. Analyze the problem requirements\n2. Design an efficient algorithm\n3. Implement the solution in code\n4. Test and debug their implementation\n5. Document their code and approach\n\nThe solution should demonstrate proper use of data structures, algorithmic efficiency, and coding best practices. Code should be well-commented and follow the style guidelines discussed in class.`
    } else if (assignmentType === "presentation") {
        return `In this ${courseName} presentation assignment, students will research a topic related to the course material and deliver a comprehensive presentation to the class.\n\nThe presentation should:\n- Be 10-12 minutes in length\n- Include professional slides with minimal text\n- Incorporate relevant visuals and examples\n- Demonstrate deep understanding of the topic\n- Connect the topic to broader course concepts\n\nStudents will be evaluated on content accuracy, presentation skills, visual aids, and their ability to answer questions from the audience.`
    } else {
        return `For this ${courseName} assignment, students will demonstrate their understanding of key course concepts through a comprehensive project that challenges them to apply theoretical knowledge to practical situations.\n\nStudents should:\n- Clearly identify the problem or question being addressed\n- Apply appropriate methods and frameworks from the course\n- Support their analysis with evidence and examples\n- Draw well-reasoned conclusions\n- Present their work in a professional, organized manner\n\nThis assignment helps students develop critical thinking, analytical skills, and the ability to communicate complex ideas effectively.`
    }
}

function generateRubricSuggestion(context) {
    const { assignmentType, courseName } = context

    if (assignmentType === "written") {
        return `Based on your ${courseName} written assignment, here's a suggested rubric:\n\n1. Content & Analysis (30 pts)\n   - Depth of analysis and critical thinking\n   - Comprehensive coverage of the topic\n   - Application of course concepts\n\n2. Research & Evidence (25 pts)\n   - Quality and relevance of sources\n   - Effective integration of evidence\n   - Proper citation of sources\n\n3. Organization & Structure (20 pts)\n   - Logical flow of ideas\n   - Clear introduction and conclusion\n   - Effective use of paragraphs and transitions\n\n4. Writing Quality (15 pts)\n   - Grammar, spelling, and punctuation\n   - Academic tone and style\n   - Clarity of expression\n\n5. Format & Presentation (10 pts)\n   - Adherence to formatting requirements\n   - Professional appearance\n   - Proper citations and bibliography`
    } else if (assignmentType === "coding") {
        return `For your ${courseName} coding assignment, consider this rubric structure:\n\n1. Functionality (30 pts)\n   - Program works as specified\n   - Handles edge cases appropriately\n   - Meets all requirements\n\n2. Code Quality (25 pts)\n   - Well-organized and readable code\n   - Appropriate naming conventions\n   - Efficient implementation\n\n3. Algorithm Design (20 pts)\n   - Appropriate algorithm selection\n   - Optimization and efficiency\n   - Problem-solving approach\n\n4. Documentation (15 pts)\n   - Code comments and documentation\n   - README and usage instructions\n   - Explanation of design decisions\n\n5. Testing & Debugging (10 pts)\n   - Evidence of thorough testing\n   - Error handling\n   - Edge case consideration`
    } else {
        return `For your ${courseName} assignment, here's a suggested rubric framework:\n\n1. Content Mastery (30 pts)\n   - Accuracy of information\n   - Depth of understanding\n   - Application of course concepts\n\n2. Critical Analysis (25 pts)\n   - Evaluation of ideas/information\n   - Synthesis of multiple perspectives\n   - Original insights\n\n3. Structure & Organization (20 pts)\n   - Logical flow of ideas\n   - Clear framework\n   - Coherent presentation\n\n4. Communication (15 pts)\n   - Clarity of expression\n   - Appropriate style/format\n   - Effective use of supporting materials\n\n5. Professionalism (10 pts)\n   - Attention to detail\n   - Adherence to guidelines\n   - Overall presentation quality`
    }
}

function generateGeneralSuggestion(context) {
    const { assignmentType, courseName } = context

    return `Based on your ${courseName} ${assignmentType || ""} assignment, here are some suggestions to enhance it:\n\n1. Consider incorporating a reflection component where students discuss their problem-solving process and what they learned. This encourages metacognition and helps students internalize key concepts.\n\n2. Add a peer review element to foster collaborative learning and expose students to different perspectives.\n\n3. Include a real-world application section that asks students to connect theoretical concepts to practical situations they might encounter in their careers.\n\n4. Provide a choice of topics or approaches to allow students to pursue their interests while still meeting learning objectives.\n\n5. Consider adding a brief formative assessment component that students can complete before the final submission to check their understanding and receive early feedback.`
}

