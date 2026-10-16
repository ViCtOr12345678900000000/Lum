export default function MaterialCard({ material, isSelected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left rounded-xl border p-3 flex items-center gap-3 transition-all hover:cursor-pointer ${
        isSelected
         ? 'bg-white text-black border-white'
          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white'
      }`}
    >
      {/* Colored box with home icon inside */}
      <div
        className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center border border-white/10"
        style={{ background: material.color }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-5 h-5 ${isSelected? 'text-black/70' : 'text-white/80'}`}
        >
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1V9.5z" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[11px] tracking-widest truncate">{material.name}</p>
        <p className={`text-[10px] truncate ${isSelected? 'text-black/60' : 'text-white/40'}`}>
          {material.type}
        </p>
      </div>

      {isSelected && <div className="w-2 h-2 bg-black rounded-full shrink-0" />}
    </button>
  )
}