const BADGE_STYLES = {
  yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  green:  'bg-green-50  text-green-600  border-green-200',
  red:    'bg-red-50    text-red-500    border-red-200',
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
};

const DOT_STYLES = {
  yellow: 'bg-yellow-400',
  green:  'bg-green-400',
  red:    'bg-red-400',
  indigo: 'bg-indigo-400',
};

export default function StatusBadge({ status, color = 'indigo' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${BADGE_STYLES[color] ?? BADGE_STYLES.indigo}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_STYLES[color] ?? DOT_STYLES.indigo}`} />
      {status}
    </span>
  );
}
