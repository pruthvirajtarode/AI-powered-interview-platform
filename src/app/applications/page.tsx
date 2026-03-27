"use client";

import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Clock, CheckCircle, XCircle, AlertCircle, ChevronRight, Building2, MapPin, Zap } from "lucide-react";

const applications = [
  { id: 1, title: "Senior Full Stack Developer", company: "TechNova Solutions", location: "Remote", status: "interview", appliedDate: "2 days ago", matchScore: 94 },
  { id: 2, title: "AI/ML Engineer", company: "OpenAI Partners", location: "San Francisco", status: "pending", appliedDate: "3 days ago", matchScore: 88 },
  { id: 3, title: "Frontend Architect", company: "CloudScale Inc.", location: "Austin, TX", status: "accepted", appliedDate: "1 week ago", matchScore: 82 },
  { id: 4, title: "Product Engineer", company: "NextGen AI", location: "Remote", status: "rejected", appliedDate: "2 weeks ago", matchScore: 91 },
  { id: 5, title: "Backend Developer", company: "DataFlow Labs", location: "New York", status: "pending", appliedDate: "5 days ago", matchScore: 75 },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  pending: { label: "Under Review", color: "text-amber-700", bgColor: "bg-amber-50 border-amber-200", icon: Clock },
  interview: { label: "Interview Scheduled", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]", icon: Zap },
  accepted: { label: "Offer Received", color: "text-green-700", bgColor: "bg-green-50 border-green-200", icon: CheckCircle },
  rejected: { label: "Not Selected", color: "text-red-700", bgColor: "bg-red-50 border-red-200", icon: XCircle },
};

export default function ApplicationsPage() {
  const router = useRouter();

  const handleAction = (app: any) => {
    if (app.status === 'interview') {
        router.push(`/interview/${app.id}`);
    }
  };

  return (
    <div className="h-full flex overflow-hidden">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-72 flex-1 bg-[#f8fafc] min-h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto p-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">My Pipeline</h1>
              <p className="text-slate-500 mt-2 font-medium">Manage your active job applications and AI interview invites</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full border border-blue-600/20">
              <Zap className="w-3.5 h-3.5 animate-pulse" /> AI Sync Active
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Applied", value: "5", color: "text-slate-900" },
              { label: "Under Review", value: "2", color: "text-amber-600" },
              { label: "Interviews", value: "1", color: "text-blue-600" },
              { label: "Offers", value: "1", color: "text-green-600" }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all">
                <p className={`text-4xl font-black ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Application List */}
          <div className="space-y-6">
            {applications.map((app) => {
              const config = statusConfig[app.status];
              const StatusIcon = config.icon;
              return (
                <div 
                  key={app.id} 
                  onClick={() => handleAction(app)}
                  className={`bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 transition-all group overflow-hidden relative ${app.status === 'interview' ? 'cursor-pointer hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/5' : 'opacity-80'}`}
                >
                  {app.status === 'interview' && (
                    <div className="absolute top-0 right-0 px-8 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-3xl shadow-lg z-10 transition-transform group-hover:scale-105">Action Required: Interview</div>
                  )}
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-0">
                    <div className="flex items-center gap-8">
                      <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all ${app.status === 'interview' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-900/40 rotate-3 group-hover:rotate-0' : 'bg-slate-100 text-slate-400 grayscale'}`}>
                        <Building2 className="w-10 h-10" />
                      </div>
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-2xl font-black text-slate-900 leading-none group-hover:text-blue-600 transition-colors uppercase tracking-tight">{app.title}</h3>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-500/20">
                                <Zap className="w-3 h-3" /> {app.matchScore}% FIT
                            </div>
                        </div>
                        <div className="flex items-center gap-5 text-sm font-semibold text-slate-500">
                          <span className="text-slate-900 font-bold">{app.company}</span>
                          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" />{app.location}</span>
                          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                          <span className="italic opacity-70">Applied {app.appliedDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <span className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border shadow-sm transition-all ${config.bgColor} ${config.color} ${app.status === 'interview' ? 'animate-pulse ring-2 ring-blue-500/20 group-hover:scale-110' : ''}`}>
                        <StatusIcon className={`w-5 h-5 ${app.status === 'interview' ? 'text-blue-600' : ''}`} />
                        {config.label}
                      </span>
                      {app.status === 'interview' ? (
                        <div className="p-4 bg-blue-600 text-white rounded-full group-hover:translate-x-3 transition-all shadow-xl shadow-blue-900/30">
                            <ChevronRight className="w-6 h-6" />
                        </div>
                      ) : (
                        <ChevronRight className="w-7 h-7 text-slate-200" />
                      )}
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
