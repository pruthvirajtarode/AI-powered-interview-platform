import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Bot, 
  Briefcase, 
  Code, 
  FileText, 
  Mic, 
  ShieldCheck, 
  Video 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-morphism border-b bg-background/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">AI Hire</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#solutions" className="text-sm font-medium hover:text-primary transition-colors">Solutions</Link>
            <Link href="#enterprise" className="text-sm font-medium hover:text-primary transition-colors">Enterprise</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
          </div>
          
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen AI Interviewing Platform
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Hire Better with <span className="gradient-text">AI Intelligence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              The all-in-one platform for AI-powered resume parsing, job matching, and automated video interviews. Scale your hiring without losing the human touch.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg gap-2">
                  Start Recruiting <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg gap-2">
                  Book a Demo <Video className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Powerful AI Features</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our suite of tools leverages advanced LLMs to transform your recruitment process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Resume Parsing",
                  description: "Automatically extract skills, experience, and contact info from any resume format with 99% accuracy.",
                  icon: FileText,
                  color: "blue"
                },
                {
                  title: "Smart Job Matching",
                  description: "Get precise matching scores between candidates and job requirements based on deep contextual analysis.",
                  icon: Briefcase,
                  color: "purple"
                },
                {
                  title: "Automated Interviews",
                  description: "Deploy AI agents to conduct initial screening interviews with dynamic questioning based on candidate responses.",
                  icon: Mic,
                  color: "green"
                },
                {
                  title: "Live Coding Sandbox",
                  description: "Interactive coding environments integrated directly into the video interview platform for real-time assessment.",
                  icon: Code,
                  color: "indigo"
                },
                {
                  title: "Fraud Detection",
                  description: "Monitor eye movement and tab switching during technical tests to ensure assessment integrity.",
                  icon: ShieldCheck,
                  color: "red"
                },
                {
                  title: "Video Analytics",
                  description: "Advanced sentiment analysis and keyword tracking across video interview recordings.",
                  icon: Video,
                  color: "orange"
                }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-background border hover:border-primary/50 transition-all hover:shadow-xl">
                  <div className={`w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="font-bold">AI Hire</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 AI Hire Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-sm hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="text-sm hover:text-primary transition-colors">Github</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
