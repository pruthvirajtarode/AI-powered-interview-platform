"use client";

import { 
  Mic, 
  Video, 
  Settings, 
  PhoneOff, 
  Code as CodeIcon, 
  FileText, 
  MessageSquare,
  Layout,
  BrainCircuit,
  Terminal,
  Play,
  CheckCircle2,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewRoom({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("video");
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/interview/generate", {
          method: "POST",
          body: JSON.stringify({ jobId: "demo", studentId: "demo" }),
        });
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Failed to load AI questions");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex] || {
    question: "Implement a robust data structure for real-time order tracking.",
    objective: "Assess systems design thinking and state management skills."
  };

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-20 px-10 border-b border-white/5 flex items-center justify-between bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/20 rounded-xl">
               <BrainCircuit className="w-6 h-6 text-blue-500" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">AI Hire Room</span>
          </div>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-2 px-4 py-1.5 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-red-500/20 animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Recording Active
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-bold text-white">Technical Interview: Principal Engineer</p>
            <p className="text-[10px] text-slate-500 font-mono">Session ID: {params.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-2xl border-white/10 hover:bg-white/5 text-white"><Settings className="w-5 h-5" /></Button>
            <Button variant="destructive" className="rounded-2xl gap-2 font-bold px-8 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20 transition-all active:scale-95">
              <PhoneOff className="w-4 h-4" /> End Session
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Video Streams */}
        <div className="flex-1 p-8 grid grid-rows-2 gap-8 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
          {/* Interviewer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-slate-900/40 border border-white/5 group shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent flex items-end p-8">
               <div className="flex items-center gap-3">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="font-bold text-sm tracking-wide">Sarah Jenkins (Principal Interviewer)</span>
               </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-black text-4xl text-white shadow-2xl">SJ</div>
            </div>
             <div className="absolute top-8 right-8 px-4 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 text-[10px] font-bold text-blue-400">REMOTE CONNECTION STABLE</div>
          </motion.div>

          {/* Candidate */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-slate-900/40 border border-white/5 group shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent flex items-end p-8">
              <div className="flex items-center gap-3">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="font-bold text-sm tracking-wide">Candidate: Pruthviraj Tarode (You)</span>
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-center">
               <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center font-black text-4xl text-white shadow-2xl">PT</div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-950/80 backdrop-blur-2xl p-3 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Button size="icon" variant="ghost" className="w-12 h-12 rounded-2xl hover:bg-white/10 text-white"><Mic className="w-5 h-5" /></Button>
              <Button size="icon" variant="ghost" className="w-12 h-12 rounded-2xl hover:bg-white/10 text-white"><Video className="w-5 h-5" /></Button>
              <div className="w-px h-8 bg-white/10 mx-1" />
              <Button size="icon" variant="ghost" className={`w-12 h-12 rounded-2xl transition-all ${activeTab === 'code' ? 'bg-blue-600 text-white' : 'hover:bg-white/10 text-white'}`} onClick={() => setActiveTab('code')}><CodeIcon className="w-5 h-5" /></Button>
              <Button size="icon" variant="ghost" className="w-12 h-12 rounded-2xl hover:bg-white/10 text-white"><MessageSquare className="w-5 h-5" /></Button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Tools Panel */}
        <div className="w-[580px] bg-slate-950/80 border-l border-white/5 p-8 flex flex-col gap-8 backdrop-blur-3xl">
          <div className="flex bg-slate-900/50 p-1.5 rounded-[1.5rem] border border-white/5">
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'code' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'text-slate-500 hover:text-white'}`}
            >
              <Terminal className="w-4 h-4" /> Code Editor
            </button>
            <button 
              onClick={() => setActiveTab('prompt')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'prompt' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'text-slate-500 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" /> AI Question Bank
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'code' ? (
              <motion.div 
                key="code"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 rounded-[2rem] bg-[#020617] border border-white/5 overflow-hidden flex flex-col shadow-2xl relative"
              >
                <div className="px-6 py-4 bg-slate-900/80 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-4 text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest italic">main.js (Node.js v20.x)</span>
                  </div>
                  <Button size="sm" className="h-9 px-6 text-[10px] font-black rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition-all uppercase tracking-widest gap-2">
                    <Play className="w-3 h-3" /> Execute
                  </Button>
                </div>
                <div className="flex-1 p-8 font-mono text-sm leading-relaxed overflow-auto group bg-mesh">
                  <div className="flex gap-6">
                    <div className="text-slate-700 select-none text-right w-6 space-y-1">
                      {Array.from({length: 12}).map((_, i) => <div key={i}>{i+1}</div>)}
                    </div>
                    <div className="flex-1 text-slate-400">
                      <span className="text-purple-400 font-bold italic">const</span> <span className="text-emerald-400 font-bold">engine</span> = <span className="text-purple-400">require</span>(<span className="text-amber-300">'@core/ai-engine'</span>);<br />
                      <br />
                      <span className="text-slate-600 italic">// Logic for real-time order tracking</span><br />
                      <span className="text-blue-500 font-bold">async function</span> <span className="text-blue-300 font-bold underline decoration-blue-900 underline-offset-4">processApplication</span>(data) &#123;<br />
                      &nbsp;&nbsp;<span className="text-purple-400">try</span> &#123;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// Your implementation here...</span><br />
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> await engine.<span className="text-emerald-400">match</span>(data);<br />
                      &nbsp;&nbsp;&#125; <span className="text-purple-400">catch</span>(e) &#123;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;console.<span className="text-blue-400">error</span>(e);<br />
                      &nbsp;&nbsp;&#125;<br />
                      &#125;
                    </div>
                  </div>
                </div>
                
                {/* AI Overlay Checkmark */}
                <div className="absolute bottom-6 right-6 p-4 bg-blue-600/10 backdrop-blur-md rounded-2xl border border-blue-600/20 flex items-center gap-3">
                   <TrendingUp className="w-4 h-4 text-blue-500" />
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">AI: Logic Confidence 92%</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="prompt"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-8"
              >
                {/* AI Stats Card */}
                <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-8 rounded-[2rem] border border-blue-600/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:scale-110 transition-transform">
                     <BrainCircuit className="w-24 h-24" />
                  </div>
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-3">AI Matching Score</h4>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-6xl font-black text-white">94</span>
                    <span className="text-xl font-black text-blue-500 pb-2">%</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed max-w-[80%]">
                    This candidate exceeds benchmarks in distributed systems and cloud architecture based on resume-to-role mapping.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white px-2">Interview Tasks</h3>
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-slate-500">TASK {currentQuestionIndex + 1} OF {questions.length || 1}</span>
                  </div>

                  {loading ? (
                    <div className="h-40 flex items-center justify-center border border-dashed border-white/10 rounded-3xl">
                       <p className="text-xs font-black text-slate-500 animate-pulse uppercase tracking-widest">Generating AI Questions...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 space-y-6 group hover:border-blue-500/20 transition-all">
                        <div className="flex items-start gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 font-black text-lg shadow-inner">
                            {currentQuestionIndex + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight">{currentQuestion.question}</h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
                              {currentQuestion.objective}
                            </p>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-black text-slate-500 uppercase">Status: Live Assessment</span>
                          </div>
                          {questions.length > 1 && (
                             <Button 
                               onClick={() => setCurrentQuestionIndex((prev) => (prev + 1) % questions.length)}
                               variant="ghost" className="h-10 rounded-xl gap-2 text-xs font-black text-blue-500 hover:bg-blue-600/10 group/btn"
                             >
                               Next Challenge <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                             </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Evaluation Tips */}
                  <div className="p-6 rounded-2xl bg-[#020617] border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-1.5 bg-purple-600/20 rounded-lg text-purple-500">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Interviewer Tips</span>
                    </div>
                    <ul className="space-y-3">
                       {[
                         "Ask about scalability bottlenecks in their code.",
                         "Observe how they handle edge-case error injections.",
                         "Evaluate their naming conventions for readability."
                       ].map((tip, i) => (
                         <li key={i} className="flex gap-3 text-xs text-slate-500">
                            <span className="text-slate-800">•</span>
                            {tip}
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
