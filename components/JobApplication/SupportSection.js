export default function SupportSection({ support }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
            {support.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{support.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{support.description}</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-white hover:bg-slate-50 border border-indigo-200 text-indigo-600 font-medium rounded-xl transition text-sm whitespace-nowrap">
          {support.buttonText}
        </button>
      </div>
    </div>
  );
}
