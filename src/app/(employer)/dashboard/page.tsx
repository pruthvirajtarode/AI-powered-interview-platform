"use client";

import { 
  Plus, 
  Users, 
  Briefcase, 
  BarChart3, 
  TrendingUp,
  Search,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";

const employerStats = [
  { label: "Active Jobs", value: "8", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Total Candidates", value: "254", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Interviews Today", value: "5", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Hire Rate", value: "12%", icon: BarChart3, color: "text-orange-500", bg: "bg-orange-500/10" }
];

const jobsList = [
  { id: 1, title: "Lead Frontend Engineer", candidates: 42, new: 12, status: "Active" },
  { id: 2, title: "Product Designer", candidates: 18, new: 2, status: "Active" },
  { id: 3, title: "DevOps Specialist", candidates: 31, new: 0, status: "Closing Soon" }
];

export default function EmployerDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your hiring pipeline and candidate pool.</p>
        </div>
        <Button className="rounded-full gap-2 px-6">
          <Plus className="w-4 h-4" /> Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employerStats.map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-card border shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Manage Job Openings</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                className="pl-9 pr-4 py-2 bg-muted/30 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                placeholder="Search jobs..."
              />
            </div>
          </div>

          <div className="bg-card border rounded-3xl overflow-hidden shadow-sm">
            <div className="divide-y">
              {jobsList.map(job => (
                <div key={job.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {job.candidates} Applicants</span>
                      {job.new > 0 && <span className="text-primary font-medium">{job.new} New!</span>}
                      <span className="px-2 py-0.5 bg-secondary rounded text-xs">{job.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="w-4 h-4" /></Button>
                    <Button variant="outline" className="rounded-2xl gap-2 font-medium">
                      View Applicants <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-card border shadow-sm h-full">
            <h3 className="text-lg font-bold mb-4">Interviews Today</h3>
            <div className="space-y-6">
              {[
                { name: "Rahul S.", time: "10:30 AM", role: "Frontend Dev" },
                { name: "Ananya M.", time: "1:00 PM", role: "Product Designer" },
                { name: "Siddharth K.", time: "3:30 PM", role: "Lead Dev" }
              ].map((interview, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {interview.name.split(' ')[0][0]}{interview.name.split(' ')[1][0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm leading-tight">{interview.name}</p>
                    <p className="text-xs text-muted-foreground">{interview.role} • {interview.time}</p>
                  </div>
                  <Button size="sm" className="rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Join
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-6 text-primary font-bold">View Full Calendar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
