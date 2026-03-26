"use client";

import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  FileText, 
  TrendingUp,
  MapPin,
  ExternalLink,
  BrainCircuit,
  Star
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Applications Sent", value: "12", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Interviews Scheduled", value: "3", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Jobs Matched", value: "28", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Offers Received", value: "1", icon: CheckCircle, color: "text-orange-500", bg: "bg-orange-500/10" }
];

const recommendedJobs = [
  { id: 1, title: "Full Stack Developer", company: "TechNova Solutions", location: "Remote", salary: "$120k - $160k", match: 94, tags: ["React", "Node.js", "Prisma"] },
  { id: 2, title: "AI Engineer", company: "OpenAI Partners", location: "San Francisco", salary: "$180k - $220k", match: 88, tags: ["Python", "PyTorch", "Next.js"] },
  { id: 3, title: "Frontend Architect", company: "CloudScale Inc.", location: "Austin, TX", salary: "$140k - $180k", match: 82, tags: ["TypeScript", "Tailwind", "System Design"] }
];

export default function StudentDashboard() {
  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, Pruthviraj 👋</h1>
        <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your job search today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Jobs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
              <BrainCircuit className="w-6 h-6 text-blue-600" />
              AI Recommended Jobs
            </h2>
            <Link href="/jobs" className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all group relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-200">
                    <Star className="w-3 h-3 fill-green-600" />
                    {job.match}% Match
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700"><Briefcase className="w-4 h-4" /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                      <span className="font-semibold text-blue-600">{job.salary}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Link href="/jobs" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                      Apply Now <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Strength & Activity */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
            <h3 className="text-lg font-bold mb-2">Profile Strength: 85%</h3>
            <div className="h-2 w-full bg-white/20 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-white w-[85%] rounded-full" />
            </div>
            <p className="text-sm opacity-90 mb-4">Complete your AI interview simulation to reach 100%.</p>
            <Link href="/profile" className="block w-full py-2.5 bg-white text-blue-600 text-center rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
              Improve Profile
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold mb-4 text-slate-900">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { activity: "Applied to Amazon", time: "2h ago" },
                { activity: "Interview with Meta", time: "5h ago" },
                { activity: "Viewed by Google", time: "1d ago" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{item.activity}</span>
                  <span className="font-medium text-slate-900">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
