import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { JobService } from "@/services/job.service";

// POST apply to a job (Student only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { jobId } = await req.json();

    const application = await JobService.applyToJob(session.user.id, jobId);
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Application failed" }, { status: 500 });
  }
}

// GET applications for the user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (session.user.role === "STUDENT") {
      const student = await db.studentProfile.findUnique({
        where: { userId: session.user.id }
      });
      const applications = await db.application.findMany({
        where: { studentProfileId: student?.id },
        include: { job: { include: { company: true } } }
      });
      return NextResponse.json(applications);
    }

    if (session.user.role === "EMPLOYER") {
      const company = await db.companyProfile.findUnique({
        where: { userId: session.user.id }
      });
      const applications = await db.application.findMany({
        where: { job: { companyId: company?.id } },
        include: { studentProfile: { include: { user: true } }, job: true }
      });
      return NextResponse.json(applications);
    }

    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
