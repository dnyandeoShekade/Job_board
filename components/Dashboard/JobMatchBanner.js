import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function JobMatchBanner() {
  return (
    <div className="bg-indigo-600 rounded-2xl p-5 text-white">
      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
        <Briefcase className="w-5 h-5 text-white" />
      </div>
      <p className="font-bold text-sm mb-1">Get better job matches</p>
      <p className="text-xs text-indigo-200 mb-4">
        Complete your profile to get personalised job recommendations.
      </p>
      <Link
        href="/dashboard/profile"
        className="block w-full text-center bg-white text-indigo-600 text-sm font-bold py-2 rounded-xl hover:bg-indigo-50 transition"
      >
        Complete Profile →
      </Link>
    </div>
  );
}
