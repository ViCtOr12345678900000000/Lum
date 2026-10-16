export default function HotspotDetailModal({ data, onClose, onAdd }) {
  if (!data) return null
  return (
    <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-[420px] bg-[#161616] border border-white/10 rounded-[20px] p-7 shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between mb-5">
          <p className="text-[11px] tracking-[0.3em] text-white/50">{data.label.toUpperCase()}</p>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[12px]">✕</button>
        </div>

        <h3 className="text-[24px] leading-tight mb-1">{data.product}</h3>
        <p className="text-[11px] text-white/40 mb-6">{data.designer}</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/[0.06] rounded-xl p-3 border border-white/5">
            <p className="text-[9px] tracking-widest opacity-40">DIMENSIONS</p>
            <p className="text-[12px] mt-1">{data.dims}</p>
          </div>
          <div className="bg-white/[0.06] rounded-xl p-3 border border-white/5">
            <p className="text-[9px] tracking-widest opacity-40">LEAD TIME</p>
            <p className="text-[12px] mt-1">{data.lead}</p>
          </div>
          <div className="bg-white/[0.06] rounded-xl p-3 border border-white/5 col-span-2">
            <p className="text-[9px] tracking-widest opacity-40">MATERIAL OPTION</p>
            <p className="text-[12px] mt-1">{data.materialId} • Upgrade +${data.price.toLocaleString()}</p>
          </div>
        </div>

        <button
          onClick={()=>{ onAdd(data); onClose() }}
          className="w-full h-12 bg-white text-black rounded-full text-[11px] tracking-[0.2em] font-medium hover:bg-white/90 transition"
        >
          ADD TO CUSTOM BUILD • +${data.price.toLocaleString()}
        </button>
      </div>
    </div>
  )
}