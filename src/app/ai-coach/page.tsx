"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Bot, Send, Sparkles, User, Lightbulb, Target, BookOpen } from "lucide-react";

const suggestedQuestions = [
  "How can I improve my resume for React roles?",
  "What salary should I expect as a Full Stack Developer?",
  "Help me prepare for a technical interview at Google",
  "What skills should I learn next for AI/ML roles?",
];

const initialMessages = [
  { role: "assistant", content: "👋 Hi Pruthviraj! I'm your AI Career Coach. I can help you with:\n\n🎯 **Interview Preparation** — Practice common questions\n📝 **Resume Tips** — Optimize your resume for ATS\n💡 **Career Advice** — Plan your next career move\n📊 **Salary Insights** — Know your market value\n\nHow can I help you today?" },
];

export default function AICoachPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: "Great question! Based on your profile and current market trends, here are my recommendations:\n\n1. **Focus on system design** — Most senior roles require this\n2. **Build a portfolio project** with Next.js + AI integration\n3. **Practice coding challenges** on LeetCode (medium difficulty)\n4. **Network actively** on LinkedIn with recruiters\n\nWould you like me to create a personalized study plan for you?",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full flex">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-72 flex-1 bg-slate-50 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              AI Career Coach
            </h1>
            <p className="text-slate-500 mt-1">Your personal AI assistant for career growth</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <button className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all">
              <Target className="w-4 h-4 text-blue-500" /> Mock Interview
            </button>
            <button className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all">
              <BookOpen className="w-4 h-4 text-green-500" /> Resume Review
            </button>
            <button className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Career Tips
            </button>
            <button className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50 transition-all">
              <Sparkles className="w-4 h-4 text-purple-500" /> Skill Analysis
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-700 border border-slate-200"}`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-500">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions */}
            <div className="px-6 py-3 border-t border-slate-100 flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <button key={i} onClick={() => setInput(q)} className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-all">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask me anything about your career..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
