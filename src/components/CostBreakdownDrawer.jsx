export default function CostBreakdownDrawer({ onClose, base, material, finish, extras }) {
  const finishExtra = finish==='POLISHED'? 900 : 0
  const materialCost = material.price * 12
  const extrasTotal = extras.reduce((s,e)=>s+e.price,0)
  const total = base + materialCost + finishExtra + extrasTotal

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex justify-end" onClick={onClose}>
      <div className="w-[380px] h-full bg-[#141414] border-l border-white/10 p-7 flex flex-col animate-in slide-in-from-right" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[12px] tracking-[0.3em]">COST BREAKDOWN</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">✕</button>
        </div>

        <div className="space-y-4 text-[12px]">
          <div className="flex justify-between pb-3 border-b border-white/5">
            <span className="opacity-50">Base Room Architecture</span>
            <span>${base.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-50">{material.name} Surfaces</span>
            <span className="text-emerald-300">+${materialCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-50">Finish ({finish})</span>
            <span>+${finishExtra.toLocaleString()}</span>
          </div>

          {extras.length > 0 && <p className="text-[10px] tracking-widest opacity-30 pt-4">CUSTOM EXTRAS</p>}
          {extras.map(e=>(
            <div key={e.id} className="flex justify-between">
              <span className="opacity-50">{e.product}</span>
              <span className="text-emerald-300">+${e.price.toLocaleString()}</span>
            </div>
          ))}

          <div className="border-t border-white/10 pt-5 mt-6 flex justify-between font-bold text-[16px]">
            <span>TOTAL ESTIMATE</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <p className="text-[10px] leading-[14px] opacity-30">This is a dynamic live estimate. It ticks up/down as you select finishes and hotspot extras. Final quote after consultation.</p>
        </div>
      </div>
    </div>
  )
}