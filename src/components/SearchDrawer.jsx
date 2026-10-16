import { useState } from 'react'
export default function SearchDrawer({ materials, onClose, onSelect }) {
  const [q, setQ] = useState('')
  const filtered = materials.filter(m => m.name.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center pt-20" onClick={onClose}>
      <div className="w-[500px] bg-[#111] border border-white/10 rounded-2xl p-6 h-fit" onClick={e=>e.stopPropagation()}>
        <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Slate, Brass, Linen..." className="w-full h-12 bg-white/[0.05] border border-white/10 rounded-full px-5 text-[12px] outline-none" />
        <div className="mt-4 flex flex-col gap-2 max-h-[300px] overflow-auto">
          {filtered.map(m => <button key={m.id} onClick={() => { onSelect(m.id); onClose()}} className="text-left p-3 rounded-xl hover:bg-white/[0.05] flex gap-3"><div className="w-8 h-8 rounded-lg" style={{background:m.color}} /><span className="text-[11px]">{m.name}</span></button>)}
        </div>
      </div>
    </div>
  )
}