'use client';

import { useState } from 'react';
import {
  Plus, FileText, Eye, MoreVertical, CheckCircle2,
  UploadCloud, ChevronRight, Check, Zap, Star,
  RefreshCw, Search,
} from 'lucide-react';

const TIP_ICONS = {
  refresh:      RefreshCw,
  search:       Search,
  'file-text':  FileText,
  star:         Star,
};

const TIP_COLORS = {
  refresh:      { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  search:       { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-100'    },
  'file-text':  { bg: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-100'   },
  star:         { bg: 'bg-purple-50',  text: 'text-purple-600',  border: 'border-purple-100'  },
};

export default function ResumePage({ data }) {
  const { primary, all, score, scoreLabel, scoreNote, profileCompletion, tips } = data;
  const [primaryId, setPrimaryId] = useState(primary.id);
  const [openMenu, setOpenMenu]   = useState(null);

  const currentPrimary = primaryId === primary.id
    ? primary
    : all.find(r => r.id === primaryId) ?? primary;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Resume</h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload and manage your resumes. Set a primary one for direct applications.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm">
          <Plus className="w-4 h-4" />
          Add New Resume
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: resume cards + upload */}
        <div className="lg:col-span-2 space-y-5">

          {/* Current / primary resume */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">Current Resume</h2>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Primary
                </span>
              </div>
              <span className="text-xs text-slate-400">Active Status</span>
            </div>

            <ResumeRow
              resume={currentPrimary}
              isPrimary
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />

            <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2.5 rounded-xl text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              This resume is set as primary. Employers will see this version.
            </div>
          </div>

          {/* All resumes */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">All Resumes</h2>
              <span className="text-xs text-slate-500">{all.length} files total</span>
            </div>
            <div className="space-y-2.5">
              {all.map(resume => (
                <div key={resume.id} className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <FileIcon type={resume.type} />
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">{resume.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Uploaded on {resume.uploadedDate} • {resume.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-xs font-medium rounded-lg transition">
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    {resume.id !== primaryId && (
                      <button
                        onClick={() => setPrimaryId(resume.id)}
                        className="px-3 py-1.5 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-700 text-xs font-medium rounded-lg transition"
                      >
                        Set Primary
                      </button>
                    )}
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === resume.id ? null : resume.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {openMenu === resume.id && (
                        <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-xl shadow-lg z-10 py-1 w-32">
                          <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50" onClick={() => setOpenMenu(null)}>Preview</button>
                          <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50" onClick={() => { setPrimaryId(resume.id); setOpenMenu(null); }}>Set Primary</button>
                          <button className="block w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50" onClick={() => setOpenMenu(null)}>Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload area */}
          <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50/60 rounded-2xl p-6 text-center flex flex-col items-center cursor-pointer transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6 text-indigo-600" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Upload New Resume</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag and drop your file here, or{' '}
              <span className="text-indigo-600 font-semibold hover:underline">browse files</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Supported formats: PDF, DOC, DOCX • Max size: 5MB
            </p>
          </div>
        </div>

        {/* Right: widgets */}
        <div className="space-y-5">

          {/* Tips */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Resume Tips</h3>
              <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Guide</span>
            </div>
            <div className="space-y-3">
              {tips.map(tip => {
                const Icon = TIP_ICONS[tip.icon] ?? Zap;
                const c = TIP_COLORS[tip.icon] ?? TIP_COLORS.star;
                return (
                  <div key={tip.title} className="flex items-start gap-2.5">
                    <div className={`${c.bg} ${c.text} border ${c.border} p-1.5 rounded-lg shrink-0 mt-0.5`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{tip.title}</p>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{tip.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
                View More Tips <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Score */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Resume Score</h3>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {scoreLabel}
              </span>
            </div>
            <ScoreRing value={score} label={scoreLabel} />
            <p className="text-xs text-slate-500 mt-3 mb-4 text-center leading-relaxed">{scoreNote}</p>
            <button className="w-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-2 rounded-xl text-xs font-semibold transition">
              Improve Resume
            </button>
          </div>

          {/* Profile completion */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold text-slate-900">Profile Completion</h3>
              <span className="text-xs font-bold text-indigo-600">{profileCompletion}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mb-3">Complete missing sections to unlock top roles.</p>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
              Complete Now <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function FileIcon({ type }) {
  const isPdf = type === 'pdf';
  return (
    <div className={`${isPdf ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'} border p-2.5 rounded-xl flex flex-col items-center justify-center min-w-[42px]`}>
      <FileText className="w-5 h-5 mb-0.5" />
      <span className="text-[9px] font-bold uppercase">{type}</span>
    </div>
  );
}

function ResumeRow({ resume, isPrimary, openMenu, setOpenMenu }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 border border-slate-200 rounded-xl bg-slate-50">
      <div className="flex items-center gap-3">
        <FileIcon type={resume.type} />
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900 text-xs">{resume.name}</span>
            {resume.recommended && (
              <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-medium px-2 py-0.5 rounded">
                Recommended
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Uploaded on {resume.uploadedDate} • {resume.size}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 self-end sm:self-center">
        <button className="flex items-center gap-1 px-3 py-1.5 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-xs font-medium rounded-lg transition">
          <Eye className="w-3.5 h-3.5" /> Preview
        </button>
        <div className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === resume.id ? null : resume.id)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {openMenu === resume.id && (
            <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-xl shadow-lg z-10 py-1 w-32">
              <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50" onClick={() => setOpenMenu(null)}>Preview</button>
              <button className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50" onClick={() => setOpenMenu(null)}>Download</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScoreRing({ value, label }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="flex justify-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={r} fill="none"
            stroke="#6366f1" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-2xl font-bold text-slate-900">{value}%</p>
          <p className="text-[10px] font-semibold text-slate-400 uppercase">{label}</p>
        </div>
      </div>
    </div>
  );
}
