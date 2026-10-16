export default function MoodCard({ title, subtitle, children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left w-full rounded-xl overflow-hidden border transition-all hover:cursor-pointer ${active? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'}`}
    >
      <div className="h-28 bg-[#1a1a1a] flex items-center justify-center">
        {children}
      </div>
      <div className="p-3">
        <p className="text-[11px] tracking-widest">{title}</p>
        <p className="text-[10px] text-white/40 mt-1">{subtitle}</p>
      </div>
    </button>
  )
}