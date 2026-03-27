import Link from "next/link";

const jobListings = [
  { id: 1, title: "Senior Full Stack Developer", company: "TechNova Solutions", location: "Remote", salary: "$120k - $160k", type: "Full-time", posted: "2 days ago", tags: ["React", "Node.js", "Prisma"], match: 94 },
  { id: 2, title: "AI/ML Engineer", company: "OpenAI Partners", location: "San Francisco", salary: "$180k - $220k", type: "Full-time", posted: "1 day ago", tags: ["Python", "PyTorch", "Next.js"], match: 88 },
  { id: 3, title: "Frontend Architect", company: "CloudScale Inc.", location: "Austin, TX", salary: "$140k - $180k", type: "Full-time", posted: "3 days ago", tags: ["React", "TypeScript", "Design Systems"], match: 82 },
  { id: 4, title: "DevOps Engineer", company: "InfraStack", location: "Remote", salary: "$130k - $170k", type: "Full-time", posted: "5 days ago", tags: ["AWS", "Docker", "Kubernetes"], match: 78 },
  { id: 5, title: "Backend Developer", company: "DataFlow Labs", location: "New York", salary: "$110k - $150k", type: "Full-time", posted: "1 week ago", tags: ["Node.js", "PostgreSQL", "GraphQL"], match: 75 },
  { id: 6, title: "Product Engineer", company: "NextGen AI", location: "Remote", salary: "$125k - $165k", type: "Full-time", posted: "4 days ago", tags: ["Next.js", "React", "Tailwind"], match: 91 },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="h-full flex overflow-hidden">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-72 flex-1 bg-slate-50 min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8 lg:p-12">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Discover Opportunities</h1>
              <p className="text-slate-500 mt-2 font-medium">AI-ranked job matches based on your unique skill profile.</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-5 mb-10 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by role, company, or stack..." className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-medium" />
            </div>
            <div className="relative flex-1 md:max-w-[280px]">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} placeholder="Location preference..." className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-medium" />
            </div>
            <button className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all font-black text-xs uppercase tracking-widest shadow-lg shadow-slate-900/10">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="flex items-center justify-between mb-6 px-2">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{filteredJobs.length} Positions Available</p>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all group relative">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-5 mb-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{job.title}</h3>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-bold text-slate-500 italic">
                      <span className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg"><MapPin className="w-4 h-4 text-blue-500" />{job.location}</span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg"><DollarSign className="w-4 h-4 text-emerald-500" />{job.salary}</span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg"><Briefcase className="w-4 h-4 text-purple-500" />{job.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {job.tags.map((tag) => (
                        <span key={tag} className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 border-t lg:border-t-0 lg:border-l border-slate-50 pt-6 lg:pt-0 lg:pl-10">
                    <div className="text-left lg:text-right">
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">AI Recommendation</span>
                       <span className="text-3xl font-black text-slate-900">{job.match}<span className="text-slate-300 text-sm">%</span></span>
                    </div>
                    <Link href={`/interview/demo-${job.id}`}>
                      <button className="flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-900/10 active:scale-95 group/btn">
                        Apply Now <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
