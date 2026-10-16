export default function MaterialsPage({ materials = [], favorites = [], onToggleFav }) {
  return (
    <div className="p-6 lg:p-10 bg-[#0e0e0e] min-h-[calc(100vh-124px)]">
      <h2 className="text-[12px] tracking-[0.3em] mb-6 opacity-60">MATERIALS • {materials.length} OPTIONS</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map(m=>{
          const isFav = favorites?.includes(m.id)
          return (
            <div key={m.id} className="group rounded-[20px] overflow-hidden border border-white/10 bg-[#141414] hover:border-white/20 transition">
              <div className="relative h-56 overflow-hidden">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <button onClick={()=>onToggleFav?.(m.id)} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur ${isFav?'bg-white text-black':'bg-black/40 text-white'}`}>
                  {isFav? '♥' : '♡'}
                </button>
              </div>
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-[13px] tracking-wide">{m.name}</p>
                  <p className="text-[10px] opacity-50 mt-1">{m.type} • ${m.price}</p>
                </div>
                <div className="w-6 h-6 rounded-full" style={{background:m.color}} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}