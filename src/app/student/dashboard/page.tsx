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
  Star,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { label: "Applications", value: "12", icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Interviews", value: "3", icon: Clock, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Matches", value: "28", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Offers", value: "1", icon: CheckCircle, color: "text-orange-500", bg: "bg-orange-500/10" }
];

const recommendedJobs = [
  { id: 1, title: "Full Stack Developer", company: "TechNova Solutions", location: "Remote", salary: "$120k - $160k", match: 94, tags: ["React", "Node.js", "Prisma"] },
  { id: 2, title: "AI Engineer", company: "OpenAI Partners", location: "San Francisco", salary: "$180k - $220k", match: 88, tags: ["Python", "PyTorch", "Next.js"] },
  { id: 3, title: "Frontend Architect", company: "CloudScale Inc.", location: "Austin, TX", salary: "$140k - $180k", match: 82, tags: ["TypeScript", "Tailwind", "System Design"] }
];

export default function StudentDashboard() {
  return (
    <div className="p-10 space-y-10 bg-[#f8fafc] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Welcome back, <span className="text-blue-600 italic">Pruthviraj</span> 👋</h1>
          <p className="text-slate-500 mt-2 font-medium">Your AI-optimized career path is currently yielding high-match opportunities.</p>
        </motion.div>
        
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-blue-600/5 border border-blue-600/10 rounded-2xl flex items-center gap-2">
             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">AI Engine: Online</span>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all group cursor-default"
          >
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:rotate-6 transition-transform`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Recommended Jobs */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black flex items-center gap-3 text-slate-900 uppercase tracking-tighter">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <BrainCircuit className="w-6 h-6 text-blue-600" />
              </div>
              AI Curated Opportunities
            </h2>
            <Link href="/jobs" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">
              View All Openings
            </Link>
          </div>
          
          <div className="space-y-6">
            {recommendedJobs.map((job, idx) => (
              <motion.div 
                key={job.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue-400 transition-all group relative overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/5"
              >
                <div className="absolute top-0 right-0 p-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black border border-emerald-100 uppercase tracking-widest">
                    <Zap className="w-3 h-3 fill-emerald-600 animate-pulse" />
                    {job.match}% AI Match
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        <span className="flex items-center gap-2 text-slate-600 italic"><Briefcase className="w-3.5 h-3.5" /> {job.company}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {job.tags.map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right pr-4 hidden md:block">
                       <p className="text-[10px] font-black text-slate-400 uppercase">Starting From</p>
                       <p className="text-lg font-black text-blue-600">{job.salary}</p>
                    </div>
                    <Link href={`/jobs/${job.id}`} className="inline-flex items-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                      Apply Now <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Profile Strength & Activity */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
               <ShieldCheck className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Profile Integrity</h3>
              <div className="text-5xl font-black mb-6">85%</div>
              <div className="h-2.5 w-full bg-white/20 rounded-full mb-6 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1 }}
                  className="h-full bg-white rounded-full shadow-lg" 
                />
              </div>
              <p className="text-xs font-medium opacity-80 mb-8 leading-relaxed italic">
                Achieve 100% by completing your verified AI interview simulation.
              </p>
              <Link href="/profile" className="block w-full py-5 bg-white text-[#1e1b4b] text-center rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-50 transition-all shadow-xl active:scale-95">
                Optimize Now
              </Link>
            </div>
          </motion.div>

          <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden">
            <h3 className="text-lg font-black mb-8 text-slate-900 uppercase tracking-tighter">Timeline</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-100" />
              {[
                { activity: "Applied to Amazon", time: "2h ago", color: "bg-orange-500" },
                { activity: "Interview with Meta", time: "5h ago", color: "bg-blue-500" },
                { activity: "Viewed by Google", time: "1d ago", color: "bg-emerald-500" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 relative z-10">
                  <div className={`w-8 h-8 rounded-xl ${item.color} flex items-center justify-center text-white shadow-lg`}>
                     <Star className="w-4 h-4 fill-current" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">{item.activity}</span>
                    <span className="text-[10px] font-black text-slate-300 uppercase">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
