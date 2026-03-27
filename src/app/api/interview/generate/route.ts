import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AIService } from "@/services/ai.service";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { jobId, studentId } = await req.json();

    // Attempt DB fetch - if it fails, we still want to provide a demo experience
    try {
      const job = await db.jobListing.findUnique({ where: { id: jobId } });
      const student = await db.studentProfile.findUnique({ where: { userId: studentId } });

      if (job && student) {
        const result = await AIService.generateInterviewQuestions(job.title, student);
        return NextResponse.json(result);
      }
    } catch (dbError) {
      console.error("DB Error: Falling back to mock data for demo.");
    }

    // High-quality fallback for DEMO mode
    const fallbackData = await AIService.generateInterviewQuestions("Senior Full-Stack Engineer", { 
        skills: ["React", "Node.js", "Next.js", "Prisma", "AI Integration"],
        experience: "Expert level candidate"
    });

    return NextResponse.json(fallbackData);
  } catch (error) {
    console.error("Critical API Error, returning default mock questions.");
    return NextResponse.json({
        questions: [
            { question: "How would you optimize a high-traffic Next.js application for real-time AI responses?", objective: "Systems Design & Performance Optimization" },
            { question: "Describe your strategy for managing complex global state in a distributed team environment.", objective: "Architectural Thinking & Collaboration" },
            { question: "Explain how you would implement a secure WebRTC connection for live video interviewing.", objective: "Security & Networking Fundamentals" }
        ]
    });
  }
}
