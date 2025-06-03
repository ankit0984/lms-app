import { NextResponse } from "next/server"

// This would be replaced with actual Gemini API integration
export async function POST(request) {
    try {
        const { courseId, courseName, assignmentType, learningObjectives } = await request.json()

        // Simulate a delay to mimic API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Generate a complete assignment based on the provided parameters
        const assignment = generateCompleteAssignment(courseId, courseName, assignmentType, learningObjectives)

        return NextResponse.json(assignment)
    } catch (error) {
        console.error("Error in Gemini assignment generation:", error)
        return NextResponse.json({ error: "Failed to generate assignment" })
    }
}

function generateCompleteAssignment(
    courseId,
    courseName,
    assignmentType,
    learningObjectives,
) {
    // Create a title based on course and type
    let title = ""
    let description = ""
    let rubric = []

    // Generate content based on course and assignment type
    switch (courseId) {
        case "CS101":
            if (assignmentType === "coding") {
                title = "Building Your First Interactive Program"
                description = `# Introduction to Programming: Interactive Calculator

In this assignment, you will apply the programming fundamentals you've learned to create an interactive calculator program. This project will help you demonstrate your understanding of variables, control structures, functions, and basic user interaction.

## Assignment Details

You will create a calculator program that can perform the following operations:
- Addition, subtraction, multiplication, and division
- Square root and exponentiation
- Memory functions (store and recall values)
- History of calculations

## Requirements

1. Create a user-friendly interface that clearly prompts for input
2. Implement all the required mathematical operations
3. Include error handling for invalid inputs (e.g., division by zero)
4. Implement a function to display the history of calculations
5. Document your code with appropriate comments
6. Follow the coding style guidelines discussed in class

## Submission Guidelines

- Submit your code files in a zip archive
- Include a README.md file explaining how to run your program
- Submit a brief reflection (300-500 words) discussing your approach, challenges faced, and how you overcame them

## Grading Criteria

Your assignment will be evaluated based on the rubric provided, with emphasis on functionality, code quality, and documentation.`

                rubric = [
                    {
                        criterion: "Functionality",
                        description: "Program works as specified and meets all requirements",
                        points: 30,
                        levels: [
                            { level: "Excellent", description: "All features work flawlessly with no bugs", points: 30 },
                            { level: "Good", description: "All core features work with minor issues", points: 25 },
                            { level: "Satisfactory", description: "Most features work with some issues", points: 20 },
                            { level: "Needs Improvement", description: "Several features missing or not working", points: 15 },
                            { level: "Unsatisfactory", description: "Major functionality missing or broken", points: 10 },
                        ],
                    },
                    {
                        criterion: "Code Quality",
                        description: "Code organization, readability, and efficiency",
                        points: 25,
                        levels: [
                            {
                                level: "Excellent",
                                description: "Exceptionally well-organized, readable, and efficient code",
                                points: 25,
                            },
                            { level: "Good", description: "Well-organized code with good practices", points: 20 },
                            { level: "Satisfactory", description: "Adequately organized code with some issues", points: 15 },
                            { level: "Needs Improvement", description: "Poorly organized code with readability issues", points: 10 },
                            { level: "Unsatisfactory", description: "Disorganized, unreadable code", points: 5 },
                        ],
                    },
                    {
                        criterion: "Documentation",
                        description: "Code comments, README, and reflection quality",
                        points: 20,
                        levels: [
                            { level: "Excellent", description: "Comprehensive documentation throughout", points: 20 },
                            { level: "Good", description: "Good documentation with minor omissions", points: 16 },
                            { level: "Satisfactory", description: "Adequate documentation with some gaps", points: 12 },
                            { level: "Needs Improvement", description: "Minimal documentation", points: 8 },
                            { level: "Unsatisfactory", description: "Little to no documentation", points: 4 },
                        ],
                    },
                    {
                        criterion: "Error Handling",
                        description: "Handling of invalid inputs and edge cases",
                        points: 15,
                        levels: [
                            { level: "Excellent", description: "Comprehensive error handling for all scenarios", points: 15 },
                            { level: "Good", description: "Good error handling with minor gaps", points: 12 },
                            { level: "Satisfactory", description: "Basic error handling implemented", points: 9 },
                            { level: "Needs Improvement", description: "Minimal error handling", points: 6 },
                            { level: "Unsatisfactory", description: "No meaningful error handling", points: 3 },
                        ],
                    },
                    {
                        criterion: "Reflection",
                        description: "Quality of self-reflection on the development process",
                        points: 10,
                        levels: [
                            { level: "Excellent", description: "Insightful reflection with deep analysis", points: 10 },
                            { level: "Good", description: "Thoughtful reflection with good insights", points: 8 },
                            { level: "Satisfactory", description: "Basic reflection covering main points", points: 6 },
                            { level: "Needs Improvement", description: "Superficial reflection", points: 4 },
                            { level: "Unsatisfactory", description: "Minimal or missing reflection", points: 2 },
                        ],
                    },
                ]
            } else {
                title = "Computer Science Fundamentals Research Paper"
                description = `# Computer Science Fundamentals: Research Paper

## Overview
In this assignment, you will research and write a paper on a fundamental computer science concept. This assignment will help you develop research skills, deepen your understanding of computer science principles, and improve your technical writing abilities.

## Assignment Details
Choose ONE of the following topics:
- The evolution of programming paradigms
- Fundamental algorithms and their real-world applications
- The history and impact of a specific programming language
- Ethical considerations in computing
- The mathematics behind computer science

## Requirements
1. Write a 1500-2000 word research paper on your chosen topic
2. Include at least 5 scholarly sources (academic journals, books, conference proceedings)
3. Follow APA format for citations and references
4. Include the following sections:
   - Abstract (150-200 words)
   - Introduction
   - Literature Review
   - Main Body (with appropriate subheadings)
   - Conclusion
   - References

## Submission Guidelines
- Submit your paper as a PDF document
- Include a separate cover page with your name, student ID, and paper title
- Submit a separate bibliography of all sources consulted (not just those cited)

## Grading Criteria
Your paper will be evaluated based on the rubric provided, with emphasis on research quality, critical analysis, and writing quality.`

                rubric = [
                    {
                        criterion: "Research Quality",
                        description: "Depth and breadth of research, quality of sources",
                        points: 30,
                        levels: [
                            { level: "Excellent", description: "Exceptional research with high-quality sources", points: 30 },
                            { level: "Good", description: "Thorough research with good sources", points: 25 },
                            { level: "Satisfactory", description: "Adequate research with acceptable sources", points: 20 },
                            {
                                level: "Needs Improvement",
                                description: "Limited research with some questionable sources",
                                points: 15,
                            },
                            { level: "Unsatisfactory", description: "Minimal research with poor sources", points: 10 },
                        ],
                    },
                    {
                        criterion: "Critical Analysis",
                        description: "Depth of analysis and critical thinking",
                        points: 25,
                        levels: [
                            { level: "Excellent", description: "Sophisticated analysis with original insights", points: 25 },
                            { level: "Good", description: "Strong analysis with good insights", points: 20 },
                            { level: "Satisfactory", description: "Basic analysis with some insights", points: 15 },
                            { level: "Needs Improvement", description: "Superficial analysis with few insights", points: 10 },
                            { level: "Unsatisfactory", description: "Descriptive rather than analytical", points: 5 },
                        ],
                    },
                    {
                        criterion: "Writing Quality",
                        description: "Organization, clarity, grammar, and style",
                        points: 20,
                        levels: [
                            { level: "Excellent", description: "Exceptionally well-written and organized", points: 20 },
                            { level: "Good", description: "Well-written with minor issues", points: 16 },
                            { level: "Satisfactory", description: "Adequately written with some issues", points: 12 },
                            { level: "Needs Improvement", description: "Poorly written with significant issues", points: 8 },
                            { level: "Unsatisfactory", description: "Major writing problems throughout", points: 4 },
                        ],
                    },
                    {
                        criterion: "Technical Accuracy",
                        description: "Accuracy of technical information and concepts",
                        points: 15,
                        levels: [
                            {
                                level: "Excellent",
                                description: "All technical information is accurate and well-explained",
                                points: 15,
                            },
                            { level: "Good", description: "Technical information is mostly accurate", points: 12 },
                            { level: "Satisfactory", description: "Some technical inaccuracies present", points: 9 },
                            { level: "Needs Improvement", description: "Several technical inaccuracies", points: 6 },
                            { level: "Unsatisfactory", description: "Major technical misconceptions", points: 3 },
                        ],
                    },
                    {
                        criterion: "Format & Citations",
                        description: "Adherence to APA format and citation requirements",
                        points: 10,
                        levels: [
                            { level: "Excellent", description: "Perfect APA format throughout", points: 10 },
                            { level: "Good", description: "Minor APA formatting issues", points: 8 },
                            { level: "Satisfactory", description: "Some APA formatting issues", points: 6 },
                            { level: "Needs Improvement", description: "Significant APA formatting issues", points: 4 },
                            { level: "Unsatisfactory", description: "Little to no adherence to APA format", points: 2 },
                        ],
                    },
                ]
            }
            break

        case "CS201":
            if (assignmentType === "coding") {
                title = "Data Structures Implementation Project"
                description = `# Data Structures Implementation Project

## Overview
In this assignment, you will implement and analyze various data structures covered in our Data Structures and Algorithms course. This project will help you gain practical experience with these fundamental structures and understand their performance characteristics.

## Assignment Details
You will implement the following data structures from scratch:
1. Linked List (singly or doubly linked)
2. Stack
3. Queue
4. Binary Search Tree
5. Hash Table

## Requirements
For each data structure:
1. Implement all standard operations (e.g., insert, delete, search)
2. Write test cases to verify functionality
3. Analyze the time complexity of each operation
4. Compare the theoretical vs. actual performance
5. Document your implementation with clear comments

## Additional Requirements
- Create a driver program that demonstrates each data structure
- Include a performance comparison of your implementations
- Write a report (1000-1500 words) discussing your implementation choices, challenges faced, and performance analysis

## Submission Guidelines
- Submit your code files in a zip archive
- Include a README.md with instructions for compiling and running your code
- Submit your analysis report as a separate PDF document

## Grading Criteria
Your assignment will be evaluated based on the rubric provided, with emphasis on implementation correctness, analysis quality, and documentation.`

                rubric = [
                    {
                        criterion: "Implementation Correctness",
                        description: "Functionality and correctness of data structure implementations",
                        points: 40,
                        levels: [
                            {
                                level: "Excellent",
                                description: "All implementations work perfectly with edge cases handled",
                                points: 40,
                            },
                            { level: "Good", description: "All implementations work with minor issues", points: 32 },
                            { level: "Satisfactory", description: "Most implementations work with some issues", points: 24 },
                            {
                                level: "Needs Improvement",
                                description: "Several implementations have significant issues",
                                points: 16,
                            },
                            { level: "Unsatisfactory", description: "Major functionality missing or broken", points: 8 },
                        ],
                    },
                    {
                        criterion: "Analysis Quality",
                        description: "Depth and accuracy of performance analysis",
                        points: 25,
                        levels: [
                            {
                                level: "Excellent",
                                description: "Comprehensive, insightful analysis with empirical evidence",
                                points: 25,
                            },
                            { level: "Good", description: "Thorough analysis with good insights", points: 20 },
                            { level: "Satisfactory", description: "Basic analysis covering main points", points: 15 },
                            { level: "Needs Improvement", description: "Superficial analysis with gaps", points: 10 },
                            { level: "Unsatisfactory", description: "Minimal or inaccurate analysis", points: 5 },
                        ],
                    },
                    {
                        criterion: "Code Quality",
                        description: "Organization, readability, and efficiency",
                        points: 15,
                        levels: [
                            {
                                level: "Excellent",
                                description: "Exceptionally well-organized, readable, and efficient code",
                                points: 15,
                            },
                            { level: "Good", description: "Well-organized code with good practices", points: 12 },
                            { level: "Satisfactory", description: "Adequately organized code with some issues", points: 9 },
                            { level: "Needs Improvement", description: "Poorly organized code with readability issues", points: 6 },
                            { level: "Unsatisfactory", description: "Disorganized, unreadable code", points: 3 },
                        ],
                    },
                    {
                        criterion: "Testing",
                        description: "Comprehensiveness of test cases",
                        points: 10,
                        levels: [
                            { level: "Excellent", description: "Comprehensive tests covering all edge cases", points: 10 },
                            { level: "Good", description: "Good test coverage with minor gaps", points: 8 },
                            { level: "Satisfactory", description: "Basic test coverage", points: 6 },
                            { level: "Needs Improvement", description: "Limited test coverage", points: 4 },
                            { level: "Unsatisfactory", description: "Minimal or no testing", points: 2 },
                        ],
                    },
                    {
                        criterion: "Documentation",
                        description: "Quality of code comments, README, and reports",
                        points: 10,
                        levels: [
                            { level: "Excellent", description: "Exceptional documentation throughout", points: 10 },
                            { level: "Good", description: "Good documentation with minor omissions", points: 8 },
                            { level: "Satisfactory", description: "Adequate documentation with some gaps", points: 6 },
                            { level: "Needs Improvement", description: "Minimal documentation", points: 4 },
                            { level: "Unsatisfactory", description: "Little to no documentation", points: 2 },
                        ],
                    },
                ]
            } else {
                title = "Algorithm Analysis and Optimization"
                description = `# Algorithm Analysis and Optimization

## Overview
In this assignment, you will analyze, compare, and optimize algorithms for solving a specific computational problem. This project will help you develop skills in algorithm analysis, implementation, and optimization techniques.

## Assignment Details
You will work with the following sorting algorithms:
1. Merge Sort
2. Quick Sort
3. Heap Sort
4. Radix Sort
5. A sorting algorithm of your choice

## Requirements
For each algorithm:
1. Implement the algorithm from scratch
2. Analyze its time and space complexity (best, average, worst cases)
3. Measure actual performance with different input sizes and types
4. Identify optimization opportunities and implement them
5. Compare the performance before and after optimization

## Additional Requirements
- Create visualizations of performance comparisons
- Write a report (1500-2000 words) discussing your analysis, optimization techniques, and results
- Include recommendations for which algorithm to use in different scenarios

## Submission Guidelines
- Submit your code files in a zip archive
- Include a README.md with instructions for running your code
- Submit your analysis report as a separate PDF document
- Include any visualization files or screenshots

## Grading Criteria
Your assignment will be evaluated based on the rubric provided, with emphasis on analysis depth, optimization effectiveness, and comparative evaluation.`

                rubric = [
                    {
                        criterion: "Algorithm Implementation",
                        description: "Correctness and efficiency of implementations",
                        points: 25,
                        levels: [
                            { level: "Excellent", description: "All algorithms implemented correctly and efficiently", points: 25 },
                            {
                                level: "Good",
                                description: "All algorithms implemented correctly with minor efficiency issues",
                                points: 20,
                            },
                            { level: "Satisfactory", description: "Most algorithms implemented correctly", points: 15 },
                            { level: "Needs Improvement", description: "Several implementation issues", points: 10 },
                            { level: "Unsatisfactory", description: "Major implementation problems", points: 5 },
                        ],
                    },
                    {
                        criterion: "Analysis Quality",
                        description: "Depth and accuracy of algorithm analysis",
                        points: 25,
                        levels: [
                            {
                                level: "Excellent",
                                description: "Comprehensive, insightful analysis with mathematical rigor",
                                points: 25,
                            },
                            { level: "Good", description: "Thorough analysis with good mathematical foundation", points: 20 },
                            { level: "Satisfactory", description: "Basic analysis with some mathematical support", points: 15 },
                            {
                                level: "Needs Improvement",
                                description: "Superficial analysis with limited mathematical backing",
                                points: 10,
                            },
                            { level: "Unsatisfactory", description: "Minimal or inaccurate analysis", points: 5 },
                        ],
                    },
                    {
                        criterion: "Optimization Effectiveness",
                        description: "Quality and impact of optimization techniques",
                        points: 20,
                        levels: [
                            {
                                level: "Excellent",
                                description: "Highly effective optimizations with significant performance gains",
                                points: 20,
                            },
                            { level: "Good", description: "Effective optimizations with measurable improvements", points: 16 },
                            { level: "Satisfactory", description: "Some effective optimizations", points: 12 },
                            { level: "Needs Improvement", description: "Minor optimizations with limited impact", points: 8 },
                            { level: "Unsatisfactory", description: "Ineffective or no optimizations", points: 4 },
                        ],
                    },
                    {
                        criterion: "Comparative Evaluation",
                        description: "Quality of algorithm comparison and recommendations",
                        points: 15,
                        levels: [
                            {
                                level: "Excellent",
                                description: "Comprehensive comparison with insightful recommendations",
                                points: 15,
                            },
                            { level: "Good", description: "Thorough comparison with good recommendations", points: 12 },
                            { level: "Satisfactory", description: "Basic comparison with reasonable recommendations", points: 9 },
                            { level: "Needs Improvement", description: "Limited comparison with vague recommendations", points: 6 },
                            { level: "Unsatisfactory", description: "Minimal or poor comparison", points: 3 },
                        ],
                    },
                    {
                        criterion: "Visualization & Presentation",
                        description: "Quality of visualizations and reports presentation",
                        points: 15,
                        levels: [
                            {
                                level: "Excellent",
                                description: "Outstanding visualizations and professional presentation",
                                points: 15,
                            },
                            { level: "Good", description: "Clear visualizations and well-presented reports", points: 12 },
                            { level: "Satisfactory", description: "Adequate visualizations and presentation", points: 9 },
                            { level: "Needs Improvement", description: "Basic visualizations with presentation issues", points: 6 },
                            { level: "Unsatisfactory", description: "Poor or missing visualizations", points: 3 },
                        ],
                    },
                ]
            }
            break

        default:
            // Generic assignment for other subjects
            title = `Advanced ${courseName} Research Project`
            description = `# Advanced ${courseName} Research Project

## Overview
This assignment challenges you to conduct in-depth research on a topic related to ${courseName}. You will develop research skills, critical thinking, and the ability to communicate complex ideas effectively.

## Assignment Details
Select a topic within ${courseName} that interests you and has significant relevance to current developments in the field. Your research should:
- Address a specific question or problem
- Analyze existing literature and approaches
- Propose new insights or solutions
- Consider practical applications and implications

## Requirements
1. Write a research paper (2000-2500 words) on your chosen topic
2. Include at least 8 scholarly sources
3. Follow appropriate academic formatting (APA/MLA/Chicago)
4. Include the following sections:
   - Abstract
   - Introduction and problem statement
   - Literature review
   - Methodology (if applicable)
   - Analysis and discussion
   - Conclusion and implications
   - References

## Submission Guidelines
- Submit your paper as a PDF document
- Include a separate cover page
- Submit an annotated bibliography of your sources

## Grading Criteria
Your paper will be evaluated based on the rubric provided, with emphasis on research quality, critical analysis, and contribution to the field.`

            rubric = [
                {
                    criterion: "Research Quality",
                    description: "Depth and breadth of research",
                    points: 30,
                    levels: [
                        { level: "Excellent", description: "Exceptional research with diverse high-quality sources", points: 30 },
                        { level: "Good", description: "Thorough research with good sources", points: 24 },
                        { level: "Satisfactory", description: "Adequate research with acceptable sources", points: 18 },
                        { level: "Needs Improvement", description: "Limited research with some questionable sources", points: 12 },
                        { level: "Unsatisfactory", description: "Minimal research with poor sources", points: 6 },
                    ],
                },
                {
                    criterion: "Critical Analysis",
                    description: "Depth of analysis and critical thinking",
                    points: 25,
                    levels: [
                        { level: "Excellent", description: "Sophisticated analysis with original insights", points: 25 },
                        { level: "Good", description: "Strong analysis with good insights", points: 20 },
                        { level: "Satisfactory", description: "Basic analysis with some insights", points: 15 },
                        { level: "Needs Improvement", description: "Superficial analysis with few insights", points: 10 },
                        { level: "Unsatisfactory", description: "Descriptive rather than analytical", points: 5 },
                    ],
                },
                {
                    criterion: "Contribution to Field",
                    description: "Originality and significance of contribution",
                    points: 20,
                    levels: [
                        { level: "Excellent", description: "Significant original contribution to the field", points: 20 },
                        { level: "Good", description: "Meaningful contribution with some originality", points: 16 },
                        { level: "Satisfactory", description: "Some contribution with limited originality", points: 12 },
                        { level: "Needs Improvement", description: "Minor contribution with little originality", points: 8 },
                        { level: "Unsatisfactory", description: "No meaningful contribution", points: 4 },
                    ],
                },
                {
                    criterion: "Writing Quality",
                    description: "Organization, clarity, grammar, and style",
                    points: 15,
                    levels: [
                        { level: "Excellent", description: "Exceptionally well-written and organized", points: 15 },
                        { level: "Good", description: "Well-written with minor issues", points: 12 },
                        { level: "Satisfactory", description: "Adequately written with some issues", points: 9 },
                        { level: "Needs Improvement", description: "Poorly written with significant issues", points: 6 },
                        { level: "Unsatisfactory", description: "Major writing problems throughout", points: 3 },
                    ],
                },
                {
                    criterion: "Format & Citations",
                    description: "Adherence to formatting and citation requirements",
                    points: 10,
                    levels: [
                        { level: "Excellent", description: "Perfect formatting throughout", points: 10 },
                        { level: "Good", description: "Minor formatting issues", points: 8 },
                        { level: "Satisfactory", description: "Some formatting issues", points: 6 },
                        { level: "Needs Improvement", description: "Significant formatting issues", points: 4 },
                        { level: "Unsatisfactory", description: "Little to no adherence to required format", points: 2 },
                    ],
                },
            ]
    }

    // Incorporate learning objectives if provided
    if (learningObjectives && learningObjectives.length > 0) {
        description += "\n\n## Learning Objectives\nThis assignment addresses the following learning objectives:\n"
        learningObjectives.forEach((objective) => {
            description += `- ${objective}\n`
        })
    }

    return {
        title,
        description,
        rubric,
    }
}

