"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { User, Mail, MapPin, Briefcase, GraduationCap, FileText, Save, ChevronRight, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="h-full flex">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-72 flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
              <p className="text-slate-500 mt-1">Manage your personal information and resume</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="px-8 pb-8">
              <div className="flex items-end -mt-12 mb-6">
                <div className="w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
                  <User className="w-12 h-12 text-slate-400" />
                </div>
                <div className="ml-6 pb-1">
                  <h2 className="text-2xl font-bold text-slate-900">Pruthviraj Tarode</h2>
                  <p className="text-slate-500">Full Stack Developer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span>pruthvirajtarode456@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>Mumbai, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    <span>2+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <span>B.Tech Computer Science</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">AI Profile Score</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl font-bold text-blue-600">85</span>
                    <span className="text-blue-400 mb-1">/100</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
                    <div className="bg-blue-600 rounded-full h-2" style={{ width: "85%" }} />
                  </div>
                  <p className="text-sm text-blue-700">Add more skills to improve your score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "TypeScript", "Python", "Next.js", "PostgreSQL", "AWS", "Docker", "Git", "Tailwind CSS", "Prisma", "GraphQL"].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium border border-blue-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Resume Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Resume</h3>
              <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                <FileText className="w-4 h-4" />
                Upload New Resume
              </button>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Pruthviraj_Resume_2026.pdf</p>
                  <p className="text-sm text-slate-500">Uploaded 2 days ago • 245 KB</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                View <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
