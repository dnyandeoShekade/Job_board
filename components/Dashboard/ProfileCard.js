import Link from 'next/link';

export default function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="h-20 bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div className="px-5 pb-5">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl border-4 border-white -mt-8 mb-3">
          {user.name.charAt(0)}
        </div>
        <p className="font-bold text-slate-900">{user.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
        <p className="text-xs text-slate-500">{user.phone}</p>
        <Link
          href="/dashboard/profile"
          className="mt-4 block w-full text-center border border-indigo-600 text-indigo-600 text-sm font-semibold py-2 rounded-xl hover:bg-indigo-50 transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
