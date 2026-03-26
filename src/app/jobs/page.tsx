"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Search, MapPin, Briefcase, DollarSign, Clock, ChevronRight, Filter, Building2 } from "lucide-react";

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
    <div className="h-full flex">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-72 flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Find Jobs</h1>
            <p className="text-slate-500 mt-1">Discover AI-matched opportunities tailored for you</p>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Job title, company, or keyword..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
            <div className="relative flex-1 md:max-w-[250px]">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} placeholder="Location..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          <p className="text-sm text-slate-500 mb-4">{filteredJobs.length} jobs found</p>

          {/* Job Cards */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                        <p className="text-slate-500 text-sm">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{job.type}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.posted}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">⭐ {job.match}% Match</span>
                    <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors mt-2">
                      Apply Now <ChevronRight className="w-4 h-4" />
                    </button>
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
