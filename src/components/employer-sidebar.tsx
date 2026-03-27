"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Plus, 
  Settings, 
  LogOut,
  Bot,
  BrainCircuit,
  TrendingUp
} from "lucide-react";

const employerRoutes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/employer/dashboard",
  },
  {
    label: "Candidate Pool",
    icon: Users,
    href: "/employer/candidates",
  },
  {
    label: "Manage Jobs",
    icon: Briefcase,
    href: "/employer/jobs",
  },
  {
    label: "Post New Role",
    icon: Plus,
    href: "/employer/post",
  },
  {
    label: "AI Analytics",
    icon: BrainCircuit,
    href: "/employer/analytics",
  },
  {
    label: "Hiring Trends",
    icon: TrendingUp,
    href: "/employer/trends",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/employer/settings",
  },
];

export function EmployerSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/employer/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Bot className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold">AI Hire <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded ml-2 uppercase tracking-widest">Employer</span></h1>
        </Link>
        <div className="space-y-1">
          {employerRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", pathname === route.href ? "text-blue-500" : "text-zinc-400")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400"
        >
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 text-zinc-400" />
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}
