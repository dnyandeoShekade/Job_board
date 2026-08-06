'use client';

import { useState } from 'react';
import { Bell, Shield, User, ChevronDown, Check, Globe, Clock, Mail, AlertTriangle, Trash2, Lock } from 'lucide-react';

const SECTIONS = [
  { key: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alert channels and digests' },
  { key: 'privacy', label: 'Privacy & Visibility', icon: Shield, desc: 'Control who sees your data' },
  { key: 'account', label: 'Account & Security', icon: User, desc: 'Language, timezone, and region' },
];

export default function SettingsPage({ settings: initial }) {
  const [active, setActive] = useState('notifications');
  const [settings, setSettings] = useState(initial);
  const [saved, setSaved] = useState(false);

  function toggleNotif(key) {
    setSettings(p => ({ ...p, notifications: { ...p.notifications, [key]: !p.notifications[key] } }));
  }

  function togglePrivacy(key) {
    setSettings(p => ({ ...p, privacy: { ...p.privacy, [key]: !p.privacy[key] } }));
  }

  function setPrivacyValue(key, value) {
    setSettings(p => ({ ...p, privacy: { ...p.privacy, [key]: value } }));
  }

  function setAccountValue(key, value) {
    setSettings(p => ({ ...p, account: { ...p.account, [key]: value } }));
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Settings & Preferences</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your notification channels, security preferences, and public visibility.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Sidebar Navigation */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 space-y-3">
            <nav className="bg-white border border-slate-200/80 rounded-2xl p-2 shadow-sm space-y-1">
              {SECTIONS.map(({ key, label, icon: Icon, desc }) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`w-full flex items-start gap-3.5 px-3.5 py-3 rounded-xl transition text-left ${
                    active === key
                      ? 'bg-indigo-50/80 text-indigo-700 border border-indigo-100/60 shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    active === key ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{label}</p>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${active === key ? 'text-indigo-600/80' : 'text-slate-400'}`}>
                      {desc}
                    </p>
                  </div>
                </button>
              ))}
            </nav>

            {/* Quick Helper Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <Lock className="w-4 h-4 text-indigo-300" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-200">Secure & Encrypted</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                All preference adjustments are securely synchronized with your profile instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Panel */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col">

            {/* Notifications Panel */}
            {active === 'notifications' && (
              <div className="animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-base">Notification Preferences</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Choose how and when you want to receive important status updates.</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive job alerts and updates via email' },
                    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Get important updates directly via SMS' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications for new matches' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A curated weekly summary of job recommendations' },
                    { key: 'applicationUpdates', label: 'Application Updates', desc: 'Instant status changes on your submitted applications' },
                    { key: 'newJobMatches', label: 'New Job Matches', desc: 'Notify when a new job matches your specific preferences' },
                    { key: 'profileViews', label: 'Profile Views', desc: 'Alert when a recruiter views or bookmarks your profile' },
                    { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Newsletters, feature announcements, and promotions' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/40 transition">
                      <div className="pr-4">
                        <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle
                        on={settings.notifications[item.key]}
                        onChange={() => toggleNotif(item.key)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Panel */}
            {active === 'privacy' && (
              <div className="animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-base">Privacy Settings</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Control your profile discoverability and contact permissions.</p>
                </div>
                <div className="divide-y divide-slate-100">
                  {/* Profile visibility dropdown */}
                  <div className="flex items-center justify-between px-6 py-5 hover:bg-slate-50/40 transition">
                    <div className="pr-4">
                      <p className="text-sm font-semibold text-slate-800">Profile Visibility</p>
                      <p className="text-xs text-slate-400 mt-0.5">Control who can discover and view your full profile</p>
                    </div>
                    <div className="relative shrink-0">
                      <select
                        value={settings.privacy.profileVisibility}
                        onChange={e => setPrivacyValue('profileVisibility', e.target.value)}
                        className="appearance-none pl-3.5 pr-9 py-2 text-xs font-semibold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer bg-slate-50 hover:bg-white text-slate-700 transition shadow-xs"
                      >
                        {['Public', 'Recruiters Only', 'Private'].map(o => <option key={o}>{o}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  {[
                    { key: 'showEmail', label: 'Show Email Address', desc: 'Display your email address on your public profile' },
                    { key: 'showPhone', label: 'Show Phone Number', desc: 'Display your phone number on your public profile' },
                    { key: 'allowRecruiterContact', label: 'Allow Recruiter Contact', desc: 'Let verified recruiters reach out to you directly' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/40 transition">
                      <div className="pr-4">
                        <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <Toggle
                        on={settings.privacy[item.key]}
                        onChange={() => togglePrivacy(item.key)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Account Panel */}
            {active === 'account' && (
              <div className="animate-in fade-in duration-200">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="font-bold text-slate-900 text-base">Account & Regional Settings</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Update core account information and localized preferences.</p>
                </div>
                
                <div className="p-6 space-y-5">
                  {/* Email Input Group */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-600" /> Email Address
                    </label>
                    <input
                      value={settings.account.email}
                      onChange={e => setAccountValue('email', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 bg-slate-50/50 focus:bg-white transition"
                    />
                  </div>

                  {/* Language and Timezone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-indigo-600" /> Language
                      </label>
                      <div className="relative">
                        <select
                          value={settings.account.language}
                          onChange={e => setAccountValue('language', e.target.value)}
                          className="w-full appearance-none pl-3.5 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer bg-slate-50/50 focus:bg-white text-slate-800 transition"
                        >
                          {['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" /> Timezone
                      </label>
                      <div className="relative">
                        <select
                          value={settings.account.timezone}
                          onChange={e => setAccountValue('timezone', e.target.value)}
                          className="w-full appearance-none pl-3.5 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer bg-slate-50/50 focus:bg-white text-slate-800 transition"
                        >
                          {['Asia/Kolkata (IST)', 'UTC', 'America/New_York (EST)', 'Europe/London (GMT)'].map(o => <option key={o}>{o}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">Danger Zone</p>
                    </div>
                    <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-left w-full sm:w-auto">
                        <p className="text-xs font-bold text-slate-800">Account Closure & Deactivation</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Permanently remove your account data or pause access.</p>
                      </div>
                      <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-3.5 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition bg-white shadow-xs">
                          Deactivate
                        </button>
                        <button className="flex-1 sm:flex-none px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition shadow-xs flex items-center justify-center gap-1.5">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Save Action Bar */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/75 flex items-center justify-between mt-auto">
              {saved ? (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4 bg-emerald-100 rounded-full p-0.5" /> Changes saved successfully
                </span>
              ) : (
                <span className="text-xs text-slate-400">Remember to save your updates</span>
              )}
              <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-sm"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      type="button"
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        on ? 'bg-indigo-600' : 'bg-slate-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
          on ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}