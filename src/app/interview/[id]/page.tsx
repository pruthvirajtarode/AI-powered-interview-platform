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

  const [isAnswering, setIsAnswering] = useState(false);
  const [candidateTranscript, setCandidateTranscript] = useState("");
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

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

  const handleGiveAnswer = () => {
    setIsAnswering(true);
    setCandidateTranscript("Transcribing live...");
    
    // Simulate speaking phase
    setTimeout(() => {
        setCandidateTranscript("I would use a Redis-based cache to store active order IDs and then use WebSockets for real-time updates to the client...");
        
        // Simulate AI thinking and responding
        setTimeout(() => {
            setIsAnswering(false);
            setAiFeedback("Excellent point about WebSockets! That's precisely what we look for. Let's explore your scaling strategy next.");
            
            // Auto transition or show feedback for 4s
            setTimeout(() => {
                setAiFeedback(null);
                setCandidateTranscript("");
            }, 5000);
        }, 2000);
    }, 3000);
  };

  const currentQuestion = questions[currentQuestionIndex] || {
    question: "Imagine you're designing a high-traffic system. How would you handle 10k concurrent requests per second?",
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
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 uppercase tracking-widest">AI Hire Elite</span>
          </div>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-2 px-4 py-1.5 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-red-500/20">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            Live Assessment Room
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-bold text-white uppercase tracking-tight">Technical Interview: {params.id}</p>
            <p className="text-[10px] text-slate-500 font-mono italic opacity-50">Sarah Jenkins • Session ID: {Math.random().toString(36).substring(7)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" className="rounded-2xl gap-2 font-black text-xs uppercase tracking-widest px-8 h-12 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-900/20 transition-all active:scale-95">
              <PhoneOff className="w-4 h-4" /> End Session
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Video Streams */}
        <div className="flex-[1.5] p-10 grid grid-rows-2 gap-10 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent">
          {/* Interviewer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-[3rem] overflow-hidden bg-slate-900/40 border border-white/5 group shadow-[0_45px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
               <img 
                 src="/images/interviewer.png" 
                 alt="Sarah Jenkins" 
                 className={`w-full h-full object-cover transition-all duration-[10s] grayscale-[0.2] contrast-[1.1] ${aiFeedback ? 'brightness-[1] scale-105' : 'brightness-[0.7]'}`} 
               />
               <div className={`absolute inset-0 bg-blue-600/5 animate-pulse mix-blend-overlay ${aiFeedback ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            
            {/* AI Speech Dialogue */}
            <AnimatePresence>
               {(loading || aiFeedback || (!isAnswering && !candidateTranscript)) && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] z-20"
                 >
                    <div className="bg-blue-600 shadow-[0_25px_80px_-15px_rgba(37,99,235,0.6)] p-8 rounded-[2.5rem] border border-blue-400/40 text-center relative backdrop-blur-3xl">
                       <div className="absolute -top-1.5 right-6 px-3 py-1 bg-white/20 rounded-full text-white text-[9px] font-black uppercase tracking-[0.2em] border border-white/10">AI Voice Engine</div>
                       <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-600 rotate-45" />
                       <div className="flex items-center justify-center gap-2 mb-4">
                          {[1,2,3,4,5,6,7].map(i => (
                             <motion.div 
                               key={i}
                               animate={{ height: (loading || aiFeedback) ? [12, 32, 12] : [8, 12, 8] }}
                               transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                               className="w-1.5 bg-white/90 rounded-full"
                             />
                          ))}
                       </div>
                       <p className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-2 italic underline underline-offset-4">
                        {loading ? 'Initializing Assessment...' : (aiFeedback ? 'Sarah Jenkins (AI)' : 'Direct Question')}
                       </p>
                       <p className="text-white text-sm font-bold leading-relaxed tracking-tight group-hover:scale-105 transition-transform duration-500">
                         "{loading ? 'Generating tailored challenge...' : (aiFeedback || currentQuestion.question)}"
                       </p>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent flex items-end p-12 z-10">
               <div className="flex items-center gap-5">
                 <div className="w-5 h-5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                 <div>
                   <span className="font-extrabold text-xl tracking-wide block leading-none text-white">Sarah Jenkins</span>
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mt-2 block italic opacity-80 decoration-blue-500 underline underline-offset-4">Direct AI Interaction Mode</span>
                 </div>
               </div>
            </div>
             <div className="absolute top-10 right-10 px-6 py-3 bg-black/60 backdrop-blur-3xl rounded-[2rem] border border-white/10 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] shadow-2xl z-10">
               ULTRA-HD • REAL-TIME AI
             </div>
          </motion.div>

          {/* Candidate */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`relative rounded-[3rem] overflow-hidden border transition-all duration-700 ${isAnswering ? 'border-blue-500/50 scale-[1.02] shadow-[0_0_80px_rgba(37,99,235,0.2)]' : 'bg-slate-900/40 border-white/5 shadow-[0_45px_100px_-20px_rgba(0,0,0,0.8)]'}`}
          >
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
               <img 
                 src="/images/candidate.png" 
                 alt="Candidate" 
                 className={`w-full h-full object-cover grayscale-[0.2] transition-transform duration-[15s] ${isAnswering ? 'scale-110' : ''}`}
               />
            </div>

            {/* Candidate Transcript Overlay */}
            <AnimatePresence>
               {(isAnswering || candidateTranscript) && (
                 <motion.div 
                   initial={{ opacity: 0, y: -20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="absolute top-12 left-1/2 -translate-x-1/2 w-[80%] z-20"
                 >
                    <div className="bg-slate-950/80 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-2xl text-center">
                       <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.2em] mb-2">{isAnswering ? 'LIVE TRANSCRIPTION' : 'YOUR RESPONSE'}</p>
                       <p className="text-slate-300 text-xs font-bold leading-relaxed">{candidateTranscript}</p>
                       {isAnswering && (
                         <div className="flex gap-1 justify-center mt-3">
                            {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
                         </div>
                       )}
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent flex items-end p-12 z-10">
              <div className="flex items-center gap-5">
                 <div className="w-5 h-5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                 <div>
                   <span className="font-extrabold text-xl tracking-wide block leading-none text-white">Pruthviraj Tarode</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2 block italic opacity-60">Candidate • Final Screening</span>
                 </div>
              </div>
            </div>
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-slate-950/90 backdrop-blur-3xl p-5 rounded-[2.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,1)] z-20">
              <Button size="icon" variant="ghost" className="w-16 h-16 rounded-full hover:bg-white/10 text-white bg-slate-900/50"><Mic className="w-7 h-7" /></Button>
              <Button size="icon" variant="ghost" className="w-16 h-16 rounded-full hover:bg-white/10 text-white bg-slate-900/50"><Video className="w-7 h-7" /></Button>
              <div className="w-px h-10 bg-white/10 mx-2" />
              <Button 
                onClick={handleGiveAnswer}
                disabled={isAnswering || !!aiFeedback}
                className="h-16 px-10 rounded-[2rem] bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.3em] gap-3 shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:grayscale transition-all active:scale-95"
              >
                {isAnswering ? <Zap className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
                {isAnswering ? 'Listening...' : 'Give Live Answer'}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Tools Panel */}
        <div className="w-[650px] bg-slate-950/90 border-l border-white/5 p-10 flex flex-col gap-10 backdrop-blur-3xl relative">
          <div className="absolute top-0 right-0 p-20 text-blue-900/5 pointer-events-none">
             <Bot className="w-[400px] h-[400px]" />
          </div>

          <div className="flex bg-slate-900/60 p-2 rounded-[2rem] border border-white/5 relative z-10">
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'code' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-900/40 border border-blue-400/30' : 'text-slate-500 hover:text-white'}`}
            >
              <Terminal className="w-4 h-4" /> Code Sandbox
            </button>
            <button 
              onClick={() => setActiveTab('prompt')}
              className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'prompt' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-900/40 border border-blue-400/30' : 'text-slate-500 hover:text-white'}`}
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
                className="flex-1 rounded-[2.5rem] bg-[#020617] border border-white/5 overflow-hidden flex flex-col shadow-2xl shadow-black relative z-10"
              >
                <div className="px-8 py-5 bg-slate-900/80 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-5 text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest italic opacity-50">sandbox.env • NODE v20</span>
                  </div>
                  <Button size="sm" className="h-10 px-8 text-[10px] font-black rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition-all uppercase tracking-widest gap-3 active:scale-95">
                    <Play className="w-4 h-4" /> Run Code
                  </Button>
                </div>
                <div className="flex-1 p-10 font-mono text-[13px] leading-loose overflow-auto group bg-mesh">
                  <div className="flex gap-8">
                    <div className="text-slate-800 select-none text-right w-8 space-y-1 font-bold opacity-30">
                      {Array.from({length: 15}).map((_, i) => <div key={i}>{i+1}</div>)}
                    </div>
                    <div className="flex-1 text-slate-400">
                      <span className="text-purple-400 font-black">const</span> <span className="text-blue-400 font-black">Application</span> = <span className="text-purple-400">async</span> () ={">"} &#123;<br />
                      &nbsp;&nbsp;<span className="text-slate-600 italic">// AI-Driven Real-time Architecture</span><br />
                      &nbsp;&nbsp;<span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> ai.<span className="text-emerald-400 font-bold italic">evaluate</span>(&#123;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;performance: <span className="text-amber-300 font-bold">'HIGH_MATCH'</span>,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;logic: <span className="text-amber-300 font-bold">'PREMIUM'</span><br />
                      &nbsp;&nbsp;&#125;);<br />
                      <br />
                      &nbsp;&nbsp;<span className="text-purple-400">return</span> response;<br />
                      &#125;;
                    </div>
                  </div>
                </div>
                
                {/* AI Overlay Checkmark */}
                <div className="absolute bottom-8 right-8 p-5 bg-blue-600/10 backdrop-blur-3xl rounded-[2rem] border border-blue-600/20 flex items-center gap-4 group">
                   <TrendingUp className="w-5 h-5 text-blue-500 group-hover:scale-125 transition-transform" />
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Logic Matching Score</span>
                      <span className="text-xl font-black text-white">96.8%</span>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="prompt"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-10 relative z-10 px-2"
              >
                {/* AI Stats Card */}
                <div className="bg-gradient-to-br from-blue-600/20 via-blue-900/5 to-transparent p-10 rounded-[3rem] border border-blue-600/20 relative overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                  <div className="absolute -top-10 -right-10 p-10 text-blue-500/5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000">
                     <BrainCircuit className="w-56 h-56" />
                  </div>
                  <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Total Match Confidence</h4>
                  <div className="flex items-end gap-5 mb-6">
                    <span className="text-7xl font-black text-white tracking-tighter">94</span>
                    <span className="text-2xl font-black text-blue-500 pb-3 h-full flex items-end tracking-widest">%</span>
                  </div>
                  <p className="text-sm text-slate-400 font-bold leading-relaxed max-w-[90%] italic opacity-80">
                    Candidate's system design logic ranks in the top 1% for current architectural benchmarks.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Current Task Pipeline</h3>
                    <span className="px-5 py-2 bg-blue-600/10 border border-blue-600/20 rounded-2xl text-[10px] font-black text-blue-500 uppercase tracking-widest">TASK {currentQuestionIndex + 1} / {questions.length || 3}</span>
                  </div>

                  {loading ? (
                    <div className="h-56 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[2.5rem] bg-slate-900/20 gap-4">
                       <Zap className="w-10 h-10 text-blue-600 animate-pulse" />
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest animate-pulse">Running AI Synthesis Algorithms...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 space-y-8 group hover:border-blue-500/30 transition-all shadow-2xl relative">
                        {isAnswering && <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest animate-pulse border-4 border-slate-950">Active Assessment</div>}
                        
                        <div className="flex items-start gap-8">
                          <div className="w-16 h-16 rounded-[1.8rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-900/20 group-hover:scale-110 transition-transform">
                            {currentQuestionIndex + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-4 leading-snug tracking-tight">{currentQuestion.question}</h3>
                            <div className="flex items-center gap-3">
                               <div className="p-2 bg-white/5 rounded-xl text-slate-500">
                                  <CheckCircle2 className="w-4 h-4" />
                               </div>
                               <p className="text-xs text-slate-500 font-black uppercase tracking-widest italic">
                                 Goal: {currentQuestion.objective}
                               </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-Time Evaluation Pending</span>
                          </div>
                          {questions.length > 1 && (
                             <Button 
                               onClick={() => {
                                  setAiFeedback(null);
                                  setCandidateTranscript("");
                                  setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
                               }}
                               variant="ghost" className="h-12 rounded-2xl gap-3 text-[10px] font-black text-blue-500 hover:bg-blue-600/10 hover:text-white group/btn uppercase tracking-widest px-8"
                             >
                               Next Challenge <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                             </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Interviewer Tips */}
                  <div className="p-8 rounded-[2.5rem] bg-[#020617] border border-white/5 relative overflow-hidden group">
                    <div className="absolute -bottom-10 -left-10 text-white/5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                       <ShieldCheck className="w-40 h-40" />
                    </div>
                    <div className="flex items-center gap-4 mb-6 relative z-10">
                      <div className="p-2.5 bg-blue-600/10 rounded-xl text-blue-600">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Interviewer Assist Protocol</span>
                    </div>
                    <ul className="space-y-4 relative z-10">
                       {[
                         "Explore their recent experience with GraphQL federation.",
                         "Challenge them on the 'Write' path scalability of their answer.",
                         "Observe latency trade-offs mentioned during the explanation."
                       ].map((tip, i) => (
                         <li key={i} className="flex gap-4 text-xs text-slate-500 font-bold leading-relaxed px-2">
                            <span className="text-blue-600 font-black">•</span>
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
