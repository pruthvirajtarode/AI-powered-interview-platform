"use client";

import { Sidebar } from "@/components/sidebar";
import { Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, Building2, MapPin } from "lucide-react";

const applications = [
  { id: 1, title: "Senior Full Stack Developer", company: "TechNova Solutions", location: "Remote", status: "interview", appliedDate: "2 days ago", matchScore: 94 },
  { id: 2, title: "AI/ML Engineer", company: "OpenAI Partners", location: "San Francisco", status: "pending", appliedDate: "3 days ago", matchScore: 88 },
  { id: 3, title: "Frontend Architect", company: "CloudScale Inc.", location: "Austin, TX", status: "accepted", appliedDate: "1 week ago", matchScore: 82 },
  { id: 4, title: "Product Engineer", company: "NextGen AI", location: "Remote", status: "rejected", appliedDate: "2 weeks ago", matchScore: 91 },
  { id: 5, title: "Backend Developer", company: "DataFlow Labs", location: "New York", status: "pending", appliedDate: "5 days ago", matchScore: 75 },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  pending: { label: "Under Review", color: "text-amber-700", bgColor: "bg-amber-50 border-amber-200", icon: Clock },
  interview: { label: "Interview Scheduled", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200", icon: AlertCircle },
  accepted: { label: "Offer Received", color: "text-green-700", bgColor: "bg-green-50 border-green-200", icon: CheckCircle },
  rejected: { label: "Not Selected", color: "text-red-700", bgColor: "bg-red-50 border-red-200", icon: XCircle },
};

export default function ApplicationsPage() {
  return (
    <div className="h-full flex">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-72 flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
            <p className="text-slate-500 mt-1">Track the status of all your job applications</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-3xl font-bold text-slate-900">5</p>
              <p className="text-sm text-slate-500">Total Applied</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-3xl font-bold text-amber-600">2</p>
              <p className="text-sm text-slate-500">Under Review</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">1</p>
              <p className="text-sm text-slate-500">Interviews</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-3xl font-bold text-green-600">1</p>
              <p className="text-sm text-slate-500">Offers</p>
            </div>
          </div>

          {/* Application List */}
          <div className="space-y-4">
            {applications.map((app) => {
              const config = statusConfig[app.status];
              const StatusIcon = config.icon;
              return (
                <div key={app.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{app.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <span>{app.company}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{app.location}</span>
                          <span>Applied {app.appliedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.bgColor} ${config.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {config.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
