import {
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const ICONS = {
  briefcase: Briefcase,
  "check-circle": CheckCircle2,
  clock: Clock,
  "x-circle": XCircle,
};

const STYLES = {
  indigo: {
    bg: "bg-indigo-50",
    icon: "text-indigo-500",
    value: "text-indigo-600",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-500",
    value: "text-green-600",
  },
  yellow: {
    bg: "bg-yellow-50",
    icon: "text-yellow-500",
    value: "text-yellow-600",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-400",
    value: "text-red-500",
  },
};

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = ICONS[stat.icon];
        const s = STYLES[stat.color];

        return (
          <div
            key={stat.label}
            className="rounded2xl border border-slate-200 bg-white p-5"
          >
            <div
              className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}
            >
              <Icon className={`w-5 h-5 ${s.icon}`} />
            </div>

            <p className={`text-2xl font-bold ${s.value}`}>
              {stat.value}
            </p>

            <p className="text-sm font-medium text-slate-700 mt-1">
              {stat.label}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              {stat.sub}
            </p>
          </div>
        );
      })}
    </div>
  );
}