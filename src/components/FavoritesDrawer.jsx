export default function FavoritesDrawer({ materials, favorites, onClose, onToggleFav }) {
  const favMats = materials.filter(m => favorites.includes(m.id))
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-[380px] h-full bg-[#111] border-l border-white/10 p-6 flex flex-col" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between mb-6"><h2 className="text-[12px] tracking-widest">FAVORITES — {favorites.length}</h2><button onClick={onClose}>✕</button></div>
        <div className="flex-1 overflow-auto flex flex-col gap-3">
          {favMats.length===0 && <p className="text-[11px] text-white/30 mt-10 text-center">No favorites yet</p>}
          {favMats.map(m => <div key={m.id} className="flex gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10"><img src={m.img} className="w-14 h-14 rounded-lg object-cover" /><div className="flex-1"><p className="text-[11px]">{m.name}</p><p className="text-[10px] text-white/40">{m.type}</p></div><button onClick={()=>onToggleFav(m.id)} className="text-white/40">♥</button></div>)}
        </div>
      </div>
    </div>
  )
}