import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET all active jobs
export async function GET() {
  try {
    const jobs = await db.jobListing.findMany({
      where: { active: true },
      include: {
        company: {
          select: {
            companyName: true,
            logoUrl: true,
            website: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST a new job (Employer only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "EMPLOYER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, requirements, salaryRange, location } = await req.json();

    const company = await db.companyProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!company) {
      return NextResponse.json({ error: "Company profile not found" }, { status: 404 });
    }

    const job = await db.jobListing.create({
      data: {
        title,
        description,
        requirements,
        salaryRange,
        location,
        companyId: company.id
      }
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
