"use client";

import { 
  Mic, 
  Video, 
  Settings, 
  PhoneOff, 
  Code, 
  FileText, 
  MessageSquare,
  Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function InterviewRoom({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="h-16 px-8 border-b border-white/10 flex items-center justify-between bg-slate-950">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Layout className="w-6 h-6 text-blue-500" />
            <span className="font-bold text-lg tracking-tight">AI Interview System</span>
          </div>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-full border border-red-500/20 animate-pulse">
            REC 12:45
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-slate-400">Technical Interview: Senior Software Engineer</p>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white"><Settings className="w-5 h-5" /></Button>
          <Button variant="destructive" className="rounded-full gap-2 font-bold px-6">
            <PhoneOff className="w-4 h-4" /> End Call
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Video Streams */}
        <div className="flex-1 p-8 grid grid-rows-2 gap-6 relative">
          <div className="relative rounded-3xl overflow-hidden bg-slate-800 border border-white/10 group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="font-bold text-sm">Interviewer: Sarah Jenkins</span>
            </div>
            {/* This would be the remote video stream */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-3xl text-blue-500">SJ</div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-slate-800 border border-white/10 group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="font-bold text-sm">Candidate: Pruthviraj Tarode (You)</span>
            </div>
            {/* This would be the local video stream */}
            <div className="w-full h-full flex items-center justify-center">
               <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-3xl text-emerald-500">PT</div>
            </div>
            
             {/* Controls overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl">
              <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white/10 text-white"><Mic className="w-5 h-5" /></Button>
              <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white/10 text-white"><Video className="w-5 h-5" /></Button>
              <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white/10 text-white"><Code className={activeTab === 'code' ? 'text-blue-500' : 'text-white'} onClick={() => setActiveTab('code')} /></Button>
              <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white/10 text-white"><MessageSquare className="w-5 h-5" /></Button>
            </div>
          </div>
        </div>

        {/* Right Side: Code Editor / Shared Tools */}
        <div className="w-[500px] bg-slate-950 border-l border-white/10 p-6 flex flex-col gap-6">
          <div className="flex bg-slate-900 p-1 rounded-2xl border border-white/10">
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'code' ? 'bg-slate-800 text-blue-500 shadow-md ring-1 ring-white/10' : 'text-slate-400 hover:text-white'}`}
            >
              <Code className="w-4 h-4" /> Code Editor
            </button>
            <button 
              onClick={() => setActiveTab('prompt')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'prompt' ? 'bg-slate-800 text-blue-500 shadow-md ring-1 ring-white/10' : 'text-slate-400 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" /> Question
            </button>
          </div>

          <div className="flex-1 rounded-2xl bg-slate-900 border border-white/10 overflow-hidden relative">
            {activeTab === 'code' ? (
              <div className="h-full flex flex-col">
                <div className="px-4 py-2 bg-slate-800 border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 italic">javascript (v14.0)</span>
                  <Button size="sm" className="h-7 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white">Run Code</Button>
                </div>
                <div className="flex-1 p-6 font-mono text-sm group">
                  <div className="flex gap-4">
                    <div className="text-slate-700 select-none">
                      {Array.from({length: 10}).map((_, i) => <div key={i}>{i+1}</div>)}
                    </div>
                    <div className="flex-1 text-slate-300">
                      <span className="text-purple-400 font-bold">function</span> <span className="text-blue-400">solve</span>(input) &#123; <br />
                      &nbsp;&nbsp;<span className="text-slate-500">// Your logic here</span> <br />
                      &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">null</span>; <br />
                      &#125;
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full p-8 space-y-4">
                <h3 className="text-xl font-bold">Question 1: Binary Search Implementation</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Implement an efficient function to find the index of a target value within a sorted array. 
                  If the target is not found, return -1.
                </p>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 space-y-2">
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">Example</p>
                  <p className="text-sm font-mono text-slate-300 italic">Input: nums = [-1,0,3,5,9,12], target = 9</p>
                  <p className="text-sm font-mono text-slate-300 italic">Output: 4</p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/5">
                   <p className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2">AI Objective</p>
                   <p className="text-xs text-slate-500 italic">Candidate is being evaluated on time complexity (O(log n)) and edge case handling (empty arrays, duplicate values).</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
