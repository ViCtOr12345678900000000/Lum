export default function MoodboardPage({ materials, favorites }) {
  const favMats = materials.filter(m => favorites.includes(m.id))
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-[24px] tracking-[0.2em]">MOODBOARD — {favorites.length} SAVED</h1>
      {favMats.length===0? <p className="text-white/30 text-[11px] mt-10">No favorites yet. Heart materials to save them here.</p> :
      <div className="grid grid-cols-4 gap-4 mt-10">
        {favMats.map(m => <div key={m.id} className="rounded-xl overflow-hidden border border-white/10"><img src={m.img} className="h-40 w-full object-cover" /><div className="p-3 text-[11px]">{m.name}</div></div>)}
      </div>}
    </div>
  )
}