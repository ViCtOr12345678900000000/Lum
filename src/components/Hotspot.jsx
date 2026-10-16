export default function Hotspot({ top, left, label, active, onClick }) {
  return (
    <button onClick={onClick} className="absolute -translate-x-1/2 -translate-y-1/2 group z-10" style={{ top, left }}>
      <span className={`relative flex h-4 w-4 ${active?'scale-125':''}`}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60"></span>
        <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white ${active?'bg-white':'bg-white/70'}`}></span>
      </span>
      <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] px-3 py-1 rounded-full tracking-widest opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        {label}
      </span>
    </button>
  )
}