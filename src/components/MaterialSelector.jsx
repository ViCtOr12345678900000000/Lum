export default function MaterialSelector({ materials, selectedId, onSelect, finish, onFinishChange }) {

  const getMaterialIcon = (type, isSelected) => {
    const cls = `w-[18px] h-[18px] ${isSelected? 'text-black/70' : 'text-white/80'}`
    const t = type.toLowerCase()

    if (t.includes('stone')) {
      // stone - layers
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls}><path d="M3 16l3-3 3 2 3-4 3 4 3-2 3 3v4H3v-4z" strokeLinejoin="round"/></svg>
    }
    if (t.includes('wood')) {
      // wood - planks
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls}><path d="M4 20V8l4-2 4 2 4-2 4 2v12H4z"/><path d="M8 6v12M12 8v12M16 6v12" opacity="0.6"/></svg>
    }
    if (t.includes('metal')) {
      // metal - hex
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls}><path d="M12 3l7 4v8l-7 4-7-4V7l7-4z"/></svg>
    }
    if (t.includes('fabric')) {
      // fabric - weave
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls}><path d="M4 6c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/><path d="M4 12c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/><path d="M4 18c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/></svg>
    }
    if (t.includes('glass')) {
      // glass
      return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 8h14M5 16h14" opacity="0.6"/></svg>
    }
    // composite - terrazzo dots
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cls}><circle cx="7" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="17" cy="8" r="1" fill="currentColor"/><circle cx="9" cy="16" r="1" fill="currentColor"/><circle cx="15" cy="16" r="1" fill="currentColor"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
  }

  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-56px-68px)] bg-[#0e0e0e]">
      {/* HEADING */}
      <div className="shrink-0 px-4 pt-5 pb-3 flex items-center justify-between">
        <p className="text-[10px] tracking-[0.3em] text-white/40">MATERIAL</p>
        <span className="text-[9px] text-white/20">{materials.length}</span>
      </div>

      {/* SCROLLABLE CARDS - fixed scroll bug */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {materials.map((m) => {
          const isSelected = selectedId === m.id
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`w-full text-left rounded-xl border p-3 flex items-center gap-3 transition-all hover:cursor-pointer ${isSelected? 'bg-white text-black border-white' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white'}`}
            >
              {/* ICON BOX - now glass/stone/wood etc, not house */}
              <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center border border-white/10" style={{ background: m.color }}>
                {getMaterialIcon(m.type, isSelected)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] tracking-[0.15em] truncate">{m.name}</p>
                <p className={`text-[10px] truncate ${isSelected? 'text-black/60' : 'text-white/40'}`}>{m.type}</p>
              </div>
              {isSelected && <div className="w-2 h-2 bg-black rounded-full shrink-0" />}
            </button>
          )
        })}
      </div>

      {/* FINISH */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <p className="text-[9px] tracking-[0.2em] text-white/40 mb-3">FINISH</p>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onFinishChange('MATTE')} className={`h-10 rounded-full text-[10px] tracking-widest ${finish === 'MATTE'? 'bg-white text-black' : 'border border-white/15 text-white/60'}`}>MATTE</button>
          <button onClick={() => onFinishChange('POLISHED')} className={`h-10 rounded-full text-[10px] tracking-widest ${finish === 'POLISHED'? 'bg-white text-black' : 'border border-white/15 text-white/60'}`}>POLISHED</button>
        </div>
      </div>
    </div>
  )
}