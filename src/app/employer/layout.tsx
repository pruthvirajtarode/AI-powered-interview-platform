import { EmployerSidebar } from "@/components/employer-sidebar";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-slate-900 overflow-hidden">
        <EmployerSidebar />
      </div>
      <main className="md:pl-72 flex-1 h-full overflow-y-auto bg-slate-50/50">
        {children}
      </main>
    </div>
  );
}
