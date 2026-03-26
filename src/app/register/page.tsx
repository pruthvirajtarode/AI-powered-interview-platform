"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Bot, Mail, Lock, Loader2, User, Briefcase, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { status } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("STUDENT");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in, redirect to dashboard
  if (status === "authenticated") {
    router.push("/student/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to register");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/5 -z-10" />
        <div className="p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/30">
              <Bot className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
            <p className="text-slate-400 mt-2 text-sm text-center">Join the AI-powered interview portal today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" placeholder="John Doe" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" placeholder="name@example.com" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2 pb-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Account Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-slate-500" />
                </div>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none" required>
                  <option value="STUDENT">Student / Candidate</option>
                  <option value="EMPLOYER">Employer / Recruiter</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center disabled:opacity-70">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
