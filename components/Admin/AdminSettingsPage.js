"use client";

import { useState } from 'react';
import { Settings, Globe, Mail, ShieldAlert, UserPlus, Bell, Save } from "lucide-react";

export default function AdminSettingsPage({ settings }) {
  const [loading, setLoading] = useState(false);

  if (!settings) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 mt-2">Loading settings...</p>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50/50 via-white to-white px-5 py-3.5 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
          <Settings className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Platform Settings</h1>
          <p className="text-[11px] text-slate-500">Configure global application variables, preferences, and security controls.</p>
        </div>
      </div>

      {/* Settings Form Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* General Section */}
          <div className="space-y-3.5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100">
              General Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Site Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" /> Site Name
                </label>
                <input
                  type="text"
                  defaultValue={settings.siteName}
                  className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Contact Email
                </label>
                <input
                  type="email"
                  defaultValue={settings.contactEmail}
                  className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          {/* System Toggles Section */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-100">
              System Controls & Preferences
            </h2>

            <div className="space-y-2.5">
              {/* Maintenance Mode */}
              <div className="flex items-center justify-between p-3 bg-slate-50/60 border border-slate-200/60 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Maintenance Mode</p>
                    <p className="text-[11px] text-slate-500">Temporarily close the site for scheduled updates.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={settings.maintenanceMode}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                />
              </div>

              {/* Allow Registration */}
              <div className="flex items-center justify-between p-3 bg-slate-50/60 border border-slate-200/60 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <UserPlus className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Allow Registration</p>
                    <p className="text-[11px] text-slate-500">Permit new candidate and employer signups.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={settings.allowRegistration}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                />
              </div>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-3 bg-slate-50/60 border border-slate-200/60 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Email Notifications</p>
                    <p className="text-[11px] text-slate-500">Dispatch automated alerts for platform actions.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={settings.emailNotifications}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition shadow-sm shadow-indigo-100 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Saving...' : 'Save Changes'} <Save className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}