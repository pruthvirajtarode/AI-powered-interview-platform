import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { AIService } from "@/services/ai.service";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeText } = await req.json();

    const result = await AIService.analyzeResume(resumeText);
    
    // Update student profile with AI results
    await db.studentProfile.upsert({
      where: { userId: session.user.id },
      update: {
        skills: result.skills,
        bio: result.resume_summary
      },
      create: {
        userId: session.user.id,
        skills: result.skills,
        bio: result.resume_summary
      }
    });

    return NextResponse.json({ success: true, analysis: result });
  } catch (error) {
    return NextResponse.json({ error: "Resume parsing failed" }, { status: 500 });
  }
}
