export default function ConfigurePage({ materials, selectedId, onSelect, finish, onFinishChange }) {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-[24px] tracking-[0.2em] mb-2">CONFIGURE</h1>
      <p className="text-white/40 text-[11px] mb-10">Choose material + finish for your space</p>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4 flex flex-col gap-3">
          {materials.map(m => (
            <button key={m.id} onClick={() => onSelect(m.id)} className={`p-4 rounded-xl border text-left ${selectedId===m.id? 'bg-white text-black border-white' : 'border-white/10 bg-white/[0.03]'}`}>
              <p className="text-[11px] tracking-widest">{m.name}</p>
              <p className="text-[10px] opacity-60">{m.type} • ${m.price}</p>
            </button>
          ))}
        </div>
        <div className="col-span-8 p-6 rounded-xl border border-white/10 bg-[#121212]">
          <p className="text-[11px] text-white/40 tracking-widest mb-4">FINISH</p>
          <div className="flex gap-3">
            {['MATTE','POLISHED','BRUSHED'].map(f => (
              <button key={f} onClick={() => onFinishChange(f)} className={`px-5 py-2 rounded-full border text-[10px] tracking-widest ${finish===f? 'bg-white text-black' : 'border-white/20 text-white/50'}`}>{f}</button>
            ))}
          </div>
          <div className="mt-10 h-[300px] rounded-xl overflow-hidden"><img src={materials.find(x=>x.id===selectedId).img} className="w-full h-full object-cover" /></div>
        </div>
      </div>
    </div>
  )
}