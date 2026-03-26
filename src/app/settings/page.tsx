"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Settings as SettingsIcon, Bell, Shield, User, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  return (
    <div className="h-full flex">
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-72 flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-500 mt-1">Manage your account preferences</p>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Account</h2>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="text-left">
                  <p className="font-medium text-slate-900">Email Address</p>
                  <p className="text-sm text-slate-500">pruthvirajtarode456@gmail.com</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="text-left">
                  <p className="font-medium text-slate-900">Password</p>
                  <p className="text-sm text-slate-500">Last changed 30 days ago</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="text-left">
                  <p className="font-medium text-slate-900">Connected Accounts</p>
                  <p className="text-sm text-slate-500">GitHub, LinkedIn</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { label: "Email Notifications", desc: "Receive job alerts via email", value: emailNotif, toggle: setEmailNotif },
                { label: "Push Notifications", desc: "Browser push notifications", value: pushNotif, toggle: setPushNotif },
                { label: "SMS Alerts", desc: "Interview reminders via SMS", value: smsNotif, toggle: setSmsNotif },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => item.toggle(!item.value)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${item.value ? "bg-blue-600" : "bg-slate-300"}`}
                  >
                    <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${item.value ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Privacy & Security</h2>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="text-left">
                  <p className="font-medium text-slate-900">Profile Visibility</p>
                  <p className="text-sm text-slate-500">Visible to employers</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="text-left">
                  <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-500">Not enabled</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
              <p className="text-sm text-slate-500 mb-4">Once you delete your account, there is no going back.</p>
              <button className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
