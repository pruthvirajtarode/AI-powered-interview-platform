"use client";

import { 
  Plus, 
  Users, 
  Briefcase, 
  BarChart3, 
  TrendingUp,
  Search,
  ChevronRight,
  MoreVertical,
  BrainCircuit,
  Calendar,
  Clock,
  ExternalLink,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const employerStats = [
  { label: "Active Jobs", value: "8", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Total Candidates", value: "254", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Interviews Today", value: "5", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Hire Rate", value: "12%", icon: BarChart3, color: "text-orange-500", bg: "bg-orange-500/10" }
];

const candidatePipeline = [
  { name: "Rahul S.", role: "Senior Frontend Dev", score: 94, time: "10:30 AM", status: "Interviewing", avatar: "RS" },
  { name: "Ananya M.", role: "Product Designer", score: 88, time: "1:00 PM", status: "Scheduled", avatar: "AM" },
  { name: "Siddharth K.", role: "DevOps Lead", score: 91, time: "3:30 PM", status: "In Review", avatar: "SK" }
];

export default function EmployerDashboard() {
  return (
    <div className="p-10 space-y-10 bg-slate-50/50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Hiring Command Center</h1>
          <p className="text-slate-500 font-medium">Manage your elite talent pipeline with AI-driven precision.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl gap-2 font-bold px-6 py-6 border-slate-200 hover:bg-white shadow-sm transition-all">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button className="rounded-2xl gap-2 px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-900/10 transition-all active:scale-95">
            <Plus className="w-5 h-5" /> Post New Role
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {employerStats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
               <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+14.2% from last month</span>
               <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-slate-900">Talent Acquisition Pipeline</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                className="pl-12 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 w-80 shadow-sm"
                placeholder="Search candidates, roles, or scores..."
              />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/40">
            <div className="divide-y divide-slate-50">
              {candidatePipeline.map((candidate, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + (idx * 0.1) }}
                  className="p-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-blue-500/20">
                      {candidate.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{candidate.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
                        <span>{candidate.role}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Next: {candidate.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 flex items-center gap-6">
                    <div className="text-right">
                       <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block mb-1">AI Match Score</div>
                       <div className="text-2xl font-black text-slate-900">{candidate.score}<span className="text-slate-300 text-sm">%</span></div>
                    </div>
                    <div className="h-10 w-px bg-slate-100 hidden md:block" />
                    <Link href={`/interview/${idx + 101}`}>
                      <Button className="rounded-2xl gap-3 font-black text-xs uppercase tracking-widest px-8 h-14 bg-slate-900 hover:bg-blue-600 shadow-xl transition-all">
                        Launch Room <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 p-10 text-slate-50">
               <Calendar className="w-40 h-40" />
            </div>
            
            <div className="relative">
              <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-600/10 rounded-xl text-blue-600">
                   <Clock className="w-6 h-6" />
                </div>
                Live Queue
              </h3>
              <div className="space-y-8">
                {candidatePipeline.slice(0, 3).map((interview, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                      {interview.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-slate-900 uppercase tracking-tight leading-tight">{interview.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{interview.role} • {interview.time}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`} />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-12 py-7 rounded-2xl text-[10px] font-black uppercase tracking-widest border-slate-200 hover:bg-slate-50 transition-all gap-2">
                <BrainCircuit className="w-4 h-4" /> Full Talent Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
