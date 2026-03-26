import { db } from "@/lib/db";
import { AIService } from "./ai.service";

export class JobService {
  static async getRecommendedJobs(studentId: string) {
    const student = await db.studentProfile.findUnique({
      where: { userId: studentId }
    });

    if (!student) return [];

    const jobs = await db.jobListing.findMany({
      where: { active: true },
      include: { company: true }
    });

    // Simple matching first
    const recommended = await Promise.all(
      jobs.map(async (job) => {
        const matchData = await AIService.matchJob(student, job.description);
        return {
          ...job,
          matchScore: matchData.match_score,
          explanation: matchData.explanation,
          missingSkills: matchData.missing_skills
        };
      })
    );

    return recommended.sort((a, b) => b.matchScore - a.matchScore);
  }

  static async applyToJob(studentId: string, jobId: string) {
    const student = await db.studentProfile.findUnique({
      where: { userId: studentId }
    });

    if (!student) throw new Error("Student profile not found");

    const matchData = await AIService.matchJob(student, (await db.jobListing.findUnique({ where: { id: jobId } }))?.description || "");

    return await db.application.create({
      data: {
        studentProfileId: student.id,
        jobId: jobId,
        status: "PENDING",
        matchScore: matchData.match_score,
        aiFeedback: matchData.explanation,
        resumeSummary: "AI parsed summary would go here."
      }
    });
  }
}
