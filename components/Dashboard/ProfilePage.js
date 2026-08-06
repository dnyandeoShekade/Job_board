'use client';

import { useState } from 'react';
import {
  Pencil, Camera, MapPin, Link, GitBranch, Globe,
  CheckCircle2, Circle, ChevronDown, Briefcase,
} from 'lucide-react';

export default function ProfilePage({ profile }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSocialChange(field, value) {
    setForm(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [field]: value },
    }));
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your personal information and public profile.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Left: form ── */}
        <div className="xl:col-span-2 space-y-6">

          {/* Personal Information card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-slate-900">Personal Information</h2>
              <button
                onClick={() => setEditing(e => !e)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition"
              >
                <Pencil className="w-3.5 h-3.5" />
                {editing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-3xl border-4 border-white shadow">
                    {form.fullName.charAt(0)}
                  </div>
                  {editing && (
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow hover:bg-slate-50 transition">
                      <Camera className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  )}
                </div>
                <p className="font-bold text-slate-900 text-sm">{form.fullName}</p>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full font-medium">
                  {form.preferredJobType === 'Full-time' ? 'Job Seeker' : form.preferredJobType}
                </span>
              </div>

              {/* Fields grid */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name"        value={form.fullName}      field="fullName"      editing={editing} onChange={handleChange} />
                <Field label="Email Address"    value={form.email}         field="email"         editing={editing} onChange={handleChange} type="email" />
                <Field label="Phone Number"     value={form.phone}         field="phone"         editing={editing} onChange={handleChange} />
                <SelectField
                  label="Location" value={form.location} field="location" editing={editing} onChange={handleChange}
                  icon={<MapPin className="w-3.5 h-3.5 text-slate-400" />}
                  options={['Bangalore, Karnataka, India', 'Hyderabad, Telangana, India', 'Mumbai, Maharashtra, India', 'Delhi, India', 'Remote']}
                />
                <Field label="Date of Birth"   value={form.dateOfBirth}   field="dateOfBirth"   editing={editing} onChange={handleChange} />
                <SelectField
                  label="Experience" value={form.experience} field="experience" editing={editing} onChange={handleChange}
                  options={['0-1 Year', '1-2 Years', '2+ Years', '3+ Years', '5+ Years', '10+ Years']}
                />
                <Field label="Current Role"    value={form.currentRole}   field="currentRole"   editing={editing} onChange={handleChange} />
                <Field label="Current Salary (CTC)" value={form.currentSalary} field="currentSalary" editing={editing} onChange={handleChange} />
                <SelectField
                  label="Preferred Job Type" value={form.preferredJobType} field="preferredJobType" editing={editing} onChange={handleChange}
                  options={['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship']}
                />
                <SelectField
                  label="Availability" value={form.availability} field="availability" editing={editing} onChange={handleChange}
                  options={['Immediately', 'Within 2 weeks', 'Within 1 month', 'Within 3 months']}
                />

                {/* Bio — full width */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Bio</label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      disabled={!editing}
                      value={form.bio}
                      onChange={e => handleChange('bio', e.target.value)}
                      maxLength={300}
                      className={`w-full px-3 py-2.5 text-sm border rounded-xl resize-none transition
                        ${editing
                          ? 'border-indigo-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300'
                          : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                    />
                    <span className="absolute bottom-2.5 right-3 text-xs text-slate-400">
                      {form.bio.length}/300
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="mb-4">
              <h2 className="font-bold text-slate-900">Social Links <span className="text-slate-400 font-normal text-sm">(Optional)</span></h2>
              <p className="text-xs text-slate-400 mt-0.5">Add your social profiles and portfolio links</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <SocialField icon={<Link className="w-4 h-4 text-[#0A66C2]" />}      value={form.socialLinks.linkedin} field="linkedin" editing={editing} onChange={handleSocialChange} />
              <SocialField icon={<GitBranch className="w-4 h-4 text-slate-800" />} value={form.socialLinks.github}   field="github"   editing={editing} onChange={handleSocialChange} />
              <SocialField icon={<Globe className="w-4 h-4 text-indigo-500" />}    value={form.socialLinks.website}  field="website"  editing={editing} onChange={handleSocialChange} />
            </div>

            {editing && (
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => { setForm({ ...profile }); setEditing(false); }}
                  className="px-5 py-2 text-sm font-semibold border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-5 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

        </div>

        {/* ── Right: sidebar ── */}
        <div className="space-y-5">

          {/* Profile Completion */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-900 text-sm mb-4">Profile Completion</h3>
            <div className="flex flex-col items-center mb-4">
              <CircleProgress value={profile.completion} />
            </div>
            <p className="text-xs text-slate-500 text-center mb-4">
              Complete your profile to get more job recommendations.
            </p>
            <button className="w-full border border-indigo-600 text-indigo-600 text-sm font-semibold py-2 rounded-xl hover:bg-indigo-50 transition">
              Improve Profile
            </button>
          </div>

          {/* Profile Strength */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Profile Strength</h3>
            <ul className="space-y-2.5">
              {profile.strengths.map(({ label, done }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-slate-700">
                  {done
                    ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    : <Circle className="w-4 h-4 text-orange-400 shrink-0" />
                  }
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Get better matches */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-indigo-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Get better job matches</p>
                <p className="text-xs text-slate-500">Complete your profile to get personalized job recommendations.</p>
              </div>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 rounded-xl transition">
              Add Skills
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Field({ label, value, field, editing, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      <input
        type={type}
        disabled={!editing}
        value={value}
        onChange={e => onChange(field, e.target.value)}
        className={`w-full px-3 py-2.5 text-sm border rounded-xl transition
          ${editing
            ? 'border-indigo-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300'
            : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
      />
    </div>
  );
}

function SelectField({ label, value, field, editing, onChange, options, icon }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {icon}
          </span>
        )}
        <select
          disabled={!editing}
          value={value}
          onChange={e => onChange(field, e.target.value)}
          className={`w-full appearance-none ${icon ? 'pl-8' : 'pl-3'} pr-8 py-2.5 text-sm border rounded-xl transition
            ${editing
              ? 'border-indigo-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer'
              : 'border-slate-200 bg-slate-50 text-slate-700'
            }`}
        >
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function SocialField({ icon, value, field, editing, onChange }) {
  return (
    <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50">
      <span className="shrink-0">{icon}</span>
      <input
        disabled={!editing}
        value={value}
        onChange={e => onChange(field, e.target.value)}
        className={`flex-1 text-sm bg-transparent focus:outline-none text-slate-700 min-w-0
          ${editing ? 'text-slate-900' : ''}`}
      />
    </div>
  );
}

function CircleProgress({ value }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="#6366f1" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-bold text-slate-900">{value}%</p>
        <p className="text-xs text-slate-400">Complete</p>
      </div>
    </div>
  );
}
