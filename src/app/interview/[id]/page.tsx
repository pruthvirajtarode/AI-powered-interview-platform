"use client";

import { 
  Zap,
  ShieldCheck,
  Bot,
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
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);

  // Live Voice Synthesis
  const speakAI = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        // Find a professional female voice if available
        const voices = window.speechSynthesis.getVoices();
        const sarahVoice = voices.find(v => v.name.includes("Female") || v.name.includes("Google US English")) || voices[0];
        if (sarahVoice) utterance.voice = sarahVoice;
        window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/interview/generate", {
          method: "POST",
          body: JSON.stringify({ jobId: "demo", studentId: "demo" }),
        });
        const data = await res.json();
        setQuestions(data.questions || []);
        
        // Speak the first question
        if (data.questions && data.questions[0]) {
            setTimeout(() => speakAI(data.questions[0].question), 1000);
        }
      } catch (err) {
        console.error("Failed to load AI questions");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
    
    return () => {
        if (typeof window !== "undefined") window.speechSynthesis.cancel();
        if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, []);

  const toggleCamera = async () => {
    if (isCameraOn) {
        if (stream) stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setIsCameraOn(false);
    } else {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 1280, height: 720 },
                audio: isMicOn
            });
            setStream(mediaStream);
            setIsCameraOn(true);
            
            // Link stream to video element
            setTimeout(() => {
                const videoElement = document.getElementById('candidate-video') as HTMLVideoElement;
                if (videoElement) videoElement.srcObject = mediaStream;
            }, 100);
        } catch (err) {
            console.error("Live Video Failed", err);
        }
    }
  };

  const handleGiveAnswer = () => {
    setIsAnswering(true);
    setCandidateTranscript("Transcribing live...");
    
    setTimeout(() => {
        const transcript = "I would implement a highly scaleable architecture using Redis for caching and WebSockets for real-time bidirectional communication between the app and server.";
        setCandidateTranscript(transcript);
        
        setTimeout(() => {
            setIsAnswering(false);
            const feedback = "Excellent architectural thinking! WebSockets are perfect for that. Let's move to your second challenge.";
            setAiFeedback(feedback);
            speakAI(feedback);
            
            setTimeout(() => {
                setAiFeedback(null);
                setCandidateTranscript("");
            }, 6000);
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
          <div className="flex items-center gap-2 px-4 py-1.5 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            Live Assessment Mode
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-bold text-white uppercase tracking-tight">Technical Interview: Principal Engineer</p>
            <p className="text-[10px] text-slate-500 font-mono italic opacity-50">Sarah Jenkins • Version 4.2.0 Demo</p>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" className="rounded-2xl gap-2 font-black text-xs uppercase tracking-widest px-8 h-12 bg-red-600 hover:bg-red-700 shadow-xl shadow-red-900/30 transition-all active:scale-95">
              <PhoneOff className="w-4 h-4" /> End Session
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Video Streams */}
        <div className="flex-[1.8] p-10 grid grid-rows-2 gap-10 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent">
          {/* Interviewer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative rounded-[3.5rem] overflow-hidden bg-slate-900/40 border border-white/10 group shadow-[0_55px_120px_-20px_rgba(0,0,0,0.9)] transition-all duration-700 ${aiFeedback ? 'ring-2 ring-blue-500/50' : ''}`}
          >
            <div className="absolute inset-0 z-0 select-none pointer-events-none transition-all duration-500">
               <img 
                 src="/images/interviewer.png" 
                 alt="Sarah Jenkins" 
                 className={`w-full h-full object-cover transition-all duration-[20s] grayscale-[0.3] contrast-[1.2] ${aiFeedback ? 'brightness-[1.1] scale-110' : 'brightness-[0.7]'}`} 
               />
               <div className={`absolute inset-0 bg-blue-600/10 animate-pulse mix-blend-overlay ${aiFeedback ? 'opacity-100' : 'opacity-0'}`} />
            </div>
            
            {/* AI Speech Dialogue Box */}
            <AnimatePresence>
               {(loading || aiFeedback || (!isAnswering && !candidateTranscript)) && (
                 <motion.div 
                   initial={{ opacity: 0, y: 30, scale: 0.9 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: -20, scale: 0.9 }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] z-20"
                 >
                    <div className="bg-[#020617]/90 shadow-[0_45px_100px_-15px_rgba(37,99,235,0.7)] p-10 rounded-[3rem] border border-blue-400/30 text-center relative backdrop-blur-3xl ring-1 ring-white/10">
                       <div className="absolute -top-3 right-10 px-4 py-1.5 bg-blue-600 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] border border-blue-400/50 shadow-lg">LIVE AI VOICE</div>
                       <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#020617] rotate-45 border-r border-b border-white/10" />
                       <div className="flex items-center justify-center gap-3 mb-6">
                          {[1,2,3,4,5,6,7,8,9,10].map(i => (
                             <motion.div 
                               key={i}
                               animate={{ height: (loading || aiFeedback) ? [16, 48, 16] : [10, 16, 10] }}
                               transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                               className="w-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                             />
                          ))}
                       </div>
                       <p className="text-blue-400 font-black text-[11px] uppercase tracking-[0.4em] mb-3 italic">
                        {loading ? 'Initiating Link...' : 'Sarah Jenkins Speaking'}
                       </p>
                       <p className="text-white text-lg font-bold leading-relaxed tracking-tight group-hover:scale-105 transition-all duration-700">
                         "{loading ? 'Generating tailored challenge...' : (aiFeedback || currentQuestion.question)}"
                       </p>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-transparent to-transparent flex items-end p-14 z-10">
               <div className="flex items-center gap-6">
                 <div className="w-6 h-6 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_25px_rgba(16,185,129,0.9)]" />
                 <div>
                   <span className="font-extrabold text-2xl tracking-tight block leading-none text-white underline underline-offset-8 decoration-blue-600/50">Sarah Jenkins (AI Host)</span>
                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mt-3 block italic opacity-90">Cognitive Interview Engine ACTIVE</span>
                 </div>
               </div>
            </div>
             <div className="absolute top-12 right-12 px-8 py-4 bg-black/70 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] shadow-3xl z-10">
               LIVE • 4K STREAM
             </div>
          </motion.div>

          {/* Candidate */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`relative rounded-[3.5rem] overflow-hidden border transition-all duration-1000 ${isAnswering ? 'border-blue-500/80 scale-[1.03] shadow-[0_0_120px_rgba(37,99,235,0.3)]' : 'bg-slate-900/40 border-white/10 shadow-[0_55px_120px_-20px_rgba(0,0,0,0.9)]'}`}
          >
            <div className={`absolute inset-0 z-0 select-none pointer-events-none transition-opacity duration-1000 ${isCameraOn ? 'opacity-0' : 'opacity-100'}`}>
               <img 
                 src="/images/candidate.png" 
                 alt="Candidate" 
                 className={`w-full h-full object-cover grayscale-[0.3] transition-transform duration-[20s] ${isAnswering ? 'scale-115' : ''}`}
               />
            </div>
            
            {/* Real Webcam Stream Element */}
            <video 
                id="candidate-video"
                autoPlay 
                playsInline 
                muted
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isCameraOn ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Candidate Transcript Overlay */}
            <AnimatePresence>
               {(isAnswering || candidateTranscript) && (
                 <motion.div 
                   initial={{ opacity: 0, y: -40 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -40 }}
                   className="absolute top-14 left-1/2 -translate-x-1/2 w-[85%] z-20"
                 >
                    <div className="bg-slate-950/90 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/20 shadow-3xl text-center ring-1 ring-blue-500/30">
                       <p className="text-[11px] font-black uppercase text-blue-500 tracking-[0.3em] mb-3">Live Response Analysis</p>
                       <p className="text-white text-sm font-bold leading-relaxed">{candidateTranscript}</p>
                       {isAnswering && (
                         <div className="flex gap-2 justify-center mt-5">
                            {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
                         </div>
                       )}
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-transparent to-transparent flex items-end p-14 z-10">
              <div className="flex items-center gap-6">
                 <div className="w-6 h-6 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_25px_rgba(16,185,129,0.9)]" />
                 <div>
                   <span className="font-extrabold text-2xl tracking-tight block leading-none text-white underline underline-offset-8 decoration-white/30">Pruthviraj Tarode</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-3 block italic opacity-90">Candidate • Final Interview Pass</span>
                 </div>
              </div>
            </div>
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-slate-950/95 backdrop-blur-3xl p-6 rounded-[3rem] border border-white/20 shadow-[0_45px_120px_rgba(0,0,0,1)] z-20 transition-all hover:scale-105">
              <Button onClick={() => setIsMicOn(!isMicOn)} size="icon" variant="ghost" className={`w-18 h-18 rounded-full transition-all ${isMicOn ? 'bg-slate-900/50 text-white' : 'bg-red-600/20 text-red-500'}`}><Mic className="w-8 h-8" /></Button>
              <Button onClick={toggleCamera} size="icon" variant="ghost" className={`w-18 h-18 rounded-full transition-all ${isCameraOn ? 'bg-blue-600 text-white shadow-xl' : 'bg-slate-900/50 text-white'}`}><Video className="w-8 h-8" /></Button>
              <div className="w-px h-12 bg-white/20 mx-3" />
              <Button 
                onClick={handleGiveAnswer}
                disabled={isAnswering || !!aiFeedback}
                className="h-20 px-14 rounded-[2.5rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-[0.4em] gap-5 shadow-[0_0_40px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:grayscale transition-all active:scale-95 group/ans"
              >
                {isAnswering ? <Zap className="w-6 h-6 animate-spin" /> : <Mic className="w-6 h-6 group-hover/ans:scale-125 transition-transform" />}
                {isAnswering ? 'Analyzing...' : 'Give Live Response'}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Tools Panel */}
        <div className="w-[750px] bg-[#020617]/95 border-l border-white/10 p-12 flex flex-col gap-12 backdrop-blur-3xl relative">
          <div className="flex bg-slate-900/40 p-2.5 rounded-[2.5rem] border border-white/10 relative z-10 shadow-inner">
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center gap-4 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'code' ? 'bg-blue-600 text-white shadow-3xl shadow-blue-900/60 border border-blue-400/50' : 'text-slate-500 hover:text-white'}`}
            >
              <Terminal className="w-5 h-5" /> Code Architect
            </button>
            <button 
              onClick={() => setActiveTab('prompt')}
              className={`flex-1 flex items-center justify-center gap-4 py-6 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'prompt' ? 'bg-blue-600 text-white shadow-3xl shadow-blue-900/60 border border-blue-400/50' : 'text-slate-500 hover:text-white'}`}
            >
              <FileText className="w-5 h-5" /> Task Briefing
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'code' ? (
              <motion.div 
                key="code"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex-1 rounded-[3rem] bg-[#010410] border border-white/10 overflow-hidden flex flex-col shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative z-10"
              >
                <div className="px-10 py-6 bg-slate-900/95 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500" />
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                    <span className="ml-6 text-[11px] font-black font-mono text-slate-500 uppercase tracking-[0.3em] opacity-60">main_v2.0.js • TypeScript enabled</span>
                  </div>
                  <Button size="sm" className="h-12 px-10 text-[11px] font-black rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-900/40 transition-all uppercase tracking-[0.3em] gap-4 active:scale-95 group/run">
                    <Play className="w-5 h-5 group-hover/run:rotate-12" /> Execute Sandbox
                  </Button>
                </div>
                <div className="flex-1 p-12 font-mono text-[14px] leading-[2.2] overflow-auto group bg-mesh">
                  <div className="flex gap-10">
                    <div className="text-slate-800 select-none text-right w-10 space-y-1 font-black opacity-30 italic">
                      {Array.from({length: 20}).map((_, i) => <div key={i}>{i+1}</div>)}
                    </div>
                    <div className="flex-1 text-slate-400">
                      <span className="text-purple-400 font-black">export async function</span> <span className="text-blue-500 font-extrabold underline decoration-blue-900 decoration-4">ScaleInfrastructure</span>() &#123;<br />
                      &nbsp;&nbsp;<span className="text-slate-600 italic">// AI-Optimized Real-time System Design</span><br />
                      &nbsp;&nbsp;<span className="text-purple-400 font-extrabold italic">const</span> <span className="text-blue-300">layer</span> = <span className="text-purple-400">await</span> cluster.<span className="text-emerald-400 font-black">provision</span>(&#123;<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;performance: <span className="text-amber-300 font-bold uppercase tracking-widest">'Ultra_High'</span>,<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;redundancy: <span className="text-amber-300 font-bold uppercase tracking-widest">'Multi_Zone'</span><br />
                      &nbsp;&nbsp;&#125;);<br />
                      <br />
                      &nbsp;&nbsp;<span className="text-purple-400">return</span> layer.<span className="text-blue-400 italic">deploy</span>();<br />
                      &#125;
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-12 right-12 p-8 bg-blue-600/10 backdrop-blur-3xl rounded-[3rem] border border-blue-600/30 flex items-center gap-6 group hover:scale-105 transition-all">
                   <div className="p-4 bg-blue-600/20 rounded-[1.5rem] shadow-inner text-blue-500">
                      <TrendingUp className="w-8 h-8 group-hover:scale-110 transition-transform" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">Architectural Accuracy</span>
                      <span className="text-4xl font-black text-white tracking-tighter">98.4<span className="text-blue-500/50 text-xl font-bold ml-1">%</span></span>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="prompt"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="flex-1 space-y-12 relative z-10 px-4 mt-4"
              >
                {/* AI Matching Dashboard */}
                <div className="bg-gradient-to-br from-blue-600/30 via-slate-900/10 to-[#020617] p-12 rounded-[4rem] border border-blue-600/30 relative overflow-hidden group shadow-[0_50px_80px_-20px_rgba(0,0,0,0.8)]">
                  <div className="absolute -top-16 -right-16 p-10 text-blue-500/10 group-hover:scale-125 group-hover:rotate-45 transition-all duration-[2000ms]">
                     <BrainCircuit className="w-80 h-80" />
                  </div>
                  <h4 className="text-[12px] font-black text-blue-400 uppercase tracking-[0.5em] mb-6 decoration-blue-500 underline underline-offset-8">Candidate Fit Index</h4>
                  <div className="flex items-end gap-6 mb-8 relative">
                    <span className="text-8xl font-black text-white tracking-tighter drop-shadow-[0_10px_30px_rgba(59,130,246,0.3)]">94</span>
                    <span className="text-4xl font-black text-blue-500 pb-5 tracking-widest">%</span>
                  </div>
                  <p className="text-base text-slate-300 font-bold leading-relaxed max-w-[85%] italic opacity-90 border-l-4 border-blue-500 pl-6 py-2">
                    Candidate's system architecture concepts align perfectly with current enterprise-level deployment patterns.
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="flex items-center justify-between border-b border-white/10 pb-8">
                    <div className="flex flex-col gap-2">
                       <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Challenge Pipeline</h3>
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Phase 1: Performance Scalability</span>
                       </div>
                    </div>
                    <span className="px-8 py-3 bg-blue-600/10 border border-blue-600/30 rounded-[2rem] text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] shadow-xl">CHALLENGE {currentQuestionIndex + 1} / {questions.length || 3}</span>
                  </div>

                  <div className="p-12 rounded-[4rem] bg-slate-900/40 border border-white/10 space-y-10 group hover:border-blue-500/40 transition-all shadow-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-start gap-10">
                      <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-blue-900/40 group-hover:scale-110 transition-transform">
                        {currentQuestionIndex + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-6 leading-relaxed tracking-tight underline decoration-white/10 underline-offset-[12px]">{currentQuestion.question}</h3>
                        <div className="flex items-center gap-4 py-3 px-6 bg-white/5 rounded-2xl border border-white/5 w-fit">
                           <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                             Objective: {currentQuestion.objective}
                           </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-10 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Live Assessment Validated</span>
                      </div>
                      <Button 
                        onClick={() => {
                            setAiFeedback(null);
                            setCandidateTranscript("");
                            setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
                        }}
                        variant="ghost" className="h-16 rounded-[2rem] gap-5 text-[11px] font-black text-blue-500 hover:bg-blue-600/10 hover:text-white group/next uppercase tracking-[0.4em] px-12 transition-all"
                      >
                        Next Phase <ChevronRight className="w-7 h-7 group-hover/next:translate-x-2 transition-transform" />
                      </Button>
                    </div>
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
