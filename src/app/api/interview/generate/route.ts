import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AIService } from "@/services/ai.service";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { jobId, studentId } = await req.json();

    const job = await db.jobListing.findUnique({ where: { id: jobId } });
    const student = await db.studentProfile.findUnique({ where: { userId: studentId } });

    if (!job || !student) {
        // Fallback for demo if IDs aren't provided
        const result = await AIService.generateInterviewQuestions("Senior Software Engineer", { 
            skills: ["React", "Node.js", "TypeScript"],
            experience: "5 years"
        });
        return NextResponse.json(result);
    }

    const result = await AIService.generateInterviewQuestions(job.title, student);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
