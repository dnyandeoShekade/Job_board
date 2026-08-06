import Link from 'next/link';
import { Search, FileText, Bell, Bookmark, ChevronRight } from 'lucide-react';

const ICON_MAP = {
  search:    Search,
  'file-text': FileText,
  bell:      Bell,
  bookmark:  Bookmark,
};

export default function QuickActions({ actions }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <h2 className="font-bold text-slate-900 text-sm mb-3">Quick Actions</h2>
      <ul className="space-y-1">
        {actions.map((action) => {
          const Icon = ICON_MAP[action.icon] ?? Search;
          return (
            <li key={action.label}>
              <Link
                href={action.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{action.label}</p>
                  <p className="text-xs text-slate-400 truncate">{action.sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
